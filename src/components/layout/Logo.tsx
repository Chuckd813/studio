import Link from 'next/link';
import { MapPin } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      <MapPin className="h-8 w-8" />
      <span className="text-2xl font-bold">What's In Tampa</span>
    </Link>
  );
}
