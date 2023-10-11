import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { GiHamburgerMenu } from "react-icons/gi";

export default function HamburgerMenu() {
  function Links() {
    return (
      <>
        <div className="flex flex-col">
          <Link href="/login" className="p-4 font-bold">
            Login
          </Link>
          <Link href="/signin" className="p-4 font-bold">
            Sign in
          </Link>
          <Link href="/about" className="p-4 font-bold">
            About MovieShop
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
