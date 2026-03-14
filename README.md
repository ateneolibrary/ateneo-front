# Ateneo Front

<p align="center">
  <img src="./public/images/brand/medium.png" alt="Ateneo logo" width="170" />
</p>

<p align="center">
  <strong>Plataforma para clubes de lectura</strong><br />
  Gestion de comunidad, lecturas y encuentros en una experiencia editorial y moderna.
</p>

## Que hace esta aplicacion

Ateneo es el frontend de una app para organizar y sostener clubes de lectura.
Permite crear cuentas, explorar una landing de captacion, gestionar clubes, reuniones,
miembros, biblioteca y perfil de usuario.

Hoy funciona con datos mock para prototipado de producto y validacion UX.

## Funcionalidades principales

- Landing de marketing en `/` con enfoque de conversion.
- Registro y acceso en `/create-account` y `/login`.
- Vista de clubes en `/my-clubs`.
- Dashboard por club con rutas por modulo:
  - `/my-clubs/[id]/dashboard`
  - `/my-clubs/[id]/members`
  - `/my-clubs/[id]/meetings`
  - `/my-clubs/[id]/library`
  - `/my-clubs/[id]/[bookId]`
- Perfil publico de usuario en `/profile/[userId]`.
- Flujo de creacion de club en `/create-club`.

## Stack tecnico

- Next.js 16 (App Router)
- React 19
- TypeScript 5 (strict)
- ESLint 9
- CSS Modules + `app/globals.css` para tokens globales

## Estructura del proyecto

```text
app/                    # rutas, layouts y pages (App Router)
components/             # UI y modulos funcionales
components/mock-app/    # dominio mock, tipos y helpers de datos
public/images/brand/    # assets de marca (logo y favicons)
public/images/books/    # portadas para mocks
requirements/           # contexto de producto
```

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

## Testing

Actualmente no hay runner de tests configurado en `package.json`.
La validacion automatizada disponible hoy es lint (`npm run lint`).

## Diseno y estilo

- Lenguaje visual editorial/Bauhaus.
- Paleta basada en `--paper`, `--ink` y `--accent`.
- Bordes definidos, jerarquia tipografica fuerte y foco en claridad.
- Mobile-first con comportamiento responsive en todas las pantallas clave.

## Estado actual

- Esta version prioriza validacion de producto y UX.
- Los datos y algunas secciones institucionales/legales son mock.
- La estructura esta preparada para evolucionar a contenido real en etapas de lanzamiento.

## Como contribuir

1. Crea una rama de feature.
2. Implementa cambios siguiendo las convenciones del repo.
3. Corre `npm run lint` antes de abrir PR.
4. Abre Pull Request con resumen claro del cambio.

## Licencia

Pendiente de definir.
