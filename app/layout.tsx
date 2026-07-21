import type { Metadata } from "next";
import { Source_Serif_4, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";

const display = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const sans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Mapping the Labor Landscape of AI-Assisted Filmmaking — Yuying Tang",
  description:
    "A survey of AI-assisted filmmaking systems by Yuying Tang: labor sites, labor types, and human–AI labor allocation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <ScrollProgress />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
