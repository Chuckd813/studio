
'use client';
import { useState, useEffect } from 'react';
import { businessCategories as allCategoriesFromMock } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Building2, ArrowRight, Search, PackageX } from 'lucide-react';

export default function BusinessesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCategories, setDisplayCategories] = useState<string[]>([]);

  // Filter out "All" and sort categories for display
  const categoriesForDisplay = allCategoriesFromMock.filter(cat => cat !== 'All').sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    if (searchTerm === '') {
      setDisplayCategories(categoriesForDisplay);
    } else {
      setDisplayCategories(
        categoriesForDisplay.filter(category =>
          category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, categoriesForDisplay]);


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-primary mb-4 flex items-center justify-center">
          <Building2 className="mr-3 h-10 w-10" />{' '}
          <span className="title-gradient-wave dark:title-gradient-wave-dark">Explore Business Categories</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse businesses in Tampa by category to find exactly what you need.
        </p>
      </header>

      <div className="mb-10 max-w-xl mx-auto">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search categories (e.g., Technology, Food)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 h-11 rounded-full text-base bg-card border-input focus:ring-primary focus-visible:ring-primary"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {displayCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayCategories.map((category) => (
            <Link key={category} href={`/businesses/${encodeURIComponent(category)}`}>
              <Card className="h-full flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-lg rounded-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium text-primary">{category}</CardTitle>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Explore businesses in the {category} sector.
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <PackageX className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Categories Found</h3>
          <p className="text-muted-foreground">
            Your search for "{searchTerm}" did not match any business categories.
          </p>
        </div>
      )}
    </div>
  );
}

    