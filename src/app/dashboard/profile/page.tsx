import { ProfileForm } from '@/components/dashboard/ProfileForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Edit3, Tag, CalendarPlus } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  // This page should be protected by authentication in a real app.
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary flex items-center">
          <Edit3 className="mr-3 h-8 w-8" /> Manage Your Business Profile
        </h1>
        <p className="text-muted-foreground">
          Keep your business information up-to-date to attract more customers.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Edit Profile Details</CardTitle>
              <CardDescription>
                Make changes to your public business information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Manage Your Listings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start rounded-md">
                <Link href="/dashboard/deals" className="flex items-center gap-2">
                  <Tag className="h-5 w-5" /> Manage Deals & Promotions
                </Link>
              </Button>
              <Button asChild className="w-full justify-start rounded-md">
                <Link href="/dashboard/events" className="flex items-center gap-2">
                  <CalendarPlus className="h-5 w-5" /> Manage Events
                </Link>
              </Button>
            </CardContent>
             <CardContent>
              <Separator className="my-4" />
              <h3 className="text-md font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Check our FAQ or contact support for assistance.
              </p>
              <Button variant="outline" size="sm" asChild className="rounded-full">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Placeholder for future analytics or quick stats */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Profile Analytics (Coming Soon)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View insights on your profile views, customer engagement, and deal performance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
