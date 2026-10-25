import React from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { projects } from "../../constants";
import "./Work.scss";

const Work = () => {
  return (
    <>
      <h2 className="head-text">
        Open Source <span>Projects</span>
      </h2>

      <div className="app__work-portfolio">
        {projects.map((work) => {
          const TileIcon = work.icon;

          return (
            <div className="app__work-item app__flex" key={work.title}>
              <div className="app__work-img app__flex">
                {work.image ? (
                  <img src={work.image} alt={work.title} />
                ) : (
                  <div
                    className="app__work-tile app__flex"
                    style={{
                      background: `linear-gradient(135deg, ${work.accent}, #313bac)`,
                    }}
                  >
                    <TileIcon aria-hidden="true" />
                  </div>
                )}

                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                    staggerChildren: 0.5,
                  }}
                  className="app__work-hover app__flex"
                >
                  {work.projectLink && (
                    <a
                      href={work.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${work.title}`}
                    >
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillEye />
                      </motion.div>
                    </a>
                  )}
                  {work.codeLink && (
                    <a
                      href={work.codeLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Source code for ${work.title}`}
                    >
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillGithub />
                      </motion.div>
                    </a>
                  )}
                </motion.div>
              </div>

              <div className="app__work-content app__flex">
                <h4 className="bold-text">{work.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>
                  {work.description}
                </p>

                <div className="app__work-links">
                  {work.projectLink && (
                    <a href={work.projectLink} target="_blank" rel="noreferrer">
                      <AiFillEye /> Visit
                    </a>
                  )}
                  {work.codeLink && (
                    <a href={work.codeLink} target="_blank" rel="noreferrer">
                      <AiFillGithub /> Code
                    </a>
                  )}
                </div>

                <div className="app__work-tag app__flex">
                  <p className="p-text">{work.tags[0]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
