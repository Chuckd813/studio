
'use client';
import React from 'react'; // Import React
import Image from 'next/image';
import Link from 'next/link';
import type { Business } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Globe } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard = React.memo(function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-lg">
      <div className="relative w-full h-48"> {/* Image Container */}
        <Image
          src={business.imageUrl}
          alt={business.name}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
      </div>
      <CardContent className="p-6 flex-grow">
        <Badge variant="secondary" className="mb-2">{business.category}</Badge>
 <CardTitle className="text-xl mb-2 line-clamp-1">{business.name}</CardTitle>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{business.description}</p>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary/80" />
            <span className="line-clamp-2">{business.address}</span>
          </div>
          {business.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 shrink-0 text-primary/80" />
              <span>{business.phone}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex items-center justify-between w-full space-x-2">
           {business.website && (
            <Button variant="outline" size="sm" asChild className="rounded-full flex-1 min-w-0">
              <a href={business.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 truncate">
                <Globe className="h-4 w-4" /> <span className="truncate">Visit Website</span>
              </a>
            </Button>
          )}
          <Button size="sm" asChild className="rounded-full flex-1 min-w-0">
            <Link href={`/businesses/${encodeURIComponent(business.category)}/business/${business.id}`} className="truncate">View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
});
BusinessCard.displayName = 'BusinessCard';
