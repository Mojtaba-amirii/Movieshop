import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import SearchBar from "~/components/searchbar";
import Login from "./login";
import Done from "./done";

import { api } from "~/utils/api";

export default function Home() {
  /* const hello = api.example.hello.useQuery({ text: "from tRPC" });
   */
  return (
    <div>
      <SearchBar />
      <Login />
      <Done />
      <p>hej</p>
      <Link href={"./test"}>Go to test</Link>
    </div>
  );
}
