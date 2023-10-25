import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MusicIcon, PlayIcon } from "../Icon/Icon";
import { BiDotsHorizontalRounded, BiHeart } from "react-icons/bi";
import { useLoading, Audio } from "@agney/react-loading";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchSong,
  playSong,
  setFavouriteSong,
  setCurrentTime,
} from "../../features/setPlayNow/playNow";

import { toast } from "react-toastify";
import { setPlaying, setReady } from "../../features/settingPlay/settingPlay";

function PlayListItem({ data, hasIcon }) {
  const { currentSongId } = useSelector((state) => state.playNow);
  const { playing, isReady } = useSelector((state) => state.setting);

  const { indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="30" color="white" />,
  });

  const dispatch = useDispatch();

  let active = data.encodeId === currentSongId;
  let isVip = data.streamingStatus === 2 ? true : false;

  const fetchSong = (item) => {
    if (item.encodeId !== currentSongId) {
      if (item.streamingStatus === 1) {
        dispatch(setReady(false));
        dispatch(setPlaying(false));
        dispatch(playSong(item));
        dispatch(setPlaying(true));
      } else {
        toast("Dành cho tài khoản Vip");
      }
    } else if (item.encodeId === currentSongId) {
      dispatch(setPlaying(!playing));
    }
  };

  return (
    <div
      className={`flex p-2 group hover:play-list-hover justify-between rounded-md ${
        active ? "playlist-active" : ""
      }`}
    >
      <div className="flex align-items-center">
        {hasIcon && (
          <span className="text-[var(--text-primary)] pr-2">
            <MusicIcon />
          </span>
        )}
        <div className="flex">
          <div
            className="w-[60px] h-[60px] rounded-md overflow-hidden mr-[10px] relative shrink-0 cursor-pointer"
            onClick={() => fetchSong(data)}
          >
            <div
              className={`absolute left-0 right-0 bottom-0 top-0 bg-slate-900 opacity-50 group-hover:block ${
                active ? "block" : "hidden"
              }`}
            ></div>
            <img
              className="w-[100%] h-[100%] object-cover"
              src={data.thumbnailM}
              alt={data.title}
            />
            <span className="inset-center hidden group-hover:block">
              {!active && <PlayIcon />}
            </span>
            <span className="inset-center">
              {!isReady && active && (
                <img
                  className="w-[20px]"
                  src="https://i.gifer.com/ZZ5H.gif"
                  alt=""
                />
              )}
              {active && !playing && <PlayIcon />}
              {playing && active && isReady && indicatorEl}
            </span>
          </div>
          <div>
            <h6
              className="text-sm mb-0 line-clamp-1 text-[14px]"
              style={{ color: "var(--player-text)" }}
            >
              {data.title}
              {isVip && (
                <span className="ml-2 bg-yellow-400 text-white text-[12px] px-2 py-[2px] rounded-[3px] font-semibold">
                  Vip
                </span>
              )}
            </h6>
            <Link
              className="text-xs line-clamp-1 text-[14px]"
              style={{ color: "var(--text-secondary)" }}
            >
              {data.artistsNames}
            </Link>
          </div>
        </div>
      </div>
      <div className="align-items-center gap-2 hidden group-hover:flex">
        <span
          className="w-[24px] h-[24px] cursor-pointer text-white"
          onClick={() => {
            dispatch(setFavouriteSong(data));
          }}
        >
          <BiHeart />
        </span>
        <span className="w-[24px] h-[24px] cursor-pointer text-white">
          <BiDotsHorizontalRounded />
        </span>
      </div>
    </div>
  );
}

export default PlayListItem;
