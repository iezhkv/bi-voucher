"use client";

import { useState, useEffect } from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Design1 from "./Vouchers/Design1/Design1";



// Define a lidation schema with Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(100, { message: "Price must be at least 100" })
    .max(9999, { message: "Price must not exceed 9999" }),
  wish: z
    .string()
    .max(250, { message: "Wish must be 250 characters or fewer" })
    .min(5, { message: "Wish must be at least 5 characters" }),
});

export default function FormComponent() {
  const [formData, setFormData] = useState({
    name: "Имена на Получател",
    price: 200,
    wish: "Пожелавам Ви много успехи, здраве и щастие. Нека всяко ново начинание Ви води към нови възможности и постижения, а всяка стъпка по пътя да бъде изпълнена с удовлетворение и радост.",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  // Handle input changes and validate the field in real-time
  const handleInputChange = (field, value) => {
    // Convert numeric inputs to numbers
    const processedValue =
      field === "price" && value ? parseFloat(value) || "" : value;

    setFormData((prev) => ({
      ...prev,
      [field]: processedValue,
    }));

    try {
      // Validate only the changed field
      formSchema.pick({ [field]: true }).parse({ [field]: processedValue });
      setErrors((prev) => ({ ...prev, [field]: null })); // Clear the error for the field
    } catch (e) {
      setErrors((prev) => ({
        ...prev,
        [field]: e.errors[0]?.message || "Invalid input",
      }));
    }
  };

  // Validate the form when the form data changes
  useEffect(() => {
    try {
      formSchema.parse(formData); // Validate all form data
      setIsFormValid(true);
    } catch (e) {
      setIsFormValid(false);
    }
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Redirect to the /Voucher route with the form data as URL parameters
      const queryParams = new URLSearchParams(formData).toString();
      router.push(`/Voucher?${queryParams}`);
    }
  };

  return (
    <div>
      <form className="p-4 bg-gray-100 rounded shadow space-y-4 max-w-[500px]" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className={`w-full px-3 py-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring focus:border-blue-500`}
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-gray-700 font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price || ""}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            min={100} // Minimum value of 100
            max={9999} // Maximum value of 9999
            className={`w-full px-3 py-2 border rounded ${
              errors.price ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring focus:border-blue-500`}
            placeholder="Enter price (100-9999)"
            inputMode="numeric" // For mobile users, ensure numeric keypad is shown
        />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="wish" className="block text-gray-700 font-medium">
            Wish
          </label>
          <textarea
            id="wish"
            name="wish"
            rows={7}
            maxLength={250} // Limit input to 250 characters
            value={formData.wish || ""}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className={`w-full px-3 py-2 border rounded ${
              errors.wish ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring focus:border-blue-500`}
            placeholder="Enter your wish (max 250 characters)"
          />
          {errors.wish && (
            <p className="text-red-500 text-sm mt-1">{errors.wish}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            {formData.wish.length}/250 characters used
          </p>
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            !isFormValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>

      <div className="mt-10">
        <Design1 data={formData} />

      </div>

    </div>

  );
}
