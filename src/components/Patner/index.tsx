import { patnerProps } from "../../types/Patner";

import styles from "./styles.module.scss";

export function Patner({
  name,
  icon,
  coupon,
  url
}: patnerProps) {
  return (
    <a
      href={url}
      className={styles.patnerContainer}
      target="_blank"
      rel="noreferrer"
    >
      <div className={styles.patnerAbout}>
        <h3>{name}</h3>

        <small>Cupom Desconto</small>
        <div>
          <strong>{coupon.code}</strong>
          <p>- {coupon.percentageValue}%</p>
        </div>
      </div>
      <img src={icon} alt={`Logo da ${name}`} />
    </a>
  );
}