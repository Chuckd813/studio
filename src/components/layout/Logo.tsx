
import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center text-primary hover:text-primary/80 transition-colors" aria-label="What's In Tampa Homepage">
      {/* Using Next/Image for optimization */}
      <Image
        src="/images/wit-logo.png" // Assuming your logo is wit-logo.png in public/images
        alt="What's In Tampa Logo"
        width={50} // Increased from 40
        height={50} // Increased from 40
        className="mr-2" 
      />
    </Link>
  );
}
