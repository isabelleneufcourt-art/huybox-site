/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site 100 % statique : `next build` produit le dossier `out/`, à déposer
  // sur n'importe quel hébergement de fichiers (Cloudflare Pages, one.com…).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
