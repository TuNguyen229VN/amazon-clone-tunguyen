import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  dotenv: ".env.development",
  github: {
    silent: true,
  },
  rewrites: [
    {
      source: "(.*)",
      destination: "/index.html",
    },
  ],
  routes: [{ src: "/[^.]+", dest: "/", status: 200 }],
});
