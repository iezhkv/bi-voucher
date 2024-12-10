"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createVoucher, fetchVoucherById, updateVoucher } from "@/app/actions/voucherActions";

export default function CreateForm({ onChange }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get `id` from search params
    const voucherId = searchParams.get("voucherId");

    // Determine if we are in edit mode
    const editMode = Boolean(voucherId);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [wish, setWish] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Fetch voucher details if in edit mode
    useEffect(() => {
        const loadVoucher = async () => {
            if (editMode) {
                try {
                    const voucher = await fetchVoucherById(voucherId);
                    if (voucher) {
                        setName(voucher.name);
                        setPrice(voucher.price);
                        setWish(voucher.wish);

                        if (onChange) {
                            onChange({ name: voucher.name, price: voucher.price, wish: voucher.wish });
                        }
                    } else {
                        console.error("Voucher not found.");
                    }
                } catch (error) {
                    console.error("Error loading voucher:", error.message);
                }
            }
        };

        loadVoucher();
    }, [editMode, voucherId, onChange]);

    // Pass data to the parent component whenever any form field changes
    useEffect(() => {
        if (onChange) {
            onChange({ name, price, wish });
        }
    }, [name, price, wish, onChange]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const voucherData = { name, price, wish };

        try {
            if (editMode) {
                // Update voucher
                await updateVoucher(voucherId, voucherData);
                router.push(`/vouchers/${voucherId}`);
            } else {
                // Create voucher
                const data = await createVoucher(voucherData);
                if (data.id) {
                    router.push(`/vouchers/${data.id}`);
                } else {
                    throw new Error("Response did not include an ID");
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-[500px] mx-auto">
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
                className={`${editMode ? "btn-edit" : "btn-primary"} px-4 py-2 rounded bg-blue-600 text-white`}
                disabled={isLoading}
            >
                {isLoading ? "Processing..." : editMode ? "Update" : "Create"}
            </button>
        </form>
    );
}
