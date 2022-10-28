// import { configureStore ,  } from "@reduxjs/toolkit";

// // import {
// //   persistReducer,
// //   FLUSH,
// //   REHYDRATE,
// //   PAUSE,
// //   PERSIST,
// //   PURGE,
// //   REGISTER,
// // } from "redux-persist";
// // import storage from "redux-persist/lib/storage";
// import {
//   persistStore,
//   // persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';

// import cartReducer from "../features/cartSlice";
// import wishlistReducer from "../features/wishlistSlice";
// import productReducer from "../features/productSlice";
// import categoryReducer from "../features/categorySlice";
// import checkoutReducer from "../features/checkoutSlice";
// import stepReducer from "../features/stepSlice";
// import loginReducer from "../features/loginSlice";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";
// import { combineReducers } from "@reduxjs/toolkit";

// const persistConfig = {
//   key: "root",
//   // version: 1,
//   storage,
// };

// const reducer = combineReducers({
//   cart: cartReducer,
//   product: productReducer,
//   category: categoryReducer,
//   checkout: checkoutReducer,
//   activeStep: stepReducer,
//   wishlist: wishlistReducer,
//   login: loginReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);


// // const persistedReducer = persistReducer(persistConfig, cartReducer);

// const store = configureStore({
//   reducer : persistedReducer ,

//   middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
//   // reducer: {
//   //   // cart: persistedReducer,

//   // },
//   // middleware: (getDefaultMiddleware) =>
//   //   getDefaultMiddleware({
//   //     serializableCheck: {
//   //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//   //     },
//   //   }),
// });

// // const store = configureStore({
// //   reducer: {
// //     cart: cartReducer,
// //     product: productReducer,
// //     category: categoryReducer,
// //   },
// // });

// export default store;

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

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
  });
  store.__persistor = persistStore(store);
  return store;
};



export const wrapper = createWrapper(makeStore, { debug: true });


// export const makeStore = () =>
//   configureStore({
//     reducer: combinedReducer,
//   });

// export const wrapper = createWrapper(makeStore, { debug: true });



