import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // evitar prerender en rutas dinámicas con parámetros
  {
    path: 'users/:name',
    // servir esta ruta en el cliente para que Angular procese el parámetro
    renderMode: RenderMode.Client
  },
  {
    path: 'users',
    // no prerender /users porque hace llamadas HTTP a /api/users durante el build
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
