import React, { memo, useEffect, useState } from "react";
import { httpRequest } from "../../axios/axios-custom";
import { useDispatch, useSelector } from "react-redux";
import { setLoop, setPlaying } from "../../features/settingPlay/settingPlay";
import {
  MdOutlineLoop,
  MdPauseCircleOutline,
  MdPlayCircleOutline,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

import { setCurrentTime } from "../../features/setPlayNow/playNow";
import formatTimes from "../../utils/formatTimes";
import Loading from "../Loading/Loading";

import logo from "../../assets/images/logo.png";

function ViewPlayMusicMain({ active, onShow }) {
  const [data, setData] = useState({});
  const { currentSongId, infoSong, duration } = useSelector(
    (state) => state.playNow
  );
  const { playing, loop, played } = useSelector((state) => state.setting);

  const dispatch = useDispatch();

  useEffect(() => {
    httpRequest.get(`/lyric?id=${currentSongId}`).then(({ data }) => {
      setData(data.data);
    });
  }, [currentSongId]);

  // console.log(data)

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 z-50 flex flex-col justify-between bg-[var(--layout-bg)]"
      style={{
        transform: `translateY(${active ? "0" : "100"}vh)`,
        // background: `url(${data.defaultIBGUrls[0]}) no-repeat fixed center center`,
      }}
    >
      <div className="flex justify-between items-center px-3 py-2 bg-[var(--alpha-bg)]">
        <div className="flex items-center justify-center gap-2">
          <img className="w-[40px] h-[40px] object-cover" src={logo} alt="" />
          <h5 className="m-0" style={{ color: "var(--player-text)" }}>
            Nam MP3
          </h5>
        </div>
        <div>
          <span
            onClick={onShow}
            className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[--player-text] cursor-pointer bg-[var(--alpha-bg)]"
          >
            <FiChevronDown />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-5 flex justify-center">
          <div className="w-[300px] h-[300px] overflow-hidden rounded-md shrink-0">
            <img
              src={infoSong.thumbnailM}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="col-span-7 overflow-y-auto max-h-[500px]">
          {Object.keys(data).length > 0 ? (
            <ul className="list-none">
              {data.sentences &&
                data.sentences.map((item, index) => {
                  return (
                    <li
                      className="py-[10px] text-[38px] text-white"
                      key={index}
                    >
                      {item.words.map((w, index) => (
                        <span key={index} className="">
                          {w.data + " "}
                        </span>
                      ))}
                    </li>
                  );
                })}
            </ul>
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <div className="w-[430px] mx-auto">
        <div className="flex items-center text-[var(--text-primary)]">
          <span>{formatTimes(played)}</span>
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
          <span>{formatTimes(duration)}</span>
        </div>
        <div className="flex align-items-center justify-center gap-[25px] text-[var(--text-primary)]">
          <span className="hidden lg:flex text-[25px]">
            <MdShuffle />
          </span>
          <span className="flex align-items-center text-[25px]">
            <MdSkipPrevious />
          </span>
          <span className="flex align-items-center text-[35px] h-[50px] cursor-pointer">
            <span onClick={() => dispatch(setPlaying(!playing))}>
              {!playing ? <MdPlayCircleOutline /> : <MdPauseCircleOutline />}
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
      </div>
    </div>
  );
}

export default memo(ViewPlayMusicMain);
