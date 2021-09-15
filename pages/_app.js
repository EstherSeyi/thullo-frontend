import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "../styles/globals.css";

import { ModalProvider } from "../context/modal";
import Modal from "../components/modal";
import Layout from "../components/layout";
import AuthLayout from "../components/auth-layout";
import PrivateRoutes from "../components/private-routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3600000,
    },
  },
});

function MyApp({ Component, pageProps }) {
  const { query, pathname } = useRouter();

  const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Modal />
        {authRoutes?.includes(pathname) ? (
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
        ) : (
          <PrivateRoutes>
            <Layout cardName={query.id}>
              <Component {...pageProps} />
            </Layout>
          </PrivateRoutes>
        )}
      </ModalProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
