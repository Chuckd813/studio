
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { featuredBusinesses } from '@/lib/mock-data';
import type { Business } from '@/types';
import { ArrowRight, Globe } from 'lucide-react'; // Added Globe icon

// Placeholder SVGs for social media icons
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 3.4 5.2H19c-1.1-.9-2.5-1.4-4-1.4H7.9c-.9 0-1.7.9-1.7 2s.8 2 1.7 2h1c1.1 0 2.1.9 2.1 2s-.9 2-2.1 2H6.6c-1.1 0-2.1-.9-2.1-2s.9-2 2.1-2h.1c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-.1c-.4 0-.7-.1-.9-.2-.3-.2-.5-.4-.7-.7-.2-.3-.4-.6-.5-1-.1-.4-.2-.8-.2-1.2s.1-.8.2-1.2c.2-1 .6-1.9 1.2-2.7.6-.8 1.5-1.5 2.5-2C9.4 5.1 10.8 4 12.5 4H22zm-2.5 2.5c-.1 0-.3.1-.4.1L19 7c-.8.8-1.8 1.3-2.8 1.5-.7.1-1.5.1-2.2 0-.7-.1-1.3-.3-1.9-.6-.6-.3-1.1-.7-1.6-1.1-.5-.4-1-.7-1.4-.9-.4-.2-.9-.4-1.3-.5-.4-.1-.8-.1-1.2 0-.4.1-.8.2-1.1.4-.3.2-.6.4-.8.7-.2.3-.4.6-.5.9-.1.3-.1.7-.1 1s0 .7.1 1c.1.3.2.6.4.8.2.2.4.4.6.6.2.2.5.3.7.4.3.1.5.2.8.2h.7c1.1 0 2.1.9 2.1 2s-.9 2-2.1 2H9.4c-.3 0-.5.2-.5.5s.2.5.5.5h4.1c1.1 0 2.1.9 2.1 2s-.9 2-2.1 2h-3c-1.1 0-2.1-.9-2.1-2s.9-2 2.1-2h.1c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H9c-.4 0-.7-.1-.9-.2-.3-.2-.5-.4-.7-.7-.2-.3-.4-.6-.5-1-.1-.4-.2-.8-.2-1.2s.1-.8.2-1.2c.2-1 .6-1.9 1.2-2.7.6-.8 1.5-1.5 2.5-2C11.9 5.6 13.3 5 15 5h4.5c.3 0 .5.1.7.3.2.2.3.4.3.7z"></path>
  </svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
  </svg>
);


export function AdSlideshow() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [isMounted, setIsMounted] = React.useState(false);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  
  const businessesToShow: Business[] = featuredBusinesses; 

  React.useEffect(() => {
    if (!api) {
      return
    }
    const onReInit = () => {
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);
    };
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1)
    };
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);
    api.on("reInit", onReInit); // Use onReInit for robustness

    return () => {
        api.off("select", onSelect);
        api.off("reInit", onReInit);
    };
  }, [api]);


  if (!isMounted && businessesToShow.length === 0) {
    return null; // Render nothing if not mounted and no businesses
  }
  
  if (!isMounted) {
    // SSR placeholder to reduce layout shift
    return (
      <section className="py-12 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-2">
            <span className="title-gradient-wave dark:title-gradient-wave-dark">Business Spotlight</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8">Discover leading businesses across Tampa Bay.</p>
          <div className="w-full max-w-4xl mx-auto p-1 h-[350px] bg-card rounded-lg shadow-md animate-pulse">
            {/* Placeholder content for one item */}
          </div>
           <div className="py-2 text-center text-sm text-muted-foreground" style={{ minHeight: '1.25rem' }}>&nbsp;</div>
        </div>
      </section>
    );
  }

  if (businessesToShow.length === 0) {
    return null;
  }


  return (
    <section className="py-12 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary text-center mb-2">
          <span className="title-gradient-wave dark:title-gradient-wave-dark">Business Spotlight</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8">Discover leading businesses across Tampa Bay.</p>
        <Carousel
          opts={{
            align: "start",
            loop: businessesToShow.length > (isMounted && typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : (typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1)),
          }}
          plugins={[plugin.current]}
          setApi={setApi}
          className="w-full max-w-4xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {businessesToShow.map((business) => (
              <CarouselItem key={business.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative w-full h-48">
                      <Image
                        src={business.imageUrl}
                        alt={business.name} 
                        fill
                        style={{ objectFit: 'cover' }}
                        data-ai-hint={business.dataAiHint || 'business image'}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg line-clamp-1">{business.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{business.category}</p>
                    </CardHeader>
                    <CardContent className="flex-grow pt-2">
                      <p className="text-sm text-muted-foreground line-clamp-3">{business.description}</p>
                    </CardContent>
                    <div className="p-4 pt-2 mt-auto flex flex-col gap-3"> {/* Increased gap for buttons */}
                      {business.socialMedia && Object.keys(business.socialMedia).length > 0 && (
                        <div className="flex justify-center space-x-4 mb-2">
                          {business.socialMedia.facebook && (
                            <a href={business.socialMedia.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${business.name} on Facebook`} className="text-muted-foreground hover:text-primary">
                              <FacebookIcon />
                            </a>
                          )}
                          {business.socialMedia.twitter && (
                            <a href={business.socialMedia.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${business.name} on Twitter`} className="text-muted-foreground hover:text-primary">
                              <TwitterIcon />
                            </a>
                          )}
                          {business.socialMedia.instagram && (
                            <a href={business.socialMedia.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${business.name} on Instagram`} className="text-muted-foreground hover:text-primary">
                              <InstagramIcon />
                            </a>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-between w-full space-x-2">
                         {business.website && (
                            <Button variant="outline" size="sm" asChild className="rounded-full flex-1 min-w-0">
                              <a href={business.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 truncate">
                                <Globe className="h-4 w-4" /> <span className="truncate">Visit Website</span>
                              </a>
                            </Button>
                          )}
                        <Button size="sm" asChild className={`rounded-full flex-1 min-w-0 ${!business.website ? 'w-full' : ''}`}>
                            <Link href={`/businesses/${business.id}`}>
                                Follow
                            </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {isMounted && count > 0 && (
            <>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
              <CarouselDots className="mt-6" />
              <div className="pt-2 text-center text-sm text-muted-foreground" style={{minHeight: '1.25rem'}}>
                 {current > 0 && count > 0 ? `Slide ${current} of ${count}` : <>&nbsp;</>}
               </div>
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
}

