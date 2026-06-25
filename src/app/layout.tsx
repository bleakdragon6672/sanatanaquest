import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sanatan Quest — AI-Powered Bhagavad Gita & Spiritual Growth",
  description:
    "Read the complete Bhagavad Gita, build spiritual habits, earn Dharma XP, and grow with an AI spiritual guide. The modern companion for Sanatan Dharma.",
  keywords: [
    "Bhagavad Gita",
    "Sanatan Dharma",
    "Spiritual Growth",
    "Krishna",
    "Meditation",
    "Karma Yoga",
    "Bhakti",
    "Hindu Scripture",
  ],
  authors: [{ name: "Sanatan Quest" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Sanatan Quest",
    description:
      "The definitive modern spiritual companion for Sanatan Dharma — scripture, AI guidance, habits, gamification.",
    siteName: "Sanatan Quest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanatan Quest",
    description:
      "AI-Powered Bhagavad Gita & Spiritual Growth Platform",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#f59e0b", media: "(prefers-color-scheme: light)" },
    { color: "#1a1410", media: "(prefers-color-scheme: dark)" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
