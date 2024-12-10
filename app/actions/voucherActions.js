"use server";



import { connectToDB } from "@/app/db";
import { Voucher } from "@/app/models/Voucher";

// Utility function to transform MongoDB's `_id` to `id`
const transformVoucher = (voucher) => {
    const transformed = {
        id: voucher._id.toString(), // Convert MongoDB ObjectId to string
        name: voucher.name,
        price: voucher.price,
        wish: voucher.wish,
        createdAt: voucher.createdAt,
        updatedAt: voucher.updatedAt,
    };
    return transformed;
};

// Get all vouchers
export async function fetchVouchers() {
    await connectToDB();
    try {
        const vouchers = await Voucher.find({});
        return vouchers.map(transformVoucher);
    } catch (error) {
        throw new Error(`Failed to fetch vouchers: ${error.message}`);
    }
}

// Get a voucher by ID
export async function fetchVoucherById(id) {
    await connectToDB();
    try {
        const voucher = await Voucher.findById(id);
        if (!voucher) {
            console.warn(`Voucher with ID ${id} not found.`);
            return null;
        }
        return transformVoucher(voucher);
    } catch (error) {
        throw new Error(`Failed to fetch voucher with ID ${id}: ${error.message}`);
    }
}

// Create a new voucher
export async function createVoucher(voucherData) {
    await connectToDB();
    try {
        const newVoucher = await Voucher.create(voucherData);
        return transformVoucher(newVoucher);
    } catch (error) {
        throw new Error(`Failed to create voucher: ${error.message}`);
    }
}

// Update a voucher by ID
export async function updateVoucher(id, voucherData) {
    await connectToDB();
    try {
        const updatedVoucher = await Voucher.findByIdAndUpdate(id, voucherData, { new: true });
        if (!updatedVoucher) {
            console.warn(`Voucher with ID ${id} not found for update.`);
            return null;
        }
        return transformVoucher(updatedVoucher);
    } catch (error) {
        throw new Error(`Failed to update voucher with ID ${id}: ${error.message}`);
    }
}

// Delete a voucher by ID
export async function deleteVoucher(id) {
    await connectToDB();
    try {
        const deletedVoucher = await Voucher.findByIdAndDelete(id);
        if (!deletedVoucher) {
            console.warn(`Voucher with ID ${id} not found for deletion.`);
            return { success: false, message: "Voucher not found" };
        }
        return { success: true };
    } catch (error) {
        throw new Error(`Failed to delete voucher with ID ${id}: ${error.message}`);
    }
}
