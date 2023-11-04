import React from "react";

import { Link } from "react-router-dom";
import { SlControlPlay } from "react-icons/sl";
import formatTimes from "../../utils/formatTimes";

function MVItem({ data }) {
  return (
    <div>
      <Link
        to={`/video/${data.encodeId}`}
        className="relative block max-h-[210px] overflow-hidden rounded-md group "
      >
        {/* Overlay */}
        <div className="absolute left-0 right-0 bottom-0 top-0 bg-slate-900 opacity-50 hidden group-hover:block"></div>
        {/* Controls */}
        <div className="inset-center align-items-center gap-[20px] hidden group-hover:flex">
          <span className="flex align-items-center text-[30px] text-white">
            <SlControlPlay />
          </span>
        </div>
        <img
          className="w-[100%] h-[100%] object-cover shrink-0"
          src={data.thumbnailM}
          alt=""
        />
        <div className="absolute right-3 bottom-3 bg-slate-700 px-2 text-[13px] rounded-2 text-white">
          {formatTimes(data.duration)}
        </div>
      </Link>
      <div className="flex align-items-center py-[10px]">
        <div className="w-[40px] h-[40px] overflow-hidden rounded-full shrink-0">
          <img
            className="w-[100%] h-[100%] object-cover"
            src={data.artists[0].thumbnail}
            alt={data.title}
          />
        </div>
        <div className="ml-[10px]">
          <Link
            className="mt-[6px] mb-[4px] text-[14px] line-clamp-1"
            style={{ color: "var(--player-text)" }}
          >
            {data.title}
          </Link>
          <Link
            className="text-[12px] line-clamp-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {data.artistsNames}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MVItem;
