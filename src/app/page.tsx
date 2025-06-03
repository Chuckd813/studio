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
import { mockEvents, mockDeals, mockCommunityLeaders } from '@/lib/mock-data';
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
        <h1 className="text-3xl font-bold text-primary mb-2 title-gradient-white-blue">WHAT'S IN TAMPA</h1>
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
      {/* Hero Section with Video */}
      <section className="relative py-20 md:py-32 text-primary-foreground overflow-hidden bg-black">
        <video
          autoPlay
          loop
          controls={false}
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/images/Tampa.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white">
            <span className="title-gradient-white-blue drop-shadow-lg">WHAT'S IN TAMPA</span>
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

      {/* You can leave the rest of the page content here (Events, Deals, Leaders, CTA...) unchanged */}
    </div>
  );
}
