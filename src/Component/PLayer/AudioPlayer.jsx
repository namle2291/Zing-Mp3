import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlayed,
  setPlaying,
  setReady,
} from "../../features/settingPlay/settingPlay";

function AudioPlayer() {
  const { currentSongId, currentTime } = useSelector((state) => state.playNow);

  const { playing, volume, loop } = useSelector((state) => state.setting);

  const dispatch = useDispatch();

  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.seekTo(currentTime);
  }, [currentTime]);

  return (
    <ReactPlayer
      ref={audioRef}
      controls={false}
      url={`http://api.mp3.zing.vn/api/streaming/audio/${currentSongId}/320`}
      playing={playing}
      loop={loop}
      volume={volume}
      onProgress={(e) => {
        dispatch(setPlayed(e.playedSeconds));
      }}
      onEnded={() => {
        dispatch(setPlaying(false));
      }}
      onReady={() => {
        dispatch(setReady(true));
      }}
    />
  );
}

export default AudioPlayer;
