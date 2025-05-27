
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, ChefHat, Zap, HelpCircle, RotateCw, Lightbulb, MapPin } from 'lucide-react';
import { suggestRandomRestaurant, type SuggestRandomRestaurantInput, type SuggestRandomRestaurantOutput } from '@/ai/flows/suggest-random-restaurant';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const cravingsWheelOptions = [
  "Italian", "Seafood", "Mexican", "Burgers & Fries", "Healthy & Fresh", 
  "Something Spicy", "Comfort Food", "Sweet Treats", "Quick Bite", 
  "Hidden Gem", "Local Favorite", "Vegetarian Delight", "Pizza", "Asian Fusion", "Breakfast & Brunch"
];

export default function FoodRandomizerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestRandomRestaurantOutput | null>(null);
  const [customCraving, setCustomCraving] = useState('');
  const [spunCraving, setSpunCraving] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGetSuggestion = async (craving?: string) => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const input: SuggestRandomRestaurantInput = { craving };
      const result = await suggestRandomRestaurant(input);
      setSuggestion(result);
    } catch (error) {
      console.error('Error getting restaurant suggestion:', error);
      toast({
        title: 'Oops! Something went wrong.',
        description: error instanceof Error ? error.message : 'Could not fetch a suggestion. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpin = () => {
    const randomIndex = Math.floor(Math.random() * cravingsWheelOptions.length);
    const newSpunCraving = cravingsWheelOptions[randomIndex];
    setSpunCraving(newSpunCraving);
    setSuggestion(null); // Clear previous suggestion
    toast({
        title: "Spin Result!",
        description: `You spun: ${newSpunCraving}! Click "Find Restaurant" to see what we've got.`,
    });
  };

  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12">
        <ChefHat className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-3">
          <span className="title-gradient-wave dark:title-gradient-wave-dark">Tampa Food Adventure!</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Can't decide what to eat? Let our AI chef whip up a suggestion for you!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Spin the Wheel Section */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <RotateCw className="h-6 w-6 text-accent" />
              Spin for a Craving!
            </CardTitle>
            <CardDescription>Let fate decide your next food mood.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleSpin} className="w-full rounded-full" size="lg">
              <Zap className="mr-2 h-5 w-5" /> Spin the Wheel
            </Button>
            {spunCraving && (
              <div className="text-center p-3 bg-secondary/50 rounded-md">
                <p className="text-sm text-muted-foreground">You spun:</p>
                <p className="font-semibold text-lg text-primary">{spunCraving}</p>
              </div>
            )}
            <Button
              onClick={() => spunCraving && handleGetSuggestion(spunCraving)}
              disabled={isLoading || !spunCraving}
              className="w-full rounded-full"
            >
              {isLoading && spunCraving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ChefHat className="mr-2 h-4 w-4" />}
              Find Restaurant for this Craving
            </Button>
          </CardContent>
        </Card>

        {/* Custom Craving Section */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Lightbulb className="h-6 w-6 text-accent" />
              Got a Specific Craving?
            </CardTitle>
            <CardDescription>Tell us what you're in the mood for.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="e.g., spicy, pizza, healthy"
              value={customCraving}
              onChange={(e) => setCustomCraving(e.target.value)}
              className="h-11"
            />
            <Button
              onClick={() => customCraving && handleGetSuggestion(customCraving)}
              disabled={isLoading || !customCraving.trim()}
              className="w-full rounded-full"
            >
              {isLoading && customCraving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ChefHat className="mr-2 h-4 w-4" />}
              Find Restaurant for My Craving
            </Button>
          </CardContent>
        </Card>

        {/* Surprise Me Section */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <HelpCircle className="h-6 w-6 text-accent" />
              Feeling Adventurous?
            </CardTitle>
            <CardDescription>Get a completely random pick!</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => handleGetSuggestion()}
              disabled={isLoading}
              className="w-full rounded-full"
              size="lg"
            >
              {isLoading && !customCraving && !spunCraving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-5 w-5" />}
              Surprise Me!
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Suggestion Display Area */}
      {isLoading && !suggestion && (
        <div className="text-center py-10">
          <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-xl text-muted-foreground">Our AI chef is cooking up a suggestion...</p>
        </div>
      )}

      {suggestion && (
        <Card className="max-w-2xl mx-auto shadow-2xl bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/5 dark:to-accent/5 border-2 border-primary/50">
          <CardHeader className="text-center">
            <ChefHat className="mx-auto h-12 w-12 text-primary mb-3" />
            <CardTitle className="text-3xl">Your Food Adventure Awaits!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-accent">{suggestion.name}</h3>
            <p className="text-md text-muted-foreground">
                <span className="font-medium text-foreground">Category:</span> {suggestion.category}
            </p>
            <div className="flex items-center justify-center text-md text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span className="font-medium text-foreground">Address:</span>&nbsp;{suggestion.address}
            </div>
            <Card className="bg-background/80 p-4 mt-4 rounded-lg shadow-inner">
                <p className="text-lg italic text-foreground">"{suggestion.reason}"</p>
                <p className="text-xs text-right text-muted-foreground mt-2">- Your AI Chef</p>
            </Card>
            <div className="mt-6">
                <Button asChild className="rounded-full">
                    <Link href="/businesses">Explore More Restaurants</Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
