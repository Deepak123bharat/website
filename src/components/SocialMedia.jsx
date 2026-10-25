import React from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { GrResume } from "react-icons/gr";

import { profile } from "../constants";

const links = [
  { href: profile.linkedin, label: "LinkedIn", Icon: BsLinkedin },
  { href: profile.github, label: "GitHub", Icon: BsGithub },
  { href: profile.resume, label: "Resume", Icon: GrResume },
];

const SocialMedia = () => (
  <div className="app__social">
    {links.map(({ href, label, Icon }) => (
      <div key={label}>
        <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
          <Icon />
        </a>
      </div>
    ))}
  </div>
);

export default SocialMedia;
