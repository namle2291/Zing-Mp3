import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlayed,
  setPlaying,
  setReady,
} from "../../features/settingPlay/settingPlay";
import { setCurrentIndexSong } from "../../features/setPlayNow/playNow";

function AudioPlayer() {
  const { currentSongId, currentTime, currentIndexSong, infoSongNext } =
    useSelector((state) => state.playNow);

  const { playing, volume, loop, isMute, played } = useSelector(
    (state) => state.setting
  );

  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();

  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.seekTo(currentTime);
  }, [currentTime]);

  const handleChangeProgress = useCallback(
    (e) => {
      dispatch(setPlayed(e.playedSeconds));
    },
    [played]
  );

  const onReady = useCallback(() => {
    dispatch(setReady(true));
    if (!isReady) {
      if (audioRef.current) {
        audioRef?.current?.seekTo(currentTime, "seconds");
      }
      setIsReady(true);
    }
  }, [isReady]);

  return (
    <ReactPlayer
      ref={audioRef}
      controls={false}
      url={`http://api.mp3.zing.vn/api/streaming/audio/${currentSongId}/320`}
      playing={playing}
      muted={isMute}
      loop={loop}
      volume={volume}
      onProgress={handleChangeProgress}
      onEnded={() => {
        if (infoSongNext.length > 0) {
          dispatch(setCurrentIndexSong(currentIndexSong + 1));
          dispatch(setPlaying(true));
        } else {
          dispatch(setPlaying(false));
        }
      }}
      onReady={onReady}
    />
  );
}

export default memo(AudioPlayer);
