import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("recentSong")) || {
  recentSong: [],
};

const recentSong = createSlice({
  name: "recentSong",
  initialState,
  reducers: {
    pushSong: (state, action) => {
      const songExists = state.recentSong.find(
        (e) => e.encodeId === action.payload.encodeId
      );

      if (state.recentSong.length > 20) {
        state.recentSong.splice(-1);
      }

      if (songExists) {
        let index = state.recentSong.indexOf(songExists);
        state.recentSong.splice(index, 1);
      }

      state.recentSong.unshift(action.payload);

      localStorage.setItem("recentSong", JSON.stringify(state));
    },
  },
});

export const { pushSong } = recentSong.actions;

export default recentSong.reducer;
