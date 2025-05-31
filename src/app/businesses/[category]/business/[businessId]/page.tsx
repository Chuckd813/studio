import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockBusinesses, type Business } from '../../../../../lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface BusinessPageProps {
  params: {
    category: string;
    businessId: string;
  };
}

export default function BusinessDetailPage({ params }: BusinessPageProps) {
  const { category, businessId } = params;

  // Find the business using the businessId
  // In a real application, you would fetch this data from an API or database
  const business = mockBusinesses.find((b: Business) => b.id === businessId);

  if (!business) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-red-500">Business Not Found</h1>
        <p className="text-muted-foreground mt-4">
          Could not find the business with ID: {businessId} in category: {decodeURIComponent(category)}
        </p>
        <Link href={`/businesses/${encodeURIComponent(category)}`} className="mt-6 inline-block text-primary hover:underline">
          Back to {decodeURIComponent(category)} businesses
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="relative w-full h-64 sm:h-80 md:h-96">
          {business.imageUrl && (
            <Image
              src={business.imageUrl}
              alt={business.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              data-ai-hint={`Image of ${business.name}`}
            />
          )}
           {!business.imageUrl && (
            <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground">
                No Image Available
            </div>
           )}
        </div>
        <div className="p-6 md:p-8">
          <Badge variant="secondary" className="mb-3">{business.category}</Badge>
          <h1 className="text-3xl font-bold text-foreground mb-4">{business.name}</h1>
          <p className="text-muted-foreground text-lg mb-6">
            {business.description || 'No description available.'}
          </p>

          <div className="space-y-4 mb-6">
            {business.website && (
              <div className="flex items-center text-primary hover:underline">
                <Link href={business.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                   <Globe className="h-5 w-5" /> Website: {business.website}
                </Link>
              </div>
            )}
            {/* Placeholder for Social Media Links */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Connect with us:</h2>
              <div className="flex space-x-4 text-muted-foreground">
                <span>Facebook (Placeholder)</span>
                <span>Instagram (Placeholder)</span>
                <span>Twitter (Placeholder)</span>
                {/* Add actual social media links here when data is available */}
              </div>
            </div>
          </div>

          <Link href={`/businesses/${encodeURIComponent(category)}`} className="text-primary hover:underline mt-6 inline-block">
            Back to {decodeURIComponent(category)} businesses
          </Link>
        </div>
      </div>
    </div>
  );
}