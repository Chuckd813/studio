import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, CalendarDays, Building2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { mockDeals, mockEvents, mockBusinesses } from '@/lib/mock-data';
import { DealCard } from '@/components/features/DealCard';
import { EventCard } from '@/components/features/EventCard';
import { BusinessCard } from '@/components/features/BusinessCard';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Tampa Bay Skyline"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            data-ai-hint="city skyline"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-md">
            Discover What's In Tampa
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-sm">
            Your ultimate guide to the best businesses, exciting events, and unbeatable deals in Tampa Bay.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="rounded-full text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/businesses">
                Explore Businesses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="rounded-full text-lg px-8 py-6 bg-background/20 border-primary-foreground text-primary-foreground hover:bg-background/30 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/events">
                View Events <CalendarDays className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Hot Deals Preview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary flex items-center">
              <Sparkles className="mr-3 h-8 w-8 text-accent" /> Hot Deals
            </h2>
            <Button variant="link" asChild className="text-primary hover:text-accent">
              <Link href="/deals">View All Deals <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDeals.slice(0, 3).map(deal => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary flex items-center">
              <CalendarDays className="mr-3 h-8 w-8 text-accent" /> Upcoming Events
            </h2>
            <Button variant="link" asChild className="text-primary hover:text-accent">
              <Link href="/events">View Full Calendar <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.slice(0, 3).map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses Preview */}
       <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary flex items-center">
              <Building2 className="mr-3 h-8 w-8 text-accent" /> Featured Businesses
            </h2>
            <Button variant="link" asChild className="text-primary hover:text-accent">
              <Link href="/businesses">Explore All Businesses <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBusinesses.slice(0, 3).map(business => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action for Businesses */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Are you a Tampa Business Owner?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join our platform to reach more customers, promote your services, and list your deals and events.
          </p>
          <Button size="lg" variant="secondary" asChild className="rounded-full text-lg px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="/auth/register">
              Register Your Business <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
