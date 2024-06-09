import Link from "next/link";

import { CartIcon, LogoSvg } from "@/assets/header-svgs";

export default function MainHeader() {
  return (
    <header className="py-4 flex items-center justify-between border-b">
      <Link href="/">
        <LogoSvg />
      </Link>

      <span className="cursor-pointer">
        <CartIcon />
      </span>
    </header>
  );
}
