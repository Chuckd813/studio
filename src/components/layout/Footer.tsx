
import { ContactForm } from '@/components/shared/ContactForm';
import { Separator } from '@/components/ui/separator';
import { Logo } from './Logo';
import { Copyright, Facebook, Instagram, Twitter, ChefHat } from 'lucide-react'; // Added ChefHat
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm">
              Your ultimate guide to businesses, events, and deals in Tampa Bay.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" aria-label="Facebook" className="text-secondary-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-secondary-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-secondary-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/businesses" className="hover:text-primary transition-colors">Browse Businesses</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Event Calendar</Link></li>
              <li><Link href="/deals" className="hover:text-primary transition-colors">Deals</Link></li>
              <li>
                <Link href="/food-randomizer" className="hover:text-primary transition-colors flex items-center">
                  <ChefHat className="h-4 w-4 mr-1.5" /> Food Randomizer
                </Link>
              </li>
              <li><Link href="/auth/register" className="hover:text-primary transition-colors">For Businesses</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4 text-primary">Stay Connected</h3>
            <p className="mb-4 text-sm">Get in touch or sign up for our newsletter.</p>
            <ContactForm />
          </div>
        </div>
        <Separator className="my-8 bg-border/50" />
        <div className="text-center text-sm flex items-center justify-center">
          <Copyright className="h-4 w-4 mr-1.5" />
          {currentYear} What's In Tampa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
