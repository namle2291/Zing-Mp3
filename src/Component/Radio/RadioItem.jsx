import React, { memo } from "react";
import { SlUserFollow } from "react-icons/sl";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function RadioItem({ data }) {
  return (
    <div>
      <div className="overflow-hidden border-yellow-300 border-4 relative pb-2">
        <div
          onClick={() => {
            toast("Chức năng này đang phát triển!");
          }}
          className="cursor-pointer"
        >
          <img
            className="w-[100%] h-[100%] object-cover rounded-full"
            src={data.thumbnailM}
            alt={data.title}
            style={{ border: "4px solid red" }}
          />
        </div>
        <div className="absolute bottom-[10px] flex justify-end z-10 w-full">
          <img
            src={data.thumbnailM}
            className="w-[50px] h-[50px] rounded-full object-cover border"
            alt=""
          />
        </div>
        <div className="absolute bottom-[0] flex justify-center z-10 w-full">
          <span className="text-[10px] text-white px-2 bg-red-600 rounded-sm">
            Live
          </span>
        </div>
      </div>
      <div className="text-center mt-[12px]">
        <div
          onClick={() => {
            toast("Chức năng này đang phát triển!");
          }}
          className="line-clamp-1 cursor-pointer"
          style={{ color: "var(--player-text)" }}
        >
          {data.title}
        </div>
        <div className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
          {data.activeUsers} đang nghe
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default memo(RadioItem);
