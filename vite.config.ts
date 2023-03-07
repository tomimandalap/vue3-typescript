import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(async ({ command, mode }) => {
  const env = await loadEnv(mode, process.cwd(), "VITE_API_ENDPOINT");
  if (["serve", "build"].includes(command)) {
    return {
      server: {
        proxy: {
          "/api": {
            target: env.VITE_API_ENDPOINT,
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
      plugins: [vue()],
    };
  }
});
