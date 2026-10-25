import React from "react";

import { About, Experience, Featured, Footer, Header, Skills, Work } from "./container";
import { Navbar } from "./components";
import "./App.scss";

const App = () => (
  <div className="app">
    <Navbar />
    <Header />
    <About />
    <Featured />
    <Experience />
    <Skills />
    <Work />
    <Footer />
  </div>
);

export default App;
