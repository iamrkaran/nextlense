/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'nextlense.s3.eu-north-1.amazonaws.com']
  },
  env:{
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTLENSE_AWS_REGION: process.env.NEXTLENSE_AWS_REGION,
    NEXTLENSE_AWS_BUCKET_NAME: process.env.NEXTLENSE_AWS_BUCKET_NAME,
    NEXTLENSE_AWS_ACCESS_KEY: process.env.NEXTLENSE_AWS_ACCESS_KEY,
    NEXTLENSE_AWS_SECRET_KEY: process.env.NEXTLENSE_AWS_SECRET_KEY,
    WEBSOCKET_SERVER_URL: process.env.WEBSOCKET_SERVER_URL,
  },
  
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
