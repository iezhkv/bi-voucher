import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav>
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Dojo Helpdesk logo"
                    width={70}
                    height={70}
                    quality={100}
                />
            </Link>
            <Link href="/">
                <h1>Vouchers</h1>
            </Link>

            <Link href="/vouchers/create">Create</Link>
        </nav>
    );
}
