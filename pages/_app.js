import { Provider } from "react-redux";
import { wrapper } from "../app/store/store";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.scss";

const MyApp = ({ Component, ...rest }) => {

  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
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
