import React, { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  LiaListAltSolid,
  LiaMicrophoneAltSolid,
  LiaYoutube,
} from "react-icons/lia";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  MdOutlineLoop,
  MdPauseCircleOutline,
  MdPlayCircleOutline,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
  MdVolumeDown,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import LoadingCircle from "../../../Loading/LoadingCircle";

import { BiHeart } from "react-icons/bi";

import formatTimes from "../../../../utils/formatTimes";
import { useLoading, Audio } from "@agney/react-loading";

import {
  setIsMute,
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
import RecentSongModal from "../../../RecentSongModal/RecentSongModal";
import ViewPlayMusicMain from "../../../ViewPlayMusic/ViewPlayMusicMain";

const cx = classNames.bind(styles);

function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [showViewPlayMusic, setShowViewPlayMusic] = useState(false);

  const { duration, infoSong } = useSelector((state) => state.playNow);

  const { playing, volume, loop, played, isReady, isMute } = useSelector(
    (state) => state.setting
  );

  const dispatch = useDispatch();

  const { indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="25" color="white" />,
  });

  const handlePlayPause = useCallback(() => {
    dispatch(setPlaying(!playing));
  }, [playing]);

  const handleShowRecentSong = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const handleShowModalViewPlay = useCallback(() => {
    setShowViewPlayMusic(!showViewPlayMusic);
  }, [showViewPlayMusic]);

  useEffect(() => {
    dispatch(setPlaying(false));
  }, []);

  return (
    <>
      <div className={cx("wrapper", "z-10")}>
        {/* Left */}
        <div className={cx("player-control-left", "w-[40%] md:w-[30%]")}>
          <div className={cx("media")}>
            <div
              className={`w-[44px] h-[44px] md:w-[64px] md:h-[64px] relative overflow-hidden shrink-0`}
            >
              <img
                src={infoSong.thumbnailM}
                className={`w-full h-full object-cover ${
                  playing ? "isPlaying" : "rounded-md"
                }`}
                alt=""
              />
              <span className="inset-center">{playing && indicatorEl}</span>
            </div>
            <div className={cx("center")}>
              <div className={cx("music")}>{infoSong.title}</div>
              <div className={cx("name")}>
                {infoSong.artists &&
                  infoSong.artists.map((item, index) => (
                    <Link
                      className="text-[var(--text-secondary)]"
                      to={`/artist/${item.alias}`}
                      key={index}
                    >
                      {index > 0 ? ", " : ""}
                      <span className="hover:underline">{item.name}</span>
                    </Link>
                  ))}
              </div>
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
          <div className={cx("top", "flex align-items-center gap-[25px]")}>
            <span className="hidden lg:flex text-[25px]">
              <MdShuffle />
            </span>
            <span className="flex align-items-center text-[25px]">
              <MdSkipPrevious />
            </span>
            <span
              className={cx(
                "flex align-items-center text-[35px] h-[50px] cursor-pointer"
              )}
            >
              {!isReady && <LoadingCircle />}
              <span onClick={handlePlayPause}>
                {!playing && isReady && <MdPlayCircleOutline />}
                {isReady && playing && <MdPauseCircleOutline />}
              </span>
            </span>
            <span className="flex align-items-center text-[25px]">
              <MdSkipNext />
            </span>
            <span
              className="hidden lg:flex text-[25px] cursor-pointer"
              style={loop ? { color: "var(--link-text-hover)" } : {}}
              onClick={() => {
                dispatch(setLoop(!loop));
              }}
            >
              <MdOutlineLoop />
            </span>
          </div>
          <div className={cx("bottom", "hidden md:flex")}>
            <p>{formatTimes(played)}</p>
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
          <div className="hidden lg:flex">
            <Link className={cx("mv")}>
              <span className="rounded-full">
                <LiaYoutube />
              </span>
            </Link>
            <div className={cx("karaoke")}>
              <span className="rounded-full" onClick={handleShowModalViewPlay}>
                <LiaMicrophoneAltSolid />
              </span>
            </div>
            <div className={cx("volume", "flex")}>
              <span
                className="rounded-full"
                onClick={() => {
                  dispatch(setIsMute());
                }}
              >
                {isMute && <MdVolumeOff />}
                {!isMute && volume > 0.5 && <MdVolumeUp />}
                {!isMute && volume < 0.5 && <MdVolumeDown />}
              </span>
              <input
                value={volume * 100}
                onChange={(e) => dispatch(setVolume(e.target.value))}
                type="range"
                min="0"
                max="100"
              />
            </div>
          </div>
          <div className={cx("playlists")}>
            <span className="rounded-md" onClick={handleShowRecentSong}>
              <LiaListAltSolid />
            </span>
          </div>
        </div>
      </div>
      <RecentSongModal active={showModal} />
      <ViewPlayMusicMain
        active={showViewPlayMusic}
        onShow={handleShowModalViewPlay}
      />
    </>
  );
}

export default memo(Footer);
