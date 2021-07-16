import "../styles/globals.css";

import { ModalProvider } from "../context/modal";
import Modal from "../components/modal";

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
      <Modal />
      <Component {...pageProps} />
    </ModalProvider>
  );
}

export default MyApp;
