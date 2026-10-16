/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    // Serve AVIF/WebP and cache the resized copies for a year, so the large
    // source photos are only processed once.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  experimental: {
    // Import only the framer-motion pieces that are used.
    optimizePackageImports: ["framer-motion"],
  },
  async headers() {
    return [
      {
        // Static assets never change under the same name.
        source: "/:path*\\.(jpg|jpeg|png|webp|avif|svg|pdf|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // The hidden retro site is plain HTML in public/retro.
      { source: "/retro", destination: "/retro/index.html", permanent: false },
      { source: "/about", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
