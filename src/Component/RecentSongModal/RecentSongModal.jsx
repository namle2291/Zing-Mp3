import React, { useState } from "react";
import { SlClock, SlOptions } from "react-icons/sl";
import { useSelector } from "react-redux";
import PlayListItem from "../PlayLists/PlayListItem";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const tabs = [
  {
    id: 0,
    label: "Danh sách phát",
    type: "playlist",
  },
  {
    id: 1,
    label: "Nghe gần đây",
    type: "recent",
  },
];

export default function RecentSongModal({ active }) {
  const { recentSong } = useSelector((state) => state.recentSong);
  const { playList, currentIndexSong, infoAlbumCurrent, infoSong } =
    useSelector((state) => state.playNow);

  const [tab, setTab] = useState(tabs[0]);

  return (
    <div
      className={`w-[330px] z-10 h-[calc(100vh-126px)] sm:h-[calc(100vh-90px)]  fixed top-0 right-0 bottom-[90px] bg-[var(--layout-bg)] flex flex-col`}
      style={{
        borderLeft: "1px solid var(--border-primary)",
        transform: `translateX(${!active ? "330" : "0"}px)`,
      }}
    >
      <div className="px-[10px] pt-[18px] pb-[17px] flex items-center gap-1">
        <div className="flex rounded-3xl bg-[var(--alpha-bg)] max-w-[226px] p-[2px]">
          {tabs.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setTab(item)}
                className={`px-[12px] py-[4px] text-[13px] text-[var(--text-primary)] rounded-3xl ${
                  tab.id === item.id ? "bg-[var(--tab-active-bg)]" : ""
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <span
          className="text-[var(--text-primary)] w-[36px] h-[36px] rounded-full flex items-center justify-center bg-[var(--alpha-bg)] cursor-pointer"
          onClick={() => toast("Chức năng đang phát triển")}
        >
          <SlClock />
        </span>
        <span className="text-[var(--text-primary)] w-[36px] h-[36px] rounded-full flex items-center justify-center bg-[var(--alpha-bg)] cursor-pointer">
          <SlOptions />
        </span>
      </div>
      <div className="overflow-y-scroll flex-1">
        {tab.type === "playlist" && (
          <>
            {Object.keys(infoAlbumCurrent).length > 0 ? (
              <>
                {playList.slice(0, currentIndexSong + 1).map((item, index) => (
                  <PlayListItem isAlbum={true} key={index} data={item} />
                ))}
                <div className="p-2">
                  <span className="text-[var(--text-primary)]">Tiếp theo</span>
                  <p className="text-[var(--text-secondary)] text-[14px] m-0">
                    Từ playlist{" "}
                    <Link to={`/album/${infoAlbumCurrent.encodeId}`}>
                      {infoAlbumCurrent.title}
                    </Link>
                  </p>
                </div>
                {playList.slice(currentIndexSong + 1).map((item, index) => (
                  <PlayListItem isAlbum={true} key={index} data={item} />
                ))}
              </>
            ) : (
              <>
                <PlayListItem isAlbum={true} data={infoSong} />
              </>
            )}
          </>
        )}
        {tab.type === "recent" &&
          recentSong.map((item, index) => {
            return (
              <PlayListItem key={index} data={item} />
            );
          })}
      </div>
    </div>
  );
}
