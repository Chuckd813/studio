/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.connectwise.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'moffitt.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.columbiarestaurant.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.shopinternationalplaza.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pwc.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.simpleviewinc.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.usf.edu',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.smithandassociates.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.fermanauto.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'editionhotels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;