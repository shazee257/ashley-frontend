import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "../app/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.scss";

// let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  let persistor = persistStore(store);
  return (
    <>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer autoClose={3000} />
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </PersistGate>
        {/* </PersistGate> */}
      </Provider>
    </>
  );
}

export default MyApp;
