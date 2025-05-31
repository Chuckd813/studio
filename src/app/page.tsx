
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AISearch } from '@/components/features/AISearch';
import { AdSlideshow } from '@/components/features/AdSlideshow';
import { HomepageWitWheel } from '@/components/features/HomepageWitWheel';
import { generateTampaTip, type GenerateTampaTipOutput } from '@/ai/flows/generate-tampa-tip';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Loader2, Lightbulb, Sparkles, Users, CalendarDays, ArrowRight, ShoppingBag, Utensils, Map } from 'lucide-react';
import { mockEvents, mockDeals, mockCommunityLeaders } from '@/lib/mock-data'; // Removed featuredBusinesses as AdSlideshow handles its own data
import { EventCard } from '@/components/features/EventCard';
import { DealCard } from '@/components/features/DealCard';
import { PersonCard } from '@/components/features/PersonCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

export default function HomePage() {
  const [tampaTip, setTampaTip] = useState<string | null>(null);
  const [isLoadingTip, setIsLoadingTip] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // State for Events Carousel
  const [eventsApi, setEventsApi] = useState<CarouselApi>();
  const [currentEventSlide, setCurrentEventSlide] = useState(0);
  const [eventSlideCount, setEventSlideCount] = useState(0);

  // State for Deals Carousel
  const [dealsApi, setDealsApi] = useState<CarouselApi>();
  const [currentDealSlide, setCurrentDealSlide] = useState(0);
  const [dealSlideCount, setDealSlideCount] = useState(0);

  // State for Leaders Carousel
  const [leadersApi, setLeadersApi] = useState<CarouselApi>();
  const [currentLeaderSlide, setCurrentLeaderSlide] = useState(0);
  const [leaderSlideCount, setLeaderSlideCount] = useState(0);
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  useEffect(() => {
    setIsMounted(true);
    async function fetchTip() {
      try {
        const tipOutput: GenerateTampaTipOutput = await generateTampaTip();
        setTampaTip(tipOutput.tip);
      } catch (error) {
        console.error("Failed to fetch Tampa tip:", error);
        setTampaTip("Explore Tampa's vibrant Riverwalk for beautiful views and activities!"); // Fallback tip
      } finally {
        setIsLoadingTip(false);
      }
    }
    fetchTip();
  }, []);

  // Effect for Events Carousel
  useEffect(() => {
    if (!eventsApi) return;
    setEventSlideCount(eventsApi.scrollSnapList().length);
    setCurrentEventSlide(eventsApi.selectedScrollSnap() + 1);
    eventsApi.on("select", () => setCurrentEventSlide(eventsApi.selectedScrollSnap() + 1));
    eventsApi.on("reInit", () => {
        setEventSlideCount(eventsApi.scrollSnapList().length);
        setCurrentEventSlide(eventsApi.selectedScrollSnap() + 1);
    });
  }, [eventsApi]);

  // Effect for Deals Carousel
  useEffect(() => {
    if (!dealsApi) return;
    setDealSlideCount(dealsApi.scrollSnapList().length);
    setCurrentDealSlide(dealsApi.selectedScrollSnap() + 1);
    dealsApi.on("select", () => setCurrentDealSlide(dealsApi.selectedScrollSnap() + 1));
    dealsApi.on("reInit", () => {
        setDealSlideCount(dealsApi.scrollSnapList().length);
        setCurrentDealSlide(dealsApi.selectedScrollSnap() + 1);
    });
  }, [dealsApi]);

  // Effect for Leaders Carousel
  useEffect(() => {
    if (!leadersApi) return;
    setLeaderSlideCount(leadersApi.scrollSnapList().length);
    setCurrentLeaderSlide(leadersApi.selectedScrollSnap() + 1);
    leadersApi.on("select", () => setCurrentLeaderSlide(leadersApi.selectedScrollSnap() + 1));
    leadersApi.on("reInit", () => {
        setLeaderSlideCount(leadersApi.scrollSnapList().length);
        setCurrentLeaderSlide(leadersApi.selectedScrollSnap() + 1);
    });
  }, [leadersApi]);


  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
        <h1 className="text-2xl font-semibold text-primary mb-2">What's In Tampa</h1>
        <p className="text-muted-foreground">Loading your guide to Tampa Bay...</p>
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[100]">
          <Image src="/images/wit-logo.png" alt="What's In Tampa Logo" width={100} height={100} className="mb-4 rounded-xl shadow-lg" data-ai-hint="app logo loading" />
          <h1 className="text-3xl font-bold text-primary mb-2 title-gradient-white-blue">What's In Tampa</h1>
          <p className="text-lg text-muted-foreground">Discover Tampa Bay</p>
          <Loader2 className="h-8 w-8 text-primary animate-spin mt-6" />
        </div>
      </div>
    );
  }

  const allEvents = mockEvents;
  const allDeals = mockDeals; // Using all deals, confidence filter can be done if needed
  const allCommunityLeaders = mockCommunityLeaders;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/80 via-primary to-secondary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Tampa Background"
            fill
            style={{objectFit: "cover"}}
            sizes="100vw"
            priority
            data-ai-hint="tampa skyline abstract"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            <span className="title-gradient-white-blue">Discover What's In Tampa</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-primary-foreground/90 drop-shadow-sm">
            Your ultimate guide to businesses, events, and exclusive deals across Tampa Bay.
          </p>
          <div className="max-w-xl mx-auto mb-10">
            <AISearch />
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Button size="lg" asChild className="rounded-full shadow-lg transform hover:scale-105 transition-transform">
              <Link href="/businesses" className="flex items-center">
                <Map className="mr-2 h-5 w-5" /> Explore Businesses
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="rounded-full shadow-lg transform hover:scale-105 transition-transform">
              <Link href="/events" className="flex items-center">
                <CalendarDays className="mr-2 h-5 w-5" /> Upcoming Events
              </Link>
            </Button>
             <Button size="lg" variant="outline" className="bg-background/20 hover:bg-background/30 text-foreground border-primary-foreground/50 hover:border-primary-foreground rounded-full shadow-lg transform hover:scale-105 transition-transform" asChild>
              <Link href="/deals" className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" /> Hot Deals
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Homepage WIT Wheel Teaser Section */}
      <HomepageWitWheel />

      {/* Featured Businesses / Ad Slideshow (Moved Up) */}
      <AdSlideshow />
      
      {/* Dynamic Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Upcoming Events Section (Carousel) */}
        {allEvents.length > 0 && (
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-3 sm:mb-0"><span className="title-gradient-wave dark:title-gradient-wave-dark">Upcoming Events</span></h2>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/events">View All Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <Carousel
              opts={{ align: "start", loop: allEvents.length > 3 }}
              plugins={[Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })]}
              setApi={setEventsApi}
              className="w-full"
            >
              <CarouselContent>
                {allEvents.map(event => (
                  <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <EventCard event={event} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {isMounted && eventSlideCount > 0 && (
                <>
                  <CarouselPrevious className="hidden sm:flex -left-4" />
                  <CarouselNext className="hidden sm:flex -right-4" />
                   <div className="py-2 text-center text-sm text-muted-foreground">
                     Slide {currentEventSlide} of {eventSlideCount}
                   </div>
                </>
              )}
            </Carousel>
          </section>
        )}

        {/* Tampa Tip Section (Moved Down) */}
        <section className="py-10 bg-card border-b border-t border-border rounded-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-2">
              <Lightbulb className="h-7 w-7 text-tertiary mr-2" />
              <h2 className="text-xl font-semibold text-tertiary">Tampa Tip of the Day</h2>
            </div>
            {isLoadingTip ? (
              <div className="flex items-center justify-center text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Fetching your daily tip...
              </div>
            ) : (
              <p className="text-lg text-foreground italic">"{tampaTip}"</p>
            )}
          </div>
        </section>

        {/* Hot Deals Section (Carousel) */}
        {allDeals.length > 0 && (
           <section className="py-12 bg-muted/30 dark:bg-muted/10 rounded-lg p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-3 sm:mb-0"><span className="title-gradient-wave dark:title-gradient-wave-dark">Hot Deals & Offers</span></h2>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/deals">View All Deals <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
             <Carousel
              opts={{ align: "start", loop: allDeals.length > 3 }}
              plugins={[Autoplay({ delay: 5500, stopOnInteraction: true, stopOnMouseEnter: true })]}
              setApi={setDealsApi}
              className="w-full"
            >
              <CarouselContent>
                {allDeals.map(deal => (
                  <CarouselItem key={deal.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <DealCard deal={deal} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
               {isMounted && dealSlideCount > 0 && (
                <>
                  <CarouselPrevious className="hidden sm:flex -left-4" />
                  <CarouselNext className="hidden sm:flex -right-4" />
                  <div className="py-2 text-center text-sm text-muted-foreground">
                     Slide {currentDealSlide} of {dealSlideCount}
                   </div>
                </>
              )}
            </Carousel>
          </section>
        )}
        
        {/* Categories Section (Grid - Unchanged) */}
        <section>
          <h2 className="text-3xl font-bold text-center text-primary mb-8"><span className="title-gradient-wave dark:title-gradient-wave-dark">Explore Categories</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: "Restaurants", icon: Utensils, href: "/businesses/Food%20&%20Beverage", "data-ai-hint": "food plate" },
              { name: "Shopping", icon: ShoppingBag, href: "/businesses/Retail", "data-ai-hint": "storefront shopping" },
              { name: "Nightlife", icon: Sparkles, href: "/events?category=Nightlife", "data-ai-hint": "city nightlife" },
              { name: "Arts & Culture", icon: Users, href: "/businesses/Arts%20&%20Culture", "data-ai-hint": "art gallery" },
              { name: "Services", icon: Users, href: "/businesses/Professional%20Services", "data-ai-hint": "business meeting" },
            ].map(category => (
              <Link key={category.name} href={category.href}>
                <Card className="text-center p-4 hover:shadow-lg transition-shadow hover:border-primary h-full flex flex-col items-center justify-center">
                  <category.icon className="h-8 w-8 text-primary mb-2" />
                  <p className="font-medium text-foreground">{category.name}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Community Leaders Section (Carousel) */}
        {allCommunityLeaders.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8 text-center"><span className="title-gradient-wave dark:title-gradient-wave-dark">Meet Tampa's Leaders</span></h2>
            <Carousel
              opts={{ align: "start", loop: allCommunityLeaders.length > 3 }}
              plugins={[Autoplay({ delay: 6500, stopOnInteraction: true, stopOnMouseEnter: true })]}
              setApi={setLeadersApi}
              className="w-full"
            >
              <CarouselContent>
                {allCommunityLeaders.map(leader => (
                  <CarouselItem key={leader.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <PersonCard leader={leader} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {isMounted && leaderSlideCount > 0 && (
                <>
                  <CarouselPrevious className="hidden sm:flex -left-4" />
                  <CarouselNext className="hidden sm:flex -right-4" />
                  <div className="py-2 text-center text-sm text-muted-foreground">
                     Slide {currentLeaderSlide} of {leaderSlideCount}
                   </div>
                </>
              )}
            </Carousel>
          </section>
        )}
      </div>

      {/* Call to Action for Businesses */}
      <section className="py-16 bg-gradient-to-r from-accent to-primary text-accent-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Are you a Tampa Business?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join What's In Tampa to reach more customers, promote your deals, and list your events.
          </p>
          <Button size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent rounded-full shadow-lg transform hover:scale-105 transition-transform" asChild>
            <Link href="/auth/register">Register Your Business Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

    