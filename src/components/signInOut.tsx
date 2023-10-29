import { signIn, signOut, useSession } from "next-auth/react";


export default function SignInOut() {
     const { data: sessionData } = useSession();
     return (
       <button
         className="text-black rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
         onClick={sessionData ? () => signOut() : () => signIn()}
       >
         {sessionData ? "Sign out" : "Sign in"}
       </button>
     );
}