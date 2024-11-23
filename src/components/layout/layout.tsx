import Navbar from "./header";
import Footer from "./footer";
import React from "react";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">{children}</main>
      <Footer />
    </>
  );
}
