import type { NextConfig } from "next";
import path from "node:path";

// Design tokens live in src/styles and are auto-injected into every SCSS entry
// (globals + every *.module.scss) via `additionalData`, so $-tokens and mixins
// are available everywhere without an explicit @use in each file.
// Mirrors the voxanima/PostPilot setup: loadPaths is the modern Dart Sass key
// (includePaths kept for back-compat); additionalData replaces the old prependData.
const designPath = path.join(process.cwd(), "src/styles");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    loadPaths: [designPath],
    includePaths: [designPath],
    silenceDeprecations: ["legacy-js-api", "import"],
    additionalData: '@use "tokens" as *;\n',
  },
};

export default nextConfig;
