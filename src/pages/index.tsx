import { signIn, signOut, useSession } from "next-auth/react";
import MovieList from "~/components/MovieList";

import { api } from "~/utils/api";

export default function Home() {
  /* const hello = api.example.hello.useQuery({ text: "from tRPC" });
   */
  return (
    <div>
      <MovieList />
    </div>
  );
}
