import { MdArrowForwardIos } from "react-icons/md";

import styles from "./styles.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <strong>Entrar em Contato</strong>
        <a href="mailto:vaixelloficial@gmail.com">
          vaixeloficial@gmail.com
          <MdArrowForwardIos />
        </a>
      </div>
    </footer>
  );
}