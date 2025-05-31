
'use client';
import { useState, useEffect, useCallback } from 'react';
import { DealCard } from '@/components/features/DealCard';
import { mockDeals, dealCategories } from '@/lib/mock-data';
import type { Deal } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Sparkles, Loader2 } from 'lucide-react';
import { curateHotDeals, type CurateHotDealsInput, type CurateHotDealsOutput, type HotDeal as AIHotDeal } from '@/ai/flows/curate-hot-deals';
import { useToast } from '@/hooks/use-toast';

export default function DealsPage() {
  // Initialize allDeals with mock data; confidence will be updated by AI curation.
  const [allDeals, setAllDeals] = useState<Deal[]>(() => mockDeals.map(deal => ({ ...deal, confidence: undefined })));
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]); // Initialize as empty, will be populated by filter effect
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoadingCuration, setIsLoadingCuration] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  const runAICuration = useCallback(async (dealsToCurate: Deal[]) => {
    setIsLoadingCuration(true);
    try {
      const aiInputDeals: AIHotDeal[] = dealsToCurate.map(d => ({ title: d.title, description: d.description }));
      const input: CurateHotDealsInput = { deals: aiInputDeals };
      const aiOutput: CurateHotDealsOutput = await curateHotDeals(input);

      const newlyCuratedDeals = dealsToCurate.map(originalDeal => {
        const matchedAiDeal = aiOutput.find(aiDeal => aiDeal.title === originalDeal.title && aiDeal.description === originalDeal.description);
        return {
          ...originalDeal,
          confidence: matchedAiDeal ? matchedAiDeal.confidence : 0.5,
        };
      }).sort((a, b) => (b.confidence || 0) - (a.confidence || 0));

      setAllDeals(newlyCuratedDeals);
      toast({
        title: "Deals Curated!",
        description: "Hot deals have been updated with AI insights.",
      });
      
    } catch (error) {
      console.error('Error curating hot deals:', error);
      toast({
        title: "Curation Error",
        description: "Could not curate deals at this time. Displaying default deals.",
        variant: "destructive",
      });
      const fallbackDeals = dealsToCurate.map(d => ({ ...d, confidence: Math.random() * 0.3 + 0.7 }));
      setAllDeals(fallbackDeals);
    } finally {
      setIsLoadingCuration(false);
    }
  }, [toast]);
  
  // Effect to handle initial mount and trigger AI curation
  useEffect(() => {
    setIsMounted(true);
    runAICuration(mockDeals);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Changed dependency array to empty to run once on mount

  // Effect for filtering deals whenever dependencies change
  useEffect(() => {
    if (!isMounted) return; 

    let result = allDeals;

    if (selectedCategory !== 'All') {
      result = result.filter(deal => deal.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(deal =>
        deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredDeals(result);
  }, [searchTerm, selectedCategory, allDeals, isMounted]);


  if (!isMounted && !filteredDeals.length) { // Show loader if not mounted AND no deals are ready to be shown
     return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-primary flex items-center">
          <Sparkles className="mr-3 h-8 w-8 text-accent" /> <span className="title-gradient-wave dark:title-gradient-wave-dark">Today's Hot Deals</span>
        </h1>
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 text-primary animate-spin mr-4" />
          <p className="text-xl text-muted-foreground">Loading awesome deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-primary mb-4 flex items-center justify-center">
          <Sparkles className="mr-3 h-10 w-10 text-accent" /> <span className="title-gradient-wave dark:title-gradient-wave-dark">Today's Hot Deals</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover AI-curated promotions and special offers from businesses across Tampa.
          {isLoadingCuration && " (Updating with latest AI insights...)"}
        </p>
      </header>

      <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label htmlFor="search-deals" className="block text-sm font-medium text-foreground mb-1">
              Search Deals
            </label>
            <div className="relative">
              <Input
                id="search-deals"
                type="text"
                placeholder="Search by title, business..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 h-11"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label htmlFor="category-filter-deals" className="block text-sm font-medium text-foreground mb-1">
              Filter by Category
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category-filter-deals" className="w-full h-11">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {dealCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {filteredDeals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : isLoadingCuration ? ( 
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 text-primary animate-spin mr-4" />
          <p className="text-xl text-muted-foreground">Curating the best deals for you...</p>
        </div>
      ) : (
         <div className="text-center py-12">
          <Sparkles className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Deals Found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters, or check back later for new promotions!
          </p>
        </div>
      )}
    </div>
  );
}
