import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Left or Right?",
  "description": "Test your surgical skills in this addictive 'Left or Right?' game. Play as a robot doctor performing appendectomies - choose the correct side and see if you can save the day!",
  "genre": ["Casual", "Puzzle", "Medical"],
  "gamePlatform": "Web Browser",
  "applicationCategory": "Game",
  "operatingSystem": "Any",
  "url": "https://left-or-right-eight.vercel.app",
  "image": "https://left-or-right-eight.vercel.app/normal.webp",
  "author": {
    "@type": "Organization",
    "name": "Left or Right Game"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Left or Right Game"
  },
  "datePublished": "2024",
  "inLanguage": "en",
  "isAccessibleForFree": true,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "100"
  }
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Left or Right? - Robot Doctor Surgery Game",
  description: "Test your surgical skills in this addictive 'Left or Right?' game. Play as a robot doctor performing appendectomies - choose the correct side and see if you can save the day!",
  keywords: ["left or right game", "surgery game", "robot doctor", "appendectomy", "medical game", "decision making game", "casual game"],
  authors: [{ name: "Left or Right Game" }],
  creator: "Left or Right Game",
  publisher: "Left or Right Game",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://left-or-right-eight.vercel.app'),
  openGraph: {
    title: "Left or Right? - Robot Doctor Surgery Game",
    description: "Test your surgical skills in this addictive 'Left or Right?' game. Play as a robot doctor performing appendectomies - choose the correct side and see if you can save the day!",
    url: "https://left-or-right-eight.vercel.app",
    siteName: "Left or Right Game",
    images: [
      {
        url: "/normal.webp",
        width: 640,
        height: 640,
        alt: "Left or Right Game - Robot Doctor Surgery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Left or Right? - Robot Doctor Surgery Game",
    description: "Test your surgical skills in this addictive 'Left or Right?' game. Play as a robot doctor performing appendectomies!",
    images: ["/normal.webp"],
    creator: "@leftorrightgame", // 您可以根据实际情况修改
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: "games",
  // Icon and manifest configurations
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/favicon.ico', sizes: '180x180', type: 'image/x-icon' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicon.ico',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicon.ico',
      },
    ],
  },
  manifest: '/manifest.json', // 我们稍后会创建这个文件
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Left or Right?',
  },
  // Geo-specific optimizations
  other: {
    "geo.region": "US", // 可以根据目标受众修改
    "geo.placename": "Global",
    "geo.position": "0;0", // 全球定位
    "ICBM": "0,0", // 纬度,经度
    "DC.title": "Left or Right? - Robot Doctor Surgery Game",
    "DC.creator": "Left or Right Game",
    "DC.subject": "Surgery Game, Medical Game, Decision Making",
    "DC.description": "Test your surgical skills in this addictive 'Left or Right?' game",
    "DC.publisher": "Left or Right Game",
    "DC.type": "InteractiveResource",
    "DC.format": "text/html",
    "DC.language": "en",
  },
  // Multi-language support preparation
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'en': '/',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
