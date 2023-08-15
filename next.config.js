/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com", "encrypted-tbn0.gstatic.com"],
  },

  env: {
    API_KEY: process.env.API_URL,
  },
};

module.exports = nextConfig;
