import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// /** @type {import('vite').UserConfig} */
// export default {
//   base: "internet-speed-tracker/",
// };

export default defineConfig({
  base: "internet-speed-tracker/",
  plugins: [
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
