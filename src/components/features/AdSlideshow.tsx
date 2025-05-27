
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
  CarouselDots, // Assuming CarouselDots is part of your ShadCN Carousel
  type CarouselApi
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { mockBusinesses, industries } from '@/lib/mock-data'; // Assuming industries is exported
import type { Business } from '@/types';
import { ArrowRight } from 'lucide-react';

export function AdSlideshow() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const businessesToShow: Business[] = industries.map(industry => {
    return mockBusinesses.find(business => business.category === industry) as Business;
  }).filter(Boolean); // Filter out any undefined if an industry has no business

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (businessesToShow.length === 0) {
    return null; // Don't render anything if no businesses are found
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
            loop: true,
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
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={business.dataAiHint || 'business storefront'}
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg line-clamp-1">{business.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{business.category}</p>
                    </CardHeader>
                    <CardContent className="flex-grow pt-2">
                      <p className="text-sm text-muted-foreground line-clamp-3">{business.description}</p>
                    </CardContent>
                    <div className="p-4 pt-0 mt-auto">
                      <Button asChild size="sm" className="w-full rounded-full">
                        <Link href={`/businesses/${business.id}`}>
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
          <CarouselDots className="mt-6" />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </div>
    </section>
  );
}
