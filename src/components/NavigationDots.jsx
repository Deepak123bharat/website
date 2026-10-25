import React from "react";

import { navItems } from "../constants";

const NavigationDots = ({ active }) => (
  <div className="app__navigation">
    {navItems.map((item) => (
      <a
        href={`#${item.id}`}
        key={item.id}
        aria-label={item.label}
        className="app__navigation-dot"
        style={
          active === item.id ? { backgroundColor: "var(--secondary-color)" } : {}
        }
      />
    ))}
  </div>
);

export default NavigationDots;
