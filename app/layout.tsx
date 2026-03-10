import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/mock-app";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ateneo",
  description: "Mock interactivo de flujos Ateneo",
  icons: {
    icon: [
      { url: "/images/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/brand/favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/images/brand/favicon-32.png",
    apple: "/images/brand/apple-touch-icon.png",
  },
  openGraph: {
    title: "Ateneo",
    description: "Mock interactivo de flujos Ateneo",
    images: [
      {
        url: "/images/brand/big.png",
        width: 1200,
        height: 630,
        alt: "Ateneo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ateneo",
    description: "Mock interactivo de flujos Ateneo",
    images: ["/images/brand/big.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={geist.variable}>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
