"use client";

// components
import { useSearchParams } from "next/navigation";
import VoucherDesign from "@/components/VoucherDesign";

export default function VoucherPage() {
  // Use Next.js' useSearchParams hook to extract URL parameters
  const searchParams = useSearchParams();

  // Create a data object with fallback default values
  const data = {
    name: searchParams?.get("name") || "Надежда Димитрова Панделиева",
    price: searchParams?.get("price") || "200",
    wish: searchParams?.get("wish") || "Пожелавам Ви много успехи, здраве и щастие. Нека всяко ново начинание Ви води към нови възможности и постижения, а всяка стъпка по пътя да бъде изпълнена с удовлетворение и радост.",
  };

  return (
    <>
        <div id="capture1">
        {/* Pass the data object to VoucherDesign */}
        <VoucherDesign data={data} />
        </div>
        <div id="capture2">
        {/* Pass the data object to VoucherDesign */}
        <VoucherDesign data={data} />
        </div>
    </>
  );
}
