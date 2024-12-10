import Link from "next/link";
import CreateForm from "./CreateForm";


export default function page() {
    return (
        <main>
        <nav>
          <div>
            <h2>Vouchers</h2>
            <p><small>Create a new voucher.</small></p>
          </div>
        </nav>
        {/* <Suspense fallback={<Loading />}> */}
          <CreateForm />
        {/* </Suspense> */}
      </main>
    );
}
