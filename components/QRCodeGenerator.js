"use client";

import React from "react";
import ReactQRCode from "react-qr-code"; // Import the react-qr-code component

export default function QRCodeGenerator({ value, bgColor = "#ffffff", fgColor = "#000000" }) {
  if (!value) return null; // Do not render anything if the value is empty

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor, // QR code background color
        borderRadius: "8%", 
        padding: "6%", 
      }}
    >
      <ReactQRCode value={value} size={"100%"} fgColor={fgColor} bgColor={bgColor} />
    </div>
  );
}
