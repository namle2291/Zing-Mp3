import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentTime,
  setPlayed,
  setPlaying,
} from "../../features/settingPlay/settingPlay";
import { useLayoutEffect } from "react";

function AudioPlayer() {
  const [source, setSouce] = useState("");

  const { currentSongId } = useSelector((state) => state.playNow);

  const { playing, volume, loop, currentTime } = useSelector(
    (state) => state.setting
  );

  const dispatch = useDispatch();

  const audioRef = useRef();

  useEffect(() => {
    setSouce(
      currentSongId
        ? `http://api.mp3.zing.vn/api/streaming/audio/${currentSongId}/320`
        : ""
    );
  }, [currentSongId]);

  useEffect(() => {
    audioRef.current.seekTo(currentTime);
  }, [currentTime]);

  return (
    <ReactPlayer
      ref={audioRef}
      controls={false}
      url={source}
      playing={playing}
      loop={loop}
      volume={volume}
      onProgress={(e) => {
        dispatch(setPlayed(e.playedSeconds));
      }}
      onEnded={() => {
        dispatch(setPlaying(false));
      }}
    />
  );
}

export default AudioPlayer;
