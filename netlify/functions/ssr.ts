import { Handler } from "@netlify/functions";
import fs from "fs";
import path from "path";

// En Netlify, __dirname se proporciona automáticamente en CommonJS
// La ruta relativa es desde la función: netlify/functions/ssr.js
// Queremos: ../../dist/client/ y ../../dist/server/
const functionDir = process.cwd(); // Raíz del proyecto en Netlify

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
      // Usar import dinámico con ruta de archivo
      const serverModule = await import(serverPath);
      render = serverModule.render;
      console.log("SSR modules loaded successfully from:", {
        template: templatePath,
        server: serverPath,
      });
    } catch (error) {
      console.error("Error loading SSR modules:", error);
      throw new Error(`Failed to initialize SSR: ${error}`);
    }
  })();
  
  return renderPromise;
}

export const handler: Handler = async (event) => {
  const url = event.path || "/";

  try {
    // Inicializar SSR si no está inicializado
    await initializeSSR();

    // Servir archivos estáticos directamente
    if (
      url.startsWith("/assets/") ||
      url.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/)
    ) {
      return {
        statusCode: 404,
        body: "Static file - should be served by Netlify",
      };
    }

    // Validar que render está disponible
    if (!render || !template) {
      throw new Error("SSR modules not loaded");
    }

    // Renderizar SSR
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
    console.error("SSR Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Error - Lytu</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                background: linear-gradient(to bottom, #0f172a, #1e293b);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: sans-serif;
                color: white;
              }
              .error-container {
                text-align: center;
                padding: 2rem;
              }
              h1 { font-size: 2rem; margin-bottom: 1rem; }
              p { opacity: 0.8; }
            </style>
          </head>
          <body>
            <div class="error-container">
              <h1>Error del Servidor</h1>
              <p>Lo sentimos, ha ocurrido un error. Por favor, intenta de nuevo más tarde.</p>
            </div>
          </body>
        </html>
      `,
    };
  }
};
