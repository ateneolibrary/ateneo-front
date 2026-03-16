import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/mock-app";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
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
    <html lang="es" className={cn("font-sans", geist.variable)}>
      <body className={`${spaceGrotesk.variable} ${archivoBlack.variable}`}>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
