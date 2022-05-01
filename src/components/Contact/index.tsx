import { ContactProps } from "../../types/Contact";

import styles from "./styles.module.scss";

export function Contact({
  url,
  name,
  description,
  icon,
}: ContactProps) {
  return (
    <div className={styles.container}>
      <img src={icon} />
      <strong>{name}</strong>
      <p>{description}</p>
      <a
        href={url}
        rel="noreferrer"
        target="_blank"
      >
        Acessar
      </a>
    </div>
  );
}