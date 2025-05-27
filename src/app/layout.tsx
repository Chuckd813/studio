
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono'; // This line was causing issues, ensure 'geist' is installed if re-enabled
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "What's In Tampa - Your Guide to Tampa Bay",
  description: 'Discover businesses, events, and hot deals in Tampa. Your ultimate local guide.',
  manifest: '/manifest.json', // Link to the manifest file
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <meta name="application-name" content="What's In Tampa" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WITampa" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" /> {/* You'll need to create this if using MS tiles */}
        <meta name="msapplication-TileColor" content="#0056B3" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#0056B3" />

        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-180x180.png" data-ai-hint="app logo" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png" data-ai-hint="app logo" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png" data-ai-hint="app logo" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/apple-touch-icon-167x167.png" data-ai-hint="app logo" />
        
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" data-ai-hint="app logo small" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" data-ai-hint="app logo small" />
        
        {/* 
          Placeholder icons referenced in manifest.json (to be created by you):
          /icons/icon-72x72.png
          /icons/icon-96x96.png
          /icons/icon-128x128.png
          /icons/icon-144x144.png
          /icons/icon-192x192.png
          /icons/icon-384x384.png
          /icons/icon-512x512.png
          You'll need to create these image files (e.g. from your main logo) and place them in public/icons/
          For now, these paths are just placeholders. Browsers might show default icons if these are missing.
        */}
      </head>
      <body className="antialiased flex flex-col min-h-screen">
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
