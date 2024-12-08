"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // To use the id param from the URL
import { use } from 'react';

// Components
import Design1 from "@/components/Vouchers/Design1/Design1";

export default function VoucherDetails({ params }) {
  const router = useRouter();

  // Unwrap params with React.use()
  const { id } = use(params); // Unwrap params using React.use()
  
  const [voucherData, setVoucherData] = useState(null); // To store voucher data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const qrValue = `${typeof window !== 'undefined' ? window.location.origin : ''}/Voucher/${id}`;

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await fetch(`/api/vouchers/${id}`);
        const data = await response.json();

        if (!response.ok) {
          // Handle API errors (e.g., voucher not found)
          setError(data.message || "An error occurred");
          setVoucherData(null); // No voucher data available
        } else {
          setVoucherData(data.voucher); // Set the fetched data to state
        }
      } catch (error) {
        console.error("Error fetching voucher:", error);
        setError("Failed to fetch voucher");
        setVoucherData(null); // No voucher data available
      } finally {
        setLoading(false); // Done loading
      }
    };

    fetchVoucher();
  }, [id]); // Dependency on `id` so it fetches when the id changes

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If an error occurred or no data found, show an error message
  if (error) {
    return <div>{error}</div>;
  }

  // If no voucher data is available, show a "not found" message
  if (!voucherData) {
    return <div>Voucher not found</div>;
  }

  // Set up the data to pass to the Design1 component
  const data = {
    name: voucherData.name || 'Три Имена На Получателя',
    price: voucherData.amount || 200,
    wish: voucherData.wish || "Пожелавам Ви много успехи, здраве и щастие. Нека всяко ново начинание Ви води към нови възможности и постижения, а всяка стъпка по пътя да бъде изпълнена с удовлетворение и радост.",
    qrValue,
  };

  return (
    <Design1 data={data} />
  );
}
