import React from "react";
import { Link } from "react-router-dom";
import formatTimes from "../../utils/formatTimes";
import { useSelector } from "react-redux";
import AlbumListItem from "./AlbumListItem";

export default function AlbumList({ data }) {
  const { currentSongId } = useSelector((state) => state.playNow);

  return (
    <div>
      <div className="flex">
        <div className="w-[53%] text-[var(--text-primary)] text-[13px]">
          BÀI HÁT
        </div>
        <div className="flex-1 text-[var(--text-primary)] text-[13px]">
          ALBUM
        </div>
        <div className="flex-1 text-[var(--text-primary)] text-[13px] text-end">
          THỜI GIAN
        </div>
      </div>
      <ul className="list-none p-0">
        {data &&
          data.map((item, index) => (
            <AlbumListItem
              active={item.encodeId === currentSongId ? true : false}
              isVip={item?.streamingStatus === 2 ? true : false}
              key={index}
              item={item}
            />
          ))}
      </ul>
    </div>
  );
}
