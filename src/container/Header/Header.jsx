import React from "react";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { images, profile } from "../../constants";
import "./Header.scss";

const ProofItem = ({ value, label, href }) => {
  const content = (
    <>
      <strong>{value}</strong>
      <span>{label}</span>
    </>
  );

  if (!href) return <li>{content}</li>;

  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {content}
      </a>
    </li>
  );
};

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const circles = [
  { href: profile.linkedin, icon: images.linkedin, label: "LinkedIn" },
  { href: profile.resume, icon: images.resume, label: "Resume" },
  { href: profile.github, icon: images.github, label: "GitHub" },
];

const Header = () => (
  <div className="app__header app__flex">
    <div className="app__header-info">
      <div className="app__header-intro">
        <p className="app__intro-eyebrow">{profile.name}</p>
        <h1 className="app__intro-title">{profile.headline}</h1>
        <p className="p-text app__intro-body">{profile.intro}</p>

        <ul className="app__intro-proof">
          {profile.proof.map((item) => (
            <ProofItem key={item.label} {...item} />
          ))}
        </ul>

        <div className="app__intro-actions">
          <a className="app__btn app__btn--primary" href="#featured">
            View featured work
          </a>
          <a
            className="app__btn app__btn--ghost"
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>
      </div>
    </div>

    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className="app__header-img"
    >
      <img src={images.profile} alt={profile.name} className="app__header-photo" />
      <motion.img
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        src={images.circle}
        alt=""
        className="overlay_circle"
      />
    </motion.div>

    <motion.div
      variants={scaleVariants}
      whileInView={scaleVariants.whileInView}
      className="app__header-circles"
    >
      {circles.map((circle) => (
        <div className="circle-cmp app__flex" key={circle.label}>
          <a
            href={circle.href}
            target="_blank"
            rel="noreferrer"
            aria-label={circle.label}
            className="app__flex"
          >
            <img src={circle.icon} alt={circle.label} className="app__icon-mono" />
          </a>
        </div>
      ))}
    </motion.div>
  </div>
);

export default AppWrap(Header, "home");
