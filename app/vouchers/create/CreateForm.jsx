"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createVoucher } from "@/app/actions/voucherActions";

export default function CreateForm({ onChange }) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [wish, setWish] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const newVoucher = { name, price, wish };

        try {
            // Call the `createVoucher` server action
            const data = await createVoucher(newVoucher);

            console.log("Voucher successfully created:", data);

            // Navigate to /vouchers/:id
            if (data.id) {
                router.push(`/vouchers/${data.id}`);
            } else {
                throw new Error("Response did not include an ID");
            }
        } catch (error) {
            console.error("Error creating voucher:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-1/2 space-y-4">
            <label className="block">
                <span className="text-sm font-medium">Name:</span>
                <input
                    required
                    type="text"
                    className="block w-full border rounded p-2"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Enter voucher name"
                />
            </label>
            <label className="block">
                <span className="text-sm font-medium">Price:</span>
                <input
                    required
                    type="number"
                    className="block w-full border rounded p-2"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    min={100}
                    max={9999}
                    placeholder="Enter voucher price"
                />
            </label>
            <label className="block">
                <span className="text-sm font-medium">Wish:</span>
                <textarea
                    required
                    className="block w-full border rounded p-2"
                    onChange={(e) => setWish(e.target.value)}
                    value={wish}
                    rows={5}
                    maxLength={250}
                    placeholder="Enter a wish or message"
                />
            </label>
            <button
                type="submit"
                className="btn-primary px-4 py-2 rounded bg-blue-600 text-white"
                disabled={isLoading}
            >
                {isLoading ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
}
