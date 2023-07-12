/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["loremflickr.com", "robohash.org", "picsum.photos"],
  },
};

module.exports = nextConfig;
