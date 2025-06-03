'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Loader2, Lightbulb, Sparkles, Users, CalendarDays, ArrowRight, ShoppingBag, Utensils, Map } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AISearch } from '@/components/features/AISearch';
import { AdSlideshow } from '@/components/features/AdSlideshow';
import { HomepageWitWheel } from '@/components/features/HomepageWitWheel';
import { generateTampaTip, type GenerateTampaTipOutput } from '@/ai/flows/generate-tampa-tip';
import { mockEvents, mockDeals, mockCommunityLeaders, mockBusinesses, type Business } from '@/lib/mock-data';
import { EventCard } from '@/components/features/EventCard';
import { DealCard } from '@/components/features/DealCard';
import { PersonCard } from '@/components/features/PersonCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi, CarouselDots } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function HomePage() {
  const [tampaTip, setTampaTip] = useState<string | null>(null);
  const [isLoadingTip, setIsLoadingTip] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const [eventsApi, setEventsApi] = useState<CarouselApi>();
  const [currentEventSlide, setCurrentEventSlide] = useState(0);
  const [eventSlideCount, setEventSlideCount] = useState(0);

  const [dealsApi, setDealsApi] = useState<CarouselApi>();
  const [currentDealSlide, setCurrentDealSlide] = useState(0);
  const [dealSlideCount, setDealSlideCount] = useState(0);

  const [leadersApi, setLeadersApi] = useState<CarouselApi>();
  const [currentLeaderSlide, setCurrentLeaderSlide] = useState(0);
  const [leaderSlideCount, setLeaderSlideCount] = useState(0);

  const autoplayPluginEvents = useRef(Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true }));
  const autoplayPluginDeals = useRef(Autoplay({ delay: 5500, stopOnInteraction: true, stopOnMouseEnter: true }));
  const autoplayPluginLeaders = useRef(Autoplay({ delay: 6500, stopOnInteraction: true, stopOnMouseEnter: true }));

  useEffect(() => {
    setIsMounted(true);
    async function fetchTip() {
      try {
        const tipOutput: GenerateTampaTipOutput = await generateTampaTip();
        setTampaTip(tipOutput.tip);
      } catch (error) {
        console.error("Failed to fetch Tampa tip:", error);
        setTampaTip("Explore Tampa's vibrant Riverwalk for beautiful views and activities!");
      } finally {
        setIsLoadingTip(false);
      }
    }
    fetchTip();
  }, []);

  const setupCarouselApi = useCallback((api: CarouselApi | undefined, setCurrentSlide: any, setSlideCount: any) => {
    if (!api) return;
    setSlideCount(api.scrollSnapList().length);
    setCurrentSlide(api.selectedScrollSnap() + 1);
    const onSelect = () => setCurrentSlide(api.selectedScrollSnap() + 1);
    const onReInit = () => {
      setSlideCount(api.scrollSnapList().length);
      setCurrentSlide(api.selectedScrollSnap() + 1);
    };
    api.on("select", onSelect);
    api.on("reInit", onReInit);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, []);

  useEffect(() => setupCarouselApi(eventsApi, setCurrentEventSlide, setEventSlideCount), [eventsApi, setupCarouselApi]);
  useEffect(() => setupCarouselApi(dealsApi, setCurrentDealSlide, setDealSlideCount), [dealsApi, setupCarouselApi]);
  useEffect(() => setupCarouselApi(leadersApi, setCurrentLeaderSlide, setLeaderSlideCount), [leadersApi, setupCarouselApi]);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[100]">
        <Image src="/images/wit-logo.png" alt="What's In Tampa Logo" width={100} height={100} className="mb-4 rounded-xl shadow-lg" />
        <h1 className="text-3xl font-bold text-primary mb-2 title-gradient-white-blue">What's In Tampa</h1>
        <p className="text-lg text-muted-foreground">Discover Tampa Bay</p>
        <Loader2 className="h-8 w-8 text-primary animate-spin mt-6" />
      </div>
    );
  }

  const allEvents = mockEvents;
  const allDeals = mockDeals;
  const allCommunityLeaders = mockCommunityLeaders;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/80 via-primary to-secondary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src="/images/tampa skyline.jpg" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} alt="Tampa skyline" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white">
            <span className="title-gradient-white-blue drop-shadow-lg">Discover What's In Tampa</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-slate-100 drop-shadow-md">
            Your ultimate guide to businesses, events, and exclusive deals across Tampa Bay.
          </p>
          <div className="max-w-xl mx-auto mb-10">
            <AISearch />
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Button size="lg" asChild className="rounded-full shadow-lg hover:scale-105 transition-transform">
              <Link href="/businesses"><Map className="mr-2 h-5 w-5" /> Explore Businesses</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="rounded-full shadow-lg hover:scale-105 transition-transform">
              <Link href="/events"><CalendarDays className="mr-2 h-5 w-5" /> Upcoming Events</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-background/20 text-foreground border-primary-foreground/50 rounded-full shadow-lg hover:scale-105 transition-transform" asChild>
              <Link href="/deals"><ShoppingBag className="mr-2 h-5 w-5" /> Hot Deals</Link>
            </Button>
          </div>
        </div>
      </section>

      <AdSlideshow />
      <HomepageWitWheel />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Events */}
        {allEvents.length > 0 && (
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-3 sm:mb-0">Upcoming Events</h2>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/events">View All Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[autoplayPluginEvents.current]}
              setApi={setEventsApi}
              className="w-full"
              onMouseEnter={autoplayPluginEvents.current.stop}
              onMouseLeave={autoplayPluginEvents.current.reset}
            >
              <CarouselContent>
                {allEvents.map((event, idx) => (
                  <CarouselItem key={idx}>
                    <div className="p-1 h-full">
                      <EventCard event={event} isHomepageContext={true} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-4" />
              <CarouselNext className="hidden sm:flex -right-4" />
              <CarouselDots className="mt-4" />
            </Carousel>
          </section>
        )}

        {/* Tip */}
        <section className="py-10 bg-card border-b border-t border-border rounded-lg">
          <div className="text-center">
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

        {/* Deals */}
        {allDeals.length > 0 && (
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-3 sm:mb-0">Hot Deals & Offers</h2>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/deals">View All Deals <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[autoplayPluginDeals.current]}
              setApi={setDealsApi}
              className="w-full"
              onMouseEnter={autoplayPluginDeals.current.stop}
              onMouseLeave={autoplayPluginDeals.current.reset}
            >
              <CarouselContent>
                {allDeals.map((deal, idx) => (
                  <CarouselItem key={idx}>
                    <div className="p-1 h-full">
                      <DealCard deal={deal} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-4" />
              <CarouselNext className="hidden sm:flex -right-4" />
              <CarouselDots className="mt-4" />
            </Carousel>
          </section>
        )}

        {/* Community Leaders */}
        {allCommunityLeaders.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Meet Tampa's Leaders</h2>
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[autoplayPluginLeaders.current]}
              setApi={setLeadersApi}
              className="w-full"
              onMouseEnter={autoplayPluginLeaders.current.stop}
              onMouseLeave={autoplayPluginLeaders.current.reset}
            >
              <CarouselContent>
                {allCommunityLeaders.map((leader, idx) => (
                  <CarouselItem key={idx}>
                    <div className="p-1 h-full">
                      <PersonCard leader={leader} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-4" />
              <CarouselNext className="hidden sm:flex -right-4" />
              <CarouselDots className="mt-4" />
            </Carousel>
          </section>
        )}
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-accent to-primary text-accent-foreground text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
