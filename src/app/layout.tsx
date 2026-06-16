import type { Metadata } from "next";
import { Playfair_Display, Instrument_Serif, Poppins } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
      className={`${playfair.variable} ${instrument.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden bg-bg text-text font-sans antialiased">
        <Header />
        <main className="container flex-1 py-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
