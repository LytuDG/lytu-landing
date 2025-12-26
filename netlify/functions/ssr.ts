import { Handler } from "@netlify/functions";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar el HTML template y el módulo SSR
const templatePath = path.resolve(__dirname, "../../dist/client/index.html");
const serverPath = path.resolve(__dirname, "../../dist/server/entry-server.js");

let template: string;
let render: (url: string, manifest?: string) => { html: string; head?: string };

try {
  template = fs.readFileSync(templatePath, "utf-8");
  const serverModule = await import(serverPath);
  render = serverModule.render;
} catch (error) {
  console.error("Error loading SSR modules:", error);
}

export const handler: Handler = async (event) => {
  const url = event.path || "/";

  try {
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
