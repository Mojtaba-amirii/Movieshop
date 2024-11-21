import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import { Provider } from "react-redux";
import store from "~/redux/store";
import Layout from "~/pages/layout";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { AnimationProvider } from "~/context/AnimationContext";
import type { Session } from "next-auth";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <AnimationProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AnimationProvider>
      </Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
