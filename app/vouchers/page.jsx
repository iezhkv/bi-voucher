import { Suspense } from "react"

export const dynamic = "force-dynamic";

// import Loading from "../loading"
import Link from "next/link"
import VoucherList from "./VoucherList"

export default function Vouchers() {
  return (
    <main>
      <nav>
        <div>
          <h2>Vouchers</h2>
          <p><small>All vouchers.</small></p>
        </div>
        <Link href="/vouchers/create" className="ml-auto">
          <button className="btn-primary">New Voucher</button>
        </Link>
      </nav>
      {/* <Suspense fallback={<Loading />}> */}
        <VoucherList />
      {/* </Suspense> */}
    </main>
  )
}