import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, MapPin, Ticket } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={event.imageUrl}
            alt={event.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={event.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <Badge variant="secondary" className="mb-2">{event.category}</Badge>
        <CardTitle className="text-xl mb-2">{event.name}</CardTitle>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{event.description}</p>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 shrink-0" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 shrink-0" />
            <span>{event.venue}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex items-center justify-between w-full">
          {event.ticketUrl && (
            <Button variant="outline" size="sm" asChild className="rounded-full">
              <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                <Ticket className="h-4 w-4" /> Get Tickets
              </a>
            </Button>
          )}
          {/* Placeholder for a future "View Details" button */}
          <Button size="sm" asChild className="rounded-full">
            <Link href={`/events/${event.id}`}>View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
