import Link from "next/link"
import Design1 from "../components/Vouchers/Design1/Design1"

async function getVouchers() {
    const res = await fetch('http://localhost:4000/vouchers',{
        next: {
            revalidate: 0
        }
    })

    return res.json()
}

export default async function VoucherList() {

    const vouchers = await getVouchers()
  return (
    <>
    {vouchers.map((voucher) => (
        <div key={voucher.id} className="my-5 ">
            <Link href={`/vouchers/${voucher.id}`}>
            <Design1 voucher={voucher} hideBack />
            </Link>
        </div>
    ))}
    {vouchers.length === 0 && (
        <p>No vouchers</p>
    )}
    </>
  )
}
