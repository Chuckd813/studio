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
import { businessCategories } from '@/lib/mock-data'; // Using existing categories for simplicity
import { Save, Loader2 } from 'lucide-react';

// This is a simplified schema. A real profile would have more fields.
const profileFormSchema = z.object({
  businessName: z.string().min(2, { message: 'Business name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }), // Typically non-editable or verified separately
  category: z.string().min(1, { message: 'Please select a category.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  phone: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  description: z.string().min(20, {message: "Description must be at least 20 characters."}).max(500, {message: "Description must be at most 500 characters."}),
  logoUrl: z.string().url({message: "Please enter a valid URL for your logo."}).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Mock current business data (in a real app, this would come from an API)
const currentBusinessData: ProfileFormValues = {
  businessName: 'My Awesome Business LLC',
  email: 'contact@mybusiness.com',
  category: 'Dining',
  address: '123 Main St, Tampa, FL 33602',
  phone: '(813) 555-0123',
  website: 'https://mybusiness.example.com',
  description: 'Serving the best food in Tampa since 2020. We offer a wide variety of dishes made from locally sourced ingredients. Come visit us for an unforgettable dining experience!',
  logoUrl: 'https://placehold.co/200x200.png',
};


export function ProfileForm() {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: currentBusinessData, // Load existing data
  });

  async function onSubmit(values: ProfileFormValues) {
    // Simulate API call to update profile
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Profile updated:', values);
    toast({
      title: 'Profile Updated!',
      description: 'Your business information has been successfully saved.',
    });
  }
  
  const categoriesWithoutAll = businessCategories.filter(c => c !== 'All');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Business Name" {...field} />
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
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="contact@yourbusiness.com" {...field} readOnly disabled className="bg-muted/50 cursor-not-allowed"/>
              </FormControl>
              <FormDescription>
                Business email (cannot be changed here).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business category" />
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="(813) 555-0123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL (Optional)</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://yourbusiness.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL (Optional)</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://yourcdn.com/logo.png" {...field} />
              </FormControl>
              <FormDescription>
                Link to your business logo image.
              </FormDescription>
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
                  placeholder="Detailed description of your business, services, and what makes you unique."
                  {...field}
                  rows={6}
                />
              </FormControl>
              <FormDescription>
                Max 500 characters. This appears on your public profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="rounded-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving Changes...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
