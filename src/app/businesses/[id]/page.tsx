
// Placeholder for individual business detail page
import { mockBusinesses } from '@/lib/mock-data';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Phone, Globe, Building2, Sparkles, Info } from 'lucide-react';
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden shadow-xl transition-all duration-300 ease-in-out">
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={business.imageUrl}
                alt={business.name}
                layout="fill"
                objectFit="cover"
                data-ai-hint={business.dataAiHint}
                priority
              />
            </div>
            <CardHeader className="p-6">
              <CardTitle className="text-3xl lg:text-4xl mb-2">
                <span className="title-gradient-wave dark:title-gradient-wave-dark">{business.name}</span>
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground flex items-center">
                <Building2 className="h-5 w-5 mr-2 shrink-0 text-primary/80" />
                {business.category}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid md:grid-cols-1 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">About {business.name}</h3>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{business.description}</p>
              </div>
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Contact & Location</h3>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-1 text-accent shrink-0" />
                  <p>{business.address}</p>
                </div>
                {business.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-accent shrink-0" />
                    <p>{business.phone}</p>
                  </div>
                )}
                {business.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-3 text-accent shrink-0" />
                    <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline hover:text-primary transition-colors">
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <aside className="lg:col-span-1 space-y-6">
          <Card className="p-4 text-center border-2 border-dashed border-accent/30 shadow-lg bg-gradient-to-br from-accent/5 to-primary/5">
            <div className="relative w-full h-40 sm:h-48 mb-3 rounded-md overflow-hidden">
                <Image src="https://placehold.co/300x250.png?text=Your+Ad+Here" alt="Advertise your business" layout="fill" objectFit="cover" data-ai-hint="advertisement placeholder" />
            </div>
            <CardHeader className="p-0 pb-3">
               <Sparkles className="mx-auto h-8 w-8 text-accent mb-2" />
              <CardTitle className="text-lg font-semibold text-accent">Your Business Here?</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2 text-sm text-foreground">
              <p>Spotlight your business on pages like this and connect with highly interested customers!</p>
              <ul className="list-disc list-inside text-left inline-block text-xs space-y-0.5">
                <li>Top placement on relevant detail pages.</li>
                <li>Showcase your unique selling points.</li>
                <li>Convert page visitors into customers.</li>
              </ul>
              <Button variant="outline" size="sm" asChild className="mt-3 rounded-full border-tertiary text-tertiary hover:bg-tertiary/10 hover:text-tertiary">
                <Link href="/auth/register">Advertise With Us</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">More from {business.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockBusinesses
                  .filter(b => b.category === business.category && b.id !== business.id)
                  .slice(0, 3)
                  .map(relatedBusiness => (
                    <li key={relatedBusiness.id}>
                      <Button variant="link" asChild className="p-0 h-auto text-left">
                        <Link href={`/businesses/${relatedBusiness.id}`} className="text-primary hover:underline">
                          {relatedBusiness.name}
                        </Link>
                      </Button>
                    </li>
                ))}
                 {mockBusinesses.filter(b => b.category === business.category && b.id !== business.id).length === 0 && (
                    <p className="text-sm text-muted-foreground">No other businesses found in this category.</p>
                 )}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
