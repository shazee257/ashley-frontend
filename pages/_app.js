import { Provider } from "react-redux";
import { store, persistor } from "../app/store/store";
import Navbar from "../components/Navbar";
import LoadingPanel from "../components/Loader";
import Footer from "../components/Footer";
import "../styles/globals.scss";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("_app mounted");

    const start = () => {
      console.log("start");
      setLoading(true);
    };

    const end = () => {
      console.log("ended");
      setLoading(false);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {loading && <LoadingPanel />}
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </PersistGate>
    </Provider>
  );
};

export default MyApp;