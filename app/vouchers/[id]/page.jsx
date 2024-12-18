import Design1 from "@/app/components/vouchers/design1/Design1";
import DownloadButton from "./DownloadButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
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
            <div className="flex space-x-4 mt-4">
                <DownloadButton id={id} />
                <EditButton id={id} /> 
                <DeleteButton id={id} />
            </div>
        </>
    );
}
