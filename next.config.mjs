/** @type {import('next').NextConfig} */
// const nextConfig = {
//     trailingSlash: true,
//     publicRuntimeConfig: {
//         BACKEND_URL:"http://localhost:5000/",
//     },
// };

// export default nextConfig;
export default {
    env: {
      API_URL: 'https://api.example.com',
      APP_NAME: 'My Next.js App',
      FEATURE_FLAG: 'true',
      BACKEND_URL:"http://localhost:5000",
    },
    // Other Next.js configuration options...
  };