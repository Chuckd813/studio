// Force IDE re-parse

import React from 'react';
import { BusinessCard } from '@/components/features/BusinessCard';
import { type Business, mockBusinesses } from '@/lib/mock-data'; // Import Business type from mock data
import { Building2 } from 'lucide-react';
;
interface IndustryPageProps {
  params: {
    industry: string;
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const industry = params.industry;

  // Filter mock data by industry
  const businessesForIndustry = mockBusinesses.filter(business => business.industry === decodeURIComponent(industry));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header and content remain the same */}
      {businessesForIndustry.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
          {businessesForIndustry.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Businesses Found</h3>
          <p className="text-muted-foreground">
            There are no businesses listed for the {industry} industry yet.
          </p>
        </div>
      )}
    </div>
  );
}