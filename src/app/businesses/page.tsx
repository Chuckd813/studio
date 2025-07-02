"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  mockBusinesses,
  type Business,
} from "@/lib/mock-data"; // <- replace with real data fetch later

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BusinessCard } from "@/components/features/BusinessCard";
import { Separator } from "@/components/ui/separator";

// --- group businesses by category once, outside component ------------------
const businessesByCategory: Record<string, Business[]> = mockBusinesses.reduce(
  (acc, biz) => {
    const category = biz.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(biz);
    return acc;
  },
  {} as Record<string, Business[]>
);

const allCategories = Object.keys(businessesByCategory);
// ---------------------------------------------------------------------------

export default function BusinessesIndexPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCategories, setDisplayCategories] = useState<string[]>([]);

  // filter & sort whenever searchTerm changes
  useEffect(() => {
    const matches = allCategories
      .filter((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((c) => businessesByCategory[c]?.length > 0)
      .sort((a, b) => a.localeCompare(b));

    setDisplayCategories(matches);
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">
        Explore Businesses by Category
      </h1>

      {/* optional search bar */}
      {/* <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-10 px-4 py-2 rounded bg-gray-800 text-white"
      /> */}

      {displayCategories.map((category) => (
        <section key={category} className="mb-12">
          {/* title row ------------------------------------------------------ */}
          <div className="flex justify-between items-center mb-6">
            <Link
              href={`/businesses/${encodeURIComponent(category)}`}
              className="hover:underline"
            >
              <h2 className="text-2xl font-bold title-gradient-wave dark:title-gradient-wave-dark">
                {category}
              </h2>
            </Link>

            <Link
              href={`/businesses/${encodeURIComponent(category)}`}
              className="text-primary hover:underline text-sm font-semibold"
            >
              View More Businesses
            </Link>
          </div>
          {/* ---------------------------------------------------------------- */}

          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {businessesByCategory[category].map((biz) => (
                <CarouselItem
                  key={biz.id}
                  className="sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 h-full">
                    <BusinessCard business={biz} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <p className="text-center text-sm text-gray-500 mt-2">
              Swipe to see more
            </p>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <Separator className="mt-8" />
        </section>
      ))}
    </div>
  );
}
