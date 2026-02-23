import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login to BATWORKS – Access Downloaded Websites & Purchases",
  description:
    "Login to your BATWORKS account to access downloaded websites, purchased source code, templates, and ready-made projects.",
  alternates: {
    canonical: "https://www.batworks.in/login",
  },
  openGraph: {
    title: "BATWORKS Login",
    description:
      "Sign in to BATWORKS to view your downloaded websites, purchased projects, and account dashboard.",
    url: "https://www.batworks.in/login",
    siteName: "BATWORKS",
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
