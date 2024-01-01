import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlayed,
  setPlaying,
  setReady,
} from "../../features/settingPlay/settingPlay";
import { setCurrentIndexSong } from "../../features/setPlayNow/playNow";
import { pushSong } from "../../features/setRecentSong/setRecentSong";

function AudioPlayer() {
  const {
    currentSongId,
    infoSong,
    currentTime,
    currentIndexSong,
    infoSongNext,
    playList,
  } = useSelector((state) => state.playNow);

  const { playing, volume, loop, random, isMute, played } = useSelector(
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
      url={infoSong.source}
      playing={playing}
      muted={isMute}
      loop={loop}
      volume={volume}
      onProgress={handleChangeProgress}
      onEnded={() => {
        dispatch(setReady(false));
        if (Object.keys(infoSongNext).length > 0) {
          if (random) {
            let index = Math.round(Math.random() * playList.length - 1);
            dispatch(setCurrentIndexSong(index));
            dispatch(pushSong(playList[index]));
          } else {
            dispatch(setCurrentIndexSong(currentIndexSong + 1));
            dispatch(pushSong(infoSongNext));
          }
          dispatch(setPlaying(true));
        } else {
          dispatch(setPlaying(false));
          dispatch(setReady(true));
        }
      }}
      onReady={onReady}
    />
  );
}

export default memo(AudioPlayer);
