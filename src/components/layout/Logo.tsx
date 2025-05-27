import Link from 'next/link';

const CustomMapPinIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 2C7.48 2 4 5.48 4 10.05C4 16.05 12 22 12 22s8-5.95 8-11.95C20 5.48 16.52 2 12 2zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
  </svg>
);

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      <CustomMapPinIcon className="h-8 w-8" />
      <span className="text-2xl font-bold">What's In Tampa</span>
    </Link>
  );
}
