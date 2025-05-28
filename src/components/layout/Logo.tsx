import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center text-primary hover:text-primary/80 transition-colors" aria-label="What's In Tampa Homepage">
      {/* Using Next/Image for optimization */}
      <Image
        src="/images/wit-logo.png"
        alt="What's In Tampa Logo"
        width={40} // Adjust width as needed
        height={40} // Adjust height as needed
        className="mr-2" // Add some spacing to the right of the logo
      />
    </Link>
  );
}
