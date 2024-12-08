import fs from 'fs';
import path from 'path';

// Define file path to store vouchers
const vouchersFilePath = path.join(process.cwd(), 'data', 'vouchers.json');

// Helper function to read the vouchers file
const readVouchersFile = () => {
  try {
    const data = fs.readFileSync(vouchersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return []; // Return empty array if file does not exist or is empty
  }
};

// Helper function to get voucher by ID
const getVoucherById = (voucherId) => {
  const vouchers = readVouchersFile();
  return vouchers.find((v) => v.id === voucherId);
};

export async function GET(req, { params }) {
  const { voucherId } = params;  // Get the voucherId from the URL

  // Get voucher by ID using helper function
  const voucher = getVoucherById(voucherId);

  if (voucher) {
    // Return JSON with proper Content-Type header
    return new Response(JSON.stringify(voucher), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    // Return 404 with JSON response
    return new Response(
      JSON.stringify({ error: 'Voucher not found' }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
