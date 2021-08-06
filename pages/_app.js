import { useRouter } from "next/router";

import "../styles/globals.css";

import { ModalProvider } from "../context/modal";
import Modal from "../components/modal";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  const { query } = useRouter();
  return (
    <ModalProvider>
      <Modal />
      <Layout cardName={query.id}>
        <Component {...pageProps} />
      </Layout>
    </ModalProvider>
  );
}

export default MyApp;
