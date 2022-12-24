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
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
      },
    ]
  }
}

