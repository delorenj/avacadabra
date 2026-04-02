import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Ava-cadabra',
  description: 'Math is magic! Track Ava\'s daily math practice with photo uploads and teacher review.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">Ava-cadabra</h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}