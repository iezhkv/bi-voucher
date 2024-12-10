import Link from "next/link";
import Design1 from "../components/vouchers/Design1/Design1";
import { fetchVouchers } from "@/app/actions/voucherActions";

export default async function VoucherList() {
    const vouchers = await fetchVouchers(); // Use the server action to fetch vouchers

    return (
        <>
            {vouchers.map((voucher) => (
                <div key={voucher.id} className="my-5">
                    <Link href={`/vouchers/${voucher.id}`}>
                        <Design1 voucher={voucher} hideBack />
                    </Link>
                </div>
            ))}
            {vouchers.length === 0 && <p>No vouchers</p>}
        </>
    );
}
