import fs from "node:fs/promises";
import express from "express";
import compression from "compression";
import serveStatic from "serve-static";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Cached production assets
let templateHtml = "";
let ssrManifest = undefined;

if (isProduction) {
  try {
    templateHtml = await fs.readFile("./dist/client/index.html", "utf-8");
    console.log("✓ Loaded production HTML template");
  } catch (e) {
    console.error("✗ Failed to load production HTML template:", e.message);
    process.exit(1);
  }

  try {
    ssrManifest = await fs.readFile(
      "./dist/client/.vite/ssr-manifest.json",
      "utf-8"
    );
    console.log("✓ Loaded SSR manifest");
  } catch (e) {
    console.warn("⚠ SSR manifest not found (optional):", e.message);
  }
}

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
  console.log("✓ Vite dev server middleware loaded");
} else {
  app.use(compression());
  app.use(base, serveStatic("./dist/client", { index: false }));
  console.log("✓ Production static files middleware loaded");
}

// Serve HTML - catch all routes
app.use(async (req, res, next) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    if (!isProduction && vite) {
      vite.ssrFixStacktrace(e);
    }
    console.error("Error rendering page:", e);
    next(e);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`\n🚀 Server started at http://localhost:${port}`);
  console.log(`   Mode: ${isProduction ? "production" : "development"}\n`);
});
