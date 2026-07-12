import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Algorithm behind the Lens — Mapping the Labor Landscape of AI-Assisted Filmmaking",
  description:
    "An interactive survey of 31 AI-assisted filmmaking systems (2021–2025) by Yuying Tang, mapping labor sites, labor types, and human–AI labor allocation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
