import Link from "next/link";
import Image from "next/image";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.content}>
        <Image
          src="/assets/logo.svg"
          width="100px"
          height="50px"
          alt="Logo da Organização"
        />

        <nav className={styles.navigation}>
          <Link href="/">Sobre</Link>
          <Link href="/form">Alistar</Link>
        </nav>
      </div>
    </header>
  );
}