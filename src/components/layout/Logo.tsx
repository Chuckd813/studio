import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center text-primary hover:text-primary/80 transition-colors" aria-label="What's In Tampa Homepage">
      <span className="text-3xl font-extrabold tracking-tight title-gradient-wave dark:title-gradient-wave-dark">WIT</span>
    </Link>
  );
}
