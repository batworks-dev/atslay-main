import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About BATWORKS – Free Website Downloads & Ready-Made Projects",
  description:
    "BATWORKS is a trusted platform to download websites for free, access website source code, and buy ready-made projects. Learn more about our mission.",
  alternates: {
    canonical: "https://www.batworks.in/about",
  },
  openGraph: {
    title: "About BATWORKS – Download Websites & Source Code",
    description:
      "Learn about BATWORKS, the platform for downloading free websites, source code, templates, and ready-made online projects.",
    url: "https://www.batworks.in/about",
    siteName: "BATWORKS",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Google AdSense Script (loads only on /about pages because this is the /about layout) */}
      <Script
        id="adsense-script"
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6471362019906305"
        crossOrigin="anonymous"
      />

      {children}
    </>
  );
}
