
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Deal } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, Star, CalendarClock, Building } from 'lucide-react';
import Link from 'next/link';

interface DealCardProps {
  deal: Deal;
}

export const DealCard = React.memo(function DealCard({ deal }: DealCardProps) {
  const [formattedExpiryDate, setFormattedExpiryDate] = useState<string | null>(null);
  const [confidencePercentage, setConfidencePercentage] = useState<string | null>(null);

  useEffect(() => {
    if (deal.expiryDate) {
      setFormattedExpiryDate(new Date(deal.expiryDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }));
    } else {
      setFormattedExpiryDate(null); // Ensure it's reset if no date
    }

    if (deal.confidence !== undefined) {
      setConfidencePercentage((deal.confidence * 100).toFixed(0));
    } else {
      setConfidencePercentage(null); // Ensure it's reset if no confidence
    }
  }, [deal.expiryDate, deal.confidence]);

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={deal.imageUrl}
            alt={deal.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={deal.dataAiHint}
          />
        </div>
        {deal.confidence !== undefined && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
            <Star className="h-3 w-3" />
            {confidencePercentage ? `Curated: ${confidencePercentage}%` : '...'}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <Badge variant="secondary" className="mb-2">{deal.category}</Badge>
        <CardTitle className="text-xl mb-2 line-clamp-2">{deal.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Building className="h-4 w-4 mr-2 shrink-0 text-primary/80" />
          {deal.businessId ? (
            <Link href={`/businesses/${deal.businessId}`} className="hover:underline text-primary/90 hover:text-primary font-medium line-clamp-1 transition-colors">
              {deal.businessName}
            </Link>
          ) : (
            <span className="line-clamp-1">{deal.businessName}</span>
          )}
        </div>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{deal.description}</p>
        {deal.expiryDate && (
           <div className="flex items-center text-xs text-destructive font-medium">
            <CalendarClock className="h-3.5 w-3.5 mr-1.5 shrink-0" />
            <span>Expires: {formattedExpiryDate || '...'}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button size="sm" asChild className="w-full rounded-full">
          <Link href={`/deals/${deal.id}`} className="flex items-center gap-1.5">
            <Tag className="h-4 w-4" /> View Deal
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
});
DealCard.displayName = 'DealCard';
