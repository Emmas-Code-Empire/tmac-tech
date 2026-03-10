"use client";

import { signOut } from "@/auth";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const parmas = useSearchParams();

  const error = parmas.get("e");

  return (
    <div>
      <p>ERROR:</p>
      <p>{error && error}</p>
      <button
        onClick={async () => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Page;
