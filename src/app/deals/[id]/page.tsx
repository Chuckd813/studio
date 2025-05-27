// Placeholder for individual deal detail page
import { mockDeals } from '@/lib/mock-data';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Tag, Building, CalendarClock, Star } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  return mockDeals.map((deal) => ({
    id: deal.id,
  }));
}

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const deal = mockDeals.find(d => d.id === params.id);

  if (!deal) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Deal not found</h1>
        <Button asChild variant="link" className="mt-4">
          <Link href="/deals">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Deals
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <Button asChild variant="outline" className="mb-8 rounded-full">
        <Link href="/deals">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Deals
        </Link>
      </Button>
      <Card className="overflow-hidden shadow-xl">
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={deal.imageUrl}
            alt={deal.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={deal.dataAiHint}
          />
           {deal.confidence && (
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
              <Star className="h-4 w-4" />
              {`Curated: ${(deal.confidence * 100).toFixed(0)}%`}
            </div>
          )}
        </div>
        <CardHeader className="p-6">
           <Badge variant="secondary" className="mb-2 w-fit">{deal.category}</Badge>
          <CardTitle className="text-3xl lg:text-4xl mb-2">{deal.title}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground flex items-center">
            <Building className="h-5 w-5 mr-2 shrink-0" />
            Offered by: {deal.businessName}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Deal Description</h3>
            <p className="text-foreground leading-relaxed">{deal.description}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-3">Offer Details</h3>
            {deal.expiryDate && (
              <div className="flex items-center text-destructive">
                <CalendarClock className="h-5 w-5 mr-3 shrink-0" />
                <span>Expires: {new Date(deal.expiryDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            )}
            {/* Placeholder for terms and conditions or other details */}
            <p className="text-sm text-muted-foreground">Terms and conditions may apply. Visit the business for full details.</p>
            <div className="mt-6">
              <Button size="lg" className="w-full md:w-auto rounded-full">
                <Tag className="mr-2 h-5 w-5" /> Claim This Deal (Visit Business)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

