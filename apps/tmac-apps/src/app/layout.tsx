import "./globals.css";

import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TMAC Tech Apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>{children}</body>
    </html>
  );
}
