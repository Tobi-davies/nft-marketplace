import "../styles/globals.css";
import Context from "../context/context";
import Header from "../components/header";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }) {
  return (
    <Context>
      <Header />
      <Component>{pageProps}</Component>
      <Footer />
    </Context>
  );
}

export default MyApp;
