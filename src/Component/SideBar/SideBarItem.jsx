import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBarItem({ data, mobile }) {
  const location = useLocation();

  const { icon, label, to } = data;

  let Comp = null;

  if (to) {
    Comp = Link;
  } else if (!to) {
    Comp = "button";
  }

  return (
    <Comp to={to}>
      <div
        className={`flex align-items-center gap-2 border-l-4  ${
          !mobile ? "px-[21px] py-[12px]" : "py-[16px]"
        }  ${location.pathname === to ? "side-bar-active" : ""}`}
        style={{
          color: "var(--navigation-text)",
          borderLeft: "3px solid transparent",
        }}
      >
        <span className={`${mobile ? "mx-auto" : ""}`}>{icon}</span>
        {!mobile && <span>{label}</span>}
      </div>
    </Comp>
  );
}

export default SideBarItem;
