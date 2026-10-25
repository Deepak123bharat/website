import React, { useState } from "react";
import { HiCheck, HiOutlineClipboardCopy, HiOutlineMail } from "react-icons/hi";

import { images, profile } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Footer.scss";

const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
  "Hello Deepak"
)}`;

const contactCards = [
  { label: "Email", value: profile.email, href: mailto, icon: images.email },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: images.mobile,
  },
  {
    label: "LinkedIn",
    value: profile.name,
    href: profile.linkedin,
    icon: images.linkedin,
    mono: true,
    external: true,
  },
];

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked; let the visitor copy it by hand.
      window.prompt("Copy my email address:", profile.email);
    }
  };

  return (
    <>
      <h2 className="head-text">
        Contact <span>Me</span>
      </h2>

      <p className="p-text app__footer-intro">
        Have a role or project in mind? The quickest way to reach me is email,
        or connect with me on LinkedIn.
      </p>

      <div className="app__footer-actions">
        <a className="app__footer-btn" href={mailto}>
          <HiOutlineMail aria-hidden="true" /> Email Me
        </a>
        <button
          type="button"
          className="app__footer-btn app__footer-btn--ghost"
          onClick={copyEmail}
        >
          {copied ? (
            <>
              <HiCheck aria-hidden="true" /> Copied!
            </>
          ) : (
            <>
              <HiOutlineClipboardCopy aria-hidden="true" /> Copy Email
            </>
          )}
        </button>
      </div>

      <div className="app__footer-cards">
        {contactCards.map((card) => (
          <a
            className="app__footer-card"
            href={card.href}
            key={card.label}
            {...(card.external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            <img
              src={card.icon}
              alt=""
              className={card.mono ? "app__icon-mono" : undefined}
            />
            <div>
              <p className="p-text app__footer-card-label">{card.label}</p>
              <p className="p-text app__footer-card-value">{card.value}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="copyright">
        <p className="p-text">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
