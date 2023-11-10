import { createSlice } from "@reduxjs/toolkit";

let initialState = JSON.parse(localStorage.getItem("setting")) || {
  playing: false,
  volume: 1,
  random: false,
  loop: false,
  autoplay: false,
  isReady: false,
  isMute: false,
  played: 0,
};

export const setting = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setPlaying: (state, action) => {
      state.playing = action.payload;
      localStorage.setItem("setting", JSON.stringify(state));
    },
    setVolume: (state, action) => {
      state.volume = action.payload / 100;
      state.isMute = state.volume === 0 ? true : false;
      localStorage.setItem("setting", JSON.stringify(state));
    },
    setRandom: (state, action) => {
      state.random = action.payload;
      localStorage.setItem("setting", JSON.stringify(state));
    },
    setLoop: (state, action) => {
      state.loop = action.payload;
      localStorage.setItem("setting", JSON.stringify(state));
    },
    setIsMute: (state) => {
      state.isMute = !state.isMute;
      localStorage.setItem("setting", JSON.stringify(state));
    },
    setPlayed: (state, action) => {
      state.played = action.payload;
      localStorage.setItem("setting", JSON.stringify(state));
    },
    setReady: (state, action) => {
      state.isReady = action.payload;
      localStorage.setItem("setting", JSON.stringify(state));
    },
  },
});

export const {
  setPlaying,
  setVolume,
  setRandom,
  setLoop,
  setReady,
  setIsMute,
  setPlayed,
} = setting.actions;

export default setting.reducer;
