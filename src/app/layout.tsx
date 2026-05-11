import type { Metadata } from "next";
import { Inter, Cabin_Sketch } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cabin_sketch = Cabin_Sketch({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cabin-sketch",
});

export const metadata: Metadata = {
  title: {
    template: "%s | unfollowz",
    default: "unfollowz",
  },
  description: "Find who doesn't follow you back on Instagram. Open source. No login. No external apps.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cabin_sketch.variable}`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
