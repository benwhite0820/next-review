/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [toRemotePattern(process.env.CMS_URL_IMAGE_PATTERN)],
  },
};

module.exports = nextConfig;

function toRemotePattern(urlString) {
  const url = new URL(urlString);
  return {
    protocol: url.protocol.replace(':', ''),
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
  };
}
