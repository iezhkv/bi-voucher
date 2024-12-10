import mongoose from "mongoose";

const VoucherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    wish: { type: String, required: true },
}, { timestamps: true });

export const Voucher = mongoose.models.Voucher || mongoose.model("Voucher", VoucherSchema);
