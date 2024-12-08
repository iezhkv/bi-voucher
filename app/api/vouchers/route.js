import { NextResponse } from 'next/server';

// GET: Fetch all vouchers (mock response)
export async function GET() {
  return NextResponse.json({ message: 'GET request to /api/vouchers - Vouchers fetched successfully' });
}

// POST: Create a new voucher (mock response)
export async function POST(req) {
  try {
    // Extract request data (not used in this case, just a placeholder)
    const data = await req.json();

    // Returning a mock success response
    return NextResponse.json({ message: 'POST request to /api/vouchers - Voucher created successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error in POST request to /api/vouchers', error: error.message }, { status: 500 });
  }
}
