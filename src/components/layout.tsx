import Navbar from "./navbar";
import React from "react";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>

      {/* <Footer /> */}
    </>
  );
}
