import Link from "next/link";
import Design1 from "@/app/components/vouchers/Design1/Design1";
import { fetchVouchers } from "@/app/actions/voucherActions";

export const dynamic = "force-dynamic";

export default async function VoucherList() {
    const vouchers = await fetchVouchers(); // Use the server action to fetch vouchers

    return (
        <div className="max-w-screen-sm mx-auto">
            {vouchers.map((voucher) => (
                <div key={voucher.id} className="my-5">
                    <Link href={`/vouchers/${voucher.id}`}>
                        <Design1 voucher={voucher} hideBack />
                    </Link>
                </div>
            ))}
            {vouchers.length === 0 && <p>No vouchers</p>}
        </div>
    );
}
