import React, { Suspense } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Suspense>{children}</Suspense>
    </div>
  );
};

export default Layout;
