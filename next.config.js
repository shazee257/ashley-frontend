/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: [
      "localhost",
      "api-mecca.vercel.app",
      "ashley-api.herokuapp.com",
    ],
  },
};
