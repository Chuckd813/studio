
'use client';
import React from 'react'; // Import React
import Image from 'next/image';
import type { CommunityLeader } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, Globe } from 'lucide-react';
import Link from 'next/link';

interface PersonCardProps {
  leader: CommunityLeader;
}

export const PersonCard = React.memo(function PersonCard({ leader }: PersonCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-lg">
      <CardHeader className="items-center text-center p-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/50 mb-4">
          <Image
            src={leader.imageUrl || 'https://placehold.co/300x300.png'} // Fallback src
            alt={leader.name}
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint={leader.imageUrl ? (leader.dataAiHint || "person portrait") : "placeholder image"}
          />
        </div>
        <CardTitle className="text-xl">{leader.name}</CardTitle>
        <CardDescription className="text-primary">{leader.title}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0 text-center flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-4 mb-4">{leader.bio}</p>
        {leader.socialLinks && (
          <div className="flex justify-center space-x-3">
            {leader.socialLinks.linkedin && (
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                <Link href={leader.socialLinks.linkedin} target="_blank" aria-label={`${leader.name} LinkedIn Profile`}>
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {leader.socialLinks.twitter && (
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                <Link href={leader.socialLinks.twitter} target="_blank" aria-label={`${leader.name} Twitter Profile`}>
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {leader.socialLinks.website && (
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full">
                <Link href={leader.socialLinks.website} target="_blank" aria-label={`${leader.name} Website`}>
                  <Globe className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
});
PersonCard.displayName = 'PersonCard';
