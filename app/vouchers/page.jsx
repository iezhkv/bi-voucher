import React from 'react'
import VoucherList from './VoucherList'

export default function page() {
  return (
    <main>
        <nav>
            <div>
                <h2>Vouchers</h2>
                <p><small>Latest vouchers</small></p>
            </div>
        </nav>
        <VoucherList/>
    </main>
  )
}
