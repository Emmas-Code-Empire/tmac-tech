import styles from "./layout.module.css";

import ImageContainer, {
  ImageContainerConfig,
} from "@/components/ImageContainer/ImageContainer.component";

export default function Layout({
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
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <ImageContainer config={logoConfig} />
      </header>
      <main className={styles.main}>
        <div className={styles.appBar}></div>
        <div className={styles.appDisplay}>{children}</div>
      </main>
    </div>
  );
}
