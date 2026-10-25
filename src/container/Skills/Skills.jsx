import React from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { skillGroups } from "../../constants";
import "./Skills.scss";

const Skills = () => (
  <>
    <h2 className="head-text">
      Technical <span>Skills</span>
    </h2>

    <div className="app__skills-groups">
      {skillGroups.map((group) => (
        <motion.div
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          className="app__skills-group"
          key={group.title}
        >
          <h3 className="bold-text">{group.title}</h3>
          <div className="app__skills-list">
            {group.items.map(({ name, icon: Icon, color, darkColor }) => (
              <div className="app__skills-item" key={name}>
                <Icon
                  style={{ "--icon-light": color, "--icon-dark": darkColor || color }}
                  aria-hidden="true"
                />
                <p className="p-text">{name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </>
);

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
