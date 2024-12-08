"use client";

import { useSearchParams } from "next/navigation";
import GenerateDownloadButton from "@/components/GenerateDownloadButton"; // Import the new component

import Design1 from "@/components/Vouchers/Design1/Design1";

export default function VoucherPage() {
  // Use Next.js' useSearchParams hook to extract URL parameters
  const searchParams = useSearchParams();

  // Create a data object with fallback default values
  const data = {
    name: searchParams?.get("name") || 'Три Имена На Получателя',
    price: searchParams?.get("price") || 200,
    wish: searchParams?.get("wish")|| "Пожелавам Ви много успехи, здраве и щастие. Нека всяко ново начинание Ви води към нови възможности и постижения, а всяка стъпка по пътя да бъде изпълнена с удовлетворение и радост.",

  };

  return (
    <>
      <Design1 data={data}/>
      <GenerateDownloadButton data={data} />
    </>
  );
}
