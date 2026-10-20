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
    // Fewer breakpoints means fewer resized copies to generate and cache.
    deviceSizes: [390, 640, 828, 1080, 1440],
    imageSizes: [128, 256, 384],
  },
  experimental: {
    // Keep prefetched pages in the client router cache, so moving between the
    // tabs and coming back is instant instead of refetching.
    staleTimes: { dynamic: 30, static: 300 },
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
      // Each role now lives on the Engineering page.
      { source: "/work/:slug", destination: "/work#:slug", permanent: true },
    ];
  },
};

export default nextConfig;
