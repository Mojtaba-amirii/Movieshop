import Navbar from "../components/navbar";
import Footer from "../components/footer"; // Make sure to import the Footer component
import React from "react";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">{children}</main>
      <Footer />
    </>
  );
}
