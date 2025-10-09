/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/2025ontarioopen",
  assetPrefix: "/2025ontarioopen/",
  output: "export",
  images: { unoptimized: true },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: "@svgr/webpack",
    })
    return config
  },
}

export default nextConfig
