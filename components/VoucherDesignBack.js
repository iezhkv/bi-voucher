"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ReactQRCode from "react-qr-code"; // Import the react-qr-code component

export default function VoucherDesign({ data }) {
  const { name, price, wish } = data;
  
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    // Set the current URL dynamically when the component mounts (client side only)
    const fullUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;
    setQrUrl(fullUrl);  // Set the full URL including query parameters
  }, []); // Empty dependency array means it runs only once, on mount

  return (
    <div
      className="russo-one-regular"
      style={{
        backgroundColor: "#0c0d34ff", // Light gray background
        width: "100%",
        aspectRatio: "21/9",
        position: "relative",
        top: "-10%",
        overflow: "hidden", // Prevent content from spilling out
        color: "#0c0d34ff",
        fontSize: "3vw",
      }}
    >
      {/* Image from public directory */}
      <Image
        src="/voucherBack.png" // Image from the public directory
        alt="Voucher"
        layout="fill" // Ensures the image fills the parent container
        objectFit="cover" // Ensures the image covers the container
      />
      
      <div
        className="qr"
        style={{
          position: "absolute",
          bottom: "0%",
          right: "0%",
          width: "12%",
          aspectRatio: "1/1",
          margin: "2%",
          background: "green",
          display: "flex",
          justifyContent: "center", // Centers text horizontally
          alignItems: "center",    // Centers text vertically
        }}
      >
        {/* Render the QR code */}
        {qrUrl && <ReactQRCode value={qrUrl} size={"100%"} />}
      </div>
    </div>
  );
}
