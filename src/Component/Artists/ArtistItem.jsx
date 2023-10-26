import React, { memo } from "react";
import { SlUserFollow } from "react-icons/sl";

import { Link } from "react-router-dom";

function ArtistItem({ data }) {
  return (
    <div>
      <div className="overflow-hidden rounded-full">
        <Link to={`/artist/${data.alias}`}>
          <img
            className="w-[100%] h-[100%] object-cover"
            src={data.thumbnailM}
            alt={data.title}
          />
        </Link>
      </div>
      <div className="text-center mt-[12px]">
        <Link
          to={`/artist/${data.alias}`}
          className=""
          style={{ color: "var(--player-text)" }}
        >
          {data.name}
        </Link>
        <div className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
          {data.totalFollow > 1000
            ? data.totalFollow.toString().slice(0, 1) + "M"
            : data.totalFollow}{" "}
          quan tâm
        </div>
        <button
          className="py-[4px] px-[14px] text-[12px] border rounded-xl mt-[10px] flex align-items-center mx-auto group hover:play-btn-hover"
          style={{ color: "var(--player-text)" }}
        >
          <span className="group-hover:play-btn-hover">
            <SlUserFollow />
          </span>
          <span className="ml-[5px] group-hover:play-btn-hover">Quan tâm</span>
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default memo(ArtistItem);
