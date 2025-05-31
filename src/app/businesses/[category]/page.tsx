import React from 'react';
import { BusinessCard } from '@/components/features/BusinessCard';
import { mockBusinesses, industries } from '@/lib/mock-data';
import { Building2, SearchX } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return industries.map((industry) => ({
    category: encodeURIComponent(industry),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category);

  const businessesForCategory = mockBusinesses.filter(
    business => business.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <Button asChild variant="outline" className="mb-6 rounded-full">
          <Link href="/businesses">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Categories
          </Link>
        </Button>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-primary mb-3 flex items-center">
          <Building2 className="mr-3 h-8 w-8" />
          <span className="title-gradient-wave dark:title-gradient-wave-dark">{category}</span> Businesses
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore businesses in the {category} category. We found {businessesForCategory.length} business(es).
        </p>
      </header>

      {businessesForCategory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
          {businessesForCategory.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <SearchX className="mx-auto h-20 w-20 text-muted-foreground mb-6" />
          <h3 className="text-2xl font-semibold text-foreground mb-3">No Businesses Found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any businesses listed for the "{category}" category at the moment.
            This could be because the category doesn't exist or no businesses are currently listed under it.
          </p>
          <Button asChild className="mt-8 rounded-full">
            <Link href="/businesses">Explore Other Categories</Link>
          </Button>
        </div>
      )}
    </div>
  );
}