import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BottomNav } from '@/src/shared/ui/BottomNav';

export const metadata: Metadata = {
  title: 'Marty Solar Tracker',
  description: 'Mobile-first iOS-friendly application for tracking work on solar construction sites.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MST',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="cs">
      <body suppressHydrationWarning className="bg-gray-50 text-gray-900 antialiased selection:bg-blue-100">
        <main className="min-h-screen pb-safe">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
