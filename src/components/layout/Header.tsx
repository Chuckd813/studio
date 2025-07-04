"use client";

import Link from "next/link";
import {
  Menu,
  X,
  Briefcase,
  CalendarDays,
  Sparkles,
  UserPlus,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { AISearch } from "@/components/features/AISearch";
import { Logo } from "./Logo";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/* ---------- nav + auth link configs ---------- */
const navLinks = [
  { href: "/businesses", label: "Businesses", icon: Briefcase },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/deals", label: "Deals", icon: Sparkles },
  {
    href: "/adventure-wheel",
    label: "WIT Wheel",
    icon: Zap,
    labelClassName: "text-xs",
    iconClassName: "text-tertiary",
  },
  { href: "/invest", label: "Invest", icon: Briefcase },
];

const authLinks = [
  { href: "/auth/register", label: "Register Business", icon: UserPlus },
];

/* ---------- reusable nav item ----------- */
const NavLinkItem: React.FC<{
  href: string;
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
  labelClassName?: string;
  iconClassName?: string;
}> = ({ href, label, icon: Icon, onClick, labelClassName, iconClassName }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-foreground hover:bg-primary/10 hover:text-primary transition-colors text-sm",
        pathname === href && "bg-primary/10 text-primary font-medium"
      )}
    >
      <Icon className={cn("h-5 w-5", iconClassName)} />
      <span className={cn(labelClassName)}>{label}</span>
    </Link>
  );
};

/* ---------- main header component ---------- */
export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* left: logo + title */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Logo />
          </Link>
          {/* Title hidden on very small screens */}
          <span className="ml-2 text-lg sm:text-xl font-semibold text-white hidden sm:inline">
            What's In Tampa
          </span>
        </div>

        {/* center/right desktop nav */}
        <div className="hidden lg:flex items-center gap-3">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLinkItem key={link.href} {...link} />
            ))}
          </nav>

          <AISearch />

          <div className="flex items-center gap-2">
            {authLinks.map((link) => (
              <Button
                key={link.href}
                variant="outline"
                asChild
                className="rounded-full text-sm px-3"
              >
                <Link href={link.href}>
                  <span className="flex items-center gap-1">
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </span>
                </Link>
              </Button>
            ))}

            {pathname !== "/dashboard/profile" && (
              <Button
                variant="default"
                asChild
                className="rounded-full text-sm px-3"
              >
                <Link href="/dashboard/profile">Admin Dashboard</Link>
              </Button>
            )}
          </div>
        </div>

        {/* mobile burger */}
        <div className="lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full max-w-xs bg-background p-6"
            >
              {/* top row */}
              <div className="flex items-center justify-between mb-6 gap-2">
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
                    <NavLinkItem
                      {...link}
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                {authLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Button
                      variant="outline"
                      asChild
                      className="w-full justify-start rounded-md"
                    >
                      <Link href={link.href}>
                        <span className="flex items-center gap-2 py-2 px-3">
                          <link.icon className="h-5 w-5" />
                          {link.label}
                        </span>
                      </Link>
                    </Button>
                  </SheetClose>
                ))}

                {pathname !== "/dashboard/profile" && (
                  <SheetClose asChild>
                    <Button
                      variant="default"
                      asChild
                      className="w-full justify-start rounded-md"
                    >
                      <Link href="/dashboard/profile">
                        <span className="flex items-center gap-2 py-2 px-3">
                          Admin Dashboard
                        </span>
                      </Link>
                    </Button>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
