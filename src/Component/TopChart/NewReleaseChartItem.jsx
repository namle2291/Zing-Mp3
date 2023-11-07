import moment from "moment";
import React from "react";

export default function NewReleaseChartItem({ data, index }) {
  return (
    <div className="flex gap-2 cursor-pointer">
      <div className="max-w-[120px] h-[120px] shrink-0 overflow-hidden rounded-md">
        <img
          src={data.thumbnailM}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-column justify-between">
        <div>
          <div className="text-[14px] text-[var(--text-primary)] line-clamp-1">
            {data.title}
          </div>
          <div className="text-[13px] text-[var(--text-secondary)] line-clamp-1">
            {data.artistsNames}
          </div>
        </div>
        <span className="text-[14px] text-[var(--text-secondary)]">
          <span
            className="font-roboto text-[30px]"
            style={{
              WebkitTextStroke: "1px #fff",
            }}
          >
            {"#"}
            {index}
          </span>
          {/* <span>{data.releaseDate}</span> */}
        </span>
      </div>
    </div>
  );
}
