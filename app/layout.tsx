import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inscription Workshops & Tables Rondes FIM",
  description:
    "Landing page d'inscription moderne pour les workshops, tables rondes et speed recruiting de la Foire Internationale de Madagascar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
