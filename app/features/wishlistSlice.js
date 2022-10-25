import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUSES } from "../../constants";
import axios from "axios";

const initialState = {
  data: [],
  status: STATUSES.IDLE,
  count: 0
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // addToWishlist(state, action) {
    //   state.data = action.payload.wishlist;
    //   state.count = action.payload.wishlistCount;
    // },
    // removeToWishlist(state, action) {
    //   return state.data.filter((item) => item._id !== action.payload._id);
    // },
    clearWishlist(state) {
      state.data = [];
      state.count = 0;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.data = action.payload.wishlist;
        state.count = action.payload.wishlistCount;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
export const selectWishlist = (state) => state.wishlist;

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async (userId) => {
  const { data } = await axios(`${process.env.NEXT_PUBLIC_baseURL}/wishlist/${userId}`);
  return data;
});
