const securityHeaders = []

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src example.com;
  style-src 'self' example.com;
  font-src 'self';  
`

module.exports = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: [
      "localhost",
      "54.145.81.48",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      // {
      //   key: 'Referrer-Policy',
      //   value: 'same-origin'
      // },
      {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\n/g, '')
      }
    ]
  }
}
