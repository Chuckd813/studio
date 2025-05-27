
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, ChefHat, Zap, HelpCircle, RotateCw, Lightbulb, MapPin, Sailboat, Palette, Beer, Smile } from 'lucide-react'; // Added more icons
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { suggestRandomRestaurant, type SuggestRandomRestaurantInput, type SuggestRandomRestaurantOutput } from '@/ai/flows/suggest-random-restaurant';
import { suggestRandomActivity, type SuggestRandomActivityInput, type SuggestRandomActivityOutput } from '@/ai/flows/suggest-random-activity'; // New import
import type { ActivitySuggestion } from '@/types'; // New import

const cravingsWheelOptions = [
  "Italian", "Seafood", "Mexican", "Burgers & Fries", "Healthy & Fresh",
  "Something Spicy", "Comfort Food", "Sweet Treats", "Quick Bite",
  "Hidden Gem", "Local Favorite", "Vegetarian Delight", "Pizza", "Asian Fusion", "Breakfast & Brunch"
];

const activityTypeWheelOptions = [
    "Outdoor Fun", "Arts & Culture", "Nightlife Spark", "Relax & Unwind", "Family Adventure", "Romantic Evening", "Unique Experience", "Live Entertainment", "Active & Sporty"
];

type SuggestionType = 'food' | 'activity';

