import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Separate the viewport configuration from general metadata
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // Add any other viewport settings you had before
};

// Keep other metadata separate
export const metadata: Metadata = {
  title: "ContributeCore - Find Perfect Open Source Issues",
  description:
    "ContributeCore helps developers find and contribute to open source projects. Discover issues that match your skills, make impactful contributions, and grow your developer profile.",
  keywords: [
    "open source",
    "github",
    "contribute",
    "developer",
    "issues",
    "programming",
    "coding",
    "ContributeCore",
    "open source contribution",
    "github issues",
  ],
  authors: [
    { name: "Kuldeep Ahlawat", url: "https://github.com/imkuldeepahlawat" },
  ],
  creator: "Kuldeep Ahlawat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://contributecore.vercel.app",
    title: "ContributeCore - Find Perfect Open Source Issues",
    description:
      "Find and contribute to open source projects that match your skills. Make impactful contributions and grow your developer profile.",
    siteName: "ContributeCore",
    images: [
      {
        url: "https://github.com/imkuldeepahlawat.png",
        width: 1200,
        height: 630,
        alt: "ContributeCore Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ContributeCore - Find Perfect Open Source Issues",
    description:
      "Find and contribute to open source projects that match your skills. Make impactful contributions and grow your developer profile.",
    creator: "@ikuldeepahlawat",
    images: ["https://github.com/imkuldeepahlawat.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
