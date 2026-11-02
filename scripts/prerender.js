// Runs after `react-scripts build`. Renders the app into build/index.html so crawlers
// that don't run JavaScript still get the page text, links and structured data.
// src/index.js discards this copy and React renders the live page as before.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Module = require("module");

const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src");
const buildDir = path.join(root, "build");

process.env.NODE_ENV = "production";
process.env.BABEL_ENV = "production";

const babel = require("@babel/core");

const main = () => {
  const assets = JSON.parse(
    fs.readFileSync(path.join(buildDir, "asset-manifest.json"), "utf8")
  ).files;

  // Compile the app's JSX with the same Babel preset the build uses.
  const babelOptions = {
    babelrc: false,
    configFile: false,
    presets: [[require.resolve("babel-preset-react-app"), { runtime: "automatic" }]],
  };
  const loadJs = Module._extensions[".js"];
  const compile = (module, filename) => {
    if (!filename.startsWith(srcDir + path.sep)) return loadJs(module, filename);
    return module._compile(babel.transformFileSync(filename, babelOptions).code, filename);
  };
  Module._extensions[".js"] = compile;
  Module._extensions[".jsx"] = compile;

  // Styles are already in the build. Images resolve to the URLs the bundle uses.
  for (const ext of [".css", ".scss"]) {
    Module._extensions[ext] = (module) => {
      module.exports = {};
    };
  }
  // The bundle inlines images under 10 KB, so those have no file in the build; copy them in.
  const emit = (filename) => {
    const content = fs.readFileSync(filename);
    const hash = crypto.createHash("sha1").update(content).digest("hex").slice(0, 20);
    const { name, ext } = path.parse(filename);
    const url = `/static/media/${name}.${hash}${ext}`;
    fs.writeFileSync(path.join(buildDir, url), content);
    return url;
  };
  for (const ext of [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]) {
    Module._extensions[ext] = (module, filename) => {
      module.exports = assets[`static/media/${path.basename(filename)}`] || emit(filename);
    };
  }

  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const App = require(path.join(srcDir, "App.js")).default;
  const { profile, skillGroups, experiences, education } = require(path.join(srcDir, "constants"));

  // The icon SVGs (about 80 kB) are decorative; links keep their aria-labels. Images load
  // lazily so this copy can't compete with the bundle, which replaces it on load.
  const html = renderToStaticMarkup(React.createElement(App))
    .replace(/<svg\b[\s\S]*?<\/svg>/g, "")
    .replace(/<img /g, '<img loading="lazy" ');
  if (!html.includes("<h1") || !html.includes(profile.name)) {
    throw new Error("The render produced no page content.");
  }

  const site = new URL("/", require(path.join(root, "package.json")).homepage).href;
  if (!fs.existsSync(path.join(buildDir, "deepak.jpg"))) {
    throw new Error("build/deepak.jpg is missing; the Person schema links to it.");
  }
  const current = experiences.find((item) => /present/i.test(item.period));
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site}#person`,
    name: profile.name,
    url: site,
    image: `${site}deepak.jpg`,
    description: profile.summary,
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: [...new Set(skillGroups.flatMap((group) => group.items.map((item) => item.name)))],
    alumniOf: education.map((item) => ({ "@type": "CollegeOrUniversity", name: item.school })),
  };
  if (current) {
    person.jobTitle = current.role;
    person.worksFor = { "@type": "Organization", name: current.company, url: current.companyLink };
  }

  const indexPath = path.join(buildDir, "index.html");
  const page = fs.readFileSync(indexPath, "utf8");
  const emptyRoot = '<div id="root"></div>';
  if (!page.includes(emptyRoot) || !page.includes("</head>")) {
    throw new Error("build/index.html has no empty #root; run `npm run build` to regenerate it.");
  }
  const jsonLd = JSON.stringify(person).replace(/</g, "\\u003c");
  // Function replacers keep "$" sequences in the content from being read as patterns.
  const output = page
    .replace("</head>", () => `<script type="application/ld+json">${jsonLd}</script></head>`)
    .replace(emptyRoot, () => `<div id="root" data-prerendered>${html}</div>`);
  fs.writeFileSync(indexPath, output);

  console.log(`Prerendered ${(html.length / 1024).toFixed(1)} kB of HTML into build/index.html`);
};

try {
  main();
} catch (error) {
  console.error("Prerender failed:", error);
  process.exit(1);
}
