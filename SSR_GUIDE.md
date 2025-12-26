# Guía de SSR (Server-Side Rendering) - Lytu Landing

## 📋 Resumen

Este proyecto está configurado con **Server-Side Rendering (SSR)** usando Vite + React + Express para mejorar el SEO y el rendimiento inicial de carga.

## 🏗️ Arquitectura

### Archivos Principales

1. **`src/entry-client.tsx`** - Punto de entrada del cliente

   - Usa `hydrateRoot` para hidratar el HTML renderizado por el servidor
   - Incluye `BrowserRouter` para navegación en el cliente

2. **`src/entry-server.tsx`** - Punto de entrada del servidor

   - Renderiza un shell HTML mínimo con estilos inline
   - Genera meta tags dinámicos para SEO basados en la ruta
   - Evita problemas de compatibilidad con react-router-dom v7

3. **`server.js`** - Servidor Express

   - Modo desarrollo: Usa middleware de Vite para HMR
   - Modo producción: Sirve archivos estáticos compilados
   - Maneja SSR para todas las rutas

4. **`index.html`** - Template HTML

   - Incluye estilos críticos inline para evitar FOUC (Flash of Unstyled Content)
   - Placeholders `<!--app-head-->` y `<!--app-html-->` para SSR

5. **`vite.config.ts`** - Configuración de Vite
   - Configurado para generar manifest y ssr-manifest
   - Optimizado para SSR con condiciones de resolución apropiadas

## 🚀 Comandos Disponibles

### Desarrollo

```bash
npm run dev
```

- Inicia servidor de desarrollo con SSR
- Hot Module Replacement (HMR) habilitado
- Puerto: 5173

### Build

```bash
npm run build
```

- Compila cliente y servidor para producción
- Genera archivos en `dist/client` y `dist/server`
- Crea manifests para optimización

### Preview/Producción

```bash
npm run preview
```

- Inicia servidor de producción en puerto 5173
- Usa los archivos compilados de `dist/`

```bash
npm run preview:5174
```

- Igual que preview pero en puerto 5174
- Útil para probar sin conflictos

```bash
npm run serve
```

- Build + Preview en un solo comando
- Perfecto para pruebas rápidas de producción

## 🎯 Características Implementadas

### ✅ SEO Optimizado

- **Meta tags dinámicos** por ruta
- **Open Graph** tags para redes sociales
- **Twitter Card** tags
- Títulos y descripciones personalizados

### ✅ Rendimiento

- **Shell rendering** mínimo para carga rápida
- **Estilos críticos inline** para evitar FOUC
- **Compresión gzip** en producción
- **Archivos estáticos** servidos eficientemente

### ✅ Experiencia de Usuario

- **Sin flash de "Loading"** visible
- **Fondo consistente** desde el primer momento
- **Hidratación suave** del cliente
- **Transiciones imperceptibles**

## 📝 Rutas con Meta Tags Personalizados

| Ruta             | Título                                 | Descripción                                     |
| ---------------- | -------------------------------------- | ----------------------------------------------- |
| `/`              | Lytu - Desarrollo de Software a Medida | Soluciones de software personalizadas con IA... |
| `/quote-request` | Solicitar Cotización - Lytu            | Solicita una cotización para tu proyecto...     |
| `/track-quote`   | Rastrear Cotización - Lytu             | Rastrea el estado de tu cotización...           |

## 🔧 Configuración Técnica

### Variables de Entorno

```bash
NODE_ENV=production  # Modo producción
PORT=5173           # Puerto del servidor (default: 5173)
BASE=/              # Base path (default: /)
```

### Estructura de Directorios

```
lytu-landing/
├── dist/
│   ├── client/          # Build del cliente
│   │   ├── assets/      # CSS, JS compilados
│   │   ├── .vite/       # Manifests
│   │   └── index.html   # HTML procesado
│   └── server/          # Build del servidor
│       └── entry-server.js
├── src/
│   ├── entry-client.tsx # Entrada del cliente
│   ├── entry-server.tsx # Entrada del servidor
│   └── App.tsx          # Aplicación principal
├── index.html           # Template HTML
├── server.js            # Servidor Express
└── vite.config.ts       # Config de Vite
```

## 🐛 Solución de Problemas

### El servidor no inicia

```bash
# Verifica que no haya otro proceso en el puerto
netstat -ano | findstr :5173

# Usa un puerto diferente
npm run preview:5174
```

### Error de build

```bash
# Limpia y reconstruye
rm -rf dist node_modules
npm install
npm run build
```

### Problemas de hidratación

- Verifica que `entry-client.tsx` y `entry-server.tsx` usen la misma estructura
- Asegúrate de que los estilos críticos estén en `index.html`

## 📊 Rendimiento

### Métricas Esperadas

- **First Contentful Paint (FCP)**: < 1.5s
- **Time to Interactive (TTI)**: < 3.5s
- **SEO Score**: 95+

### Optimizaciones Futuras

1. **Code splitting** para reducir bundle size
2. **Lazy loading** de componentes pesados
3. **Image optimization** con formatos modernos
4. **Service Worker** para PWA

## 🔄 Actualización a SSR Completo (Opcional)

Si necesitas renderizar toda la aplicación en el servidor (no solo el shell):

### Opción 1: Downgrade react-router-dom

```bash
npm install react-router-dom@6
```

Luego actualiza `entry-server.tsx` para usar `StaticRouter`:

```tsx
import { StaticRouter } from "react-router-dom/server";

export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  return { html };
}
```

### Opción 2: Migrar a Framework SSR

- **Remix** (recomendado para React Router)
- **Next.js** (ecosistema completo)
- **Vite + TanStack Router**

## 📚 Referencias

- [Vite SSR Guide](https://vitejs.dev/guide/ssr.html)
- [React Server Components](https://react.dev/reference/react-dom/server)
- [Express.js Documentation](https://expressjs.com/)

## ✨ Mantenimiento

### Actualizar dependencias

```bash
npm update
npm audit fix
```

### Verificar build

```bash
npm run build
npm run preview
# Abre http://localhost:5173 y verifica
```

---

**Última actualización**: 2025-12-26
**Versión**: 1.0.0
