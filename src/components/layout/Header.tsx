'use client';

import Link from 'next/link';
import { Menu, X, Briefcase, CalendarDays, Sparkles, UserPlus, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { AISearch } from '@/components/features/AISearch';
import { Logo } from './Logo';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/businesses', label: 'Businesses', icon: Briefcase },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/deals', label: 'Hot Deals', icon: Sparkles },
];

const authLinks = [
  { href: '/auth/register', label: 'Register Business', icon: UserPlus },
  { href: '/auth/login', label: 'Business Login', icon: LogIn },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null; // Avoid rendering mismatch during hydration
  }

  const NavLinkItem: React.FC<{ href: string, label: string, icon: React.ElementType, onClick?: () => void }> = ({ href, label, icon: Icon, onClick }) => (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-foreground hover:bg-primary/10 hover:text-primary transition-colors",
        pathname === href && "bg-primary/10 text-primary font-medium"
      )}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden lg:flex items-center gap-4">
          <nav className="flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLinkItem key={link.href} {...link} />
            ))}
          </nav>
          <AISearch />
          <div className="flex items-center gap-2">
            {authLinks.map((link) => (
              <Button key={link.href} variant="outline" asChild className="rounded-full">
                <Link href={link.href} className="flex items-center gap-1">
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Logo />
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
                </div>
                <div className="mb-6">
                  <AISearch />
                </div>
                <nav className="flex flex-col gap-3 mb-6">
                  {navLinks.map((link) => (
                     <SheetClose key={link.href} asChild>
                        <NavLinkItem {...link} onClick={() => setIsMobileMenuOpen(false)} />
                     </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-3">
                  {authLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                       <Button variant="outline" asChild className="w-full justify-start rounded-md">
                         <Link href={link.href} className="flex items-center gap-2 py-2 px-3">
                           <link.icon className="h-5 w-5" />
                           {link.label}
                         </Link>
                       </Button>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
