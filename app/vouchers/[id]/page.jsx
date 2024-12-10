import Design1 from "@/app/components/vouchers/Design1/Design1";
import DownloadButton from "./DownloadButton";
import { fetchVoucherById } from "@/app/actions/voucherActions";

export default async function VoucherDetails({ params }) {
    const id = params.id;
    const voucher = await fetchVoucherById(id); // Use the server action to fetch the voucher

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
