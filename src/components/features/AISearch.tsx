
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
          className="pr-12 rounded-full h-11 text-base bg-white text-slate-900 placeholder:text-slate-500 border-slate-300 focus:ring-primary focus-visible:ring-primary"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center"
          aria-label="Search"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" /> : <Search className="h-4 w-4 text-primary-foreground" />}
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

    