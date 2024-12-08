"use client";

import { useState, useEffect } from "react";
import FormComponent from "../components/FormComponent";
import VoucherDesign from "../components/VoucherDesign";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "Надежда Димитрова Панделиева",
    price: "200",
    wish: "Пожелавам Ви много успехи, здраве и щастие. Нека всяко ново начинание Ви води към нови възможности и постижения, а всяка стъпка по пътя да бъде изпълнена с удовлетворение и радост.",
  });

  // Handler to update state from form inputs
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Extract URL params and update formData when the component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const price = urlParams.get("price");
    const wish = urlParams.get("wish");

    // If the parameters exist, update the form data
    if (name) setFormData((prev) => ({ ...prev, name }));
    if (price) setFormData((prev) => ({ ...prev, price }));
    if (wish) setFormData((prev) => ({ ...prev, wish }));
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  // Function to handle the API URL navigation
  const handleCaptureClick = () => {
    const apiUrl = `/api/capture?name=${encodeURIComponent(formData.name)}&price=${encodeURIComponent(formData.price)}&wish=${encodeURIComponent(formData.wish)}`;
    window.location.href = apiUrl; // This will trigger navigation to the API URL
  };

  return (
    <div className="min-h-screen w-full p-5 space-y-10">
      {/* Form for entering details */}
      <FormComponent onInputChange={handleInputChange} formData={formData} />

      <div id="capture">
        {/* Pass formData to VoucherDesign */}
        <VoucherDesign data={formData} />
      </div>

      {/* Button to trigger API URL navigation */}
      <button
        onClick={handleCaptureClick}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Capture Voucher
      </button>
    </div>
  );
}
