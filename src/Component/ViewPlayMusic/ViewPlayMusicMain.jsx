import React, { memo, useEffect, useState } from "react";
import { httpRequest, lsnAPI } from "../../axios/axios-custom";
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

import {
  setCurrentIndexSong,
  setCurrentTime,
} from "../../features/setPlayNow/playNow";
import formatTimes from "../../utils/formatTimes";
import Loading from "../Loading/Loading";

import cd from "../../assets/images/cd.png";
import ItemLyric from "./ItemLyric";
import axios from "axios";

function ViewPlayMusicMain({ active, onShow }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { infoSong, duration, currentSongId, currentIndexSong, playList } =
    useSelector((state) => state.playNow);
  const { playing, loop, played } = useSelector((state) => state.setting);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios.get(lsnAPI.getLyrics(currentSongId)).then(({ data }) => {
      setLoading(false);
      setData(data.data);
    });
  }, [currentSongId]);

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
          <img className="w-[40px] h-[40px] object-cover" src={cd} alt="" />
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
      <div className="flex flex-col items-start md:flex-row py-2">
        <div className="md:w-[30%] px-[30px] overflow-hidden rounded-md shrink-0 mx-auto mb-3">
          <img
            src={infoSong.thumbnailM}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="mx-auto md:mx-0 overflow-y-auto h-[250px] md:h-[400px] w-[60%]">
          {loading && <Loading />}
          {!loading &&
            data.sentences &&
            data.sentences.map((item, index) => {
              return <ItemLyric isShow={active} data={item} key={index} />;
            })}
          {!loading && !data.sentences && (
            <h4 className="text-center">Lời bài hát đang cập nhật...</h4>
          )}
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-center text-[var(--text-primary)] px-[10px] lg:w-[50%] mx-auto">
          <span className="text-[13px]">{formatTimes(played)}</span>
          <input
            value={played}
            type="range"
            max={duration}
            min={0}
            className="w-[250px] sm:w-full mx-2"
            onChange={(e) => {
              dispatch(setCurrentTime(parseFloat(e.target.value)));
            }}
          />
          <span className="text-[13px]">{formatTimes(duration)}</span>
        </div>
        <div className="flex align-items-center justify-center gap-[25px] text-[var(--text-primary)]">
          <span className="text-[25px]">
            <MdShuffle />
          </span>
          <span
            className={`flex align-items-center text-[25px] ${
              currentIndexSong === 0 ? "disabled" : "cursor-pointer"
            }`}
            onClick={() => {
              if (currentIndexSong !== 0) {
                dispatch(setCurrentIndexSong(currentIndexSong - 1));
              }
            }}
          >
            <MdSkipPrevious
              className={`${currentIndexSong === 0 ? "text-gray-500" : ""}`}
            />
          </span>
          <span className="flex align-items-center text-[35px] h-[50px] cursor-pointer">
            <span onClick={() => dispatch(setPlaying(!playing))}>
              {!playing ? <MdPlayCircleOutline /> : <MdPauseCircleOutline />}
            </span>
          </span>
          <span
            className={`flex align-items-center text-[25px] cursor-pointer`}
            onClick={() => {
              if (currentIndexSong !== playList.length - 1)
                dispatch(setCurrentIndexSong(currentIndexSong + 1));
              dispatch(setPlaying(true));
            }}
          >
            <MdSkipNext />
          </span>
          <span
            className="text-[25px] cursor-pointer"
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
