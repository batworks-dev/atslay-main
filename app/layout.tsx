import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Providers } from "./providers"

import "@/styles/no-oklch.css"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.batworks.in"),

  title: "Download Ready-Made Websites Free | Buy Website Source Code | BATWORKS",
  description:
    "Download ready-made websites for free, access website source code, HTML templates, and complete projects. Buy or download websites instantly on BATWORKS.",

  alternates: {
    canonical: "https://www.batworks.in",
  },

  openGraph: {
    title: "Download Free Websites & Ready-Made Projects | BATWORKS",
    description:
      "Download website templates, source code, and complete ready-made websites for free. Buy full websites and digital products quickly on BATWORKS.",
    url: "https://www.batworks.in",
    siteName: "BATWORKS",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "16x16" },
    ],
    apple: {
      url: "/favicon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Providers>
          <Suspense fallback={null}>{children}</Suspense>
        </Providers>

        {/* Vercel Analytics (Non-Ad, Safe) */}
        <Analytics />
      </body>
    </html>
  )
}
