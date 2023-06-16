import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import eslint from "vite-plugin-eslint";
import suidPlugin from "@suid/vite-plugin";

export default defineConfig({
  plugins: [solidPlugin(), eslint(), suidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
