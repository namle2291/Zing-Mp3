import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: null,
  password: null,
  loading: false,
  token: JSON.parse(localStorage.getItem("token")),
  userInfo: JSON.parse(localStorage.getItem("userInfo")),
};

export const fetchAuth = createAsyncThunk(
  "/auth, fetchAuth",
  async (options) => {
    const res = await axios.post(
      `https://tiktok.fullstack.edu.vn/api/auth/${options.type}`,
      options.payload
    );
    return res.data;
  }
);

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    clearData: (state) => {
      state.email = "";
      state.password = "";
    },
    userLogout: (state) => {
      state.token = "";
      state.userInfo = {};
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.data;
      state.token = action.payload.meta.token;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      localStorage.setItem("token", JSON.stringify(state.token));
    });
  },
});

export const {
  setEmail,
  setPassword,
  setInfo,
  setToken,
  userLogout,
  clearData,
} = auth.actions;

export default auth.reducer;
