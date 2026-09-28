import type {
  Metadata,
  Viewport,
} from "next";

import "./globals.css";

import StructuredData from "./structured-data";

const SITE_NAME =
  "The Clearance Protocol";

const PERSON_NAME =
  "Md. Sabbir Hossain";

const SITE_TITLE =
  "Md. Sabbir Hossain | Cybersecurity Product Engineer & Penetration Tester";

const SITE_DESCRIPTION =
  "Md. Sabbir Hossain is a Bangladesh-based Cybersecurity Product Engineer, ethical hacker and penetration tester focused on AppSec, API security, VAPT and secure systems.";

const KEYWORDS = [
  "Md. Sabbir",
  "Md. Sabbir Hossain",
  "Sabbir Hossain",
  "Sabbir Hossain Simanto",
  "Sabbir hossain Simanto",
  "Sabbir BD",
  "Sabbir Bangladesh",
  "Md Sabbir Hossain Cybersecurity",
  "Sabbir Hossain Cybersecurity",
  "Sabbir Hossain Developer",
  "Sabbir Hossain Product Engineer",
  "Sabbir Hossain Cybersecurity Product Engineer",
  "Sabbir Hossain Portfolio",
  "Build With Sabbir",
  "buildwithsabbir",
  "buildwithsabbir.com",
  "Cybersecurity Product Engineer",
  "Cybersecurity",
  "Product Engineering",
  "Application Security",
  "Web Security",
  "API Security",
  "Infrastructure Security",
  "Linux",
  "Secure Systems",
  "Web Engineering",
  "App Engineering",
  "Technical SEO",
  "Performance Engineering",
  "Security Research",
  "Secure Product Engineer",
  "Cybersecurity Portfolio",
  "Web Application Security",
  "API Security Engineer",
  "Secure Web Application Development",
  "Cybersecurity and Product Engineering",
  "Infrastructure Security Engineer",
  "Technical SEO and Performance Engineer",
  "Cybersecurity Professional",
  "Cybersecurity Professional Bangladesh",
  "Cyber Security Expert Bangladesh",
  "Ethical Hacker",
  "Ethical Hacker Bangladesh",
  "White Hat Hacker",
  "White Hat Hacker Bangladesh",
  "Penetration Tester",
  "Penetration Tester Bangladesh",
  "Penetration Testing",
  "Web Application Penetration Testing",
  "API Penetration Testing",
  "Network Penetration Testing",
  "Vulnerability Assessment",
  "Vulnerability Assessment and Penetration Testing",
  "VAPT",
  "VAPT Bangladesh",
  "Offensive Security",
  "Offensive Security Engineer",
  "Offensive Security Bangladesh",
  "Red Team",
  "Red Teaming",
  "Red Team Operator",
  "Blue Team",
  "Defensive Security",
  "OSINT",
  "OSINT Expert Bangladesh",
  "Open Source Intelligence",
  "Cyber Threat Intelligence",
  "Threat Intelligence",
  "Security Researcher",
  "Security Researcher Bangladesh",
  "Cybersecurity Consultant Bangladesh",
  "Bangladesh Cybersecurity",
];

function getMetadataBase() {
  const rawValue =
    process.env
      .NEXT_PUBLIC_SITE_URL
      ?.trim();

  if (!rawValue) {
    return undefined;
  }

  const value =
    rawValue.includes(":")
      ? rawValue
      : [
          "https:",
          "",
          rawValue,
        ].join("/");

  try {
    return new URL(
      value
    );
  } catch {
    return undefined;
  }
}

const metadataBase =
  getMetadataBase();

export const metadata: Metadata = {
  metadataBase,
  title: {
    default:
      SITE_TITLE,
    template:
      `%s | ${PERSON_NAME}`,
  },
  description:
    SITE_DESCRIPTION,
  applicationName:
    SITE_NAME,
  authors: [
    {
      name:
        PERSON_NAME,
    },
  ],
  creator:
    PERSON_NAME,
  publisher:
    PERSON_NAME,
  category:
    "technology",
  keywords:
    KEYWORDS,
  alternates:
    metadataBase
      ? {
          canonical:
            "/",
        }
      : undefined,
  openGraph: {
    type: "website",
    title:
      SITE_TITLE,
    description:
      SITE_DESCRIPTION,
    siteName:
      SITE_NAME,
    locale:
      "en_US",
    url:
      metadataBase
        ? "/"
        : undefined,
  },
  twitter: {
    card:
      "summary_large_image",
    title:
      SITE_TITLE,
    description:
      SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex:
        false,
      "max-video-preview":
        -1,
      "max-image-preview":
        "large",
      "max-snippet":
        -1,
    },
  },
  referrer:
    "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width:
    "device-width",
  initialScale: 1,
  themeColor:
    "#080b0f",
  colorScheme:
    "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}