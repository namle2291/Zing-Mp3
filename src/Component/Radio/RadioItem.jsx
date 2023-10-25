import React, { memo } from "react";
import { SlUserFollow } from "react-icons/sl";

import { Link } from "react-router-dom";

function RadioItem({ data }) {
  return (
    <div>
      <div className="overflow-hidden rounded-full">
        <Link to={`/artist${data.link}`}>
          <img
            className="w-[100%] h-[100%] object-cover"
            src={data.thumbnailM}
            alt={data.title}
          />
        </Link>
      </div>
      <div className="text-center mt-[12px]">
        <Link
          to={`/liveradio${data.encodeId}`}
          className="line-clamp-1"
          style={{ color: "var(--player-text)" }}
        >
          {data.title}
        </Link>
        <div className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
          {data.activeUsers} đang nghe
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default memo(RadioItem);
