# Guía de Despliegue en Netlify - Lytu Landing

## 📋 Resumen

Este proyecto está completamente configurado para desplegarse en Netlify con SSR (Server-Side Rendering) usando funciones serverless.

## 🚀 Despliegue Rápido

### Opción 1: Desde la Interfaz de Netlify (Recomendado)

1. **Conecta tu repositorio**

   - Ve a [Netlify](https://app.netlify.com/)
   - Click en "Add new site" → "Import an existing project"
   - Conecta tu cuenta de GitHub/GitLab/Bitbucket
   - Selecciona el repositorio `lytu-landing`

2. **Configuración automática**

   - Netlify detectará automáticamente la configuración de `netlify.toml`
   - Build command: `npm run build`
   - Publish directory: `dist/client`
   - Functions directory: `netlify/functions`

3. **Variables de entorno** (si las necesitas)

   - Ve a Site settings → Environment variables
   - Agrega las variables necesarias (ej: API keys de Supabase, Google AI, etc.)

4. **Deploy**
   - Click en "Deploy site"
   - Espera a que termine el build (2-3 minutos)
   - ¡Listo! Tu sitio estará en `https://[nombre-aleatorio].netlify.app`

### Opción 2: Netlify CLI

```bash
# Instalar Netlify CLI globalmente
npm install -g netlify-cli

# Login en Netlify
netlify login

# Inicializar el sitio
netlify init

# Deploy manual
netlify deploy --prod
```

## 🔧 Configuración del Dominio

### Configurar lytu.tech

1. **En Netlify**:

   - Ve a Site settings → Domain management
   - Click en "Add custom domain"
   - Ingresa: `lytu.tech`
   - Click en "Verify"

2. **En tu proveedor de DNS**:
   Agrega estos registros DNS:

   **Para Apex Domain (lytu.tech)**:

   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

   **Para www (www.lytu.tech)**:

   ```
   Type: CNAME
   Name: www
   Value: [tu-sitio].netlify.app
   ```

   **Alternativa con Netlify DNS** (Recomendado):

   - Usa los nameservers de Netlify
   - Netlify manejará todo automáticamente

3. **SSL/HTTPS**:
   - Netlify provee SSL gratis con Let's Encrypt
   - Se configura automáticamente
   - Espera 24-48 horas para propagación DNS

## 📁 Estructura de Archivos para Netlify

```
lytu-landing/
├── netlify/
│   └── functions/
│       └── ssr.ts          # Función serverless para SSR
├── public/
│   ├── _headers            # Headers HTTP
│   ├── _redirects          # Redirects
│   ├── 404.html            # Página 404 personalizada
│   ├── robots.txt          # SEO
│   ├── sitemap.xml         # SEO
│   └── og-image.png        # Open Graph image
├── dist/                   # Generado por build
│   ├── client/             # Archivos estáticos
│   └── server/             # SSR bundle
└── netlify.toml            # Configuración de Netlify
```

## ⚙️ Configuración Incluida

### netlify.toml

- ✅ Build command y directorio de publicación
- ✅ Configuración de funciones serverless
- ✅ Headers de seguridad (X-Frame-Options, CSP, etc.)
- ✅ Cache optimizado para assets estáticos
- ✅ Redirects (www → non-www, http → https)
- ✅ Node.js 22

### Funciones Serverless

- ✅ SSR con renderizado del lado del servidor
- ✅ Meta tags dinámicos por ruta
- ✅ Manejo de errores robusto
- ✅ Página de error personalizada

### SEO

- ✅ robots.txt configurado
- ✅ sitemap.xml con todas las rutas
- ✅ Meta tags optimizados
- ✅ Open Graph y Twitter Cards
- ✅ Schema.org JSON-LD

## 🔍 Variables de Entorno

Si tu proyecto usa variables de entorno, configúralas en Netlify:

```bash
# Ejemplo de variables que podrías necesitar
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_key_de_supabase
VITE_GOOGLE_AI_KEY=tu_key_de_google_ai
```

**Configurar en Netlify**:

1. Site settings → Environment variables
2. Add a variable
3. Ingresa nombre y valor
4. Save

## 📊 Monitoreo y Analytics

### Netlify Analytics (Opcional - Pago)

- Métricas de tráfico sin JavaScript
- No afecta el rendimiento
- Datos de servidor

### Google Analytics (Gratis)

- Agrega tu tracking ID en el código
- Más detallado pero requiere JavaScript

## 🐛 Solución de Problemas

### Build Falla

**Error: "Command failed"**

```bash
# Verifica que el build funcione localmente
npm run build

# Si falla, revisa:
- Dependencias en package.json
- Versión de Node.js (debe ser 22)
- Variables de entorno faltantes
```

**Error: "Function bundling failed"**

```bash
# Verifica que @netlify/functions esté instalado
npm install -D @netlify/functions

# Rebuild
npm run build
```

### Función SSR no funciona

1. Verifica que `dist/server/entry-server.js` existe después del build
2. Revisa los logs en Netlify: Functions → [tu-función] → Logs
3. Asegúrate de que los redirects estén configurados correctamente

### Dominio no funciona

1. Verifica la configuración DNS (puede tardar 24-48 horas)
2. Usa [DNS Checker](https://dnschecker.org/) para verificar propagación
3. Asegúrate de que el dominio esté verificado en Netlify

### SSL no se activa

1. Espera 24-48 horas después de configurar DNS
2. Ve a Site settings → Domain management → HTTPS
3. Click en "Verify DNS configuration"
4. Si persiste, contacta soporte de Netlify

## 🔄 Actualización Continua

### Deploy Automático

Netlify hace deploy automático cuando:

- Haces push a la rama principal (main/master)
- Creas un Pull Request (deploy preview)

### Deploy Manual

```bash
# Desde la CLI
netlify deploy --prod

# O desde la interfaz
Site overview → Deploys → Trigger deploy
```

## 📈 Optimizaciones Post-Deploy

### 1. Configurar Prerendering (Opcional)

Para páginas que no cambian frecuentemente:

```toml
# En netlify.toml
[[plugins]]
  package = "@netlify/plugin-sitemap"
```

### 2. Habilitar Asset Optimization

En Site settings → Build & deploy → Post processing:

- ✅ Bundle CSS
- ✅ Minify CSS
- ✅ Minify JS
- ✅ Compress images

### 3. Configurar Forms (si usas Netlify Forms)

```html
<form name="contact" method="POST" data-netlify="true">
  <!-- tus campos -->
</form>
```

## 📝 Checklist Pre-Deploy

- [ ] Build funciona localmente (`npm run build`)
- [ ] Preview funciona localmente (`npm run preview`)
- [ ] Variables de entorno configuradas
- [ ] Dominio configurado en DNS
- [ ] robots.txt actualizado con dominio correcto
- [ ] sitemap.xml actualizado con dominio correcto
- [ ] Meta tags tienen URLs correctas
- [ ] Imágenes OG están en `/public`
- [ ] Favicon está en `/public`

## 🎯 Próximos Pasos Después del Deploy

1. **Verificar SEO**

   - Google Search Console
   - Bing Webmaster Tools
   - Submit sitemap

2. **Configurar Analytics**

   - Google Analytics
   - Netlify Analytics (opcional)

3. **Monitorear Performance**

   - Lighthouse CI
   - WebPageTest
   - GTmetrix

4. **Configurar Alertas**
   - Uptime monitoring
   - Error tracking (Sentry)

## 🆘 Soporte

- **Documentación Netlify**: https://docs.netlify.com/
- **Comunidad Netlify**: https://answers.netlify.com/
- **Status Netlify**: https://www.netlifystatus.com/

---

**Última actualización**: 2025-12-26
**Versión**: 1.0.0
