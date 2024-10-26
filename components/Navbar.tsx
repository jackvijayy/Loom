import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex justify-between fixed z-50 w-full px-6 py-4 lg:px-10 bg-dark-1 text-white">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="logo"
          fetchPriority={undefined}
          loading="lazy"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Loom
        </p>
      </Link>
      <div className="flex justify-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton/>
        </SignedOut>
        {/* clerk user management */}

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
