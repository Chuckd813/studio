"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Loader2,
  Lightbulb,
  Sparkles,
  Users,
  CalendarDays,
  ArrowRight,
  ShoppingBag,
  Utensils,
  Map,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AISearch } from "@/components/features/AISearch";
import { AdSlideshow } from "@/components/features/AdSlideshow";
import { HomepageWitWheel } from "@/components/features/HomepageWitWheel";
import {
  generateTampaTip,
  type GenerateTampaTipOutput,
} from "@/ai/flows/generate-tampa-tip";
import {
  mockEvents,
  mockDeals,
  mockCommunityLeaders,
  mockBusinesses,
  type Business,
} from "@/lib/mock-data";
import { EventCard } from "@/components/features/EventCard";
import { DealCard } from "@/components/features/DealCard";
import { PersonCard } from "@/components/features/PersonCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
  CarouselDots,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HomePage() {
  /* -------------------------------------------------- state  */
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

  /* -------------------------------------------------- carousel autoplay refs  */
  const autoplayPluginEvents = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const autoplayPluginDeals = useRef(
    Autoplay({ delay: 5500, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const autoplayPluginLeaders = useRef(
    Autoplay({ delay: 6500, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  /* -------------------------------------------------- mount + tip fetch  */
  useEffect(() => {
    setIsMounted(true);
    async function fetchTip() {
      try {
        const tipOutput: GenerateTampaTipOutput = await generateTampaTip();
        setTampaTip(tipOutput.tip);
      } catch (error) {
        console.error("Failed to fetch Tampa tip:", error);
        setTampaTip(
          "Explore Tampa's vibrant Riverwalk for beautiful views and activities!"
        );
      } finally {
        setIsLoadingTip(false);
      }
    }
    fetchTip();
  }, []);

  /* -------------------------------------------------- carousel helpers  */
  const setupCarouselApi = useCallback(
    (
      api: CarouselApi | undefined,
      setCurrentSlide: React.Dispatch<React.SetStateAction<number>>,
      setSlideCount: React.Dispatch<React.SetStateAction<number>>
    ) => {
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
    },
    []
  );

  useEffect(
    () => setupCarouselApi(eventsApi, setCurrentEventSlide, setEventSlideCount),
    [eventsApi, setupCarouselApi]
  );
  useEffect(
    () => setupCarouselApi(dealsApi, setCurrentDealSlide, setDealSlideCount),
    [dealsApi, setupCarouselApi]
  );
  useEffect(
    () =>
      setupCarouselApi(leadersApi, setCurrentLeaderSlide, setLeaderSlideCount),
    [leadersApi, setupCarouselApi]
  );

  /* -------------------------------------------------- constants / mocks  */
  const allEvents = mockEvents;
  const allDeals = mockDeals;
  const allCommunityLeaders = mockCommunityLeaders;

  const categories = [
    { name: "Restaurants", icon: Utensils, href: "/businesses/Food%20&%20Beverage" },
    { name: "Shopping", icon: ShoppingBag, href: "/businesses/Retail" },
    { name: "Nightlife", icon: Sparkles, href: "/events?category=Nightlife" },
    { name: "Arts & Culture", icon: Users, href: "/businesses/Arts%20&%20Culture" },
    { name: "Services", icon: Users, href: "/businesses/Professional%20Services" },
  ];

  /* -------------------------------------------------- render  */
  if (!isMounted) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[100]">
        <Image
          src="/images/wit-logo.png"
          alt="What's In Tampa Logo"
          width={100}
          height={100}
          className="mb-4 rounded-xl shadow-lg"
          data-ai-hint="app logo loading"
        />
        <h1 className="text-3xl font-bold text-primary mb-2 title-gradient-white-blue">
          What's In Tampa
        </h1>
        <p className="text-lg text-muted-foreground">Discover Tampa Bay</p>
        <Loader2 className="h-8 w-8 text-primary animate-spin mt-6" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* ======================== HERO ================================= */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/80 via-primary to-secondary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/images/Tampa.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white">
            <span className="title-gradient-white-blue drop-shadow-lg">
              WHAT'S IN TAMPA
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-slate-100 drop-shadow-md">
            Your ultimate guide to businesses, events, and exclusive deals across
            Tampa Bay.
          </p>

          <div className="max-w-xl mx-auto mb-10">
            <AISearch />
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Button
              size="lg"
              asChild
              className="rounded-full shadow-lg transform hover:scale-105 transition-transform"
            >
              <Link href="/businesses" className="flex items-center">
                <Map className="mr-2 h-5 w-5" /> Explore Businesses
              </Link>
            </Button>

            <Button
              size="lg"
              variant="secondary"
              asChild
              className="rounded-full shadow-lg transform hover:scale-105 transition-transform"
            >
              <Link href="/events" className="flex items-center">
                <CalendarDays className="mr-2 h-5 w-5" /> Upcoming Events
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-background/20 hover:bg-background/30 text-foreground border-primary-foreground/50 hover:border-primary-foreground rounded-full shadow-lg transform hover:scale-105 transition-transform"
              asChild
            >
              <Link href="/deals" className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" /> Hot Deals
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== BUSINESS OF THE MONTH ==================== */}
      <section className="mb-1 text-center px-4 py-12">
        <h2 className="text-3xl font-bold text-primary mb-2">
          Business of the Month
        </h2>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto text-lg">
 The team behind Big Financial Services is made up of qualified financial professionals who are passionate about helping individuals and families work toward their ideal retirements.
        </p>

        <Button asChild className="rounded-full mb-6">
 <Link
            href="https://bigfinancialsvc.com/"
            target="_blank"
            rel="noopener noreferrer"
 >
            Visit Website
 </Link>
 </Button>


        <div className="w-full max-w-5xl mx-auto aspect-video mb-6">
          <video
            controls
            className="w-full h-full object-cover rounded-xl shadow-md"
              poster="/images/glennpic.png"
          >
            <source src="/images/Glenn.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* ==================== ADS + WIT WHEEL ========================= */}
      <AdSlideshow />
      <HomepageWitWheel />

      {/* ==================== BUSINESS SPOTLIGHT + REST ============== */}
      <section className="text-center px-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* -------------------- EVENTS -------------------- */}
          {allEvents.length > 0 && (
            <section>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-primary mb-3 sm:mb-0">
                  <span className="title-gradient-wave dark:title-gradient-wave-dark">
                    Upcoming Events
                  </span>
                </h2>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/events">
                    View All Events <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <Carousel
                opts={{
                  align: "start",
                  loop:
                    allEvents.length >
                    (isMounted && window.innerWidth >= 1024
                      ? 3
                      : window.innerWidth >= 768
                      ? 2
                      : 1),
                }}
                plugins={[autoplayPluginEvents.current]}
                setApi={setEventsApi}
                className="w-full"
                onMouseEnter={autoplayPluginEvents.current.stop}
                onMouseLeave={autoplayPluginEvents.current.reset}
              >
                <CarouselContent>
                  {allEvents.map((event) => (
                    <CarouselItem
                      key={event.id}
                      className="sm:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1 h-full">
                        <EventCard event={event} isHomepageContext />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {isMounted && eventSlideCount > 0 && (
                  <>
                    <CarouselPrevious className="hidden sm:flex -left-4" />
                    <CarouselNext className="hidden sm:flex -right-4" />
                    <CarouselDots className="mt-4" />
                    <div
                      className="pt-2 text-center text-sm text-muted-foreground"
                      style={{ minHeight: "1.25rem" }}
                    >
                      {currentEventSlide > 0 && eventSlideCount > 0 ? (
                        `Slide ${currentEventSlide} of ${eventSlideCount}`
                      ) : (
                        <>&nbsp;</>
                      )}
                    </div>
                  </>
                )}
              </Carousel>
            </section>
          )}

          {/* -------------------- TAMPA TIP -------------------- */}
          <section className="py-10 bg-card border-b border-t border-border rounded-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="flex items-center justify-center mb-2">
                <Lightbulb className="h-7 w-7 text-tertiary mr-2" />
                <h2 className="text-xl font-semibold text-tertiary">
                  Tampa Tip of the Day
                </h2>
              </div>
              {isLoadingTip ? (
                <div className="flex items-center justify-center text-muted-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Fetching your
                  daily tip...
                </div>
              ) : (
                <p className="text-lg text-foreground italic">"{tampaTip}"</p>
              )}
            </div>
          </section>

          {/* -------------------- DEALS -------------------- */}
          {allDeals.length > 0 && (
            <section className="py-12 bg-muted/30 dark:bg-muted/10 rounded-lg p-6 md:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-primary mb-3 sm:mb-0">
                  <span className="title-gradient-wave dark:title-gradient-wave-dark">
                    Hot Deals &amp; Offers
                  </span>
                </h2>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/deals">
                    View All Deals <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <Carousel
                opts={{
                  align: "start",
                  loop:
                    allDeals.length >
                    (isMounted && window.innerWidth >= 1024
                      ? 3
                      : window.innerWidth >= 768
                      ? 2
                      : 1),
                }}
                plugins={[autoplayPluginDeals.current]}
                setApi={setDealsApi}
                className="w-full"
                onMouseEnter={autoplayPluginDeals.current.stop}
                onMouseLeave={autoplayPluginDeals.current.reset}
              >
                <CarouselContent>
                  {allDeals.map((deal) => (
                    <CarouselItem
                      key={deal.id}
                      className="sm:basis-1/2 lg:basis-1/3"
                    >
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
                    <CarouselDots className="mt-4" />
                    <div
                      className="pt-2 text-center text-sm text-muted-foreground"
                      style={{ minHeight: "1.25rem" }}
                    >
                      {currentDealSlide > 0 && dealSlideCount > 0 ? (
                        `Slide ${currentDealSlide} of ${dealSlideCount}`
                      ) : (
                        <>&nbsp;</>
                      )}
                    </div>
                  </>
                )}
              </Carousel>
            </section>
          )}

          {/* -------------------- CATEGORIES -------------------- */}
          <section>
            <h2 className="text-3xl font-bold text-center text-primary mb-8">
              <span className="title-gradient-wave dark:title-gradient-wave-dark">
                Explore Categories
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((cat) => (
                <Link key={cat.name} href={cat.href}>
                  <Card className="text-center p-4 hover:shadow-lg transition-shadow hover:border-primary h-full flex flex-col items-center justify-center">
                    <cat.icon className="h-8 w-8 text-primary mb-2" />
                    <p className="font-medium text-foreground">{cat.name}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* -------------------- COMMUNITY LEADERS -------------- */}
          {allCommunityLeaders.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                <span className="title-gradient-wave dark:title-gradient-wave-dark">
                  Meet Tampa's Leaders
                </span>
              </h2>
              <Carousel
                opts={{
                  align: "start",
                  loop:
                    allCommunityLeaders.length >
                    (isMounted && window.innerWidth >= 1024
                      ? 3
                      : window.innerWidth >= 768
                      ? 2
                      : 1),
                }}
                plugins={[autoplayPluginLeaders.current]}
                setApi={setLeadersApi}
                className="w-full"
                onMouseEnter={autoplayPluginLeaders.current.stop}
                onMouseLeave={autoplayPluginLeaders.current.reset}
              >
                <CarouselContent>
                  {allCommunityLeaders.map((leader) => (
                    <CarouselItem
                      key={leader.id}
                      className="sm:basis-1/2 lg:basis-1/3"
                    >
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
                    <CarouselDots className="mt-4" />
                    <div
                      className="pt-2 text-center text-sm text-muted-foreground"
                      style={{ minHeight: "1.25rem" }}
                    >
                      {currentLeaderSlide > 0 && leaderSlideCount > 0 ? (
                        `Slide ${currentLeaderSlide} of ${leaderSlideCount}`
                      ) : (
                        <>&nbsp;</>
                      )}
                    </div>
                  </>
                )}
              </Carousel>
            </section>
          )}
        </div>
      </section>

      {/* ==================== CTA FOR BUSINESSES ===================== */}
      <section className="py-16 bg-gradient-to-r from-accent to-primary text-accent-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Are you a Tampa Business?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join What's In Tampa to reach more customers, promote your deals, and
            list your events.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent rounded-full shadow-lg transform hover:scale-105 transition-transform"
            asChild
          >
            <Link href="/auth/register">Register Your Business Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
