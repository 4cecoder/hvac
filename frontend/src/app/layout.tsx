import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HVAC Scheduling System Demo",
  description: "A comprehensive HVAC scheduling system for streamlined appointment booking, technician scheduling, and business management.",
  keywords: ["HVAC", "scheduling", "appointments", "technicians", "chatbot", "dashboard"],
  authors: [{ name: "ByteCats.codes" }],
  openGraph: {
    title: "HVAC Scheduling System Demo",
    description: "Streamline your HVAC business with our all-in-one scheduling solution!",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
        width: 1200,
        height: 630,
        alt: "HVAC Scheduling System Demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Scheduling System Demo",
    description: "Revolutionize your HVAC business with our smart scheduling system!",
    images: ["https://images.unsplash.com/photo-1631545854171-48c28465ab4e"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}