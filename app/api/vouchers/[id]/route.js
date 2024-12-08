import { NextResponse } from 'next/server';

// Mock Data (to simulate vouchers data)
const mockVouchers = [
  { id: '1', name: 'Voucher 1', amount: 100 },
  { id: '2', name: 'Voucher 2', amount: 150 },
  { id: '3', name: 'Voucher 3', amount: 200 },
];

// GET: Fetch a single voucher by ID
export async function GET(req, { params }) {
  const { id } = params; // Extract voucher ID from the URL
  const voucher = mockVouchers.find((v) => v.id === id);

  if (voucher) {
    return NextResponse.json({ message: 'Voucher fetched successfully', voucher });
  } else {
    return NextResponse.json({ error: `Voucher with ID ${id} not found` }, { status: 404 });
  }
}

// PUT: Update a voucher by ID
export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json(); // Get the updated voucher data

  // Find and update the voucher in mock data
  const index = mockVouchers.findIndex((v) => v.id === id);
  if (index !== -1) {
    mockVouchers[index] = { ...mockVouchers[index], ...data }; // Update the voucher with new data
    return NextResponse.json({ message: 'Voucher updated successfully', voucher: mockVouchers[index] });
  } else {
    return NextResponse.json({ error: `Voucher with ID ${id} not found` }, { status: 404 });
  }
}

// DELETE: Delete a voucher by ID
export async function DELETE(req, { params }) {
  const { id } = params;
  const index = mockVouchers.findIndex((v) => v.id === id);

  if (index !== -1) {
    mockVouchers.splice(index, 1); // Remove the voucher from mock data
    return NextResponse.json({ message: `Voucher with ID ${id} deleted successfully` });
  } else {
    return NextResponse.json({ error: `Voucher with ID ${id} not found` }, { status: 404 });
  }
}
