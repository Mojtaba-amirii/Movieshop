import { SlBasketLoaded } from "react-icons/sl";
import HamburgerMenu from "./hamburger";

export default function Navbar() {
  return (
    <header>
      <nav className=" sticky flex w-full  bg-sky-400 px-6 py-4">
        <ul className="flex w-full items-center justify-between">
          <li className="text-xl md:hidden">
            <HamburgerMenu />
          </li>
          <li className="text-2xl font-bold">
            <h1>MOVIESHOP</h1>
          </li>
          <li className="text-xl">
            <SlBasketLoaded />
          </li>
        </ul>
      </nav>
    </header>
  );
}
