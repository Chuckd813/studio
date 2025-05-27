// Placeholder for individual event detail page
import { mockEvents } from '@/lib/mock-data';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, CalendarDays, Clock, Ticket } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return mockEvents.map((event) => ({
    id: event.id,
  }));
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = mockEvents.find(e => e.id === params.id);

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <Button asChild variant="link" className="mt-4">
          <Link href="/events">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <Button asChild variant="outline" className="mb-8 rounded-full">
        <Link href="/events">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Events
        </Link>
      </Button>
      <Card className="overflow-hidden shadow-xl">
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={event.imageUrl}
            alt={event.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={event.dataAiHint}
          />
        </div>
        <CardHeader className="p-6">
          <CardTitle className="text-3xl lg:text-4xl mb-2">{event.name}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">{event.category}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Event Details</h3>
            <p className="text-foreground leading-relaxed">{event.description}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-3">When & Where</h3>
            <div className="flex items-start">
              <CalendarDays className="h-5 w-5 mr-3 mt-1 text-primary shrink-0" />
              <p>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
             <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-primary shrink-0" />
              <p>{event.time}</p>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 mt-1 text-primary shrink-0" />
              <p>{event.venue}</p>
            </div>
            {event.ticketUrl && (
              <div className="mt-6">
                <Button asChild size="lg" className="w-full md:w-auto rounded-full">
                  <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Ticket className="h-5 w-5" /> Get Tickets
                  </a>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
