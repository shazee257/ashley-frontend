import { Provider } from "react-redux";
import { useEffect } from "react";
import { wrapper } from "../app/store/store";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.scss";

// let persistor = persistStore(store);

function App({ Component, pageProps }) {
  // let persistor = persistStore(store);
  return (
    <>
      {/* <Provider store={store}> */}
      {/* <PersistGate persistor={persistor}> */}
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      {/* </PersistGate> */}
      {/* </Provider> */}
    </>
  );
}

export default wrapper.withRedux(App);
