/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '13.127.238.6',
          port: '', // leave blank
          pathname: '/static/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  