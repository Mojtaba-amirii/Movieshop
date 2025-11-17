"use client";

import Link from "next/link";
import "tailwindcss-animatecss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  LogIn,
  LogOut,
  ShoppingBasket,
  Film,
  User,
  Library,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

import HamburgerMenu from "../hamburger";
import { selectCartItemsCount } from "~/redux/cartSlice";
import { useAnimation } from "~/context/AnimationContext";

export default function Navar() {
  const { animationTriggered } = useAnimation();
  const { data: sessionData } = useSession();
  const cartItemsCount = useSelector(selectCartItemsCount);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 shadow-sm backdrop-blur-lg 2xl:container 2xl:mx-auto">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-purple-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Film className="h-6 w-6 text-white" />
            </div>
            <h1 className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent">
              MOVIESHOP
            </h1>
          </Link>

          <div className="text-xl lg:hidden">
            <HamburgerMenu />
          </div>

          <div className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li>
                <button
                  className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100"
                  type="button"
                  onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                  }
                >
                  {sessionData ? (
                    <>
                      <span>Sign out</span>
                      <LogOut className="h-4 w-4 text-red-500" />
                    </>
                  ) : (
                    <>
                      <span>Sign in</span>
                      <LogIn className="h-4 w-4 text-green-500" />
                    </>
                  )}
                </button>
              </li>
              {sessionData ? (
                <>
                  <li>
                    <Link
                      href="/my-profile"
                      className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-movies"
                      className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100"
                    >
                      <Library className="h-4 w-4" />
                      <span>My Movies</span>
                    </Link>
                  </li>
                </>
              ) : null}
              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={`${animationTriggered && "animate-bounce"}`}>
          {sessionData && (
            <Link
              href="/cart"
              title="Shopping Basket"
              className="group relative"
            >
              <motion.div
                animate={animationTriggered ? { y: [0, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-purple-600 shadow-lg transition-all duration-300 group-hover:scale-110 hover:shadow-xl"
              >
                <ShoppingBasket className="h-5 w-5 text-white" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 animate-pulse items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white shadow-lg ring-2 ring-white">
                    {cartItemsCount}
                  </span>
                )}
              </motion.div>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
