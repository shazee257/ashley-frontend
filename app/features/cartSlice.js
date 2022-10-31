// const { createSlice } = require("@reduxjs/toolkit");
// import { toast } from "react-toastify";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: [],
//   // initialState:
//   //   typeof window !== "undefined" && localStorage.getItem("cart")
//   //     ? JSON.parse(localStorage.getItem("cart"))
//   //     : [],
//   reducers: {
//     addToCart(state, action) {
//       const index = state.findIndex((item) => item.sku === action.payload.sku);
//       if (index >= 0) {
//         state[index].quantity += action.payload.quantity;
//         toast.info("Qty Added of existing item in the Cart", {
//           position: "top-center",
//         });
//       } else {
//         state.push(action.payload);
//         toast.success("Item Added in the Cart", {
//           position: "top-center",
//         });
//       }
//       localStorage.setItem("cart", JSON.stringify(state));
//       // if (!state.length) {
//       //   state.push(action.payload);
//       // } else {
//       //   // state.push(action.payload);
//       //   state.map((item) =>
//       //     item.sku === action.payload.sku
//       //       ? (item.quantity += action.payload.quantity)
//       //       : state.push(action.payload)
//       //   );
//       // }
//       //   state.length >= 1
//       //     ? state.map(
//       //         (item) =>
//       //           item.sku === action.payload.sku &&
//       //           (item.quantity += action.payload.quantity)
//       //       )
//       //     : state.push(action.payload);
//       // },
//       // addToCart(state, action) {
//       //   state.push(action.payload);
//     },
//     removeFromCart(state, action) {
//       state.filter((item) => item.sku !== action.payload);
//       localStorage.setItem("cart", JSON.stringify(state));
//       return state.filter((item) => item.sku !== action.payload);
//     },
//     incQuantity(state, action) {
//       [
//         ...state,
//         state.map((item) => item.sku == action.payload && (item.quantity += 1)),
//       ];
//     },
//     decQuantity(state, action) {
//       [
//         ...state,
//         state.map(
//           (item) =>
//             item.sku == action.payload &&
//             item.quantity > 1 &&
//             (item.quantity -= 1)
//         ),
//       ];
//     },
//   },
// });

// export const { addToCart, removeFromCart, incQuantity, decQuantity } =
//   cartSlice.actions;
// export default cartSlice.reducer;
// export const selectCart = (state) => state.cart;



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
      // const index = state.products.findIndex((item) => item.sku === action.payload.sku);
      // if (index >= 0) {
      //   state.products[index].quantity += action.payload.quantity;
      //   state.products[index].total = state.products[index].quantity * state.products[index].price;
      // } else {
      state.products.push(action.payload);
      // }
      state.count = state.products.length;
      state.cartTotal = state.products.reduce((acc, item) => acc + item.total, 0);
    },

    removeItemFromCart(state, action) {
      state.products = state.products.filter((id) => id !== action.payload);
      state.count = state.products.length;
    },

    clearCart(state) {
      state.products = [];
      state.cartTotal = 0;
      state.count = 0;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.products = action.payload?.products;
        state.count = action.payload?.products.length;
        state.cartTotal = action.payload?.products.reduce((acc, item) => acc + item.total, 0);
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});


export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartCount = (state) => state.cart.count;
export const selectCartProducts = (state) => state.cart.products;

export const fetchCartItems = createAsyncThunk("cart/fetch", async (userId) => {
  const { data } = await axios(`${process.env.NEXT_PUBLIC_baseURL}/cart/${userId}`);
  return data.data;
});

























