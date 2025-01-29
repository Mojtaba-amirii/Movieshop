import React from "react";
import Link from "next/link";
import { CheckCircle, Home, Film } from "lucide-react";

export default function PaymentConfirmation() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-gray-50 p-8 shadow-lg">
        <div className="mb-6 text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Purchase Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your movie is now ready to watch.
          </p>
        </div>

        <div className="mb-8 rounded-lg bg-green-50 p-4 text-green-700">
          <p className="text-center text-sm">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="../my-movies" className="block w-full">
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-3 text-white transition duration-300 hover:bg-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Film className="mr-2 h-5 w-5" />
              Go to My Movies
            </button>
          </Link>
          <Link href="/" className="block w-full">
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md bg-gray-200 px-4 py-3 text-gray-800 transition duration-300 hover:bg-gray-300 focus:outline-hidden focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
