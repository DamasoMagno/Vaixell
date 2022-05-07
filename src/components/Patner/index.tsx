import { PartnerProps } from "../../types/Partner";

import styles from "./styles.module.scss";

export function Patner({
  name,
  icon,
  coupon,
  url
}: PartnerProps) {
  return (
    <a
      href={url}
      className={styles.patnerContainer}
      target="_blank"
      rel="noreferrer"
    >
      <div className={styles.patnerAbout}>
        <h3>{name}</h3>

        <p>Cupom Desconto</p>
        <div>
          <strong>{coupon.code}</strong>
          <small>{coupon.percentageValue}%</small>
        </div>
      </div>
      <img src={icon} alt={`Logo da ${name}`} />
    </a>
  );
}