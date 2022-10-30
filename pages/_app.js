import { Provider } from "react-redux";
import { wrapper } from "../app/store/store";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.scss";
import { PersistGate } from "redux-persist/integration/react";

const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store.__persistor}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </PersistGate>
    </Provider>
  );
};


export default MyApp;