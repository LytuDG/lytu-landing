import { Handler } from "@netlify/functions";
import fs from "fs";
import path from "path";

const functionDir = process.cwd();

const templatePath = path.join(functionDir, "dist/client/index.html");
const serverPath = path.join(functionDir, "dist/server/entry-server.js");

let template: string | null = null;
let render: ((url: string, manifest?: string) => { html: string; head?: string }) | null = null;
let renderPromise: Promise<void> | null = null;

async function initializeSSR() {
  if (renderPromise) return renderPromise;
  
  renderPromise = (async () => {
    try {
      template = fs.readFileSync(templatePath, "utf-8");
      
      if (!fs.existsSync(serverPath)) {
        throw new Error(`Server file not found at: ${serverPath}`);
      }
      
      const serverModule = await import(serverPath);
      
      if (typeof serverModule.render !== "function") {
        throw new Error("render function not exported from server module");
      }
      
      render = serverModule.render;
      console.log("SSR initialized");
    } catch (error) {
      console.error("SSR init error:", error);
      throw error;
    }
  })();
  
  return renderPromise;
}

export const handler: Handler = async (event) => {
  const url = event.path || "/";
  
  const isStaticAsset = 
    url.startsWith("/assets/") || 
    url.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/);
  
  if (isStaticAsset) {
    return { statusCode: 404, body: "Not found" };
  }

  try {
    await initializeSSR();
    
    if (!render || !template) {
      throw new Error("SSR modules not initialized");
    }

    const rendered = render(url);
    
    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
      body: html,
    };
  } catch (error) {
    console.error("SSR error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/html" },
      body: `<!DOCTYPE html><html><head><title>Error</title></head><body style="background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;"><div style="text-align:center;padding:2rem;"><h1>Error del servidor</h1><p>Por favor, intenta más tarde.</p></div></body></html>`,
    };
  }
};
