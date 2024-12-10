"use client";

import { useRouter } from "next/navigation";

export default function UpdateButton({ id }) {
    const router = useRouter();

    const handleUpdateClick = () => {
        router.push(`/vouchers/create?voucherId=${id}`);
    };

    return (
        <button
            onClick={handleUpdateClick}
            className="btn-primary"
        >
            Edit
        </button>
    );
}
