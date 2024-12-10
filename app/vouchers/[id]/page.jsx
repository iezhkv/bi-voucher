import Design1 from "@/app/components/vouchers/Design1/Design1";
import DownloadButton from "./DownloadButton";

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
    const id = await params.id;
    const voucher = await getVoucher(id);

    if (!voucher) {
        return (
            <main>
                <h2>Error loading voucher details</h2>
            </main>
        );
    }

    return (
        <>
            <Design1 voucher={voucher} />
            <DownloadButton id={id} />
        </>
    );
}
