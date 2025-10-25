import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Image
              src="/logo.png"            
              alt="ClinicQ"
              width={32}
              height={32}
              className="rounded-lg"
              priority
            />
            <span className="text-slate-900">ClinicQ</span>
          </Link>

          <nav className="flex items-center gap-4">
            {/* add nav links here if needed */}
          </nav>
        </div>
      </div>
    </header>
  );
}