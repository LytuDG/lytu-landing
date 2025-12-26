# Lytu Landing - Website Oficial

Landing page oficial de Lytu con SSR (Server-Side Rendering) optimizado para SEO y rendimiento.

## 🚀 Deploy en Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

**URL de Producción**: https://lytu.tech

### Deploy Rápido

```bash
# Build local
npm run build

# Preview local
npm run preview

# Deploy a Netlify (requiere Netlify CLI)
netlify deploy --prod
```

Ver [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md) para instrucciones detalladas.

## 📋 Características

- ✅ **SSR con Vite** - Renderizado del lado del servidor para mejor SEO
- ✅ **React 19** - Última versión de React
- ✅ **TypeScript** - Type safety en todo el proyecto
- ✅ **Tailwind CSS 4** - Estilos modernos y responsivos
- ✅ **React Router 7** - Navegación del lado del cliente
- ✅ **i18next** - Internacionalización (ES/EN)
- ✅ **SEO Optimizado** - Meta tags, Open Graph, Schema.org
- ✅ **Netlify Functions** - Funciones serverless para SSR
- ✅ **PWA Ready** - Preparado para Progressive Web App

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Routing**: React Router 7
- **i18n**: i18next
- **Backend**: Supabase
- **IA**: Google Gemini
- **Deploy**: Netlify
- **SSR**: Express + Netlify Functions

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/lytu-landing.git
cd lytu-landing

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales

# Iniciar desarrollo
npm run dev
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo con SSR (puerto 5173)

# Build
npm run build            # Build completo (cliente + servidor)
npm run build:client     # Build solo del cliente
npm run build:server     # Build solo del servidor

# Preview/Producción
npm run preview          # Servidor de producción local (puerto 5173)
npm run preview:5174     # Servidor de producción en puerto 5174
npm run serve            # Build + Preview en un comando

# Calidad de Código
npm run lint             # Ejecutar ESLint
```

## 🌍 Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# Supabase
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_key_de_supabase

# Google AI
VITE_GOOGLE_AI_KEY=tu_key_de_google_ai

# Opcional
VITE_APP_URL=https://lytu.tech
```

## 📁 Estructura del Proyecto

```
lytu-landing/
├── netlify/
│   └── functions/
│       └── ssr.ts              # Función serverless para SSR
├── public/
│   ├── _headers                # Headers HTTP de Netlify
│   ├── _redirects              # Redirects de Netlify
│   ├── 404.html                # Página 404 personalizada
│   ├── robots.txt              # SEO
│   ├── sitemap.xml             # SEO
│   └── og-image.png            # Open Graph image
├── src/
│   ├── components/             # Componentes React
│   ├── contexts/               # React Contexts
│   ├── i18n/                   # Configuración i18next
│   ├── interfaces/             # TypeScript interfaces
│   ├── lib/                    # Utilidades y configuraciones
│   ├── pages/                  # Páginas de la aplicación
│   ├── services/               # Servicios (API calls)
│   ├── utils/                  # Funciones utilitarias
│   ├── App.tsx                 # Componente principal
│   ├── entry-client.tsx        # Entrada del cliente (hidratación)
│   ├── entry-server.tsx        # Entrada del servidor (SSR)
│   └── main.tsx                # Punto de entrada (legacy)
├── index.html                  # Template HTML
├── server.js                   # Servidor Express (desarrollo local)
├── vite.config.ts              # Configuración de Vite
├── netlify.toml                # Configuración de Netlify
├── package.json                # Dependencias y scripts
└── tsconfig.json               # Configuración de TypeScript
```

## 🎨 Diseño

El diseño sigue los principios de:

- **Minimalismo moderno**
- **Gradientes vibrantes** (#6366f1 → #22d3ee)
- **Dark mode** por defecto
- **Animaciones suaves**
- **Responsive design**

## 📊 SEO

- **Meta tags dinámicos** por ruta
- **Open Graph** optimizado para redes sociales
- **Twitter Cards** configuradas
- **Schema.org JSON-LD** para rich snippets
- **Sitemap.xml** generado
- **Robots.txt** configurado
- **Canonical URLs** en todas las páginas

## 🔒 Seguridad

- **Headers de seguridad** configurados (CSP, X-Frame-Options, etc.)
- **HTTPS** forzado
- **Sanitización** de inputs
- **Rate limiting** en funciones serverless

## 📈 Performance

- **SSR** para carga inicial rápida
- **Code splitting** automático
- **Lazy loading** de componentes
- **Cache optimizado** para assets estáticos
- **Compresión gzip/brotli**

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén configurados)
npm test

# Coverage
npm run test:coverage
```

## 📝 Documentación Adicional

- [Guía de SSR](./SSR_GUIDE.md) - Documentación completa de SSR
- [Deploy en Netlify](./NETLIFY_DEPLOY.md) - Guía de despliegue
- [Internacionalización](./I18N_GUIDE.md) - Guía de i18n
- [Admin](./admin-doc.md) - Documentación del panel admin

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Todos los derechos reservados © 2025 Lytu

## 👥 Equipo

Desarrollado con ❤️ por el equipo de Lytu

---

**Website**: https://lytu.tech  
**Email**: contact@lytu.tech  
**Versión**: 1.0.0
