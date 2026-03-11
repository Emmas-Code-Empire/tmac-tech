import ImageContainer, {
  ImageContainerConfig,
} from "@/components/ImageContainer/ImageContainer.component";
import "./globals.css";
import styles from "./layout.module.css";

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
  const logoConfig: ImageContainerConfig = {
    src: "/images/tmac-logo.png",
    aspectRatio: "500/140",
    alt: "Logo",
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <div className={styles.appContainer}>
          <header className={styles.header}>
            <ImageContainer config={logoConfig} />
          </header>
          <main className={styles.main}>
            <div className={styles.appBar}></div>
            <div className={styles.appDisplay}>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
