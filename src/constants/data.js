// All portfolio content lives in this file. Edit it and redeploy to update the site.
import { AiOutlineApi } from "react-icons/ai";
import { BsChatSquareText, BsStars, BsTerminal } from "react-icons/bs";
import { FaCheckCircle, FaCubes, FaDatabase, FaJava, FaRobot } from "react-icons/fa";
import {
  SiAngular,
  SiAmazons3,
  SiAzuredevops,
  SiCsharp,
  SiDocker,
  SiDotnet,
  SiGit,
  SiGithubactions,
  SiGo,
  SiGooglecloud,
  SiGraphql,
  SiJavascript,
  SiJenkins,
  SiJira,
  SiLua,
  SiMicrosoftsqlserver,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiSentry,
  SiShopify,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";

import images from "./images";

const referenceLetter =
  "https://drive.google.com/file/d/1wZiDDOlYdZQcWlxejVPmHOZ5rOklM9sa/view?usp=sharing";

export const profile = {
  name: "Deepak Rathore",
  headline:
    "Full-stack and AI developer building web apps, APIs and AI-assisted developer tools.",
  intro:
    "For 6 years I've built APIs, dashboards and integrations for startups, including an MCP-based AI triage assistant for Microsoft's Roslyn team and explainable fraud scoring for a returns platform.",
  // Facts shown under the headline. An `href` makes the item a link.
  proof: [
    {
      value: "13",
      label: "merged PRs in Microsoft's open-source C# compiler",
      href: "https://github.com/dotnet/roslyn/pulls?q=is%3Apr+author%3Adeepakrathore33+is%3Amerged",
    },
    {
      value: "2",
      label: "Google Summer of Code projects",
      href: "#credentials",
    },
    { value: "6 yrs", label: "building full-stack products" },
  ],
  summary:
    "Full-stack and AI developer with 6 years building web apps, APIs and integrations in TypeScript, Go, Python, Node.js, React/Next.js, and PostgreSQL. Built an MCP-based AI triage assistant for Microsoft's Roslyn team and explainable return-fraud scoring for a Shopify returns app, worked on GoKwik's Python RTO risk-score API, and contributed 13 merged PRs to Microsoft's open-source C# compiler. Experienced with webhook-driven integrations and automated testing.",
  email: "dsrdeepak8@gmail.com",
  phone: "+91 7742798638",
  location: "Jaipur, Rajasthan, India",
  linkedin: "https://www.linkedin.com/in/deepak-singh-rathore-a100aa181/",
  github: "https://github.com/Deepak123bharat",
  resume:
    "https://drive.google.com/file/d/1ejO5-Wxhy-2q0xiWJzmHyxOvfFvQpobq/view?usp=sharing",
};

// `id` is the section anchor; `label` is the text shown in the navbar.
export const navItems = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "featured", label: "featured" },
  { id: "experience", label: "experience" },
  { id: "skills", label: "skills" },
  { id: "work", label: "open source" },
  { id: "contact", label: "contact" },
];

export const abouts = [
  {
    title: "Full-Stack Developer",
    description:
      "Six years shipping web apps and APIs end to end with Go, Node.js, TypeScript, React, and Next.js.",
    image: images.about04,
  },
  {
    title: "AI-Assisted Tooling",
    description:
      "An MCP-based triage assistant for Microsoft's Roslyn team: read-only, PII-scrubbed, and built so engineers still make the call.",
    image: images.about01,
  },
  {
    title: "APIs & Risk Scoring",
    description:
      "GraphQL and REST APIs and webhook integrations, plus explainable return-fraud scoring and a Python RTO API at GoKwik.",
    image: images.about02,
  },
  {
    title: "Open Source",
    description:
      "Two-time Google Summer of Code intern with 13 merged PRs in Microsoft's open-source C# compiler.",
    image: images.openSource,
  },
];

