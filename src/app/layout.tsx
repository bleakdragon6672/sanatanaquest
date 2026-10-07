import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display, Cormorant_Garamond, Cinzel, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { PwaController } from "@/components/pwa/pwa-controller";

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

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel-classic",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vedic Quest — AI-Powered Bhagavad Gita & Spiritual Growth",
  description:
    "Read the complete Bhagavad Gita, Upanishads & Stotrams, practice with 3D Acoustic Japa Mala, build spiritual habits, and converse with an AI spiritual guide.",
  applicationName: "Vedic Quest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Vedic Quest",
  },
  formatDetection: {
    telephone: false,
  },
  keywords: [
    "Bhagavad Gita",
    "Sanatan Dharma",
    "Vedic Quest",
    "Spiritual Growth",
    "Japa Mala",
    "Krishna",
    "Meditation",
    "Karma Yoga",
    "Bhakti",
    "Hindu Scripture",
  ],
  authors: [{ name: "Vedic Quest" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Vedic Quest",
    description:
      "The definitive modern spiritual companion for Sanatan Dharma — scripture, 3D Japa Mala, AI guidance, habits, and sacred sound.",
    siteName: "Vedic Quest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Quest",
    description:
      "AI-Powered Bhagavad Gita & Spiritual Growth Platform",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#120e0b", media: "(prefers-color-scheme: dark)" },
    { color: "#f59e0b", media: "(prefers-color-scheme: light)" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cormorant.variable} ${cinzel.variable} ${notoDevanagari.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
          <PwaController />
          <Toaster />
          <SonnerToaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
