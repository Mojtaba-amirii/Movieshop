import { SlBasketLoaded } from "react-icons/sl";
import HamburgerMenu from "./hamburger";

export default function Navbar() {
  return (
    <header>
      <nav className=" sticky left-0 top-0 flex w-full bg-sky-400 px-2 py-4">
        <ul className="flex w-full items-center">
          <li className="grow md:hidden">
            <HamburgerMenu />
          </li>
          <li className="grow">
            <h1>MOVIESHOP</h1>
          </li>
          <li className="grow">
            <SlBasketLoaded />
          </li>
        </ul>
      </nav>
    </header>
  );
}
