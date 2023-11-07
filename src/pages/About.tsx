import React from "react";
import Head from "next/head";

export default function About() {
  return (
    <div>
      <Head>
        <title>About MovieShop</title>
      </Head>
      <section className="container mx-auto mt-20  p-4 ">
        <div className="flex flex-col items-center justify-center gap-6 rounded-lg bg-sky-200 p-6 shadow-lg">
          <h1 className="font-semibold">About MovieShop</h1>
          <p>
            {" "}
            Welcome to MovieShop, your one-stop destination for all things
            movies. We are passionate about films and are dedicated to providing
            you with the latest information, reviews, and a vast collection of
            movies to choose from.
          </p>
          <p>
            Our mission is to make your movie-watching experience enjoyable and
            convenient. Whether you,re a cinephile or just looking for a great
            flick to watch, MovieShop has something for everyone.
          </p>
        </div>
      </section>
    </div>
  );
}
