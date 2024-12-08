"use client";

import Image from "next/image";


export default function VoucherDesign({ name, price, wish }) {

    let currency = "BGN"
  return (
    <div className="russo-one-regular"
      style={{
        backgroundColor: "#0c0d34ff", // Light gray background
        width: "100%",
        aspectRatio: "21/9",
        position: "relative",
        top: "-10%",
        overflow: "hidden", // Prevent content from spilling out
        color: "#0c0d34ff",
        fontSize: "3vw"
      }}
    >
      {/* Image from public directory */}
      <Image
        src="/voucherr.png" // Image from the public directory
        alt="Voucher"
        layout="fill" // Ensures the image fills the parent container
        objectFit="cover" // Ensures the image covers the container
        
      />

      {/* Dynamic text fields */}
      <div className="name"
        style={{
          position: "relative",
          left: "26%",
          top: "43%",
          width: "70%",
          fontSize: "1em",
          // background: "green",
          overflow: "hidden",
          whiteSpace: "nowrap",
          display: "flex",
          justifyContent: "center", // Centers text horizontally
          alignItems: "center",    // Centers text vertically
        }}
      >
        {name}
      </div>
      <div className="ammount"
        style={{
          position: "absolute",
          bottom: "0%",
          right: "0%",
          fontSize: "1.7em",
          // background: "black",
          // margin: "1%",
          width: "18%",
          height: "15%",
          display: "flex",
            alignItems: "center",
          justifyContent: "flex-end",
          color: "#df1a32ff"
        }}
      >

        <div className="price"
            style={{
              // background: "green",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              overflow: "hidden",
              whiteSpace: "nowrap",

                
            }}
        >
        {price}
        </div>
        <div className="currency"
            style={{
                fontSize: "0.3em",
                transform: "rotate(90deg)",

                marginLeft: "-3%",
                marginBottom: "1%"

            }}
        >
        {currency}
        </div>

      </div>
      <div
  style={{
    position: "absolute",
    top: "60%",
    left: "36%",
    width: "46%",
    height: "40%",
    fontSize: "0.5em",
    overflow: "hidden",
    display: "block",   // Change to block layout to allow wrapping
    textAlign: "center",
    // background: "green"
  }}
>
  <p
    style={{
      width: "100%",
      wordWrap: "break-word",  // Ensures long words break and wrap
      whiteSpace: "normal",    // Allows wrapping of text
      // background: "green",
      display: "inline",       // Ensure inline behavior for the text
      justifyContent: "center",  // Center content horizontally
      textAlign: "center",     // Center content vertically
      margin: "0",             // Avoid margins that might force the text outside of the container
    }}
  >
    {wish}
  </p>
</div>
    </div>
  );
}