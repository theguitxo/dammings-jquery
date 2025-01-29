import esbuild from "esbuild";
import clean from "esbuild-plugin-clean";
import copy from "esbuild-plugin-copy";
import { sassPlugin } from "esbuild-sass-plugin";

esbuild.build({
  entryPoints: ["src/js/index.js", "src/index.html", "src/styles/styles.scss"],
  bundle: true,
  minify: true,
  outdir: "dist",
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
});