// Case studies shown in the Featured Work popups. Optional per study:
// screenshots [{ src, alt, caption }] (register images in images.js) and proof [{ label, href }].
export const featuredWork = [
  {
    id: "triage-assistant",
    label: "Professional · Tech Mahindra (Microsoft)",
    title: "AI-Assisted Feedback Triage (MCP)",
    tagline:
      "An MCP server, web UI, and Copilot agent that summarize incoming product feedback, suggest the likely area, and surface duplicates and related code, so engineers spend less time sorting and more time fixing.",
    role: "I built it: the read-only MCP server, the web UI, the triage pipeline behind them, and the agent that drives it, for the Roslyn team.",
    problem:
      "Triage was fully manual. For every report, an engineer had to read the description and comments, work out which area it belonged to, and search for duplicates and related code before anyone could start fixing it.",
    built: [
      "A read-only MCP server in TypeScript with tools to query feedback items, read their comments, list and download attachments, and analyze crash dumps, exposing only allow-listed fields.",
      "A web UI where an engineer enters a feedback ID or runs a batch query and gets one summary: the report and comments, the likely area, duplicate candidates, related code and PRs, and diagnostics.",
      "A seven-step triage pipeline that runs heuristic checks, adds model-generated analysis when a language model is configured, and streams each step's progress to the UI.",
      "A pluggable model layer that works with GitHub Models or with the Copilot models in VS Code, through a small localhost-only bridge extension.",
      "A Copilot agent that chains the MCP tools into a structured report for the engineer, and a readiness score that shows how complete a report is, based on checks such as repro steps, comments, and attachments.",
    ],
    challenges: [
      {
        challenge:
          "Feedback can contain personal information, and an AI tool must not be able to change anything.",
        solution:
          "The server is read-only, only exposes allow-listed fields, and scrubs PII before anything reaches the UI or a model. The web UI uses the same layer, so both paths behave the same way.",
      },
      {
        challenge: "Engineers will not rely on a summary they cannot check.",
        solution:
          "The UI shows each step as it runs, keeps the original report and comments in collapsible sections with links back to the source, and leaves the decision to the engineer.",
      },
      {
        challenge:
          "The tool should still be useful when no language model is available, or when one misbehaves.",
        solution:
          "The heuristic checks run on their own and the model is an optional extra. If a model call times out, fails, or returns malformed output, that step falls back to the heuristic result, so the pipeline always returns something.",
      },
      {
        challenge:
          "The web UI is a plain Node server, but the Copilot models can only be called from inside VS Code.",
        solution:
          "A small VS Code extension exposes those models over a localhost-only HTTP API with streaming, so the UI can use them without separate credentials. It does not store or log prompts.",
      },
    ],
    shipped: [
      "Built to replace a fully manual process: an engineer enters a feedback ID and gets one summary, which cut manual triage effort by about 90%.",
      "An internal tool, so there is no public link, code, or demo.",
    ],
    proof: [],
    tech: ["MCP", "TypeScript", "LLM APIs", "Node.js", "Azure DevOps", "VS Code extension"],
  },
  {
    id: "return-risk-score",
    label: "Professional · LiquiDonate",
    title: "Explainable Return-Fraud Scoring",
    tagline:
      "A 0–100 risk score on each return in a Shopify returns app, with the reasons behind it shown to the merchant.",
    role: "I designed and built it: the scoring logic, the webhook that brings in nonprofit feedback, the database changes, and the merchant-facing UI.",
    problem:
      "Merchants reviewing a return had no quick way to spot suspicious return patterns.",
    built: [
      "A rules-based score from four signals: how often a customer returns, refund value, items nonprofits reported as not received, and how many different customers ship to the same building.",
      "A webhook that receives delivery feedback from nonprofits, stores it in new tables, and registers itself when the app is installed.",
      "A risk badge on the parcel page with a popover that lists why the score is what it is.",
      "A per-retailer setting, off by default.",
    ],
    challenges: [
      {
        challenge:
          "A mailbox warehouse looks like many addresses, because each suite is its own record.",
        solution:
          "The address signal ignores the suite and groups by street, ZIP, and country, so a building with many suite numbers counts as one place.",
      },
      {
        challenge:
          "A scoring failure must never stop a merchant from opening a return.",
        solution:
          "Scoring always resolves. On an error it returns a neutral result and reports the exception to Sentry.",
      },
      {
        challenge:
          "Merchants will not trust a score they cannot explain, and webhooks can be delivered more than once.",
        solution:
          "I used transparent rules instead of a model, tracked each factor's contribution, and show the top reasons in plain language. Feedback is written with an idempotent upsert, so repeated deliveries do not create duplicates.",
      },
    ],
    shipped: [
      "Surfaced high-risk returns for merchant review: for one retailer, an average of 7 in every 100 returning customers scored above 80 out of 100.",
      "Merged into the Returns Direct Shopify app. Admins can turn it on per retailer, and it is off by default.",
      "Scores are advisory: they inform the merchant's review and never block a return.",
    ],
    proof: [
      {
        label: "Returns Direct on the Shopify App Store",
        href: "https://apps.shopify.com/liquidonate",
      },
    ],
    tech: ["Remix", "TypeScript", "Prisma", "PostgreSQL", "Sentry"],
  },
  {
    id: "manual-returns",
    label: "Professional · LiquiDonate",
    title: "Manual Returns",
    tagline:
      "A dashboard workflow for creating a return on a customer's behalf, matching its items to nonprofits, and issuing a shipping label or scheduling a pickup.",
    role: "I built it end to end: the GraphQL schema, the Go service, and the Next.js dashboard UI. I then extended it with scheduled pickups, search, package dimensions, and item photos.",
    problem:
      "Retailers needed a way to create a return for a customer so those items could go through the same nonprofit matching and shipping process as returns started by shoppers.",
    built: [
      "A dashboard form for the customer, address, items (category, quantity, value, weight), return reason, and RMA ID, validated with Formik and Yup.",
      "A Go service that checks the shipment, matches the items to a nonprofit, and creates an EasyPost shipping label.",
      "An optional scheduled FedEx pickup with a time-window picker, as an alternative to a printed label.",
      "Optional package dimensions sent to EasyPost, photos for each item, and a searchable list of past manual returns.",
      "Return instructions or pickup confirmation emailed to the customer, and a Slack notification to the team.",
    ],
    challenges: [
      {
        challenge:
          "A carrier rejects an oversized parcel only when the label is created, which is too late for someone who has already filled in the form.",
        solution:
          "I enforce the 70 lb limit in the form, across the total weight of all items, and again in the service, so mistakes show while typing and bad requests never reach the carrier.",
      },
      {
        challenge:
          "There are two ways to send the item back, a label or a pickup, and each needs different data.",
        solution:
          "A return-method switch changes which fields are required in the form, and the service branches to create either a scheduled pickup or a label.",
      },
      {
        challenge:
          "Building a separate flow for manual returns would have duplicated the matching logic.",
        solution:
          "Manual returns call the same match generator as other returns, tagged with a manual source so they can be listed and searched on their own.",
      },
    ],
    shipped: [
      "Helped onboard 4 new retailers that don't use Shopify.",
      "Available to retailers in the dashboard under Integrations.",
      "Extended since the first version with scheduled FedEx pickups, pickup emails, customer name and Shopify return ID with search, package dimensions, a required RMA ID, and item photos.",
    ],
    screenshots: [
      {
        src: images.manualReturnsSample,
        alt: "The manual-return form with sample customer, item, weight, RMA ID, and return-method fields.",
        caption:
          "Illustrative recreation of the form with sample data, not a capture of live customer data.",
      },
    ],
    proof: [],
    tech: ["Go", "GraphQL", "Next.js", "TypeScript", "Formik", "Yup", "EasyPost", "FedEx"],
  },
  {
    id: "bungii-delivery",
    label: "Professional · LiquiDonate",
    title: "Carrier-Aware Delivery Management",
    tagline:
      "Per-retailer Bungii accounts, delivery-order editing and cancellation, ETA rescheduling, and event logging in the Go backend.",
    role: "I extended the Bungii integration, which was built on an existing client and webhook receiver, across the Go backend and the admin app.",
    problem:
      "Deliveries are booked with an outside carrier whose API has strict rules: it only reschedules the pickup, it cannot change a finished order, and each retailer can have its own account and instructions.",
    built: [
      "Per-retailer Bungii accounts with their own customer ID, pickup rules, and default waypoint instructions, managed from the admin app.",
      "Editing and cancelling delivery orders (status, ETAs, contact, address), calling the carrier API where it is required.",
      "Bill of lading links attached to carrier waypoints.",
      "Webhook events mapped to delivery statuses, with informational events acknowledged so the carrier does not retry them, and every handled event logged to BigQuery.",
      "A Slack alert, instead of booking the delivery, when it exceeds the carrier's limits.",
    ],
    challenges: [
      {
        challenge:
          "The carrier only accepts a pickup reschedule, but admins edit both the pickup and delivery times.",
        solution:
          "The delivery ETA is display-only. It shifts automatically to keep the original pickup-to-delivery gap (one hour by default), only the changed time is sent to the carrier, and a direct edit of the delivery ETA on a Bungii order returns a clear error.",
      },
      {
        challenge:
          "The carrier cannot modify an order that is already finished.",
        solution:
          "Rescheduling a finished order is blocked with a specific error code, while a status-only correction is still allowed.",
      },
      {
        challenge:
          "Changing a retailer's account settings later could orphan orders that were already booked.",
        solution:
          "Each order keeps a reference to the account it was booked with, and later calls prefer that account over the retailer's current one.",
      },
    ],
    shipped: [
      "Admins can edit, cancel, and reschedule Bungii delivery orders from the admin app.",
      "Out-of-limit deliveries alert the team in Slack instead of being booked.",
      "Handles 10K+ webhook events a month.",
    ],
    proof: [],
    tech: ["Go", "GraphQL", "PostgreSQL", "BigQuery", "Slack"],
  },
  {
    id: "roslyn-contributions",
    label: "Open source · dotnet/roslyn",
    title: "Roslyn Contributions",
    tagline:
      "13 merged pull requests to Microsoft's open-source C# compiler (Roslyn) and its IDE tooling, from crash fixes to .slnx support.",
    role: "Contributor. I diagnosed and fixed crashes and gaps in C# IDE features, and added .slnx support to MSBuildWorkspace.",
    problem:
      "People using the C# IDE hit crashes in refactorings and navigation features, and the library that loads solutions could not open the new .slnx (XML solution) format.",
    built: [
      "Added .slnx loading to MSBuildWorkspace with the SolutionPersistence library, handling both .sln and .slnx, with localized errors for invalid files and tests using valid and invalid solutions.",
      "Fixed crashes in Convert to foreach, Call Hierarchy, Signature Help, and document highlights.",
      "Fixed Call Hierarchy missing the interface implementation category for overrides, and an IDE0046 code fix that threw on top-level statements.",
      "Deferred Introduce Parameter's call-site search until the action is applied.",
    ],
    challenges: [
      {
        challenge:
          "Convert to foreach crashed Visual Studio with an InvalidCastException when the loop variable was used inside a tuple.",
        solution:
          "A tuple's children are argument nodes, but their parent is not an argument list, which the code assumed. I check the parent type before reading the arguments, and added a regression test.",
      },
      {
        challenge:
          "Supporting a new solution format without breaking the way .sln files load.",
        solution:
          "I moved the .slnx parsing into its own reader behind the existing loader, kept one path for both formats, and addressed 11 review comments from the Roslyn team.",
      },
    ],
    shipped: [
      "13 pull requests merged into dotnet/roslyn since 2024, reviewed and merged by the Roslyn team.",
    ],
    proof: [
      {
        label: "All merged pull requests",
        href: "https://github.com/dotnet/roslyn/pulls?q=is%3Apr+author%3Adeepakrathore33+is%3Amerged",
      },
      {
        label: "#77326 .slnx support in MSBuildWorkspace",
        href: "https://github.com/dotnet/roslyn/pull/77326",
      },
      {
        label: "#81531 Convert to foreach crash with tuples",
        href: "https://github.com/dotnet/roslyn/pull/81531",
      },
      {
        label: "#82537 Signature help crash on extension properties",
        href: "https://github.com/dotnet/roslyn/pull/82537",
      },
      {
        label: "#83132 Call Hierarchy and overrides",
        href: "https://github.com/dotnet/roslyn/pull/83132",
      },
    ],
    tech: ["C#", ".NET", "Roslyn", "MSBuild"],
  },
  {
    id: "dashboard-contributions",
    label: "Professional · LiquiDonate",
    title: "Retailer and Nonprofit Dashboard",
    tagline:
      "Contributions to the Next.js 15 dashboard where retailers and nonprofits work with the donation marketplace and fulfillment.",
    role: "One of several engineers on the dashboard. My work covered the move off the legacy frontend, security headers, regional support, and product and nonprofit pages.",
    problem:
      "The marketplace was moving from a legacy frontend to the new dashboard, which meant carrying over search visibility, hardening the new site, and supporting more regions.",
    built: [
      "Moved the SEO layer from the legacy frontend into the dashboard, and pointed backend links, emails, and admin product links at it.",
      "Added browser security headers with a Content-Security-Policy, first in report-only mode.",
      "Added Canadian address support to location search and checkout, and enforced the same-country restriction on the backend.",
      "Showed nested nonprofit categories and pallets per truckload on product details, and preserved line breaks in listing descriptions.",
      "Added a log-out button and the signed-in email to the organization registration wizard.",
    ],
    challenges: [
      {
        challenge: "A strict Content-Security-Policy can break a live site.",
        solution:
          "I shipped it in report-only mode so violations could be reviewed before anything was blocked, then allowed legitimate sources such as Google Ads remarketing pixels.",
      },
      {
        challenge: "A deploy step overwrote the dashboard's NEXTAUTH_URL.",
        solution:
          "I gave the dashboard its own NEXTAUTH_URL in Terraform and changed the Cloud Build step so deploys no longer wipe it.",
      },
    ],
    shipped: [
      "Live at dashboard.liquidonate.com, where retailers and nonprofits work with donations.",
    ],
    proof: [
      { label: "dashboard.liquidonate.com", href: "https://dashboard.liquidonate.com/" },
    ],
    tech: ["Next.js 15", "TypeScript", "Apollo Client", "NextAuth", "Terraform", "Cloud Build"],
  },
];

