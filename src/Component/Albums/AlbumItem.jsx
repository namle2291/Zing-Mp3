import React from "react";

import { BiDotsHorizontalRounded, BiHeart } from "react-icons/bi";
import { SlControlPlay } from "react-icons/sl";
import { Link } from "react-router-dom";

function AlbumItem({ data }) {
  return (
    <Link
      to={`/album/${data.encodeId}`}
      className="max-w-[215px] group cursor-pointer"
    >
      {/* Main */}
      <div className="relative overflow-hidden rounded-md">
        {/* Overlay */}
        <div className="absolute left-0 right-0 bottom-0 top-0 bg-slate-900 opacity-50 hidden group-hover:block"></div>
        {/* Controls */}
        <div className="inset-center align-items-center gap-[20px] hidden group-hover:flex">
          <span className="w-[24px] h-[24px] text-[20px] cursor-pointer text-white flex align-items-center">
            <BiHeart />
          </span>
          <span className="flex align-items-center text-[30px] text-white">
            <SlControlPlay />
          </span>
          <span className="w-[24px] h-[24px] text-[20px] cursor-pointer text-white flex align-items-center">
            <BiDotsHorizontalRounded />
          </span>
        </div>
        <img
          className="object-cover w-[100%] h-[100%] group-hover:scale-105"
          src={data.thumbnailM}
          alt={data.title}
        />
      </div>
      <div
        className="my-2 line-clamp-1 text-[14px]"
        style={{ color: "var(--player-text)" }}
      >
        {data.title}
      </div>
      <div
        className="text-sm line-clamp-1 text-[14px]"
        style={{ color: "var(--text-secondary)" }}
      >
        {data.sortDescription}
      </div>
    </Link>
  );
}

export default AlbumItem;
