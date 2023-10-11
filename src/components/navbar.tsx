import { FaShoppingBasket } from "react-icons/fa";
import HamburgerMenu from "./hamburger";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav className=" sticky flex  w-full bg-sky-400 px-6 py-4">
        <ul className="flex w-full items-center justify-between">
          <li className="text-xl md:hidden">
            <HamburgerMenu />
          </li>
          <li className="text-2xl font-bold">
            <Link href="/">
              <h1>MOVIESHOP</h1>
            </Link>
          </li>
          <li className="text-2xl ">
            <Link href="/cart-pages/cart">
              <FaShoppingBasket />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
