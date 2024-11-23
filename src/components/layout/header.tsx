import { FaShoppingBasket } from "react-icons/fa";
import HamburgerMenu from "../hamburger";
import Link from "next/link";
import React from "react";
import { useAnimation } from "~/context/AnimationContext";
import "tailwindcss-animatecss";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";

export default function Navar() {
  const { animationTriggered } = useAnimation();
  const { data: sessionData } = useSession();

  return (
    <header className="sticky top-0 z-40 bg-white p-6 shadow">
      <nav className="sticky flex w-full items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-bold">
            <h1>MOVIESHOP</h1>
          </Link>
          <div className="text-xl lg:hidden">
            <HamburgerMenu />
          </div>
          <div className="hidden lg:block">
            <ul className="flex font-bold">
              <li>
                <button
                  className="flex items-center gap-1 border-r-2 border-black pr-4"
                  type="button"
                  onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                  }
                >
                  {sessionData ? (
                    <>
                      Sign out <LogOut className="text-red-500" />
                    </>
                  ) : (
                    <>
                      Sign in <LogIn className="text-green-400" />
                    </>
                  )}
                </button>
              </li>
              {sessionData ? (
                <>
                  <li>
                    <Link
                      href="/my-profile"
                      className="border-r-2 border-black px-4 font-bold"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-movies"
                      className="border-r-2 border-black px-4 font-bold"
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
          title="ShoppingBasket"
          href="/cart-pages/cart"
          className={`text-2xl ${animationTriggered ? "animate-bounce" : ""}`}
        >
          {sessionData && <FaShoppingBasket />}
        </Link>
      </nav>
    </header>
  );
}
