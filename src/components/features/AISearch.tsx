'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { suggestSearchTerms, type SuggestSearchTermsInput, type SuggestSearchTermsOutput } from '@/ai/flows/suggest-search-terms';
import { useToast } from '@/hooks/use-toast';

export function AISearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  const fetchSuggestions = useCallback(async (currentSearchTerm: string) => {
    if (currentSearchTerm.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setIsLoading(true);
    try {
      const input: SuggestSearchTermsInput = { searchTerm: currentSearchTerm };
      const result: SuggestSearchTermsOutput = await suggestSearchTerms(input);
      setSuggestions(result.suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      toast({
        title: "Search Error",
        description: "Could not fetch search suggestions. Please try again later.",
        variant: "destructive",
      });
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        fetchSuggestions(searchTerm);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500); // Debounce time

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, fetchSuggestions]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Actual search navigation/action would go here
      console.log(`Searching for: ${searchTerm}`);
      setShowSuggestions(false);
       toast({
        title: "Search Initiated",
        description: `You searched for: ${searchTerm}`,
      });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    // Actual search navigation/action would go here
    console.log(`Searching for (from suggestion): ${suggestion}`);
    toast({
        title: "Search Initiated",
        description: `You searched for: ${suggestion}`,
      });
  };
  
  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow click on them
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Input
          type="search"
          placeholder="Search businesses, events, deals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="pr-12 rounded-full h-10 text-base"
        />
        <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full" aria-label="Search">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
