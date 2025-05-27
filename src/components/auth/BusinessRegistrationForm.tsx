'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { businessCategories } from '@/lib/mock-data';
import { UserPlus, Loader2, Mail } from 'lucide-react';

const ADMIN_EMAIL = "admin@whatisintampa.com"; // Admin email for notifications

const formSchema = z.object({
  businessName: z.string().min(2, { message: 'Business name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  // Password fields removed as per "I'll be the only one adding businesses"
  // password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  // confirmPassword: z.string(),
  category: z.string().min(1, { message: 'Please select a category.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  phone: z.string().optional(),
  description: z.string().min(20, {message: "Description must be at least 20 characters."}).max(500, {message: "Description must be at most 500 characters."}),
});
// .refine(data => data.password === data.confirmPassword, { // Password confirmation removed
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

type BusinessRegistrationFormValues = z.infer<typeof formSchema>;

export function BusinessRegistrationForm() {
  const { toast } = useToast();
  const form = useForm<BusinessRegistrationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      email: '',
      // password: '', // Removed
      // confirmPassword: '', // Removed
      category: '',
      address: '',
      phone: '',
      description: '',
    },
  });

  async function onSubmit(values: BusinessRegistrationFormValues) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Business registration submitted:', values);
    console.log(`Simulating email notification to ${ADMIN_EMAIL} for new business: ${values.businessName}`);
    
    toast({
      title: 'Registration Submitted!',
      description: `${values.businessName}'s registration has been sent for review. An email notification would typically be sent to ${ADMIN_EMAIL}.`,
      action: (
        <div className="flex items-center text-xs text-muted-foreground">
          <Mail className="h-4 w-4 mr-1" /> (Simulated Email Sent)
        </div>
      )
    });
    form.reset();
    // In a real app, you might redirect or show a success message.
    // Since this is admin-driven, perhaps no redirect, or to a "pending businesses" list.
  }

  const categoriesWithoutAll = businessCategories.filter(c => c !== 'All');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Business LLC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Contact Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="contact@mybusiness.com" {...field} />
              </FormControl>
              <FormDescription>
                This email will be used for communication regarding the listing.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password fields removed
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoriesWithoutAll.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, Tampa, FL 33602" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="(813) 555-0123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your business (min. 20 characters, max. 500 characters)"
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormDescription>
                This will be shown on the business profile once approved.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full rounded-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Registration...
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Submit Business Registration
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
