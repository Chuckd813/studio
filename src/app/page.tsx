
'use client'; // Required for using React hooks for carousels

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, CalendarDays, Building2, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { mockDeals, mockEvents, mockBusinesses, mockCommunityLeaders } from '@/lib/mock-data';
import { DealCard } from '@/components/features/DealCard';
import { EventCard } from '@/components/features/EventCard';
import { BusinessCard } from '@/components/features/BusinessCard';
import { PersonCard } from '@/components/features/PersonCard';
import { AdSlideshow } from '@/components/features/AdSlideshow';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
  type CarouselApi
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  const [dealsApi, setDealsApi] = useState<CarouselApi>();
  const [dealsCurrent, setDealsCurrent] = useState(0);
  const [dealsCount, setDealsCount] = useState(0);
  const dealsAutoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }));

  const [eventsApi, setEventsApi] = useState<CarouselApi>();
  const [eventsCurrent, setEventsCurrent] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const eventsAutoplayPlugin = useRef(Autoplay({ delay: 5500, stopOnInteraction: true, stopOnMouseEnter: true }));

  const [bizApi, setBizApi] = useState<CarouselApi>();
  const [bizCurrent, setBizCurrent] = useState(0);
  const [bizCount, setBizCount] = useState(0);
  const bizAutoplayPlugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true }));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!dealsApi) return;
    setDealsCount(dealsApi.scrollSnapList().length);
    setDealsCurrent(dealsApi.selectedScrollSnap() + 1);
    dealsApi.on("select", () => setDealsCurrent(dealsApi.selectedScrollSnap() + 1));
    dealsApi.on("reInit", () => {
      setDealsCount(dealsApi.scrollSnapList().length);
      setDealsCurrent(dealsApi.selectedScrollSnap() + 1);
    });
  }, [dealsApi]);

  useEffect(() => {
    if (!eventsApi) return;
    setEventsCount(eventsApi.scrollSnapList().length);
    setEventsCurrent(eventsApi.selectedScrollSnap() + 1);
    eventsApi.on("select", () => setEventsCurrent(eventsApi.selectedScrollSnap() + 1));
     eventsApi.on("reInit", () => {
      setEventsCount(eventsApi.scrollSnapList().length);
      setEventsCurrent(eventsApi.selectedScrollSnap() + 1);
    });
  }, [eventsApi]);

  useEffect(() => {
    if (!bizApi) return;
    setBizCount(bizApi.scrollSnapList().length);
    setBizCurrent(bizApi.selectedScrollSnap() + 1);
    bizApi.on("select", () => setBizCurrent(bizApi.selectedScrollSnap() + 1));
    bizApi.on("reInit", () => {
      setBizCount(bizApi.scrollSnapList().length);
      setBizCurrent(bizApi.selectedScrollSnap() + 1);
    });
  }, [bizApi]);


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary to-accent text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Tampa Bay Skyline during the day"
            layout="fill"
            objectFit="cover"
            className="opacity-20 dark:opacity-10"
            data-ai-hint="tampa skyline day"
            priority
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
            <Button size="lg" asChild className="rounded-full text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <Link href="/businesses">
                Explore Businesses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="rounded-full text-lg px-8 py-6 bg-background/20 border-primary-foreground text-primary-foreground hover:bg-background/30 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <Link href="/events">
                View Events <CalendarDays className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ad Slideshow Section */}
      <AdSlideshow />

      {/* Hot Deals Preview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary flex items-center">
              <Sparkles className="mr-3 h-8 w-8 text-accent" /> <span className="title-gradient-wave dark:title-gradient-wave-dark">Hot Deals</span>
            </h2>
            <Button variant="link" asChild className="text-primary hover:text-accent">
              <Link href="/deals">View All Deals <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[dealsAutoplayPlugin.current]}
            setApi={setDealsApi}
            className="w-full"
            onMouseEnter={dealsAutoplayPlugin.current.stop}
            onMouseLeave={dealsAutoplayPlugin.current.reset}
          >
            <CarouselContent>
              {mockDeals.slice(0, 6).map(deal => (
                <CarouselItem key={deal.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <DealCard deal={deal} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4" />
            <CarouselNext className="hidden sm:flex -right-4" />
            {isMounted && dealsCount > 0 && <CarouselDots className="mt-6" />}
          </Carousel>
           {isMounted && dealsCount > 0 && (
            <div className="py-2 text-center text-sm text-muted-foreground">
              Slide {dealsCurrent} of {dealsCount}
            </div>
          )}
        </div>
      </section>
      
      {/* Advertisement Placeholder 1 */}
      <section className="py-8 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-dashed border-border p-8 rounded-lg text-center text-muted-foreground">
            <p className="text-sm font-semibold">Advertisement</p>
            <p className="text-xs">Your ad could be here! Contact us for rates.</p>
             <Image src="https://placehold.co/728x90.png" alt="Advertisement" width={728} height={90} className="mx-auto mt-4 opacity-50" data-ai-hint="banner ad" />
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-16 bg-secondary/50 dark:bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary flex items-center">
              <CalendarDays className="mr-3 h-8 w-8 text-accent" /> <span className="title-gradient-wave dark:title-gradient-wave-dark">Upcoming Events</span>
            </h2>
            <Button variant="link" asChild className="text-primary hover:text-accent">
              <Link href="/events">View Full Calendar <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[eventsAutoplayPlugin.current]}
            setApi={setEventsApi}
            className="w-full"
            onMouseEnter={eventsAutoplayPlugin.current.stop}
            onMouseLeave={eventsAutoplayPlugin.current.reset}
          >
            <CarouselContent>
              {mockEvents.slice(0, 6).map(event => (
                <CarouselItem key={event.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <EventCard event={event} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4" />
            <CarouselNext className="hidden sm:flex -right-4" />
            {isMounted && eventsCount > 0 && <CarouselDots className="mt-6" />}
          </Carousel>
          {isMounted && eventsCount > 0 && (
            <div className="py-2 text-center text-sm text-muted-foreground">
              Slide {eventsCurrent} of {eventsCount}
            </div>
          )}
        </div>
      </section>

      {/* Featured Businesses Preview */}
       <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary flex items-center">
              <Building2 className="mr-3 h-8 w-8 text-accent" /> <span className="title-gradient-wave dark:title-gradient-wave-dark">Featured Businesses</span>
            </h2>
            <Button variant="link" asChild className="text-primary hover:text-accent">
              <Link href="/businesses">Explore All Businesses <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[bizAutoplayPlugin.current]}
            setApi={setBizApi}
            className="w-full"
            onMouseEnter={bizAutoplayPlugin.current.stop}
            onMouseLeave={bizAutoplayPlugin.current.reset}
          >
            <CarouselContent>
              {mockBusinesses.slice(0, 9).map(business => (
                <CarouselItem key={business.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <BusinessCard business={business} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4" />
            <CarouselNext className="hidden sm:flex -right-4" />
            {isMounted && bizCount > 0 && <CarouselDots className="mt-6" />}
          </Carousel>
           {isMounted && bizCount > 0 && (
            <div className="py-2 text-center text-sm text-muted-foreground">
              Slide {bizCurrent} of {bizCount}
            </div>
          )}
        </div>
      </section>

      {/* Featured Community Leaders */}
      <section className="py-16 bg-secondary/50 dark:bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-primary flex items-center">
              <Users className="mr-3 h-8 w-8 text-accent" /> <span className="title-gradient-wave dark:title-gradient-wave-dark">Featured Community Leaders</span>
            </h2>
            {/* Optional: Link to a page with all leaders */}
            {/* <Button variant="link" asChild className="text-primary hover:text-accent">
              <Link href="/community-leaders">Meet All Leaders <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCommunityLeaders.slice(0, 4).map(leader => (
              <PersonCard key={leader.id} leader={leader} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Advertisement Placeholder 2 */}
      <section className="py-8 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-dashed border-border p-8 rounded-lg text-center text-muted-foreground">
            <p className="text-sm font-semibold">Advertisement</p>
            <p className="text-xs">Support local businesses by advertising with us!</p>
             <Image src="https://placehold.co/728x90.png" alt="Advertisement" width={728} height={90} className="mx-auto mt-4 opacity-50" data-ai-hint="local ad" />
          </div>
        </div>
      </section>

      {/* Call to Action for Businesses */}
      <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
         <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('https://placehold.co/1920x400.png')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(50%)'}} data-ai-hint="abstract pattern"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Are you a Tampa Business Owner?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join our platform to reach more customers, promote your services, and list your deals and events.
          </p>
          <Button size="lg" variant="secondary" asChild className="rounded-full text-lg px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <Link href="/auth/register">
              Register Your Business <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
