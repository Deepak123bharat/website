import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import Work from "./Work";

jest.mock("../../wrapper", () => ({
  AppWrap: (Component) => Component,
  MotionWrap: (Component) => Component,
}));

jest.mock("../../constants", () => ({
  projects: [
    {
      title: "Community Project",
      description: "Open-source contributions",
      image: "project.png",
      tags: ["Open Source"],
      projectLink: "https://github.com/example/project",
      contributionLink: "https://github.com/example/project/pulls?is=merged",
    },
    {
      title: "Existing Project",
      description: "A project",
      image: "project.png",
      tags: ["Open Source"],
      codeLink: "https://github.com/example/existing",
    },
  ],
}));

test("links to merged contributions without changing existing code links", () => {
  render(<Work />);

  const [contributionCard, existingCard] = screen.getAllByRole("article");
  const contributionLinks = within(contributionCard).getAllByRole("link", {
    name: "Merged pull requests for Community Project",
  });

  expect(contributionLinks).toHaveLength(2);
  expect(contributionLinks[1]).toHaveTextContent("Merged PRs");
  contributionLinks.forEach((link) => {
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/example/project/pulls?is=merged"
    );
  });
  expect(within(contributionCard).getByRole("link", { name: "Visit" }))
    .toHaveAttribute("href", "https://github.com/example/project");
  const codeLinks = within(existingCard).getAllByRole("link", {
    name: "Source code for Existing Project",
  });
  expect(codeLinks[1]).toHaveTextContent("Code");
  codeLinks.forEach((link) => {
    expect(link).toHaveAttribute("href", "https://github.com/example/existing");
  });
});
