import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  LiaListAltSolid,
  LiaMicrophoneAltSolid,
  LiaRandomSolid,
  LiaReplySolid,
  LiaStepBackwardSolid,
  LiaStepForwardSolid,
  LiaVolumeUpSolid,
  LiaYoutube,
} from "react-icons/lia";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { SlControlPlay, SlControlPause } from "react-icons/sl";
import LoadingCircle from "../../../Loading/LoadingCircle";

import { BiHeart } from "react-icons/bi";

import formatTimes from "../../../../utils/formatTimes";
import { useLoading, Audio } from "@agney/react-loading";

import {
  setLoop,
  setPlaying,
  setVolume,
} from "../../../../features/settingPlay/settingPlay";

import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import AudioPlayer from "../../../PLayer/AudioPlayer";

import {
  setFavouriteSong,
  setCurrentTime,
} from "../../../../features/setPlayNow/playNow";

const cx = classNames.bind(styles);

function Footer() {
  const dispatch = useDispatch();

  const { duration, infoSong } = useSelector((state) => state.playNow);
  const { playing, volume, loop, played, isReady } = useSelector(
    (state) => state.setting
  );

  const { indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="30" color="white" />,
  });

  const handlePlayPause = () => {
    dispatch(setPlaying(!playing));
  };

  useEffect(() => {
    dispatch(setPlaying(false));
  }, []);

  return (
    <div className={cx("wrapper")}>
      {/* Left */}
      <div className={cx("player-control-left", "w-[40%] md:w-[30%]")}>
        <div className={cx("media")}>
          <div
            className={cx(
              "left",
              "w-[44px] h-[44px] md:w-[64px] md:h-[64px] relative"
            )}
          >
            <img src={infoSong.thumbnailM} alt="" />
            <span className="inset-center">{playing && indicatorEl}</span>
          </div>
          <div className={cx("center")}>
            <div className={cx("music")}>{infoSong.title}</div>
            <div className={cx("name")}>{infoSong.artistsNames}</div>
          </div>
          <div className={cx("right")}>
            <span
              className="hidden lg:block text-[var(--text-primary)] cursor-pointer"
              onClick={() => {
                dispatch(setFavouriteSong(infoSong));
              }}
            >
              <BiHeart />
            </span>
            <span className="hidden lg:block text-[var(--text-primary)] cursor-pointer">
              <BiDotsHorizontalRounded />
            </span>
          </div>
        </div>
      </div>
      {/* Center */}
      <div className={cx("player-control-center", "")}>
        <div className={cx("top", "flex align-items-center gap-[10px]")}>
          <span className="hidden lg:flex p-[10px] text-[25px]">
            <LiaRandomSolid />
          </span>
          <span className="flex align-items-center p-[10px] text-[25px]">
            <LiaStepBackwardSolid />
          </span>
          <span
            className={cx(
              "play-pause",
              "flex align-items-center px-[5px] text-[30px]"
            )}
          >
            {!isReady && <LoadingCircle />}
            <span onClick={handlePlayPause} className="cursor-pointer">
              {!playing && <SlControlPlay />}
              {playing && isReady && <SlControlPause />}
            </span>
          </span>
          <span className="flex align-items-center p-[10px] text-[25px]">
            <LiaStepForwardSolid />
          </span>
          <span
            className="hidden lg:flex p-[10px] text-[25px] cursor-pointer"
            style={loop ? { color: "var(--link-text-hover)" } : {}}
            onClick={() => {
              dispatch(setLoop(!loop));
            }}
          >
            <LiaReplySolid />
          </span>
        </div>
        <div className={cx("bottom", "hidden md:flex")}>
          <p>{formatTimes(played)}</p>
          {/* <div className={cx("times")}>
              <div className={cx("progress-bar")}></div>
            </div> */}
          <input
            value={played}
            type="range"
            max={duration}
            min={0}
            className="w-full mx-2"
            onChange={(e) => {
              dispatch(setCurrentTime(parseFloat(e.target.value)));
            }}
          />
          <p>{formatTimes(duration)}</p>
          <div className="hidden">
            <AudioPlayer />
          </div>
        </div>
      </div>
      {/* Right */}
      <div className={cx("player-control-right", "w-[15%] md:w-[30%]")}>
        <Link className={cx("mv", "hidden md:block")}>
          <span className="rounded-full">
            <LiaYoutube />
          </span>
        </Link>
        <div className={cx("karaoke", "hidden md:block")}>
          <span className="rounded-full">
            <LiaMicrophoneAltSolid />
          </span>
        </div>
        <div className={cx("volume", "hidden md:flex")}>
          <span className="hidden md:block rounded-full">
            <LiaVolumeUpSolid />
          </span>
          <input
            value={volume * 100}
            onChange={(e) => dispatch(setVolume(e.target.value))}
            className="hidden xl:block"
            type="range"
            min="0"
            max="100"
          />
        </div>
        <div className={cx("playlists")}>
          <span className="rounded-md">
            <LiaListAltSolid />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
