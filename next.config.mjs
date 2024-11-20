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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com/images/M",
        port: "",
        pathname: "/**",
      },
    ],
  },
  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see {@link https://github.com/vercel/next.js/issues/41980}
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default config;
