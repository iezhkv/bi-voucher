"use client";

import { useRouter } from "next/navigation";
import { deleteVoucher } from "@/app/actions/voucherActions";
import { useState } from "react";

export default function DeleteButton({ id }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this voucher?")) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteVoucher(id); // Call the server action to delete the voucher
            router.push("/vouchers"); // Redirect to the list of vouchers after deletion
        } catch (error) {
            console.error("Error deleting voucher:", error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn-delete px-4 py-2 rounded"
        >
            {isDeleting ? "Deleting..." : "Delete"}
        </button>
    );
}
