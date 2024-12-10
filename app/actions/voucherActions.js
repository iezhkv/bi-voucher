"use server";

const API_BASE_URL = process.env.JSON_SERVER_API || "http://localhost:4000/vouchers";

// Get all vouchers
export async function fetchVouchers() {
    const response = await fetch(API_BASE_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store", // Disable caching for fresh data
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch vouchers: ${response.statusText}`);
    }

    return response.json();
}

// Get a voucher by ID
export async function fetchVoucherById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    // Handle 404 Not Found gracefully
    if (response.status === 404) {
        console.warn(`Voucher with ID ${id} not found.`);
        return null;
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch voucher with ID ${id}: ${response.statusText}`);
    }

    return response.json();
}

// Create a new voucher
export async function createVoucher(voucherData) {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voucherData),
    });

    if (!response.ok) {
        throw new Error(`Failed to create voucher: ${response.statusText}`);
    }

    return response.json();
}

// Update a voucher by ID
export async function updateVoucher(id, voucherData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voucherData),
    });

    if (response.status === 404) {
        console.warn(`Voucher with ID ${id} not found for update.`);
        return null;
    }

    if (!response.ok) {
        throw new Error(`Failed to update voucher with ID ${id}: ${response.statusText}`);
    }

    return response.json();
}

// Delete a voucher by ID
export async function deleteVoucher(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (response.status === 404) {
        console.warn(`Voucher with ID ${id} not found for deletion.`);
        return { success: false, message: "Voucher not found" };
    }

    if (!response.ok) {
        throw new Error(`Failed to delete voucher with ID ${id}: ${response.statusText}`);
    }

    return { success: true };
}
