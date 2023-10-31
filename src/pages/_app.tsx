import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
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

// const MyApp2: AppType<{ session: Session | null }> = ({
//   Component,
//   pageProps: { session, ...pageProps },
// }) => {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// };
