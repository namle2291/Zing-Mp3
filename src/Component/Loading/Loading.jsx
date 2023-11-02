import React from "react";
import { useLoading, BallTriangle } from "@agney/react-loading";

function Loading() {
  const { indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle width="40" />,
  });
  return (
    <div className="text-center" style={{ color: "var(--player-text)" }}>
      {indicatorEl}
    </div>
  );
}

export default Loading;
