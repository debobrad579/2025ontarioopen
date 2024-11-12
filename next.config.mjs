/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: "@svgr/webpack",
    })
    if (!isServer) {
      config.externals.push("@sparticuz/chromium")
    }
    return config
  },
}

export default nextConfig
