import MovieList from "./MovieList";
import Navbar from "./navbar";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <MovieList />
      {/* <Footer /> */}
    </>
  );
}
