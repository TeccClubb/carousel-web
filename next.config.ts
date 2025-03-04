import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  // distDir: 'build',
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "carouselweb.tecclubb.com",
        port: "",
        pathname: "/storage/media/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "carouselweb.tecclubb.com",
        port: "",
        pathname: "/storage/images/**",
        search: "",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
