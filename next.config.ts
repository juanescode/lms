import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ve74l2ixhp.ufs.sh"
      },
    ]
  }
};

export default nextConfig;
