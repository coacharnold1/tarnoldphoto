import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tarnoldphoto | Photography Portfolio",
  description: "Personal photography portfolio featuring concert, landscape, art, and professional work.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <head>
        <style>{`
          :root {
            --color-teal: #0f766e;
            --color-teal-light: #14b8a6;
            --color-teal-bg: #f0fdfa;
            --color-emerald: #059669;
            --color-emerald-light: #10b981;
            --color-emerald-bg: #f0fdf4;
            --color-orange: #ea580c;
            --color-orange-light: #fb923c;
            --color-orange-bg: #fff7ed;
            --color-charcoal: #1f2937;
            --color-charcoal-light: #374151;
            --color-charcoal-bg: #f9fafb;
          }
          .bg-teal { background-color: var(--color-teal); }
          .bg-teal-light { background-color: var(--color-teal-light); }
          .bg-teal-bg { background-color: var(--color-teal-bg); }
          .bg-emerald { background-color: var(--color-emerald); }
          .bg-emerald-light { background-color: var(--color-emerald-light); }
          .bg-emerald-bg { background-color: var(--color-emerald-bg); }
          .bg-orange { background-color: var(--color-orange); }
          .bg-orange-light { background-color: var(--color-orange-light); }
          .bg-orange-bg { background-color: var(--color-orange-bg); }
          .bg-charcoal { background-color: var(--color-charcoal); }
          .bg-charcoal-light { background-color: var(--color-charcoal-light); }
          .bg-charcoal-bg { background-color: var(--color-charcoal-bg); }
          .text-teal { color: var(--color-teal); }
          .text-teal-light { color: var(--color-teal-light); }
          .text-teal-bg { color: var(--color-teal-bg); }
          .text-emerald { color: var(--color-emerald); }
          .text-emerald-light { color: var(--color-emerald-light); }
          .text-emerald-bg { color: var(--color-emerald-bg); }
          .text-orange { color: var(--color-orange); }
          .text-orange-light { color: var(--color-orange-light); }
          .text-orange-bg { color: var(--color-orange-bg); }
          .text-charcoal { color: var(--color-charcoal); }
          .text-charcoal-light { color: var(--color-charcoal-light); }
          .text-charcoal-bg { color: var(--color-charcoal-bg); }
          .border-teal { border-color: var(--color-teal); }
          .border-emerald { border-color: var(--color-emerald); }
          .border-orange { border-color: var(--color-orange); }
        `}</style>
      </head>
      <body className="min-h-screen bg-charcoal-bg text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
