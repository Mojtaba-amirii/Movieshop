import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import SearchBar from "~/components/searchbar";

import { api } from "~/utils/api";

export default function Home() {
  /* const hello = api.example.hello.useQuery({ text: "from tRPC" });
   */
  return (
    <div>
      <SearchBar />
      <p>hej</p>
      <Link href={"./test"}>Go to test</Link>
    </div>
  );
}
