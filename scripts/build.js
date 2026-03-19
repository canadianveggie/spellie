/* eslint-disable no-console */
// @ts-check

const fs = require("fs/promises");
const path = require("path");
/** @type {import("esbuild")} */
const esbuild = require("esbuild");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "docs");

/**
 * @param {string} dir
 */
async function ensureEmptyDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

/**
 * @param {string} src
 * @param {string} dest
 */
async function copyFileIfExists(src, dest) {
  try {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
  } catch (err) {
    /** @type {NodeJS.ErrnoException} */
    const e = /** @type {NodeJS.ErrnoException} */ (err);
    if (e && e.code === "ENOENT") return;
    throw err;
  }
}

/**
 * @typedef {(srcPath: string, entry: import("fs").Dirent) => boolean} CopyFilter
 */

/**
 * @param {string} srcDir
 * @param {string} destDir
 * @param {{ filter?: CopyFilter }} [options]
 */
async function copyDirRecursive(srcDir, destDir, options = {}) {
  const { filter } = options;
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  await fs.mkdir(destDir, { recursive: true });

  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(destDir, entry.name);

      if (filter && !filter(srcPath, entry)) return;

      if (entry.isDirectory()) {
        await copyDirRecursive(srcPath, destPath, { filter });
      } else if (entry.isFile()) {
        await fs.copyFile(srcPath, destPath);
      }
    })
  );
}

/**
 * @param {string} srcPath
 * @param {string} destPath
 */
async function minifyJsFile(srcPath, destPath) {
  const code = await fs.readFile(srcPath, "utf8");
  /** @type {import("esbuild").TransformResult} */
  const result = await esbuild.transform(code, {
    loader: "js",
    minify: true,
    sourcemap: false,
    legalComments: "none",
    charset: "utf8",
    target: "es2018",
  });
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await fs.writeFile(destPath, result.code, "utf8");
}

/**
 * @param {string} html
 */
function extractInlineScriptFromIndexHtml(html) {
  // We only want the final inline <script> block (the big one),
  // leaving external scripts untouched.
  const re = /<script>([\s\S]*?)<\/script>\s*<\/html>\s*$/i;
  const match = html.match(re);
  if (!match) {
    throw new Error("Could not find final inline <script> block at end of index.html");
  }
  const inlineJs = match[1];
  const htmlWithoutInline = html.replace(re, "</html>\n");
  return { inlineJs, htmlWithoutInline };
}

async function buildIndexHtml() {
  const srcIndexPath = path.join(ROOT, "index.html");
  const html = await fs.readFile(srcIndexPath, "utf8");
  const { inlineJs, htmlWithoutInline } = extractInlineScriptFromIndexHtml(html);

  /** @type {import("esbuild").TransformResult} */
  const minifiedInline = await esbuild.transform(inlineJs, {
    loader: "js",
    minify: true,
    sourcemap: false,
    legalComments: "none",
    charset: "utf8",
    target: "es2018",
  });

  const outInlinePath = path.join(OUT_DIR, "public", "app.js");
  await fs.mkdir(path.dirname(outInlinePath), { recursive: true });
  await fs.writeFile(outInlinePath, minifiedInline.code, "utf8");

  // Important: in this repo `index.html` loads dependency scripts *after* `</body>`.
  // So `app.js` must be injected at the very end (before `</html>`) to ensure all
  // globals from `public/*.js` exist before Alpine evaluates `gameState()`.
  const injectionTag = '  <script src="public/app.js"></script>\n';
  const outHtml = htmlWithoutInline.replace("</html>", `${injectionTag}</html>`);

  await fs.writeFile(path.join(OUT_DIR, "index.html"), outHtml, "utf8");
}

async function buildPublicAssets() {
  const srcPublicDir = path.join(ROOT, "public");
  const outPublicDir = path.join(OUT_DIR, "public");

  // Copy everything except JS first (images, css, etc).
  await copyDirRecursive(srcPublicDir, outPublicDir, {
    filter: (srcPath, entry) => {
      if (!entry.isFile()) return true;
      return !srcPath.endsWith(".js");
    },
  });

  // Minify all JS files in /public (including large dictionary/puzzles data files).
  const entries = await fs.readdir(srcPublicDir, { withFileTypes: true });
  await Promise.all(
    entries
      .filter((e) => e.isFile() && e.name.endsWith(".js"))
      .map((e) => minifyJsFile(path.join(srcPublicDir, e.name), path.join(outPublicDir, e.name)))
  );
}

async function copyRootWebAssets() {
  const rootFilesToCopy = [
    "CNAME",
    "robots.txt",
    "sitemap.xml",
    "site.webmanifest",
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "apple-touch-icon.png",
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "preview.png",
  ];

  await Promise.all(rootFilesToCopy.map((name) => copyFileIfExists(path.join(ROOT, name), path.join(OUT_DIR, name))));
}

async function main() {
  console.log("Building into docs/ ...");
  await ensureEmptyDir(OUT_DIR);
  await copyRootWebAssets();
  await buildPublicAssets();
  await buildIndexHtml();
  console.log("Build complete.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
