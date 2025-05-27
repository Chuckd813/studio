import Image from 'next/image';
import { Deal } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, Star, CalendarClock, Building } from 'lucide-react';
import Link from 'next/link';

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
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
        {deal.confidence && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Star className="h-3 w-3" />
            {`Curated: ${(deal.confidence * 100).toFixed(0)}%`}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <Badge variant="secondary" className="mb-2">{deal.category}</Badge>
        <CardTitle className="text-xl mb-2">{deal.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Building className="h-4 w-4 mr-2 shrink-0" />
          <span>{deal.businessName}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{deal.description}</p>
        {deal.expiryDate && (
           <div className="flex items-center text-xs text-destructive">
            <CalendarClock className="h-3 w-3 mr-1 shrink-0" />
            <span>Expires: {new Date(deal.expiryDate).toLocaleDateString()}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button size="sm" asChild className="w-full rounded-full">
           {/* Placeholder: Link to deal or business page */}
          <Link href={`/deals/${deal.id}`} className="flex items-center gap-1.5">
            <Tag className="h-4 w-4" /> View Deal
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