// A point is a string, or { text, result } to show the outcome on its own highlighted line.
export const experiences = [
  {
    role: "Full-Stack Developer",
    company: "LiquiDonate",
    companyLink: "https://www.liquidonate.com/",
    links: [{ label: "Reference letter from the CTO", href: referenceLetter }],
    location: "Oakland, CA, USA (Remote)",
    period: "Sep 2025 – Oct 2026",
    product: "Returns Direct (Shopify app) · Retailer & Nonprofit Dashboard",
    points: [
      {
        text: "Built explainable return-fraud scoring end to end for the Shopify returns app (Remix, Prisma): a 0–100 risk score from return frequency, refund value, items nonprofits reported missing and shared addresses. Merchants see the top reasons for each score, and it is opt-in per retailer. Includes the nonprofit-feedback webhook.",
        result:
          "Surfaced high-risk returns for merchant review: for one retailer, an average of 7 in every 100 returning customers scored above 80 out of 100.",
      },
      {
        text: "Built the manual-returns workflow end to end (Next.js dashboard, Go/GraphQL service): one submission matches items to a nonprofit, issues an EasyPost label or books a FedEx pickup, and notifies the customer and team. Added RMA IDs, package dimensions, photos and search; in production use.",
        result: "Helped onboard 4 new retailers that don't use Shopify.",
      },
      "Extended the Bungii delivery integration across the admin app, GraphQL API and Go backend: per-retailer accounts and pickup rules, order editing and cancellation, ETA rescheduling within carrier limits, BigQuery logging, and Slack alerts for out-of-limit deliveries. Handles 10K+ webhook events a month.",
      "Contributed to the Next.js 15 retailer and nonprofit dashboard (TypeScript, Apollo Client, NextAuth): moved the SEO layer off the legacy frontend, added security headers with a CSP, and added Canadian address support to search and checkout.",
      "Wrote Playwright end-to-end tests for the Shopify app's return policies, destinations, collection mapping, return reasons and settings, plus workflow-matching unit tests.",
      "Parallelized the Go test suite in CI across 4 Ginkgo workers, each with its own PostgreSQL database template-cloned from a single migrated copy so every worker gets an identical schema.",
    ],
    tech: [
      "Go (Gin, gqlgen, GORM)",
      "GraphQL",
      "PostgreSQL",
      "Next.js",
      "Remix",
      "Prisma",
      "TypeScript",
      "Shopify Admin API",
      "GCP",
      "BigQuery",
      "Playwright",
    ],
  },
  {
    role: "Software Engineer (Vendor at Microsoft)",
    company: "Tech Mahindra · Client: Microsoft",
    companyLink: "https://www.techmahindra.com/",
    productLink: "https://github.com/dotnet/roslyn",
    location: "Hyderabad, India",
    period: "Aug 2024 – Aug 2025",
    product: "Roslyn (.NET compiler platform)",
    points: [
      {
        text: "Built an AI-assisted triage assistant for Roslyn user feedback in Azure DevOps (MCP server, web UI and Copilot agent). Triage used to be fully manual. Now an engineer enters a feedback ID and gets one summary with the report and comments, likely area, duplicate candidates, related code and PRs, and diagnostics. Read-only, with allow-listed fields and PII scrubbing; a person still decides.",
        result: "Cut manual triage effort by about 90%.",
      },
      "Worked with the Roslyn team on the open-source C# compiler and Visual Studio 2022 developer tooling, including triaging and fixing Visual Studio user feedback.",
      "Automated GitHub issue triage for the Roslyn repo using GitHub Actions, improving issue management.",
    ],
    tech: ["C#", ".NET", "TypeScript", "Node.js", "MCP", "SQL", "Azure DevOps", "GitHub Actions"],
  },
  {
    role: "Full Stack Developer",
    company: "Suuchi Inc.",
    productLink: "https://ignitetech.ai/software-library/grid/",
    location: "Remote, US",
    period: "Jan 2024 – Jul 2024",
    product: "Suuchi GRID (supply chain platform)",
    points: [
      "Built user-friendly UIs and backend APIs for Grid, Suuchi's supply chain platform.",
      "Worked closely with the product team to translate PRDs into effective client solutions.",
    ],
    tech: ["Node.js", "TypeScript", "React", "Angular", "PostgreSQL", "Jenkins"],
  },
  {
    role: "Full Stack Developer",
    company: "GoKwik",
    companyLink: "https://www.gokwik.co/",
    location: "Bangalore, India",
    period: "Jan 2023 – Jan 2024",
    product: "GoKwik Merchant Dashboard",
    points: [
      "Worked on GoKwik's RTO (return-to-origin) API in Python, which scores each user's return risk from their return data, and led its integration into the FYND commerce platform via a FYND extension, owning the roadmap and deadlines with cross-functional teams.",
      "Built scalable Node.js APIs and React interfaces for kwik.ai.",
    ],
    tech: ["Python", "Node.js", "React", "PostgreSQL", "MongoDB", "Redis", "AWS S3", "Jenkins"],
  },
  {
    role: "Software Development Engineer",
    company: "Global Satellite Engineering",
    productLink: "https://static.gsattrack.com/",
    location: "Remote, US",
    period: "Sep 2020 – Nov 2022",
    product: "GSatTrack (satellite and GSM tracking)",
    points: [
      "Improved scalability and responsiveness of GSatTrack, a web-based satellite and GSM tracking platform, by designing and building microservices in Node.js and .NET, cutting deployment time by 20%.",
      "Ensured back-end reliability with unit tests for processing, connectivity, and database interactions.",
    ],
    tech: [
      "Node.js",
      ".NET",
      "ASP.NET MVC",
      "SQL",
      "REST APIs",
      "React",
      "JavaScript",
      "Microservices",
    ],
  },
];

