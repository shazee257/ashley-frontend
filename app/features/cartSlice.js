import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUSES } from "../../constants";
import axios from "axios";

const initialState = {
  products: [],
  count: 0,
  cartTotal: 0,
  status: STATUSES.IDLE,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      state.products.push(action.payload);
      state.count = state.products.length;
      state.cartTotal = state.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },

    removeItemFromCart(state, action) {
      // find cart product by id and remove it
      const index = state.products.findIndex((item) => item._id === action.payload);
      if (index >= 0) {
        state.products.splice(index, 1);
        state.count = state.products.length;
        state.cartTotal = state.products.reduce((acc, item) => acc + item.total, 0);
      }
    },

    clearCart(state) {
      state.products = [];
      state.cartTotal = 0;
      state.count = 0;
    },

    incrementQuantity(state, action) {
      const index = state.products.findIndex((item) => item._id === action.payload);
      if (index >= 0) {
        state.products[index].quantity++;
        state.products[index].total = state.products[index].price * state.products[index].quantity;
        state.cartTotal = state.products.reduce((acc, item) => acc + item.total, 0);
      }
    },

    decrementQuantity(state, action) {
      const index = state.products.findIndex((item) => item._id === action.payload);
      if (index >= 0) {
        state.products[index].quantity--;
        state.products[index].total = state.products[index].price * state.products[index].quantity;
        state.cartTotal = state.products.reduce((acc, item) => acc + item.total, 0);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.products = action.payload;
          state.count = action.payload.length;
          state.cartTotal = action.payload.reduce((acc, item) => acc + item.total, 0);
          state.status = STATUSES.IDLE;
        } else {
          state.products = [];
          state.count = 0;
          state.cartTotal = 0;
          state.status = STATUSES.IDLE;
        }
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});


export const { addItemToCart, removeItemFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartCount = (state) => state.cart.count;
export const selectCartProducts = (state) => state.cart.products;
export const selectCartTotal = (state) => state.cart.cartTotal;

export const fetchCartItems = createAsyncThunk("cart/fetch", async (userId) => {
  const { data } = await axios(`${process.env.NEXT_PUBLIC_baseURL}/cart/${userId}`);
  return data.data ? data.data.products : [];
});

// export const updateCartItems = createAsyncThunk("cart/update", async (cart) => {
//   const { data } = await axios.put(`${process.env.NEXT_PUBLIC_baseURL}/cart`, cart);
//   return data.data;
// });

