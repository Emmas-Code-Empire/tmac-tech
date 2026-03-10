"use client";

import { useSearchParams } from "next/navigation";

const Page = () => {
  const parmas = useSearchParams();

  const error = parmas.get("e");

  return (
    <div>
      <p>ERROR:</p>
      <p>{error && error}</p>
    </div>
  );
};

export default Page;