export const openSource = [
  {
    title: "Google Summer of Code Intern",
    org: "LabLua",
    period: "May 2021 – Aug 2021",
    description:
      "Split LuaRocks, Lua's package manager, into 7 standalone modules (file system, tar, zip, patch, OS detection, and more) with Teal type definitions and Busted unit tests.",
    link: "https://github.com/Deepak123bharat/lablua-submission",
  },
  {
    title: "Google Summer of Code Intern",
    org: "Lua-GL",
    period: "May 2019 – Aug 2019",
    description:
      "Built interactive editing features for Lua-GL, a Lua library for schematic and diagram editors: connectors with auto-routing, port and grid snapping, shape selection, and grouping.",
    link: "https://github.com/rigeda/lua-gl",
  },
];

export const education = [
  {
    degree: "B.Tech, Computer Science",
    school: "Shri Mata Vaishno Devi University",
    period: "2017 – 2021",
    detail: "CGPA 8.1/10",
  },
];

export const awards = [
  "Completed 1,000 hours of practical learning in Masai's Full Stack Web Development program, certified for outstanding results and conduct, and led a 5-member team on its projects.",
  "Mentored students at Code Club SMVDU in data structures and algorithms, from basics to advanced.",
];

export const recommendation = {
  quote:
    "I'm grateful to have had the opportunity to work with Deepak and would recommend him to any team looking for a developer who takes initiative, thinks critically, communicates well, and genuinely cares about the quality of his work and the success of the team.",
  author: "Aisya Aziz",
  role: "CTO, LiquiDonate",
  href: referenceLetter,
};

