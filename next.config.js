/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'nextlense.s3.eu-north-1.amazonaws.com']
  },
  env:{
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  },
  
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
