import React from "react";
import { motion } from "framer-motion";
import {
  FaCertificate,
  FaCodeBranch,
  FaGraduationCap,
  FaQuoteLeft,
  FaTrophy,
} from "react-icons/fa";

import { AppWrap, MotionWrap } from "../../wrapper";
import {
  awards,
  certificates,
  education,
  experiences,
  openSource,
  recommendation,
} from "../../constants";
import "./Experience.scss";

const ExtLink = ({ href, className, children }) => (
  <a className={className} href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

const Experience = () => (
  <>
    <h2 className="head-text">
      Work <span>Experience</span>
    </h2>

    <div className="app__exp-timeline">
      {experiences.map((exp) => (
        <motion.div
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          className="app__exp-item"
          key={`${exp.company}-${exp.period}`}
        >
          <div className="app__exp-period">
            <p className="bold-text">{exp.period}</p>
          </div>
          <div className="app__exp-card">
            <h3 className="bold-text">{exp.role}</h3>
            <p className="p-text app__exp-company">
              {exp.companyLink ? (
                <ExtLink href={exp.companyLink}>{exp.company}</ExtLink>
              ) : (
                exp.company
              )}
            </p>
            <p className="p-text app__exp-meta">{exp.location}</p>
            {exp.product && (
              <p className="p-text app__exp-product">
                {exp.productLink ? (
                  <ExtLink href={exp.productLink}>{exp.product}</ExtLink>
                ) : (
                  exp.product
                )}
              </p>
            )}
            <ul>
              {exp.points.map((point) => (
                <li className="p-text" key={point}>
                  {point}
                </li>
              ))}
            </ul>
            {exp.links?.map((link) => (
              <ExtLink className="app__exp-link" href={link.href} key={link.href}>
                {link.label}
              </ExtLink>
            ))}
            <div className="app__exp-tech">
              {exp.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <h2 className="head-text app__exp-subhead">
      Open Source & <span>Education</span>
    </h2>

    <div className="app__exp-extra">
      {openSource.map((item) => (
        <div className="app__exp-card" key={item.org}>
          <p className="app__exp-label">
            <FaCodeBranch /> Open Source
          </p>
          <h3 className="bold-text">
            {item.title}, {item.org}
          </h3>
          <p className="p-text app__exp-meta">{item.period}</p>
          <p className="p-text app__exp-body">{item.description}</p>
          <a
            className="app__exp-link"
            href={item.link}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>
      ))}

      {education.map((item) => (
        <div className="app__exp-card" key={item.school}>
          <p className="app__exp-label">
            <FaGraduationCap /> Education
          </p>
          <h3 className="bold-text">{item.degree}</h3>
          <p className="p-text app__exp-company">{item.school}</p>
          <p className="p-text app__exp-meta">
            {item.period} · {item.detail}
          </p>
        </div>
      ))}

      <div className="app__exp-card">
        <p className="app__exp-label">
          <FaTrophy /> Awards & Achievements
        </p>
        <ul>
          {awards.map((award) => (
            <li className="p-text" key={award}>
              {award}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <h2 className="head-text app__exp-subhead" id="credentials">
      Recommendation & <span>Certificates</span>
    </h2>

    <div className="app__exp-extra">
      <div className="app__exp-card app__exp-letter">
        <p className="app__exp-label">
          <FaQuoteLeft /> Reference letter
        </p>
        <blockquote className="p-text app__exp-quote">
          {recommendation.quote}
        </blockquote>
        <p className="p-text app__exp-company">
          {recommendation.author}, {recommendation.role}
        </p>
        <ExtLink className="app__exp-link" href={recommendation.href}>
          Read the full letter
        </ExtLink>
      </div>

      {certificates.map((cert) => (
        <div className="app__exp-card" key={cert.title}>
          <p className="app__exp-label">
            <FaCertificate /> Certificate
          </p>
          <h3 className="bold-text">{cert.title}</h3>
          <p className="p-text app__exp-company">{cert.issuer}</p>
          <p className="p-text app__exp-body">{cert.detail}</p>
          <ExtLink className="app__exp-link" href={cert.href}>
            View certificate
          </ExtLink>
        </div>
      ))}
    </div>
  </>
);

export default AppWrap(
  MotionWrap(Experience, "app__experience"),
  "experience",
  "app__primarybg"
);
