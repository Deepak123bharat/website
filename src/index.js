import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";
const rootElement = document.getElementById("root");
// The build prerenders the page into #root for crawlers; React renders the live page.
rootElement.textContent = "";
rootElement.removeAttribute("data-prerendered");
const root = createRoot(rootElement);

root.render(
    <App />
);
