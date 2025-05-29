import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "/internet-speed-tracker/",
  plugins: [
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "../speed_log.csv",
          dest: "",
        },
      ],
    }),
  ],
});
