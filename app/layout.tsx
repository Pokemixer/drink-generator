import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pokemonPixel = localFont({
  src: "../public/fonts/pokemon-pixel-font.otf",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Pokémixer",
  description: "Data science final project",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pokemonPixel.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
