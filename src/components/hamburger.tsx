import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

export default function HamburgerMenu() {
  const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const Links = () => (
    <div className="flex flex-col items-start font-semibold">
      <Link href="/" className="p-4 font-semibold" onClick={toggleMenu}>
        Home
      </Link>
      <Link href="/About" className="p-4 font-semibold" onClick={toggleMenu}>
        About
      </Link>

      {sessionData && (
        <>
          <Link href="/my-profile" className="p-4 font-semibold">
            My Profile
          </Link>
          <Link href="/my-movies" className="p-4 font-semibold">
            My Movies
          </Link>
        </>
      )}
      <button
        className="p-4"
        type="button"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );

  return (
    <div className="relative">
      <button
        type="button"
        className="p-2 text-2xl"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <GiHamburgerMenu className="text-3xl" />
      </button>

      {/* Side menu that appears when 'isOpen' is true */}
      {isOpen && (
        <div className="fixed left-0 top-0 z-50 h-full w-48 rounded-e-md bg-black/15 text-black shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out">
          <div className="flex justify-end p-4">
            <button type="button" onClick={toggleMenu} aria-label="Close Menu">
              <span className="text-2xl font-bold">
                <GrClose />
              </span>
            </button>
          </div>
          <Links />
        </div>
      )}
    </div>
  );
}
