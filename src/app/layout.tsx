import "~/styles/globals.css";

import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import Navbar from "~/components/layout/header";
import Footer from "~/components/layout/footer";
import { TRPCReactProvider } from "~/trpc/react";
import { AnimationProvider } from "~/context/AnimationContext";
import { ReduxProvider } from "~/components/providers/redux-provider";
import { SessionProvider } from "~/components/providers/session-provider";

export const metadata: Metadata = {
  title: "Movie Shop",
  description: "Your ultimate movie shopping destination",
  icons: [{ rel: "icon", url: "/imgs/MsLogo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} h-full`}>
      <body className="flex min-h-screen flex-col">
        <TRPCReactProvider>
          <SessionProvider>
            <ReduxProvider>
              <AnimationProvider>
                <Navbar />
                <main className="container mx-auto flex-1 px-4 py-6 md:px-6">
                  {children}
                </main>
                <Footer />
              </AnimationProvider>
            </ReduxProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
