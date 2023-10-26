import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "~/redux/store";
import Layout from "~/components/layout";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { AnimationProvider } from "~/components/AnimationContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <AnimationProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AnimationProvider>
      </Provider>
    </SessionProvider>
  );
}

export default api.withTRPC(MyApp);
