import type { NextConfig } from "next";

const isProduction =
  process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${
    isProduction
      ? ""
      : " 'unsafe-eval'"
  }`,
  `connect-src 'self' blob:${
    isProduction
      ? ""
      : " ws: wss:"
  }`,
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  ...(isProduction
    ? ["upgrade-insecure-requests"]
    : []),
].join("; ");

const baseSecurityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value:
      "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=()",
  },
  {
    key:
      "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
  {
    key:
      "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key:
      "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key:
      "Origin-Agent-Cluster",
    value: "?1",
  },
  {
    key:
      "Content-Security-Policy",
    value:
      contentSecurityPolicy,
  },
];

const productionSecurityHeaders =
  isProduction
    ? [
        {
          key:
            "Strict-Transport-Security",
          value:
            "max-age=31536000",
        },
      ]
    : [];

const securityHeaders = [
  ...baseSecurityHeaders,
  ...productionSecurityHeaders,
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers:
          securityHeaders,
      },
    ];
  },
};

export default nextConfig;