import Image from 'next/image';
import Link from 'next/link';
import { Business } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Globe } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={business.imageUrl}
            alt={business.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={business.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <Badge variant="secondary" className="mb-2">{business.category}</Badge>
        <CardTitle className="text-xl mb-2">{business.name}</CardTitle>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{business.description}</p>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 shrink-0" />
            <span>{business.address}</span>
          </div>
          {business.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 shrink-0" />
              <span>{business.phone}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex items-center justify-between w-full">
           {business.website && (
            <Button variant="outline" size="sm" asChild className="rounded-full">
              <a href={business.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                <Globe className="h-4 w-4" /> Visit Website
              </a>
            </Button>
          )}
          {/* Placeholder for a future "View Details" button */}
          <Button size="sm" asChild className="rounded-full">
            <Link href={`/businesses/${business.id}`}>View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
