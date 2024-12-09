import Design1 from "@/app/components/vouchers/Design1/Design1";

async function getVoucher(id) {
    const res = await fetch(`http://localhost:4000/vouchers/${id}`, {
        next: { revalidate: 0 },
    });

    if (!res.ok) {
        console.error(`Error fetching voucher data: ${res.statusText}`);
        return null;
    }

    return res.json();
}

export default async function VoucherDetails({ params }) {
    const voucher = await getVoucher(params.id);

    if (!voucher) {
        return (
            <main>
                <h2>Error loading voucher details</h2>
            </main>
        );
    }

    console.log("Voucher data:", voucher);

    return (
        <main>
            <nav>
                <h2>Voucher Details</h2>
            </nav>
            <Design1 voucher={voucher} />
        </main>
    );
}
