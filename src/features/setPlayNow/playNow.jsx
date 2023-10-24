import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { httpRequest, tmdAPI } from "../../axios/axios-custom";

const initialState = JSON.parse(localStorage.getItem("play_now")) || {
  currentSongId: null,
  loading: false,
  duration: 0,
  listSong: [],
  infoSong: {},
  favouriteSongs: [],
  lyrics: {},
};

export const fetchSong = createAsyncThunk(
  "playNow/fetchSong",
  async (encodeId) => {
    const res = await httpRequest.get(`infosong?id=${encodeId}`);
    return res.data;
  }
);

const playNow = createSlice({
  name: "playNow",
  initialState,
  reducers: {
    playSong: (state, { payload }) => {
      state.infoSong = payload;
      state.currentSongId = payload.encodeId;
      state.duration = payload.duration;
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
    builder.addCase(fetchSong.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSong.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchSong.fulfilled, (state, action) => {
      state.loading = false;
      state.infoSong = action.payload.data;
      localStorage.setItem("play_now", JSON.stringify(state));
    });
  },
});

export const { playSong, setFavouriteSong } = playNow.actions;

export default playNow.reducer;
