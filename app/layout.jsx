import { Russo_One, Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const russoOne = Russo_One({
  weight: "400", // or any weight you prefer
  subsets: ["latin"], // optional, you can add other subsets like "latin-ext"
});

const rubik = Rubik({
    weight: "400", // or any weight you prefer
    subsets: ["latin"], // optional, you can add other subsets like "latin-ext"
  });
  



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
