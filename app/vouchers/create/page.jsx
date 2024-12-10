"use client";

import { useState, useCallback } from "react";
import CreateForm from "./CreateForm";
import Design1 from "@/app/components/vouchers/Design1/Design1";

export default function Page() {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        wish: "",
    });

    // Use `useCallback` to ensure the `handleFormChange` function is stable
    const handleFormChange = useCallback((updatedData) => {
        setFormData(updatedData); // Update the voucher preview in real-time
    }, []);

    return (
        <main>
            <nav>
                <div>
                    <h2>Vouchers</h2>
                    <p>
                        <small>Create a new voucher.</small>
                    </p>
                </div>
            </nav>
            <CreateForm onChange={handleFormChange} />
            <Design1 voucher={formData} hideBack />
        </main>
    );
}
