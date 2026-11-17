import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Experience from "./Experience";

jest.mock("../../wrapper", () => ({
  AppWrap: (Component) => Component,
  MotionWrap: (Component) => Component,
}));

test("renders experience text and highlighted results from mixed point formats", () => {
  const { container } = render(<Experience />);

  expect(
    screen.getByText(/Built explainable return-fraud scoring end to end/)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Worked on GoKwik's RTO \(return-to-origin\) API/)
  ).toBeInTheDocument();
  const results = container.querySelectorAll(".app__exp-result");
  expect(results).toHaveLength(3);
  expect(results[0]).toHaveTextContent(
    "7 in every 100 returning customers scored above 80 out of 100"
  );
  expect(results[1]).toHaveTextContent(
    "Helped onboard 4 new retailers that don't use Shopify."
  );
});
