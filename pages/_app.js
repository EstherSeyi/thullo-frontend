import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "../styles/globals.css";

import { ModalProvider } from "../context/modal";
import Modal from "../components/modal";
import Layout from "../components/layout";
import AuthLayout from "../components/auth-layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3600000,
    },
  },
});

function MyApp({ Component, pageProps }) {
  const { query, pathname, ...rest } = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Modal />
        {pathname?.includes("login") || pathname?.includes("register") ? (
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
        ) : (
          <Layout cardName={query.id}>
            <Component {...pageProps} />
          </Layout>
        )}
      </ModalProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
