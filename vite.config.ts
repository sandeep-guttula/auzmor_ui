import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
import postcss from "rollup-plugin-postcss"; // Add this


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ rollupTypes: true })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/components/index.tsx"),
      name: "AuzmorUI",
      fileName: (format) => `index.${format}.js`,
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", ...Object.keys(peerDependencies)],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      plugins: [
        postcss({
          extract: "auzmor_ui.css",
          minimize: true,
        }),
      ],
    },
    target: "es2015",
    sourcemap: true,
    emptyOutDir: true,
  },
  esbuild: {
    target: "es2015",
  },
})
