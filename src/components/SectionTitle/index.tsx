import { ReactNode } from "react";

import styles from "./styles.module.scss";

type SectionTitleProps = {
  children: ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className={styles.sectionTitle}>
      <div className={styles.enphase} />
      {children}
    </h2>
  );
}