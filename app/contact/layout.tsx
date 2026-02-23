import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact BATWORKS – Support for Website Downloads & Purchases",
  description:
    "Need help downloading websites, templates, or source code? Contact BATWORKS support for instant assistance with website purchases or project downloads.",
  alternates: {
    canonical: "https://www.batworks.in/contact",
  },
  openGraph: {
    title: "Contact BATWORKS Support",
    description:
      "Get support for downloading websites, buying ready-made projects, or accessing source code on BATWORKS.",
    url: "https://www.batworks.in/contact",
    siteName: "BATWORKS",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
