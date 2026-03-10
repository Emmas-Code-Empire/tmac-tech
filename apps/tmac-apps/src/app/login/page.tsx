"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <form
        action={async () => {
          await signIn("google");
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </div>
  );
}
