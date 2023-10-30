import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { lsnAPI } from "../../axios/axios-custom";
import axios from "axios";

export const fetchLyrics = createAsyncThunk(
  "playNow/fetchLyrics",
  async (encodeId) => {
    const rs = await axios.get(lsnAPI.getLyrics(encodeId));
    return rs.data;
  }
);

const initialState = JSON.parse(localStorage.getItem("play_now")) || {
  currentSongId: null,
  loading: false,
  currentTime: 0,
  duration: 0,
  listSong: [],
  infoSong: {},
  favouriteSongs: [],
  lyrics: {},
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLyrics.fulfilled, (state, action) => {
      state.lyrics = action.payload.data;
    });
  },
});

export const { playSong, setFavouriteSong, setCurrentTime } = playNow.actions;

export default playNow.reducer;
