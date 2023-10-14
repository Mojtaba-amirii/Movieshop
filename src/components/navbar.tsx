import { FaShoppingBasket } from "react-icons/fa";
import HamburgerMenu from "./hamburger";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav className=" sticky flex  w-full items-center justify-between bg-sky-400 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold">
            <h1>MOVIESHOP</h1>
          </Link>
          <div className="text-xl lg:hidden">
            <HamburgerMenu />
          </div>
          <div className="hidden lg:block">
            <ul className="flex gap-2">
              <li>
                <Link href="/login" className="font-bold">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signin" className="font-bold">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-bold">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Link href="/cart-pages/cart" className="text-2xl">
          <FaShoppingBasket />
        </Link>
      </nav>
    </header>
  );
}
