import React from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { abouts, profile } from "../../constants";
import "./About.scss";

const About = () => (
  <>
    <h2 className="head-text">
      About <span>Me</span>
    </h2>

    <p className="p-text app__about-summary">{profile.summary}</p>

    <div className="app__profiles">
      {abouts.map((about) => (
        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: "tween" }}
          className="app__profile-item"
          key={about.title}
        >
          <img src={about.image} alt={about.title} />
          <h2 className="bold-text" style={{ marginTop: 20 }}>
            {about.title}
          </h2>
          <p className="p-text" style={{ marginTop: 10 }}>
            {about.description}
          </p>
        </motion.div>
      ))}
    </div>
  </>
);

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
