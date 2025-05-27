import { BusinessRegistrationForm } from '@/components/auth/BusinessRegistrationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';
// import Link from 'next/link'; // Link to login removed

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
            <UserPlus className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl">Register Your Business</CardTitle>
          <CardDescription>
            Join What's In Tampa to connect with more customers.
            {/* "Already have an account? <Link href="/auth/login" className="font-medium text-primary hover:underline">Log in here.</Link>" removed */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BusinessRegistrationForm />
        </CardContent>
      </Card>
    </div>
  );
}
