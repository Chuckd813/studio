
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Sparkles, CalendarDays, Building2, Users, Loader2, Zap, ShoppingBag, Palette, Lightbulb, Download, Smartphone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { mockDeals, mockEvents, featuredBusinesses, mockCommunityLeaders } from '@/lib/mock-data';
import { DealCard } from '@/components/features/DealCard';
import { EventCard } from '@/components/features/EventCard';
import { BusinessCard } from '@/components/features/BusinessCard';
import { PersonCard } from '@/components/features/PersonCard';
import { HomepageWitWheel } from '@/components/features/HomepageWitWheel';
import { generateTampaTip, type GenerateTampaTipOutput } from '@/ai/flows/generate-tampa-tip';
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
  const [dailyTip, setDailyTip] = useState<string | null>(null);
  const [isLoadingTip, setIsLoadingTip] = useState(true);

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

  const [leadersApi, setLeadersApi] = useState<CarouselApi>();
  const [leadersCurrent, setLeadersCurrent] = useState(0);
  const [leadersCount, setLeadersCount] = useState(0);
  const leadersAutoplayPlugin = useRef(Autoplay({ delay: 6500, stopOnInteraction: true, stopOnMouseEnter: true }));


  useEffect(() => {
    setIsMounted(true);
    fetchDailyTip();
  }, []);

  const fetchDailyTip = useCallback(async () => {
    setIsLoadingTip(true);
    try {
      const tipResult: GenerateTampaTipOutput = await generateTampaTip();
      setDailyTip(tipResult.tip);
    } catch (error) {
      console.error("Error fetching daily tip:", error);
      setDailyTip("Could not fetch a tip today. Explore Tampa and discover your own!");
    } finally {
      setIsLoadingTip(false);
    }
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

  useEffect(() => {
    if (!leadersApi) return;
    setLeadersCount(leadersApi.scrollSnapList().length);
    setLeadersCurrent(leadersApi.selectedScrollSnap() + 1);
    leadersApi.on("select", () => setLeadersCurrent(leadersApi.selectedScrollSnap() + 1));
    leadersApi.on("reInit", () => {
      setLeadersCount(leadersApi.scrollSnapList().length);
      setLeadersCurrent(leadersApi.selectedScrollSnap() + 1);
    });
  }, [leadersApi]);

  return (
    <div className="flex flex-col">
      {/* New Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1602509839193-9967f8201b57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" // Tampa night skyline
            alt="Tampa Bay Skyline at Night"
            fill
            priority
            className="object-cover opacity-40 dark:opacity-30"
            data-ai-hint="tampa skyline night"
          />
          <div className="absolute inset-0 bg-black/30"></div> {/* Darkening overlay for better text contrast */}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Text Content */}
            <div className="bg-background/70 dark:bg-background/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl text-center md:text-left">
              <div className="inline-block mb-4">
                 <Image src="/images/wit-logo.png" alt="WIT Logo" width={80} height={80} data-ai-hint="app logo" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-foreground">
                INVEST IN WIT – <br className="hidden sm:block" />YOUR GATEWAY TO TAMPA'S <br className="hidden sm:block" /> <span className="text-primary">$8.4B+</span> LOCAL MARKET
              </h1>
              <p className="text-lg md:text-xl mb-6 text-foreground/80">
                The Future of Tampa Discovery
              </p>
              <p className="text-sm text-foreground/60">
                {/* Consider if this email should be displayed or be a link */}
                MrTampaFL • themrtampaflggmail.com 
              </p>
            </div>

            {/* Right Phone Mockup & Add to Homescreen */}
            <div className="flex flex-col items-center">
              <div className="relative w-[280px] h-[580px] sm:w-[300px] sm:h-[620px] bg-neutral-800 rounded-[40px] shadow-2xl p-4 border-4 border-neutral-700 overflow-hidden">
                <Image 
                  src="https://placehold.co/400x800.png?text=App+Preview" 
                  alt="App Preview on Phone"
                  fill
                  className="object-cover rounded-[25px]"
                  data-ai-hint="app interface mobile"
                />
                 {/* Notch (optional visual detail) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-neutral-800 rounded-b-xl"></div>
              </div>
              <div className="mt-6 text-center bg-background/70 dark:bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-center mb-2">
                    <Smartphone className="h-6 w-6 mr-2 text-primary"/>
                    <h3 className="text-lg font-semibold text-foreground">Get the WIT App Experience!</h3>
                </div>
                <p className="text-sm text-foreground/80 mb-3">Add What's In Tampa to your homescreen for quick access.</p>
                <Button 
                    variant="default" 
                    size="lg" 
                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                    onClick={() => alert("To add to homescreen, tap the share button in your browser and select 'Add to Home Screen'.")}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Add to Homescreen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <HomepageWitWheel />

      {/* Featured Businesses Section */}
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
          {!isMounted ? (
            <div className="flex items-center justify-center py-10 text-muted-foreground">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading featured businesses...
            </div>
          ) : (
            <Carousel
              opts={{ align: "start", loop: featuredBusinesses.length > 2 }}
              plugins={[bizAutoplayPlugin.current]}
              setApi={setBizApi}
              className="w-full"
              onMouseEnter={bizAutoplayPlugin.current.stop}
              onMouseLeave={bizAutoplayPlugin.current.reset}
            >
              <CarouselContent>
                {featuredBusinesses.map(business => (
                  <CarouselItem key={business.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <BusinessCard business={business} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {isMounted && bizCount > 0 && (
                <>
                  <CarouselPrevious className="hidden sm:flex -left-4" />
                  <CarouselNext className="hidden sm:flex -right-4" />
                  <CarouselDots className="mt-6" />
                  <div className="py-2 text-center text-sm text-muted-foreground">
                    Slide {bizCurrent} of {bizCount}
                  </div>
                </>
              )}
            </Carousel>
          )}
        </div>
      </section>

      {/* Hot Deals Section */}
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
          {!isMounted ? (
            <div className="flex items-center justify-center py-10 text-muted-foreground">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading hot deals...
            </div>
          ) : (
            <Carousel
              opts={{ align: "start", loop: mockDeals.slice(0, 6).length > 2 }}
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
              {isMounted && dealsCount > 0 && (
                <>
                  <CarouselPrevious className="hidden sm:flex -left-4" />
                  <CarouselNext className="hidden sm:flex -right-4" />
                  <CarouselDots className="mt-6" />
                  <div className="py-2 text-center text-sm text-muted-foreground">
                    Slide {dealsCurrent} of {dealsCount}
                  </div>
                </>
              )}
            </Carousel>
          )}
        </div>
      </section>
      
      {/* Ad Placeholder 1 */}
      <section className="py-8 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <Card className="p-4 md:p-6 rounded-lg shadow-md text-center border-2 border-dashed border-primary/30 bg-gradient-to-br from-accent/5 to-primary/5">
            <div className="relative w-full h-32 sm:h-40 mb-3 rounded-md overflow-hidden">
              <Image src="https://placehold.co/728x90.png?text=Your+Business+Ad+Here" alt="Advertise your business" fill style={{ objectFit: 'contain' }} data-ai-hint="advertisement banner" />
            </div>
            <CardHeader className="p-0 pb-3">
              <ShoppingBag className="mx-auto h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-xl font-semibold text-primary">Feature Your Business!</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2 text-sm text-foreground">
              <p>Reach thousands of Tampa locals and visitors by showcasing your business here.</p>
              <ul className="list-disc list-inside text-left inline-block text-xs space-y-0.5">
                <li>Prime placement on our homepage.</li>
                <li>Increase brand visibility.</li>
                <li>Drive targeted traffic.</li>
              </ul>
               <Button asChild className="mt-3 rounded-full bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
                <Link href="/auth/register">Advertise With Us</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Upcoming Events Section */}
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
          {!isMounted ? (
             <div className="flex items-center justify-center py-10 text-muted-foreground">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading upcoming events...
            </div>
          ) : (
            <Carousel
              opts={{ align: "start", loop: mockEvents.slice(0, 6).length > 2 }}
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
               {isMounted && eventsCount > 0 && (
                <>
                  <CarouselPrevious className="hidden sm:flex -left-4" />
                  <CarouselNext className="hidden sm:flex -right-4" />
                  <CarouselDots className="mt-6" />
                   <div className="py-2 text-center text-sm text-muted-foreground">
                    Slide {eventsCurrent} of {eventsCount}
                  </div>
                </>
              )}
            </Carousel>
          )}
        </div>
      </section>

      {/* Tampa Tip of the Day Section */}
      <section className="py-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10">
            <CardHeader className="text-center pb-3">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Lightbulb className="h-7 w-7 text-primary" />
                Tampa Tip of the Day!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {isLoadingTip ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
                  <p className="text-muted-foreground">Fetching today's tip...</p>
                </div>
              ) : (
                <p className="text-lg italic text-foreground">"{dailyTip}"</p>
              )}
              <Button variant="link" onClick={fetchDailyTip} disabled={isLoadingTip} className="mt-3 text-primary hover:text-accent">
                {isLoadingTip ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> :  <Zap className="mr-2 h-4 w-4"/>}
                Get Another Tip
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Community Leaders Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-primary flex items-center">
              <Users className="mr-3 h-8 w-8 text-accent" /> <span className="title-gradient-wave dark:title-gradient-wave-dark">Featured Community Leaders</span>
            </h2>
          </div>
          {!isMounted ? (
             <div className="flex items-center justify-center py-10 text-muted-foreground">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading community leaders...
            </div>
          ) : (
            <Carousel
              opts={{ align: "start", loop: mockCommunityLeaders.length > 2 }}
              plugins={[leadersAutoplayPlugin.current]}
              setApi={setLeadersApi}
              className="w-full"
              onMouseEnter={leadersAutoplayPlugin.current.stop}
              onMouseLeave={leadersAutoplayPlugin.current.reset}
            >
              <CarouselContent>
                {mockCommunityLeaders.map(leader => (
                  <CarouselItem key={leader.id} className="basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="p-1 h-full">
                      <PersonCard leader={leader} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {isMounted && leadersCount > 0 && (
                <>
                  <CarouselPrevious className="hidden sm:flex -left-4" />
                  <CarouselNext className="hidden sm:flex -right-4" />
                  <CarouselDots className="mt-6" />
                  <div className="py-2 text-center text-sm text-muted-foreground">
                    Slide {leadersCurrent} of {leadersCount}
                  </div>
                </>
              )}
            </Carousel>
          )}
        </div>
      </section>
      
      {/* Ad Placeholder 2 */}
      <section className="py-8 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <Card className="p-4 md:p-6 rounded-lg shadow-md text-center border-2 border-dashed border-accent/30 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="relative w-full h-32 sm:h-40 mb-3 rounded-md overflow-hidden">
                <Image src="https://placehold.co/728x90.png?text=Your+Event+Ad+Here" alt="Advertise your event or venue" fill style={{ objectFit: 'contain' }} data-ai-hint="advertisement banner" />
            </div>
            <CardHeader className="p-0 pb-3">
              <Palette className="mx-auto h-8 w-8 text-accent mb-2" />
              <CardTitle className="text-xl font-semibold text-accent">Showcase Your Event!</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2 text-sm text-foreground">
              <p>Got an event Tampa needs to know about? Attract more attendees by featuring it here.</p>
              <ul className="list-disc list-inside text-left inline-block text-xs space-y-0.5">
                <li>Boost event visibility.</li>
                <li>Highlight your venue’s unique features.</li>
                <li>Connect with an engaged local audience.</li>
              </ul>
              <Button asChild className="mt-3 rounded-full bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
                <Link href="/auth/register">Promote Your Event</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="relative py-20 bg-primary/80 text-primary-foreground overflow-hidden">
         <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('https://images.unsplash.com/photo-1562403792-39e3055osae?auto=format&fit=crop&w=1920&q=60')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(50%)'}} data-ai-hint="abstract pattern"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Are you a Tampa Business Owner?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join our platform to reach more customers, promote your services, and list your deals and events.
          </p>
          <Button size="lg" asChild className="rounded-full text-lg px-8 py-6 bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <Link href="/auth/register">
              Register Your Business <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
