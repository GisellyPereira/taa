import type { Metadata } from "next";
import {
  Playfair_Display,
  Instrument_Serif,
  Poppins,
  Source_Sans_3,
  Vina_Sans,
} from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const vinaSans = Vina_Sans({
  variable: "--font-vina",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Teatro Arthur Azevedo",
  description: "Site oficial do Teatro Arthur Azevedo",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${instrument.variable} ${poppins.variable} ${sourceSans.variable} ${vinaSans.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-bg text-text font-sans antialiased">
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
