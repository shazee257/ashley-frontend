import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
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

    // This special action type will be dispatched by `next-redux-wrapper` and will
    // merge the server state with the client state. This is useful for cases where
    // the server state may be out of date, such as when a user logs in on the
    // client. In this case, we want to merge the server state with the client state
    // to ensure that the client state is up to date.
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.wishlist
      };
    },
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
