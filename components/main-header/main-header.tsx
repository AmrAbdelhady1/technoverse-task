import Link from "next/link";

import CartDropdown from "../cart-dropdown/cart-dropdown";

import { LogoSvg } from "@/assets/header-svgs";

export default function MainHeader() {
  return (
    <header className="py-4 flex items-center justify-between border-b">
      <Link href="/">
        <LogoSvg />
      </Link>

      <CartDropdown />
    </header>
  );
}
