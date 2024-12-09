"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateForm() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [wish, setWish] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const newVoucher = {
            name,
            price,
            wish,
        };

        const res = await fetch("http://localhost:4000/vouchers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newVoucher),
        });

        if (res.status === 201) {
            router.refresh();
            router.push("/vouchers");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-1/2">
            <label>
                <span>Name:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </label>
            <label>
                <span>Price:</span>
                <input
                    required
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />
            </label>
            <label>
                <span>Wish:</span>
                <textarea
                    required
                    onChange={(e) => setWish(e.target.value)}
                    value={wish}
                />
            </label>
            
            <button className="btn-primary" disabled={isLoading}>
                {isLoading && <span>Adding...</span>}
                {!isLoading && <span>Create Voucher</span>}
            </button>
        </form>
    );
}