export const certificates = [
  {
    title: "Full Stack Web Development",
    issuer: "Masai",
    detail: "1,000 hours, certified for outstanding results and conduct",
    href: "https://drive.google.com/file/d/1wBBANnkbeSssFs02FXJoMRRNkRgHBuZ4/view",
  },
  {
    title: "Google Summer of Code 2021",
    issuer: "LabLua",
    detail: "Split LuaRocks into 7 standalone modules",
    href: "https://drive.google.com/file/d/1UJQY_gKDNDMxAi5ADQrsfwf0xYHvvktn/view",
  },
  {
    title: "Google Summer of Code 2019",
    issuer: "Lua-GL",
    detail: "Interactive editing features for a Lua diagram library",
    href: "https://drive.google.com/file/d/0BwAB1HDJpLV8REFrSVhPdWhZT3ZXOUFhbXNndFZkWTRmeE9n/view?resourcekey=0-O5V8EvB-NNOeoVBHo3HoSQ",
  },
];

// `darkColor` replaces `color` in dark mode for brand colors too dark to see there.
export const skillGroups = [
  {
    title: "Languages",
    items: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#E8B600" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "SQL", icon: FaDatabase, color: "#336791", darkColor: "#8FB3DD" },
      { name: "C#", icon: SiCsharp, color: "#9B4F96" },
      { name: "Java", icon: FaJava, color: "#E76F00" },
      { name: "Lua", icon: SiLua, color: "#2C2D72", darkColor: "#A5A8F0" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", icon: SiReact, color: "#149ECA" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000", darkColor: "#FFFFFF" },
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
      { name: "REST APIs", icon: AiOutlineApi, color: "var(--secondary-color)" },
      { name: ".NET", icon: SiDotnet, color: "#512BD4", darkColor: "#A48BF5" },
      { name: "Microservices", icon: FaCubes, color: "var(--secondary-color)" },
      { name: "Prisma", icon: SiPrisma, color: "#2D3748", darkColor: "#A0AEC0" },
    ],
  },
  {
    title: "AI & LLM",
    items: [
      { name: "MCP", icon: AiOutlineApi, color: "var(--secondary-color)" },
      { name: "LLM APIs", icon: BsStars, color: "var(--secondary-color)" },
      { name: "Prompt design", icon: BsChatSquareText, color: "var(--secondary-color)" },
      { name: "AI agents", icon: FaRobot, color: "var(--secondary-color)" },
      { name: "Claude Code", icon: BsTerminal, color: "#D97757" },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "SQL Server", icon: SiMicrosoftsqlserver, color: "#CC2927" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
      { name: "AWS S3", icon: SiAmazons3, color: "#569A31" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Azure DevOps", icon: SiAzuredevops, color: "#0078D7" },
      { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
    ],
  },
  {
    title: "Testing",
    items: [
      { name: "Playwright", icon: FaCheckCircle, color: "#2EAD33" },
      { name: "Vitest", icon: FaCheckCircle, color: "#729B1B" },
      { name: "Ginkgo", icon: FaCheckCircle, color: "#00ADD8" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Jira", icon: SiJira, color: "#0052CC", darkColor: "#4C9AFF" },
      { name: "Shopify", icon: SiShopify, color: "#7AB55C" },
      { name: "Sentry", icon: SiSentry, color: "#362D59", darkColor: "#B8A7E8" },
    ],
  },
];

export const projects = [
  {
    title: "Lua-GL (GSoC 2019)",
    description:
      "Interactive editing for a Lua schematic and diagram library: connectors with auto-routing, port and grid snapping, shape selection, and grouping.",
    tags: ["Open-Source"],
    image: images.luaGl,
    projectLink: "https://lua-gl.rigeda.org/",
    codeLink: "https://github.com/rigeda/lua-gl",
  },
  {
    title: "LuaRocks Refactor (GSoC 2021)",
    description:
      "Split LuaRocks, Lua's package manager, into 7 standalone modules with Teal type definitions and Busted unit tests.",
    tags: ["Open-Source"],
    image: images.luarocks,
    codeLink: "https://github.com/Deepak123bharat/lablua-submission",
  },
];
