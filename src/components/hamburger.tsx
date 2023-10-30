import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { GiHamburgerMenu } from "react-icons/gi";

export default function HamburgerMenu() {
  const { data: sessionData } = useSession();

  async function handleSignInSignOut() {
    try {
      if (sessionData) {
        await signOut();
      } else {
        await signIn();
      }
    } catch (error) {
      // Handle any errors that may occur during sign-in/sign-out
      console.error("Error:", error);
    }
  }

  function Links() {
    return (
      <>
        <div className="flex flex-col items-start font-bold">
          <button className="p-4" type="button" onClick={handleSignInSignOut}>
            {sessionData ? "Sign out" : "Sign in"}
          </button>

          {sessionData ? (
            <>
              <Link href="/myprofile" className="p-4 font-bold">
                My Profile
              </Link>

              <Link href="/mymovies" className="p-4 font-bold">
                My Movies
              </Link>
            </>
          ) : (
            ""
          )}
          <Link href="/about" className="p-4 ">
            About
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="relative">
      <Menu
        customBurgerIcon={<GiHamburgerMenu />}
        width={"auto"}
        className=" left-0 top-0"
      >
        <Links />
      </Menu>
    </div>
  );
}
