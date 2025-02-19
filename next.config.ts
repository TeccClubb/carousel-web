import type { NextConfig } from "next";

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
      }
    ],
  },
};

export default nextConfig;
