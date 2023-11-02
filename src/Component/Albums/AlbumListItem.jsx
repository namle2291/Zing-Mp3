import React, { memo } from "react";
import { Link } from "react-router-dom";
import formatTimes from "../../utils/formatTimes";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  playSong,
  setCurrentIndexSong,
} from "../../features/setPlayNow/playNow";
import { setPlaying, setReady } from "../../features/settingPlay/settingPlay";
import { PlayIcon } from "../Icon/Icon";
import LoadingCircle from "../Loading/LoadingCircle";
import { Audio, useLoading } from "@agney/react-loading";

function AlbumListItem({ item, active, isVip, isAlbum }) {
  const { currentSongId, playList } = useSelector((state) => state.playNow);
  const { playing, isReady } = useSelector((state) => state.setting);

  const { indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="20" color="white" />,
  });

  const dispatch = useDispatch();

  const fetchSong = (item) => {
    if (isVip) {
      toast("Dành cho tài khoản Vip");
      return;
    }

    let e = playList.find((e) => e.encodeId === item.encodeId);
    let index = playList.indexOf(e);

    dispatch(setCurrentIndexSong(index));

    if (playing) {
      dispatch(setReady(false));
      dispatch(setPlaying(false));
      dispatch(setReady(true));
    }

    dispatch(playSong(item));
    dispatch(setPlaying(true));

    if (item.encodeId === currentSongId) {
      dispatch(setPlaying(!playing));
    }
  };

  return (
    <li
      className={`px-2 py-3 hover:bg-[var(--alpha-bg)] rounded-md group ${
        active ? "bg-[var(--alpha-bg)]" : ""
      }`}
    >
      <div className="flex items-center">
        <div className="w-[53%] flex gap-2">
          <div
            className="w-[40px] h-[40px] shrink-0 overflow-hidden rounded-sm cursor-pointer relative"
            onClick={() => fetchSong(item)}
          >
            <div
              className={`absolute left-0 right-0 bottom-0 top-0 bg-slate-900 opacity-50 group-hover:block ${
                active ? "block" : "hidden"
              }`}
            ></div>
            <img
              src={item.thumbnailM}
              className="w-full h-full object-cover"
              alt={item.title}
            />
            <span className="inset-center hidden group-hover:block">
              {!active && <PlayIcon />}
            </span>
            <span className="inset-center">
              {!isReady && active && <LoadingCircle />}
              {!playing && active && isReady && <PlayIcon />}
              {playing && active && isReady && indicatorEl}
            </span>
          </div>
          <div className="">
            <div className="line-clamp-1 text-[13px] text-[var(--text-primary)]">
              {item.title}
              {isVip && (
                <span className="ml-2 bg-yellow-400 text-white text-[12px] px-2 py-[2px] rounded-[3px] font-semibold">
                  Vip
                </span>
              )}
            </div>
            <div className="line-clamp-1 text-[12px]">
              {item.artists &&
                item.artists.map((item, index) => {
                  return (
                    <Link
                      className="text-[var(--text-secondary)]"
                      key={index}
                      to={`/artist/${item.alias}`}
                    >
                      {index > 0 ? ", " : " "}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="flex-1 text-[12px] line-clamp-1 hidden md:block">
          <Link
            className="text-[var(--text-primary)]"
            to={`/album/${item.album && item.album.encodeId}`}
          >
            {(item.album && item.album.title) || item.title}
          </Link>
        </div>
        <div className="flex-1 text-[var(--text-primary)] text-[12px] text-end">
          {formatTimes(item.duration)}
        </div>
      </div>
    </li>
  );
}

export default memo(AlbumListItem);
