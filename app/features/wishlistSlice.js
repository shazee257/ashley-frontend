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
    addItemToWishlist(state, action) {
      state.data = [...state.data, action.payload];
      state.count = state.data.length;
    },
    removeItemFromWishlist(state, action) {
      state.data = state.data.filter((id) => id !== action.payload);
      state.count = state.data.length;
    },
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


export const { addItemToWishlist, removeItemFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

export const selectWishlistCount = (state) => state.wishlist.count;
export const selectWishlistData = (state) => state.wishlist.data; //ids

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async (userId) => {
  const { data } = await axios(`${process.env.NEXT_PUBLIC_baseURL}/wishlist/${userId}`);
  return data;
});
