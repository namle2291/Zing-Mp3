import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBarItem({ data, mobile }) {
  const location = useLocation();

  const { icon, label, to, active } = data;

  let Comp = null;

  if (to) {
    Comp = Link;
  } else if (!to) {
    Comp = "button";
  }

  return (
    <Comp to={to}>
      <div
        className={`${
          !mobile ? "px-[26px] py-[8px]" : "py-[16px]"
        } flex align-items-center gap-2 ${
          location.pathname === to ? "side-bar-active" : ""
        }`}
        style={{ color: "var(--navigation-text)" }}
      >
        <span className={`${mobile ? "mx-auto" : ""}`}>{icon}</span>
        {!mobile && <span>{label}</span>}
      </div>
    </Comp>
  );
}

export default SideBarItem;
