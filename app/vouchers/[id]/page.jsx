import Design1 from "@/app/components/vouchers/Design1/Design1";
import DownloadButton from "./DownloadButton";
import DeleteButton from "./DeleteButton"; // Import the DeleteButton component
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
            <div className="flex space-x-4 mt-4"> {/* Add spacing between buttons */}
                <DownloadButton id={id} />
                <DeleteButton id={id} /> {/* Place the DeleteButton here */}
            </div>
        </>
    );
}
