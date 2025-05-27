
'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ChefHat, Zap, RotateCw, Lightbulb, MapPin, Sailboat, Smile, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { suggestRandomRestaurant, type SuggestRandomRestaurantInput, type SuggestRandomRestaurantOutput } from '@/ai/flows/suggest-random-restaurant';
import { suggestRandomActivity, type SuggestRandomActivityInput, type SuggestRandomActivityOutput } from '@/ai/flows/suggest-random-activity';
import type { ActivitySuggestion } from '@/types';

const cravingsWheelOptions = [
  "Italian", "Seafood", "Mexican", "Burgers & Fries", "Healthy & Fresh",
  "Something Spicy", "Comfort Food", "Sweet Treats", "Quick Bite",
  "Hidden Gem", "Local Favorite", "Vegetarian Delight", "Pizza", "Asian Fusion", "Breakfast & Brunch"
];

const activityTypeWheelOptions = [
    "Outdoor Fun", "Arts & Culture", "Nightlife Spark", "Relax & Unwind", "Family Adventure", "Romantic Evening", "Unique Experience", "Live Entertainment", "Active & Sporty"
];

type SuggestionType = 'food' | 'activity';

export function HomepageWitWheel() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestRandomRestaurantOutput | ActivitySuggestion | null>(null);
  const [suggestionType, setSuggestionType] = useState<SuggestionType | null>(null);
  const { toast } = useToast();

  const handleGetRestaurantSuggestion = useCallback(async (craving?: string) => {
    setIsLoading(true);
    setSuggestion(null);
    setSuggestionType('food');
    try {
      const input: SuggestRandomRestaurantInput = { craving };
      const result = await suggestRandomRestaurant(input);
      setSuggestion(result);
      toast({
        title: "Restaurant Found!",
        description: `The WIT Wheel suggests: ${result.name}!`,
      });
    } catch (error) {
      console.error('Error getting restaurant suggestion:', error);
      toast({
        title: 'Oops! Something went wrong.',
        description: error instanceof Error ? error.message : 'Could not fetch a restaurant suggestion.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const handleGetActivitySuggestion = useCallback(async (activityType?: string) => {
    setIsLoading(true);
    setSuggestion(null);
    setSuggestionType('activity');
    try {
      const input: SuggestRandomActivityInput = { activityType };
      const result = await suggestRandomActivity(input);
      setSuggestion(result);
       toast({
        title: "Fun Found!",
        description: `The WIT Wheel suggests: ${result.name}!`,
      });
    } catch (error)
       {
      console.error('Error getting activity suggestion:', error);
      toast({
        title: 'Oops! Something went wrong.',
        description: error instanceof Error ? error.message : 'Could not fetch an activity suggestion.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const handleSpinAndSuggest = (type: SuggestionType) => {
    setSuggestion(null); // Clear previous suggestion
    if (type === 'food') {
      const randomCraving = cravingsWheelOptions[Math.floor(Math.random() * cravingsWheelOptions.length)];
      toast({ title: "Spinning for a Bite!", description: `Looking for something for your craving: ${randomCraving}!`});
      handleGetRestaurantSuggestion(randomCraving);
    } else {
      const randomActivityType = activityTypeWheelOptions[Math.floor(Math.random() * activityTypeWheelOptions.length)];
      toast({ title: "Spinning for Fun!", description: `Let's find some fun for: ${randomActivityType}!`});
      handleGetActivitySuggestion(randomActivityType);
    }
  };

  return (
    <section className="py-16 bg-secondary/50 dark:bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          <span className="title-gradient-wave dark:title-gradient-wave-dark">Spin the WIT Wheel!</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Can't decide what to eat or do? Let the WIT Wheel choose your next Tampa adventure!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
          <Button
            size="lg"
            onClick={() => handleSpinAndSuggest('food')}
            disabled={isLoading}
            className="rounded-full text-lg px-8 py-6 shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out w-full"
          >
            {isLoading && suggestionType === 'food' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ChefHat className="mr-2 h-5 w-5" />}
            Spin for a Bite!
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleSpinAndSuggest('activity')}
            disabled={isLoading}
            className="rounded-full text-lg px-8 py-6 shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out w-full"
          >
            {isLoading && suggestionType === 'activity' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Smile className="mr-2 h-5 w-5" />}
            Spin for Fun!
          </Button>
        </div>

        {isLoading && !suggestion && (
          <div className="text-center py-6">
            <Loader2 className="mx-auto h-10 w-10 text-primary animate-spin mb-3" />
            <p className="text-lg text-muted-foreground">The WIT Wheel is conjuring up something amazing...</p>
          </div>
        )}

        {suggestion && (
          <Card className="max-w-xl mx-auto shadow-xl my-8 bg-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">
                {suggestionType === 'food' ? "Your Tasty Suggestion!" : "Your Fun Adventure!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-3">
              <h3 className="text-xl font-semibold text-accent">{suggestion.name}</h3>
              <p><span className="font-medium text-foreground">Category:</span> {suggestion.category}</p>
              {suggestionType === 'food' && (suggestion as SuggestRandomRestaurantOutput).address && (
                 <p className="flex items-start"><MapPin className="h-5 w-5 mr-2 text-primary shrink-0 mt-1" /> <span className="font-medium text-foreground">Address:</span>&nbsp;{(suggestion as SuggestRandomRestaurantOutput).address}</p>
              )}
              {suggestionType === 'activity' && (suggestion as ActivitySuggestion).location && (
                 <p className="flex items-start"><MapPin className="h-5 w-5 mr-2 text-accent shrink-0 mt-1" /> <span className="font-medium text-foreground">Location:</span>&nbsp;{(suggestion as ActivitySuggestion).location}</p>
              )}
              <Card className="bg-background/70 p-3 rounded-md">
                <p className="italic text-foreground">
                    "{suggestionType === 'food' ? (suggestion as SuggestRandomRestaurantOutput).reason : (suggestion as ActivitySuggestion).description}"
                </p>
                <p className="text-xs text-right text-muted-foreground mt-1">
                    - The WIT Wheel
                </p>
              </Card>
               <div className="text-center pt-3">
                 <Button onClick={() => handleSpinAndSuggest(suggestionType!)} disabled={isLoading} variant="outline" className="rounded-full mr-2">
                    <RotateCw className="mr-2 h-4 w-4" /> Spin Again ({suggestionType === 'food' ? 'Food' : 'Fun'})
                  </Button>
                <Button asChild className="rounded-full">
                    <Link href="/adventure-wheel">
                        More WIT Wheel Options <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
               </div>
            </CardContent>
          </Card>
        )}
         {/* Link to the full WIT Wheel page if no suggestion is active but not loading */}
        {!isLoading && !suggestion && (
            <div className="mt-8">
                <Button variant="link" asChild className="text-primary hover:text-accent">
                    <Link href="/adventure-wheel">Go to the full WIT Wheel for more options <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
            </div>
        )}
      </div>
    </section>
  );
}
