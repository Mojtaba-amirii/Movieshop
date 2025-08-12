import Head from "next/head";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

import "~/styles/globals.css";
import { api } from "~/utils/api";
import { store } from "~/redux/store";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import Layout from "~/components/layout/layout";
import { AnimationProvider } from "~/context/AnimationContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <AnimationProvider>
          <Layout>
            <Head>
              <title>Movie Shop</title>
              <link rel="icon" type="image/png" href="/imgs/MsLogo.png" />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </AnimationProvider>
      </Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
