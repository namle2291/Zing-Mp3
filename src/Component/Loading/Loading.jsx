import React from "react";
import { useLoading, Bars } from "@agney/react-loading";

function Loading() {
  const { indicatorEl } = useLoading({
    loading: true,
    indicator: <Bars width="40" />,
  });
  return (
    <div className="text-center" style={{ color: "var(--player-text)" }}>
      {indicatorEl}
    </div>
  );
}

export default Loading;
