import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { HiX } from "react-icons/hi";

import { AppWrap, MotionWrap } from "../../wrapper";
import { featuredWork } from "../../constants";
import "./Featured.scss";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const CaseStudy = ({ study, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = dialogRef.current.querySelectorAll(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || current === dialogRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [onClose]);

  const titleId = `case-${study.id}-title`;

  return (
    <div
      className="app__case-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="app__case"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={dialogRef}
      >
        <button
          type="button"
          className="app__case-close"
          aria-label="Close case study"
          onClick={onClose}
        >
          <HiX aria-hidden="true" />
        </button>

        <header className="app__case-header">
          <p className="app__case-label">{study.label}</p>
          <h3 id={titleId}>{study.title}</h3>
          <p className="app__case-tagline">{study.tagline}</p>
        </header>

        {study.screenshots?.length > 0 && (
          <div className="app__case-shots">
            {study.screenshots.map((shot) => (
              <figure key={shot.src}>
                <img src={shot.src} alt={shot.alt} loading="lazy" />
                {shot.caption && <figcaption>{shot.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        <section>
          <h4>My role</h4>
          <p>{study.role}</p>
        </section>

        <section>
          <h4>The problem</h4>
          <p>{study.problem}</p>
        </section>

        <section>
          <h4>What I built</h4>
          <ul>
            {study.built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h4>Challenges and how I solved them</h4>
          <ul className="app__case-challenges">
            {study.challenges.map((item) => (
              <li key={item.challenge}>
                <p className="app__case-challenge">{item.challenge}</p>
                <p>{item.solution}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4>What shipped</h4>
          <ul>
            {study.shipped.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {study.proof?.length > 0 && (
          <section>
            <h4>Proof</h4>
            <ul className="app__case-proof">
              {study.proof.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label} <FaExternalLinkAlt aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="app__case-tech">
          {study.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Featured = () => {
  const [activeId, setActiveId] = useState(null);
  const close = useCallback(() => setActiveId(null), []);
  const active = featuredWork.find((study) => study.id === activeId);

  return (
    <>
      <h2 className="head-text">
        Featured <span>Work</span>
      </h2>
      <p className="p-text app__featured-intro">
        Case studies from production and open-source work: what I built, the
        problems I ran into, and what shipped.
      </p>

      <div className="app__featured-grid">
        {featuredWork.map((study) => (
          <article className="app__featured-card" key={study.id}>
            <p className="app__featured-label">{study.label}</p>
            <h3>{study.title}</h3>
            <p className="p-text">{study.tagline}</p>
            <div className="app__featured-tech">
              {study.tech.slice(0, 4).map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <button
              type="button"
              className="app__featured-open"
              onClick={() => setActiveId(study.id)}
            >
              View case study <span aria-hidden="true">→</span>
            </button>
          </article>
        ))}
      </div>

      {active && createPortal(<CaseStudy study={active} onClose={close} />, document.body)}
    </>
  );
};

export default AppWrap(
  MotionWrap(Featured, "app__featured"),
  "featured",
  "app__primarybg"
);
