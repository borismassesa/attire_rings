import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'OpusFesta - Business Profile | Wedding & Events Marketplace',
  description: 'OpusFesta wedding and events marketplace.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-white">{children}</body>
    </html>
  );
}
