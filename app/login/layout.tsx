import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login to ATSlay – AI Resume Optimizer",
  description:
    "Login to your ATSlay account to access AI-powered resume optimization, ATS score analysis, and job description matching tools.",
  alternates: {
    canonical: "https://www.atslay.in/login",
  },
  openGraph: {
    title: "ATSlay Login",
    description:
      "Sign in to ATSlay to optimize your resume with AI, get ATS compatibility scores, and ace your job applications.",
    url: "https://www.atslay.in/login",
    siteName: "ATSlay",
    images: [
      {
        url: "https://www.atslay.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "ATSlay - AI Resume Optimizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATSlay Login",
    description: "Sign in to optimize your resume with AI",
    images: ["https://www.atslay.in/og-image.png"],
  },
  keywords: [
    "ATS resume optimizer",
    "resume optimization",
    "ATS score",
    "job application",
    "resume builder",
    "login",
  ],
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}