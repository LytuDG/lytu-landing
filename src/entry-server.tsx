import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

export function render(url: string) {
  // Shell vacío - la hidratación del cliente será casi instantánea
  // Esto evita el flash de "Loading..." sin estilo
  const html = renderToString(
    <StrictMode>
      <div
        id="app-shell"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #0f172a, #1e293b)",
        }}
      ></div>
    </StrictMode>
  );

  // Meta tags dinámicos optimizados para SEO máximo
  const getMetaTags = (path: string) => {
    const baseUrl = "https://lytu.tech"; // Dominio oficial de Lytu
    const ogImage = `${baseUrl}/og-image.png`;

    interface RouteMetadata {
      title: string;
      description: string;
      keywords: string;
      ogType: string;
      schema?: object;
    }

    const routes: Record<string, RouteMetadata> = {
      "/": {
        title: "Lytu - Desarrollo de Software a Medida con IA",
        description:
          "Transformamos ideas en soluciones digitales. Desarrollo de software personalizado, aplicaciones web y móviles, sistemas empresariales con inteligencia artificial. Cotización en 24 horas.",
        keywords:
          "desarrollo software, desarrollo web, aplicaciones móviles, IA, inteligencia artificial, software a medida, desarrollo personalizado, sistemas empresariales, React, Node.js",
        ogType: "website",
        schema: {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Lytu",
          description: "Desarrollo de Software a Medida con IA",
          url: baseUrl,
          logo: ogImage,
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Sales",
            availableLanguage: ["Spanish", "English"],
          },
          sameAs: [
            // Agrega tus redes sociales aquí
          ],
        },
      },
      "/quote-request": {
        title: "Solicitar Cotización de Proyecto - Lytu",
        description:
          "Solicita una cotización gratuita para tu proyecto de software. Respuesta profesional en 24 horas. Desarrollo web, apps móviles, sistemas empresariales y soluciones con IA.",
        keywords:
          "cotización software, presupuesto desarrollo web, cotizar app móvil, precio desarrollo software, consultoría tecnológica",
        ogType: "website",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Cotización de Desarrollo de Software",
          provider: {
            "@type": "Organization",
            name: "Lytu",
          },
          description:
            "Servicio de cotización gratuita para proyectos de desarrollo de software",
          areaServed: "Worldwide",
          availableLanguage: ["Spanish", "English"],
        },
      },
      "/track-quote": {
        title: "Rastrear Cotización - Lytu",
        description:
          "Rastrea el estado de tu cotización de proyecto de software en tiempo real. Consulta el progreso, timeline estimado y detalles de tu solicitud.",
        keywords:
          "rastrear cotización, seguimiento proyecto, estado cotización, tracking software",
        ogType: "website",
      },
    };

    const route = routes[path] || routes["/"];
    const canonicalUrl = `${baseUrl}${path}`;

    // Schema.org JSON-LD
    const schemaMarkup = route.schema
      ? `<script type="application/ld+json">${JSON.stringify(
          route.schema
        )}</script>`
      : "";

    return `
      <!-- Primary Meta Tags -->
      <title>${route.title}</title>
      <meta name="title" content="${route.title}" />
      <meta name="description" content="${route.description}" />
      <meta name="keywords" content="${route.keywords}" />
      <link rel="canonical" href="${canonicalUrl}" />
      
      <!-- Language and Locale -->
      <meta property="og:locale" content="es_ES" />
      <meta property="og:locale:alternate" content="en_US" />
      <html lang="es" />
      
      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="${route.ogType}" />
      <meta property="og:url" content="${canonicalUrl}" />
      <meta property="og:title" content="${route.title}" />
      <meta property="og:description" content="${route.description}" />
      <meta property="og:image" content="${ogImage}" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Lytu - Desarrollo de Software a Medida" />
      <meta property="og:site_name" content="Lytu" />
      
      <!-- Twitter -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="${canonicalUrl}" />
      <meta name="twitter:title" content="${route.title}" />
      <meta name="twitter:description" content="${route.description}" />
      <meta name="twitter:image" content="${ogImage}" />
      <meta name="twitter:image:alt" content="Lytu - Desarrollo de Software a Medida" />
      
      <!-- Additional SEO -->
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Lytu" />
      <meta name="theme-color" content="#0f172a" />
      
      <!-- Schema.org JSON-LD -->
      ${schemaMarkup}
    `;
  };

  return {
    html,
    head: getMetaTags(url),
  };
}
