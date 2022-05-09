import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";

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

        <nav>
          <Link href="/">Sobre</Link>
          <Link href="/form">Alistar</Link>
        </nav>
      </div>
    </header>
  );
}