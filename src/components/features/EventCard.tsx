'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Event } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, MapPin, Ticket } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [formattedEventDate, setFormattedEventDate] = useState<string | null>(null);

  useEffect(() => {
    if (event.date) {
      setFormattedEventDate(new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }));
    } else {
      setFormattedEventDate(null);
    }
  }, [event.date]);

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-lg">
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
        <CardTitle className="text-xl mb-2 line-clamp-2">{event.name}</CardTitle>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{event.description}</p>
        <div className="space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 shrink-0 text-primary/80" />
            <span>{formattedEventDate || '...'}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 shrink-0 text-primary/80" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary/80" />
            <span className="line-clamp-2">{event.venue}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex items-center justify-between w-full space-x-2">
          {event.ticketUrl && (
            <Button variant="outline" size="sm" asChild className="rounded-full flex-1 min-w-0">
              <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 truncate">
                <Ticket className="h-4 w-4" /> <span className="truncate">Get Tickets</span>
              </a>
            </Button>
          )}
          <Button size="sm" asChild className={`rounded-full flex-1 min-w-0 ${!event.ticketUrl ? 'w-full' : ''}`}>
            <Link href={`/events/${event.id}`} className="truncate">View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
