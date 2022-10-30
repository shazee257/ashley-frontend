import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


import cartReducer from "../features/cartSlice";
import wishlistReducer from "../features/wishlistSlice";
import productReducer from "../features/productSlice";
import categoryReducer from "../features/categorySlice";
import checkoutReducer from "../features/checkoutSlice";
import stepReducer from "../features/stepSlice";
import loginReducer from "../features/loginSlice";
import bannerReducer from "../features/bannerSlice";

const combinedReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  category: categoryReducer,
  checkout: checkoutReducer,
  activeStep: stepReducer,
  wishlist: wishlistReducer,
  login: loginReducer,
  banner: bannerReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
  });
  store.__persistor = persistStore(store);
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
