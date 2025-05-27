// Placeholder for individual business detail page
import { mockBusinesses } from '@/lib/mock-data';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Phone, Globe } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return mockBusinesses.map((business) => ({
    id: business.id,
  }));
}

export default function BusinessDetailPage({ params }: { params: { id: string } }) {
  const business = mockBusinesses.find(b => b.id === params.id);

  if (!business) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Business not found</h1>
        <Button asChild variant="link" className="mt-4">
          <Link href="/businesses">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Businesses
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button asChild variant="outline" className="mb-8 rounded-full">
        <Link href="/businesses">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Businesses
        </Link>
      </Button>
      <Card className="overflow-hidden shadow-xl">
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={business.imageUrl}
            alt={business.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={business.dataAiHint}
          />
        </div>
        <CardHeader className="p-6">
          <CardTitle className="text-3xl lg:text-4xl mb-2">{business.name}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">{business.category}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">About {business.name}</h3>
            <p className="text-foreground leading-relaxed">{business.description}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-3">Contact & Location</h3>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 mt-1 text-primary shrink-0" />
              <p>{business.address}</p>
            </div>
            {business.phone && (
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary shrink-0" />
                <p>{business.phone}</p>
              </div>
            )}
            {business.website && (
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-3 text-primary shrink-0" />
                <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Placeholder for reviews, gallery, deals from this business etc. */}
    </div>
  );
}

