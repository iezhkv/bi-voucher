import FormComponent from "@/components/FormComponent";
import Design1 from "@/components/Vouchers/Design1/Design1";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="font-semibold text-gray-700 mb-4">
          Create Your Voucher
        </h1>
        {/* Render the FormComponent */}
        <FormComponent />
      </div>
    </div>
  );
}
