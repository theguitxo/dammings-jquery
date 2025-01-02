import esbuild from "esbuild";
import clean from "esbuild-plugin-clean";
import copy from "esbuild-plugin-copy";
import { sassPlugin } from "esbuild-sass-plugin";

let ctx = await esbuild.context({
  entryPoints: ["src/js/index.js", "src/index.html", "src/styles/styles.scss"],
  bundle: true,
  minify: true,
  outdir: "dist",
  sourcemap: true,
  plugins: [
    clean({
      cleanOn: "start",
      patterns: ["./dist/**/*.*"],
    }),
    copy({
      copyOnStart: true,
      resolveFrom: "cwd",
      assets: [
        { from: "src/*.html", to: "dist" },
        { from: "src/assets/**/*.*", to: "dist/assets" },
      ],
      watch: true,
    }),
    sassPlugin(),
  ],
  loader: {
    ".html": "copy",
    ".scss": "css",
  },
  inject: ["./live-reload.js"],
  lineLimit: 120,
  logLevel: "info",
});

await ctx.watch();
console.log("\x1b[34m%s\x1b[0m", "Watching for changes...");

const { host, port } = await ctx.serve({
  host: "127.0.0.1",
  port: 3000,
  servedir: "dist",
});

console.log("\x1b[32m%s\x1b[0m", `Serving at ${host}:${port}`);
