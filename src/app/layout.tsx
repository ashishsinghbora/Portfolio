import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08090d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "ASHISH_OS v1.0.0 | Ashish Singh Bora Portfolio",
  description:
    "High-performance, dark-mode terminal OS portfolio of Ashish Singh Bora. Cybersecurity, Autonomous AI Agents, Machine Learning, Systems Engineering, and Interface Craft.",
  keywords: [
    "Ashish Singh Bora",
    "ASHISH_OS",
    "Portfolio",
    "Cybersecurity",
    "AI Agents",
    "Smart Contract Audit",
    "Next.js",
    "TypeScript",
    "Pantnagar",
  ],
  authors: [{ name: "Ashish Singh Bora", url: "https://github.com/ashishsinghbora" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-[#08090d] text-zinc-100 antialiased selection:bg-[#00f0ff] selection:text-black">
        {children}
      </body>
    </html>
  );
}
