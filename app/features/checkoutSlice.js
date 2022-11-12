const { createSlice } = require("@reduxjs/toolkit");

const checkoutSlice = createSlice({
  name: "activeSteps",
  initialState: {
    total: 0,
    taxes: 0,
    grandTotal: 0,

  },
  reducers: {
    addToCheckout(state, action) {
      state.total = action.payload.total;
      state.taxes = action.payload.taxes;
      state.grandTotal = action.payload.grandTotal;
    },
    // removeFromCart(state, action) {
    //   return state.filter((item) => item.sku !== action.payload);
    // },
    // incQuantity(state, action) {
    //   [
    //     ...state,
    //     state.map((item) => item.sku == action.payload && (item.quantity += 1)),
    //   ];
    // },
    // decQuantity(state, action) {
    //   [
    //     ...state,
    //     state.map(
    //       (item) =>
    //         item.sku == action.payload &&
    //         item.quantity > 1 &&
    //         (item.quantity -= 1)
    //     ),
    //   ];
    // },
  },
});

export const { addToCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
export const selectCheckout = (state) => state.checkout.data;
