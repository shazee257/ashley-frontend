import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUSES } from "../../constants";

const initialState = {
  data: [],
  status: STATUSES.IDLE
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchBanners.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default bannerSlice.reducer;
export const selectBanners = (state) => state.banner.data;

// Thunks
export const fetchBanners = createAsyncThunk("banners/fetch", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/banners`);
  const data = await res.json();
  return data.banners;
});
