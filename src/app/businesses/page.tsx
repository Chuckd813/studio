
'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockBusinesses, type Business } from '@/lib/mock-data'; // Assuming mock data for now
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { BusinessCard } from '@/components/features/BusinessCard';
import { Separator } from '@/components/ui/separator'; // For visual separation between categories



// Group businesses by category outside the component
const businessesByCategory: Record<string, Business[]> = mockBusinesses.reduce(
    (acc, business) => {
      const category = business.category || 'Other'; // Handle businesses without a category
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(business);
      return acc;
    },
    {} as Record<string, Business[]>
  );

  // Get the list of categories
const categories = Object.keys(businessesByCategory);

export default function BusinessesIndexPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // Initialize displayCategories with all categories that have businesses
  const [displayCategories, setDisplayCategories] = useState<string[]>(
    []
  );

  // Filter displayCategories based on search term
  useEffect(() => {
    const filteredCategories = categories.filter((category) =>
 category.toLowerCase().includes(searchTerm.toLowerCase()),
 );

    // Sort filtered categories alphabetically
    filteredCategories.sort((a, b) => a.localeCompare(b));

    // Filter again to include only categories with businesses and sort businesses within them
    const categoriesWithSortedBusinesses = filteredCategories
 .filter(cat => businessesByCategory[cat]?.length > 0)
 .map(category => {
        const sortedBusinesses = [...businessesByCategory[category]].sort((a, b) => a.name.localeCompare(b.name));
 return { category, businesses: sortedBusinesses };
 });

 setDisplayCategories(categoriesWithSortedBusinesses.map(item => item.category));
 }, [searchTerm]); // Depend only on searchTerm

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">Explore Businesses by Category</h1>

      {/* Iterate over displayCategories to render sections */}
      {displayCategories.map(category => (
        businessesByCategory[category].length > 0 && ( // Only render if there are businesses in the category
          <section key={category} className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">{category}</h2>
              {/* Optional: Add a "View All" link for the category */}
              {/* <Link href={`/businesses/${encodeURIComponent(category)}`} className="text-primary hover:underline">
                View All {category}
              </Link> */}
            </div>

            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent>
                {businessesByCategory[category].map(business => (
                  <CarouselItem key={business.id} className="sm:basis-1/2 lg:basis-1/3">


                    <div className="p-1 h-full">
                      {/* Render the BusinessCard component */}
                      <BusinessCard business={business} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <Separator className="mt-8" />
          </section>
        )
      ))}
    </div>
  );
}
