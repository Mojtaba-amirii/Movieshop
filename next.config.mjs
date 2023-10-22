/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
let env;
try {
  env = await import("./src/env.mjs");
} catch (error) {
  console.error("Error loading environment configuration:", error);
  env = {}; // Provide a default configuration or empty object
}

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  images: {
    domains: ["m.media-amazon.com"],
  },
  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default config;

// fungerar
// http://localhost:3000/_next/image?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BMTAxODk3NzI3ODdeQTJeQWpwZ15BbWU4MDQwMDEwMjIx._V1_SY1000_SX677_AL_.jpg&w=1200&q=75
// fungerar inte
// http://localhost:3000/_next/image?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BNzI0ODE3NzI3OV5BMl5BanBnXkFtZTgwMDIzMTkxMTE%40._V1_SY1000_SX677_AL_.jpg&w=1200&q=75
