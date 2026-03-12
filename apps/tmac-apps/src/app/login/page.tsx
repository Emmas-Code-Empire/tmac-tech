"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { auth_GetSession } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getAndSetSession = async () => {
      const session = await auth_GetSession();
      setSession(session);
    };
    getAndSetSession();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <form
        action={async () => {
          await signIn("google");
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
      {session?.user && (
        <form
          action={async () => {
            await signOut();
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      )}

      <p>{session?.user ? "Logged In" : "Signed Out"}</p>
    </div>
  );
}
