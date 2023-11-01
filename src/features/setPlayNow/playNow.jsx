import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { lsnAPI } from "../../axios/axios-custom";
import axios from "axios";

export const fetchAlbum = createAsyncThunk(
  "setAlbum/fetchAlbum",
  async (encodeId) => {
    const rs = await axios.get(lsnAPI.getAlbumPage(encodeId));
    return rs.data;
  }
);

const initialState = JSON.parse(localStorage.getItem("play_now")) || {
  currentSongId: null,
  loading: false,
  currentTime: 0,
  duration: 0,
  infoSong: {},
  favouriteSongs: [],
  // Album
  playList: [],
  currentIndexSong: 0,
  infoAlbumCurrent: [],
  infoSongNext: {},
  isAlbum: false,
};

const playNow = createSlice({
  name: "playNow",
  initialState,
  reducers: {
    playSong: (state, { payload }) => {
      state.infoSong = payload;
      state.currentSongId = payload.encodeId;
      state.currentTime = 0;
      state.duration = payload.duration;
      localStorage.setItem("play_now", JSON.stringify(state));
    },
    playSongNotAlbum: (state, { payload }) => {
      state.infoSong = payload;
      state.currentSongId = payload.encodeId;
      state.currentTime = 0;
      state.duration = payload.duration;
      state.playList = [payload];
      state.currentIndexSong = 0;
      state.infoAlbumCurrent = [];
      state.infoSongNext = {};
      localStorage.setItem("play_now", JSON.stringify(state));
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
      localStorage.setItem("play_now", JSON.stringify(state));
    },
    setFavouriteSong: (state, action) => {
      const songExists = state.favouriteSongs.some(
        (item) => item.encodeId === action.payload.encodeId
      );

      if (!songExists) {
        state.favouriteSongs.push(action.payload);
      }
      localStorage.setItem("play_now", JSON.stringify(state));
    },
    setIsAlbum: (state, action) => {
      state.isAlbum = action.payload;
      localStorage.setItem("play_now", JSON.stringify(state));
    },
    setInfoAlbum: (state, action) => {
      state.infoAlbumCurrent = action.payload;
      localStorage.setItem("play_now", JSON.stringify(state));
    },
    setPlayList: (state, action) => {
      state.playList = action.payload;
      localStorage.setItem("play_now", JSON.stringify(state));
    },
    setCurrentIndexSong: (state, action) => {
      state.currentIndexSong = action.payload;
      state.infoSong = state.playList[state.currentIndexSong];
      state.duration = state.infoSong.duration;
      state.currentTime = 0;
      state.currentSongId = state.infoSong.encodeId;
      state.infoSongNext = state.playList[state.currentIndexSong + 1] || {};
      localStorage.setItem("play_now", JSON.stringify(state));
    },
    setNextSong: (state, action) => {
      if (action.payload !== -1) {
        state.currentIndexSong = action.payload;
        state.infoSongNext = state.playList[state.currentIndexSong + 1];
        localStorage.setItem("queue_nowplay", JSON.stringify(state));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.fulfilled, (state, { payload }) => {
      state.playList = payload.data.song.items.filter(
        (e) => e.streamingStatus === 1
      );
      state.currentTime = 0;
      state.currentIndexSong = 0;
      state.infoSong = state.playList[state.currentIndexSong];
      state.infoSongNext = state.playList[state.currentIndexSong + 1];
      state.currentSongId = state.infoSong.encodeId;
      state.duration = state.infoSong.duration;
      localStorage.setItem("play_now", JSON.stringify(state));
    });
  },
});

export const {
  playSong,
  setFavouriteSong,
  setCurrentTime,
  setIsAlbum,
  setCurrentIndexSong,
  setInfoAlbum,
  setPlayList,
  setNextSong,
  playSongNotAlbum,
} = playNow.actions;

export default playNow.reducer;
