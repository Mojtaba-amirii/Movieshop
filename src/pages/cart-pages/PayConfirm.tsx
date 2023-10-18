import React from "react";
import Link from "next/link";

export default function PaymentConfirmation() {
  return (
    <div className="my-12 flex flex-col items-center justify-center gap-8">
      <h1 className="text-xl font-semibold">Movie Purchased</h1>
      <div className="flex flex-col items-center gap-4">
        <Link href="../mymovies">
          <button
            type="button"
            title="button"
            className="w-[150px] rounded-md bg-sky-400 p-2"
          >
            Go to my movies
          </button>
        </Link>
        <Link href="/">
          <button
            type="button"
            title="button"
            className="w-[150px] rounded-md bg-sky-400 p-2"
          >
            Go to home
          </button>
        </Link>
      </div>
    </div>
  );
}