export default function WITWheelPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestRandomRestaurantOutput | ActivitySuggestion | null>(null);
  const [suggestionType, setSuggestionType] = useState<SuggestionType | null>(null);
  
  const [customFoodCraving, setCustomFoodCraving] = useState('');
  const [spunFoodCraving, setSpunFoodCraving] = useState<string | null>(null);

  const [customActivityWish, setCustomActivityWish] = useState('');
  const [spunActivityType, setSpunActivityType] = useState<string | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    // Check for query params to set initial mode if any
    const queryParams = new URLSearchParams(window.location.search);
    const mode = queryParams.get('mode');
    if (mode === 'food') {
      // Optionally trigger a food spin or set focus
    } else if (mode === 'fun') {
      // Optionally trigger an activity spin or set focus
    }
  }, []);

  const handleGetRestaurantSuggestion = useCallback(async (craving?: string) => {
    setIsLoading(true);
    setSuggestion(null);
    setSuggestionType('food');
    try {
      const input: SuggestRandomRestaurantInput = { craving };
      const result = await suggestRandomRestaurant(input);
      setSuggestion(result);
    } catch (error) {
      console.error('Error getting restaurant suggestion:', error);
      toast({
        title: 'Oops! Something went wrong.',
        description: error instanceof Error ? error.message : 'Could not fetch a restaurant suggestion. Please try again.',
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
    } catch (error) {
      console.error('Error getting activity suggestion:', error);
      toast({
        title: 'Oops! Something went wrong.',
        description: error instanceof Error ? error.message : 'Could not fetch an activity suggestion. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const handleSpinFoodCraving = () => {
    const randomIndex = Math.floor(Math.random() * cravingsWheelOptions.length);
    const newSpunCraving = cravingsWheelOptions[randomIndex];
    setSpunFoodCraving(newSpunCraving);
    setCustomFoodCraving(''); // Clear custom input
    setSuggestion(null);
    toast({
        title: "Craving Spun!",
        description: `You spun: ${newSpunCraving}! Click "Find Restaurant" to see what we've got.`,
    });
  };
  
  const handleSpinActivityType = () => {
    const randomIndex = Math.floor(Math.random() * activityTypeWheelOptions.length);
    const newSpunType = activityTypeWheelOptions[randomIndex];
    setSpunActivityType(newSpunType);
    setCustomActivityWish(''); // Clear custom input
    setSuggestion(null);
    toast({
        title: "Activity Type Spun!",
        description: `You spun: ${newSpunType}! Click "Find Something Fun" for a suggestion.`,
    });
  };

  const handleSurpriseMe = () => {
    const coinFlip = Math.random() < 0.5; // 50/50 chance
    if (coinFlip) {
        // Surprise with food
        const randomCraving = cravingsWheelOptions[Math.floor(Math.random() * cravingsWheelOptions.length)];
        setSpunFoodCraving(randomCraving);
        setCustomFoodCraving('');
        setSpunActivityType(null);
        setCustomActivityWish('');
        handleGetRestaurantSuggestion(randomCraving);
        toast({ title: "Surprise Bite!", description: `We're finding a tasty spot for: ${randomCraving}!`});
    } else {
        // Surprise with activity
        const randomActivityType = activityTypeWheelOptions[Math.floor(Math.random() * activityTypeWheelOptions.length)];
        setSpunActivityType(randomActivityType);
        setCustomActivityWish('');
        setSpunFoodCraving(null);
        setCustomFoodCraving('');
        handleGetActivitySuggestion(randomActivityType);
        toast({ title: "Surprise Adventure!", description: `Let's find some fun for: ${randomActivityType}!`});
    }
  };


  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  const currentInputFood = customFoodCraving || spunFoodCraving;
  const currentInputActivity = customActivityWish || spunActivityType;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12">
        <Zap className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-3">
          <span className="title-gradient-wave dark:title-gradient-wave-dark">The WIT Wheel!</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Let fate (and AI) decide your next Tampa adventure! Spin for food cravings or fun activities.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Food Adventure Wheel */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ChefHat className="h-6 w-6 text-accent" />
              Food Adventure
            </CardTitle>
            <CardDescription>Spin for a craving or tell us what you want.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleSpinFoodCraving} className="w-full rounded-full" size="lg" variant="outline">
              <RotateCw className="mr-2 h-5 w-5" /> Spin for a Craving!
            </Button>
            {spunFoodCraving && (
              <div className="text-center p-3 bg-secondary/50 dark:bg-secondary/20 rounded-md">
                <p className="text-sm text-muted-foreground">You spun:</p>
                <p className="font-semibold text-lg text-primary">{spunFoodCraving}</p>
              </div>
            )}
             <div className="relative flex items-center justify-center my-4">
              <span className="absolute left-0 w-[40%] h-px bg-border"></span>
              <span className="relative px-2 text-xs uppercase text-muted-foreground bg-card">Or</span>
              <span className="absolute right-0 w-[40%] h-px bg-border"></span>
            </div>
            <Input
              type="text"
              placeholder="Enter custom food craving..."
              value={customFoodCraving}
              onChange={(e) => { setCustomFoodCraving(e.target.value); setSpunFoodCraving(null); }}
              className="h-11"
            />
            <Button
              onClick={() => currentInputFood && handleGetRestaurantSuggestion(currentInputFood)}
              disabled={isLoading || !currentInputFood}
              className="w-full rounded-full"
              size="lg"
            >
              {isLoading && suggestionType === 'food' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ChefHat className="mr-2 h-5 w-5" />}
              Find a Restaurant!
            </Button>
          </CardContent>
        </Card>

        {/* Fun Adventure Wheel */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Smile className="h-6 w-6 text-accent" /> {/* Changed Icon */}
              Fun Adventure
            </CardTitle>
            <CardDescription>Spin for an activity or share your wish.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button onClick={handleSpinActivityType} className="w-full rounded-full" size="lg" variant="outline">
              <RotateCw className="mr-2 h-5 w-5" /> Spin for an Activity Type!
            </Button>
            {spunActivityType && (
              <div className="text-center p-3 bg-secondary/50 dark:bg-secondary/20 rounded-md">
                <p className="text-sm text-muted-foreground">You spun:</p>
                <p className="font-semibold text-lg text-primary">{spunActivityType}</p>
              </div>
            )}
            <div className="relative flex items-center justify-center my-4">
              <span className="absolute left-0 w-[40%] h-px bg-border"></span>
              <span className="relative px-2 text-xs uppercase text-muted-foreground bg-card">Or</span>
              <span className="absolute right-0 w-[40%] h-px bg-border"></span>
            </div>
            <Input
              type="text"
              placeholder="Enter custom fun wish..."
              value={customActivityWish}
              onChange={(e) => { setCustomActivityWish(e.target.value); setSpunActivityType(null); }}
              className="h-11"
            />
            <Button
              onClick={() => currentInputActivity && handleGetActivitySuggestion(currentInputActivity)}
              disabled={isLoading || !currentInputActivity}
              className="w-full rounded-full"
              size="lg"
            >
              {isLoading && suggestionType === 'activity' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sailboat className="mr-2 h-5 w-5" />}
              Find Something Fun!
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Surprise Me Section */}
       <Card className="mb-12 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/5 dark:to-accent/5 border border-primary/30">
          <CardHeader className="text-center pb-2">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <HelpCircle className="h-7 w-7 text-primary" />
              Feeling Adventurous?
            </CardTitle>
            <CardDescription>Let the WIT Wheel choose your entire adventure!</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={handleSurpriseMe}
              disabled={isLoading}
              className="rounded-full"
              size="lg"
            >
              {isLoading && !suggestion ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Zap className="mr-2 h-5 w-5" />}
              Surprise Me - Anything Goes!
            </Button>
          </CardContent>
        </Card>


      {/* Suggestion Display Area */}
      {isLoading && !suggestion && (
        <div className="text-center py-10">
          <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-xl text-muted-foreground">The WIT Wheel is spinning up a suggestion...</p>
        </div>
      )}

      {suggestion && suggestionType === 'food' && (
        <Card className="max-w-2xl mx-auto shadow-2xl bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/5 dark:to-accent/5 border-2 border-primary/50">
          <CardHeader className="text-center">
            <ChefHat className="mx-auto h-12 w-12 text-primary mb-3" />
            <CardTitle className="text-3xl">Your Food Adventure Awaits!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {(suggestion as SuggestRandomRestaurantOutput).name && <h3 className="text-2xl font-semibold text-accent">{(suggestion as SuggestRandomRestaurantOutput).name}</h3>}
            {(suggestion as SuggestRandomRestaurantOutput).category && 
                <p className="text-md text-muted-foreground">
                    <span className="font-medium text-foreground">Category:</span> {(suggestion as SuggestRandomRestaurantOutput).category}
                </p>
            }
            {(suggestion as SuggestRandomRestaurantOutput).address &&
                <div className="flex items-center justify-center text-md text-muted-foreground">
                    <MapPin className="h-5 w-5 mr-2 text-primary shrink-0" />
                    <span className="font-medium text-foreground">Address:</span>&nbsp;{(suggestion as SuggestRandomRestaurantOutput).address}
                </div>
            }
             {(suggestion as SuggestRandomRestaurantOutput).reason &&
                <Card className="bg-background/80 p-4 mt-4 rounded-lg shadow-inner">
                    <p className="text-lg italic text-foreground">"{(suggestion as SuggestRandomRestaurantOutput).reason}"</p>
                    <p className="text-xs text-right text-muted-foreground mt-2">- Your AI Chef</p>
                </Card>
            }
            <div className="mt-6">
                <Button asChild className="rounded-full">
                    <Link href="/businesses">Explore More Restaurants</Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {suggestion && suggestionType === 'activity' && (
        <Card className="max-w-2xl mx-auto shadow-2xl bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/5 dark:to-primary/5 border-2 border-accent/50">
          <CardHeader className="text-center">
            {/* Choose an icon for activities */}
            {(suggestion as ActivitySuggestion).category === "Arts & Culture" ? <Palette className="mx-auto h-12 w-12 text-accent mb-3" /> : 
             (suggestion as ActivitySuggestion).category === "Nightlife" ? <Beer className="mx-auto h-12 w-12 text-accent mb-3" /> :
             <Sailboat className="mx-auto h-12 w-12 text-accent mb-3" />}
            <CardTitle className="text-3xl">Your Fun Adventure is Here!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
             {(suggestion as ActivitySuggestion).name && <h3 className="text-2xl font-semibold text-primary">{(suggestion as ActivitySuggestion).name}</h3>}
             {(suggestion as ActivitySuggestion).category &&
                <p className="text-md text-muted-foreground">
                    <span className="font-medium text-foreground">Category:</span> {(suggestion as ActivitySuggestion).category}
                </p>
            }
            {(suggestion as ActivitySuggestion).location && (
                <div className="flex items-center justify-center text-md text-muted-foreground">
                    <MapPin className="h-5 w-5 mr-2 text-accent shrink-0" />
                    <span className="font-medium text-foreground">Location:</span>&nbsp;{(suggestion as ActivitySuggestion).location}
                </div>
            )}
            {(suggestion as ActivitySuggestion).description &&
                <Card className="bg-background/80 p-4 mt-4 rounded-lg shadow-inner">
                    <p className="text-lg italic text-foreground">"{(suggestion as ActivitySuggestion).description}"</p>
                     <p className="text-xs text-right text-muted-foreground mt-2">- Your AI Fun Guide</p>
                </Card>
            }
            <div className="mt-6">
                <Button asChild className="rounded-full">
                    <Link href="/events">Discover More Events</Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
