import fs from "fs";
import path from "path";

// Define file path to store vouchers
const vouchersFilePath = path.join(process.cwd(), "data", "vouchers.json");

// Helper function to read the vouchers file
const readVouchersFile = () => {
  try {
    const data = fs.readFileSync(vouchersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return []; // Return empty array if file does not exist or is empty
  }
};

// Helper function to write to the vouchers file
const writeVouchersFile = (vouchers) => {
  fs.writeFileSync(vouchersFilePath, JSON.stringify(vouchers, null, 2));
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const voucherId = searchParams.get("id");

  // Read all vouchers
  const vouchers = readVouchersFile();

  // Find voucher by ID
  const voucher = vouchers.find((v) => v.id === voucherId);

  if (voucher) {
    return new Response(JSON.stringify(voucher), { status: 200 });
  } else {
    return new Response("Voucher not found", { status: 404 });
  }
}

export async function POST(req) {
  const { name, price, wish } = await req.json();

  if (!name || !price || !wish) {
    return new Response("Missing required fields", { status: 400 });
  }

  // Read existing vouchers
  const vouchers = readVouchersFile();

  // Create a new voucher with a unique ID
  const newVoucher = {
    id: Math.random().toString(36).substr(2, 9), // Simple random ID
    name,
    price,
    wish,
  };

  // Add the new voucher to the list
  vouchers.push(newVoucher);

  // Write the updated vouchers list to the file
  writeVouchersFile(vouchers);

  return new Response(JSON.stringify(newVoucher), { status: 201 });
}
