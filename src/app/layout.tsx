
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
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
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#0056B3" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#0056B3" />

 <link rel="apple-touch-icon" href="/images/wit-logo.png" data-ai-hint="app logo" />
        
        
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" data-ai-hint="app logo small" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" data-ai-hint="app logo small" />
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
