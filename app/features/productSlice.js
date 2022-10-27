import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUSES } from "../../constants";

const initialState = {
  data: [],
  status: STATUSES.IDLE
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // setProducts(state, action) {
    //     state.data = action.payload;
    // },
    // setStatus(state, action) {
    //     state.status = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default productSlice.reducer;
export const selectProducts = (state) => state.product.data;

// Thunks
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/products`);
  const data = await res.json();
  return data.products;
});
