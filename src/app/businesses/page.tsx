
'use client';
import { useState, useEffect } from 'react';
import { BusinessCard } from '@/components/features/BusinessCard';
import { mockBusinesses, businessCategories } from '@/lib/mock-data';
import type { Business } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Building2, ShoppingBag, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';


export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Simulate fetching data
    setBusinesses(mockBusinesses);
    setFilteredBusinesses(mockBusinesses);
  }, []);

  useEffect(() => {
    if(!isMounted) return;

    let result = businesses;

    if (selectedCategory !== 'All') {
      result = result.filter(business => business.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredBusinesses(result);
  }, [searchTerm, selectedCategory, businesses, isMounted]);

  if (!isMounted) {
    // Render loading state or null to avoid hydration mismatch
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-primary flex items-center">
          <Building2 className="mr-3 h-8 w-8" /> <span className="title-gradient-wave dark:title-gradient-wave-dark">Discover Tampa's Businesses</span>
        </h1>
        <p>Loading businesses...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-primary mb-4 flex items-center justify-center">
          <Building2 className="mr-3 h-10 w-10" /> <span className="title-gradient-wave dark:title-gradient-wave-dark">Discover Tampa's Businesses</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find the best local spots, services, and attractions Tampa has to offer from our extensive directory.
        </p>
      </header>

      <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label htmlFor="search-businesses" className="block text-sm font-medium text-foreground mb-1">
              Search Businesses
            </label>
            <div className="relative">
              <Input
                id="search-businesses"
                type="text"
                placeholder="Search by name or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 h-11"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-foreground mb-1">
              Filter by Category
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category-filter" className="w-full h-11">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {businessCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <section className="my-8">
        <Card className="p-6 md:p-8 rounded-lg shadow-md text-center border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader className="p-0 pb-4">
              <Sparkles className="mx-auto h-10 w-10 text-primary mb-2" />
              <CardTitle className="text-2xl font-semibold text-primary">Want Your Business to Shine?</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3 text-foreground">
              <p>Feature your Tampa business on this page and reach thousands of engaged customers!</p>
              <ul className="list-disc list-inside text-left inline-block text-sm space-y-1">
                <li>Top placement in search results and category listings.</li>
                <li>Enhanced visibility to drive more leads.</li>
                <li>Showcase your unique offerings and promotions.</li>
              </ul>
               <Button asChild className="mt-4 rounded-full">
                <Link href="/auth/register">Advertise With Us</Link>
              </Button>
            </CardContent>
          </Card>
      </section>

      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
          {filteredBusinesses.map(business => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Businesses Found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      )}
    </div>
  );
}
