import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      {/* Ensure 'logo.png' is placed in the 'public' folder at the root of your project. */}
      <Image
        src="/logo.png"
        alt="What's In Tampa Logo"
        width={40}
        height={40}
        className="h-10 w-auto"
      />
      <span className="text-2xl font-bold sr-only">What's In Tampa</span> {/* Screen-reader only as text is in logo */}
    </Link>
  );
}
