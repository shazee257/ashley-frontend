import { Provider } from "react-redux";
import { wrapper, makeStore } from "../app/store/store";
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

export default wrapper.withRedux(MyApp);











// function App({ Component, pageProps }) {
//   return (
//     <>
//       <Navbar />
//       <Component {...pageProps} />
//       <Footer />
//     </>
//   );
// }

// export default wrapper.withRedux(App);
