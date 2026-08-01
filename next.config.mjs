/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi.platosmart.com",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;