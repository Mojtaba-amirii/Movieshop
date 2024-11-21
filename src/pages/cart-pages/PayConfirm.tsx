import React from "react";
import Link from "next/link";

export default function PaymentConfirmation() {
  return (
    <div className="my-12 flex flex-col items-center justify-center gap-8 rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">Movie Purchased</h1>
      <p className="text-gray-600">
        Thank you for your purchase! You can now enjoy your movie.
      </p>
      <div className="mt-4 flex flex-col items-center gap-4">
        <Link href="../my-movies">
          <button
            type="button"
            title="Go to my movies"
            className="w-[200px] rounded-md bg-blue-500 p-3 text-white transition duration-300 hover:bg-blue-600"
          >
            Go to my movies
          </button>
        </Link>
        <Link href="/">
          <button
            type="button"
            title="Go to home"
            className="w-[200px] rounded-md bg-green-500 p-3 text-white transition duration-300 hover:bg-green-600"
          >
            Go to home
          </button>
        </Link>
      </div>
    </div>
  );
}
