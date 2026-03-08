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
