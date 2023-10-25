import React from "react";

export default function TopChartItem({ data, index }) {
  return (
    <div className="flex justify-between items-center rounded-md py-2 mb-2 px-2 bg-[var(--alpha-bg)]">
      <div className="flex gap-2 items-center">
        <span
          className={`
          ${index === 1 ? "text-stroke1" : ""}
          ${index === 2 ? "text-stroke2" : ""}
          ${index === 3 ? "text-stroke3" : ""} text-[25px]`}
        >
          {index}
        </span>
        <div className="w-[60px] h-[60px] shrink-0 overflow-hidden rounded-md">
          <img
            src={data.thumbnailM}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div>
          <div className="text-[14px] text-[var(--text-primary)]">
            {data.title}
          </div>
          <div className="text-[13px] text-[var(--text-secondary)]">
            {data.artistsNames}
          </div>
        </div>
      </div>
      <span className="text-[var(--text-primary)]">20%</span>
    </div>
  );
}
