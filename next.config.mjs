/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a fully static site in ./out (index.html + assets) for GitHub Pages.
  output: "export",
  // GitHub Pages has no image-optimization server.
  images: { unoptimized: true },
  // Emit /route/index.html instead of /route.html — friendlier on static hosts.
  trailingSlash: true,
};

export default nextConfig;
