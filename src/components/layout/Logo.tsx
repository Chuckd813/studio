import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      <Image
        src="/logo.png" // Assumes you save your logo as 'logo.png' in the 'public' folder
        alt="What's In Tampa Logo"
        width={40} // Adjust width as needed
        height={40} // Adjust height as needed
        className="h-10 w-auto" // Increased size slightly, adjust as needed
      />
      <span className="text-2xl font-bold sr-only">What's In Tampa</span> {/* Screen-reader only as text is in logo */}
    </Link>
  );
}
