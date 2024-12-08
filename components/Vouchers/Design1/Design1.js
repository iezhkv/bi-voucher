"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import QRCodeGenerator from "@/components/QRCodeGenerator";

export default function Design1({ data = {} }) {
  // Destructure data with default values
  const {
    name,
    price,
    currency = "BGN",
    wish,
    qrValue,
  } = data;


  // Config
  const frontImgPath = "/voucherr.png";
  const backImgPath = "/voucherBack.png";

  return (
    <>
      {/* Voucher Front */}
      <div className={styles.voucher} id="voucher-front">
        <Image
          src={frontImgPath}
          alt="Voucher Front Side Image"
          layout="fill"
          objectFit="cover"
        />

        <div className={styles.name}>{name}</div>

        <div className={styles.ammount}>
          <div className={styles.price}>{price}</div>
          <div className={styles.currency}>{currency}</div>
        </div>

        <div className={styles.wish}>
          <p className={styles.wishText}>{wish}</p>
        </div>
      </div>

      {/* Voucher Back */}
      <div className={styles.voucher} id="voucher-back">
        <Image
          src={backImgPath}
          alt="Voucher Back Side Image"
          layout="fill"
          objectFit="cover"
        />

        <div className={styles.qr}>
          <QRCodeGenerator value={qrValue} />
        </div>
      </div>
    </>
  );
}
