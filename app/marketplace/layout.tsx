import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Download Website Templates Free | Buy Ready-Made Websites & Source Code | BATWORKS",
  description:
    "Download website templates, ready-made websites, source code, and full online projects. Buy or download websites instantly on BATWORKS Marketplace.",
  alternates: {
    canonical: "https://www.batworks.in/marketplace",
  },
  openGraph: {
    title: "BATWORKS Marketplace – Download Website Templates & Projects",
    description:
      "Explore downloadable websites, source code, and ready-made projects. Buy or download sites instantly through BATWORKS.",
    url: "https://www.batworks.in/marketplace",
    siteName: "BATWORKS",
  },
}

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
