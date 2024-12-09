import Design1 from "@/app/components/Vouchers/Design1/Design1"

async function getVoucher(id) {
    const res = await fetch(`http://localhost:4000/vouchers/${id}`,{
        next: {
            revalidate: 0
        }
    })

    return res.json()
}

export default async function VoucherDetails({ params }) {

    const voucher = await getVoucher(params.id)

  return (
    <main>
        <nav>
            <h2>Voucher Details</h2>
        </nav>
        <Design1 voucher={voucher}/>
    </main>
  )
}
