import Link from "next/link";
import React from "react";

export default function Admin() {
  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="my-10 text-center text-5xl font-bold text-gray-800">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link
          href="/admin/products"
          className="flex transform items-center justify-center rounded-full bg-sky-400 px-6 py-4 text-2xl font-semibold text-black transition-transform hover:scale-105"
        >
          Products
        </Link>
        <Link
          href="/admin/orders"
          className="flex transform items-center justify-center rounded-full bg-sky-400 px-6 py-4 text-2xl font-semibold text-black transition-transform hover:scale-105"
        >
          Orders
        </Link>
      </div>
    </div>
  );
}
