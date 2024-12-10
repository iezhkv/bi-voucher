'use client'

import Image from "next/image";
import styles from "./styles.module.css";
import { Russo_One } from "next/font/google";
import { useResizeDetector } from "react-resize-detector";

// Components
import QRCodeGenerator from "@/app/components/QRCodeGenerator";

const russoOne = Russo_One({
  weight: "400", // or any weight you prefer
  subsets: ["latin"], // optional, you can add other subsets like "latin-ext"
});

export default function Design1({ voucher = {}, hideBack = false }) {
  // Destructure data with default values
  const { id, name, price, wish } = voucher;

  const qrValue = "http://localhost:/3000/vouchers/" + id;

  // Config
  const frontImgPath = "/voucherFront.svg";
  const backImgPath = "/voucherBack.svg";

  // Dynamic font size calculation and console logging
  const { width, ref } = useResizeDetector({
    onResize: (width) => {
      if (width) {
        console.log("Current width of #voucher-wrapper:", width);
      }
    },
  });

  const fontSize = width ? width / 30 : 16; // Example formula for font size based on width

  return (
    <div
      ref={ref}
      className={`${russoOne.className} antialiased wrapper`}
      id="voucher-wrapper"
      style={{ fontSize: `${fontSize}px` }} // Apply dynamic font size
    >
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
          <div className={styles.currency}>BGN</div>
        </div>

        <div className={styles.wish}>
          <p className={styles.wishText}>{wish}</p>
        </div>
      </div>

      {/* Voucher Back (conditionally rendered) */}
      {!hideBack && (
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
      )}
    </div>
  );
}