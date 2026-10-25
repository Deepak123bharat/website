# Deepak Rathore — Portfolio

Personal portfolio, live at https://deepak123bharat.github.io/web/

Built with React (Create React App), Sass, and Framer Motion. There is no backend:
all content is in [`src/constants/data.js`](src/constants/data.js).

## Run locally

```bash
npm install
npm start        # http://localhost:3000/web
```

## Update content

Edit [`src/constants/data.js`](src/constants/data.js): profile and links, About cards,
experience, open source, education, skills, and projects. Images live in `src/assets/`
and are registered in [`src/constants/images.js`](src/constants/images.js).

## Deploy

```bash
npm run deploy   # builds and publishes ./build to the gh-pages branch
```

GitHub Pages serves the `gh-pages` branch. Source code lives on `master`.
