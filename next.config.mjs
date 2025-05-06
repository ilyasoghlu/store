/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol:'https',
        hostname: 'www.pexels.com'
      }
    ],  // Add 'pexels.com' to the domains array
  },
};



export default nextConfig;
