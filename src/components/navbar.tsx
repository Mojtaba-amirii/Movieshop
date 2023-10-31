import { FaShoppingBasket } from "react-icons/fa";
import HamburgerMenu from "./hamburger";
import Link from "next/link";
import React from "react";
import { useAnimation } from "./AnimationContext";
import "tailwindcss-animatecss";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { animationTriggered } = useAnimation();
  const { data: sessionData } = useSession();

  // async function handleSignInSignOut() {
  //   try {
  //     if (sessionData) {
  //       await signOut();
  //     } else {
  //       await signIn();
  //     }
  //   } catch (error) {
  //     // Handle any errors that may occur during sign-in/sign-out
  //     console.error("Error:", error);
  //   }
  // }

  return (
    <header>
      <nav className=" sticky flex  w-full items-center justify-between bg-sky-400 px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold">
            <h1>MOVIESHOP</h1>
          </Link>
          <div className="text-xl lg:hidden">
            <HamburgerMenu />
          </div>
          <div className="hidden lg:block">
            <ul className="flex  font-bold">
              <li>
                <button
                  className="border-r-2 border-black pr-4"
                  type="button"
                  onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                  }
                >
                  {sessionData ? "Sign out" : "Sign in"}
                </button>
              </li>
              {sessionData ? (
                <>
                  <li>
                    <Link
                      href="/myprofile"
                      className="border-r-2 border-black px-4 font-bold"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mymovies"
                      className="border-r-2 border-black px-4  font-bold "
                    >
                      My Movies
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
              <li>
                <Link href="/about" className="pl-4 font-bold">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Link
          href="/cart-pages/cart"
          className={`text-2xl ${animationTriggered ? "animate-bounce" : ""}`}
        >
          <FaShoppingBasket />
        </Link>
      </nav>
    </header>
  );
}
