"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateForm({ onChange }) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [wish, setWish] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Update parent whenever form data changes
    useEffect(() => {
        if (onChange) {
            onChange({ name, price, wish });
        }
    }, [name, price, wish, onChange]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const newVoucher = { name, price, wish };

        try {
            const response = await fetch("http://localhost:4000/vouchers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newVoucher),
            });

            if (!response.ok) {
                throw new Error("Failed to create voucher");
            }

            const data = await response.json(); // Parse the response JSON to get the `id`
            console.log("Voucher successfully created:", data);

            // Navigate to /vouchers/:id
            if (data.id) {
                router.push(`/vouchers/${data.id}`);
            } else {
                throw new Error("Response did not include an ID");
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-1/2 space-y-4">
            <label className="block">
                <span>Name:</span>
                <input
                    required
                    type="text"
                    className="block w-full border p-2"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </label>
            <label className="block">
                <span>Price:</span>
                <input
                    required
                    type="number"
                    className="block w-full border p-2"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    min={100}
                    max={9999}
                />
            </label>
            <label className="block">
                <span>Wish:</span>
                <textarea
                    required
                    className="block w-full border p-2"
                    onChange={(e) => setWish(e.target.value)}
                    value={wish}
                    rows={5}
                    maxLength={250}
                />
            </label>
            <button className="btn-primary" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
}
