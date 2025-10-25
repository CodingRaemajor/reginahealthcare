import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClinicQ - Skip the Queue",
  description: "Book appointments and track waiting times at Regina healthcare facilities",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.png", type: "image/png", sizes: "192x192" }, // PWA/Android
    ],
    apple: { url: "/logo.png" },         // iOS home screen icon
    shortcut: { url: "/logo.png" },      // fallback
  },
  // (optional) nice link previews
  openGraph: {
    title: "ClinicQ - Skip the Queue",
    description:
      "Book appointments and track waiting times at Regina healthcare facilities",
    url: "https://www.reginacare.xyz",
    siteName: "ClinicQ",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "ClinicQ" }],
  },
  twitter: {
    card: "summary",
    title: "ClinicQ - Skip the Queue",
    description:
      "Book appointments and track waiting times at Regina healthcare facilities",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}