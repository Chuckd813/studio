
'use client';
import { businessCategories } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Building2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function BusinessesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-primary mb-4 flex items-center justify-center">
          <Building2 className="mr-3 h-10 w-10" />{' '}
          <span className="title-gradient-wave dark:title-gradient-wave-dark">Explore Business Categories</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse businesses in Tampa by category to find exactly what you need.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {businessCategories.map((category) => (
          <Link key={category} href={`/businesses/${encodeURIComponent(category)}`}>
            <Card className="h-full flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium text-primary">{category}</CardTitle>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Explore businesses in the {category} sector.
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
