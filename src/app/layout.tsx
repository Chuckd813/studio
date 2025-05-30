
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";

const APP_NAME = "What's In Tampa";
const APP_DESCRIPTION = "Discover businesses, events, and hot deals in Tampa. Your ultimate local guide.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `%s - ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
    // startUpImage: [], // You can add startup images here
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#2579FF", // From new dark theme's primary
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}> {/* Apply dark class globally */}
      <head>
        {/* MS specific PWA tags from original, ensure theme color matches */}
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2579FF" /> 
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Apple Touch Icon already using wit-logo.png */}
        <link rel="apple-touch-icon" href="/images/wit-logo.png" data-ai-hint="app logo" />
        
        {/* Standard Favicons (ensure these exist or remove if only relying on manifest) */}
        <link rel="icon" type="image/png" sizes="32x32" href="/images/wit-logo.png" data-ai-hint="app logo small" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/wit-logo.png" data-ai-hint="app logo small" />
      </head>
      <body className="antialiased flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
