# PRD: Explore Clubs and Library

**Status:** Draft
**Author:** Product Team
**Stakeholders:** Product, Design, Frontend, Data
**Date Created:** 2026-03-15
**Last Updated:** 2026-03-15
**Version:** 1.0
**Route:** /explore/

## Executive Summary

Explore Clubs and Library habilita el descubrimiento de clubes de lectura y librerias cercanas desde una unica experiencia en la ruta /explore/. El producto debe funcionar para usuarios autenticados y no autenticados, incluyendo usuarios que no tienen cuenta.

La feature ataca dos necesidades de alto impacto: encontrar comunidad lectora afin y encontrar puntos de compra de libros en proximidad geografica. El valor de negocio esperado es incrementar descubrimiento relevante, facilitar conversion futura a participacion en clubes y abrir oportunidades de compra de libros.

La entrega se define en dos fases para resolver la ambiguedad de mapa: un MVP sin mapa interactivo pero con modelo de datos, eventos y estructura de UI preparados para integrarlo, y una fase posterior con mapa y pines clickeables que registran metricas de visita.

Quick Facts:
- Target Users: usuarios autenticados y no autenticados
- Problem Solved: baja visibilidad de clubes afines y librerias cercanas
- Key Metric: proposed North Star pendiente de confirmacion
- Target Launch: por definir por roadmap de producto

## Problem Statement

### The Problem

Hoy no existe una experiencia dedicada para descubrir de forma rapida clubes y librerias cercanas. Esto obliga al usuario a buscar fuera de la plataforma o navegar sin criterio de proximidad y afinidad.

### Current State

- El usuario no cuenta con un listado consolidado en /explore/ para clubes presenciales, clubes online y librerias.
- No hay logica diferencial por tipo de usuario para ordenar resultados por afinidad.
- No existe una base de eventos de analitica para medir interes por librerias y preparar un mapa interactivo.

### Impact

User Impact:
- Mayor friccion para encontrar comunidades lectoras relevantes.
- Menor probabilidad de descubrir librerias utiles para compra de libros.

Business Impact:
- Menor profundidad de descubrimiento en etapas tempranas del funnel.
- Menos señales para priorizar alianzas con clubes y librerias.

### Why Now

Esta funcionalidad desbloquea un caso de uso transversal de descubrimiento para cualquier visitante y prepara infraestructura de producto para evolucionar a mapa interactivo sin rehacer la base funcional.

## Goals & Objectives

### Business Goals

1. Aumentar el descubrimiento de clubes afines para usuarios autenticados y no autenticados.
2. Mejorar la utilidad de la plataforma como punto de partida para compra de libros cercanos.
3. Instrumentar analitica confiable para decisiones de roadmap en discovery geografico.

### User Goals

1. Encontrar rapido clubes presenciales relevantes segun proximidad y afinidad.
2. Explorar clubes online con orden claro y consistente segun tipo de usuario.
3. Ver librerias cercanas y acceder a informacion de contacto util.

### Non-Goals

- Implementar en MVP el mapa interactivo con render de pines en tiempo real.
- Incluir recomendaciones pagas, ads o ranking patrocinado.
- Gestionar reservas, compras o pagos dentro de la experiencia.

## User Personas

### Primary Persona: Lector en descubrimiento

- Perfil: usuario general que quiere sumarse a un club o conseguir libros cerca.
- Estado de sesion: puede estar autenticado o navegar como invitado.
- Necesidad principal: decidir rapido adonde ir sin comparar manualmente muchas opciones.
- Frustraciones actuales: informacion dispersa, relevancia inconsistente, sin filtro compacto.

### Secondary Persona: Usuario recurrente autenticado

- Perfil: ya usa la plataforma y espera recomendaciones mas personalizadas.
- Necesidad principal: priorizar clubes alineados a sus categorias de lectura.
- Frustraciones actuales: no existe diferenciacion clara de ranking por afinidad.

## User Stories & Requirements

### Epic 1: Descubrimiento de clubes presenciales y online

#### Must-Have Stories P0

##### Story 1: Ranking de clubes presenciales para usuario autenticado

User Story: As a authenticated user, I want to see the top nearby in-person clubs, So that I can quickly choose the most relevant club for me.

Acceptance Criteria:
- Given un usuario autenticado en /explore/, when visualiza clubes presenciales, then el sistema muestra solo 5 clubes con mayor proximidad, listados de cinco en cico que podrá ir pasando. 
- Given empate en proximidad entre clubes presenciales, when se resuelve el orden, then gana el club con mayor cantidad de categorias en comun con el usuario.
- Given el toggle mostrar clubes no completos activo, when se arma la lista, then solo aparecen clubes donde miembros es distinto de maxMiembros.

Priority: Must Have P0
Effort: M
Dependencies: datos de usuario, categorias de club, capacidad de miembros

##### Story 2: Ranking de clubes presenciales para usuario no autenticado

User Story: As a guest user, I want to see nearby in-person clubs ordered consistently, So that I can discover options even without creating an account.

Acceptance Criteria:
- Given un usuario no autenticado en /explore/, when visualiza clubes presenciales, then el orden principal es por proximidad.
- Given empate en proximidad para no autenticado, when se resuelve el orden, then se prioriza el club mas antiguo.
- Given el toggle mostrar clubes no completos desactivado, when se arma la lista, then se incluyen tambien clubes completos.

Priority: Must Have P0
Effort: S
Dependencies: fecha de creacion de clubes, estado de capacidad

##### Story 3: Ranking de clubes online por tipo de usuario

User Story: As a platform visitor, I want online clubs sorted with clear rules, So that results feel predictable and useful.

Acceptance Criteria:
- Given un usuario no autenticado, when visualiza clubes online, then el orden principal es por fecha de creacion ascendente y empate por nombre.
- Given un usuario autenticado, when visualiza clubes online, then el orden principal es por cantidad de categorias comunes y empate por antiguedad del club.
- Given el toggle mostrar clubes no completos activo, when se arma la lista online, then se excluyen clubes completos.

Priority: Must Have P0
Effort: M
Dependencies: categorias usuario, categorias club, antiguedad, nombre

##### Story 4: Filtros de clubes y librerias

User Story: As a user exploring options, I want practical filters, So that I can narrow results to what matters to me.

Acceptance Criteria:
- Given filtro por categorias, when el usuario selecciona opciones, then no puede seleccionar mas de 5 categorias.
- Given filtro por libro actual del club, when se aplica filtro, then la lista de clubes refleja solo coincidencias del libro en lectura.
- Given filtro por nombre de club, when el usuario escribe un termino > 3 caracteres, then la lista de clubes muestra coincidencias por nombre.
- Given apertura de pantalla /explore/, when carga por primera vez, then el toggle mostrar clubes no completos inicia activo por defecto.

Priority: Must Have P0
Effort: M
Dependencies: metadata de categorias, titulo libro actual, nombre de libreria

### Epic 2: Descubrimiento de librerias cercanas

#### Must-Have Stories P0

##### Story 5: Listado de librerias por proximidad

User Story: As a user looking for books, I want to see 5 nearby libraries, So that I can quickly identify where to buy books.

Acceptance Criteria:
- Given cualquier usuario en /explore/, when visualiza librerias, then se muestran exactamente 5 librerias mas proximas.
- Given disponibilidad de datos de contacto, when el usuario abre detalle de libreria, then ve nombre, direccion y telefono.
- Given seleccion de una libreria en lista, when hace click, then se registra evento de visita de libreria.

Priority: Must Have P0
Effort: S
Dependencies: geodatos de librerias, capa de analitica de eventos

#### Should-Have Stories P1

##### Story 6: Preparacion para mapa interactivo

User Story: As a product team member, I want the MVP ready for map integration, So that we can launch map pins later without reworking core logic.

Acceptance Criteria:
- Given el MVP en produccion, when se revisa contrato de datos, then cada libreria posee estructura apta para geolocalizacion de pin.
- Given eventos de interaccion ya instrumentados, when llegue fase de mapa, then se reutilizan eventos para click en pin y click en item de lista.
- Given backlog de fase posterior, when se prioriza mapa, then no requiere redisenar reglas de ranking ni filtros existentes.

Priority: Should Have P1
Effort: M
Dependencies: definicion de contrato de geodatos y tracking

### Functional Requirements

| Req ID | Description | Priority | Status |
|---|---|---|---|
| FR-001 | Exponer ruta /explore/ para usuarios autenticados y no autenticados | Must Have | Open |
| FR-002 | Aplicar reglas de ranking de clubes presenciales segun estado de autenticacion | Must Have | Open |
| FR-003 | Aplicar reglas de ranking de clubes online segun estado de autenticacion | Must Have | Open |
| FR-004 | Mostrar solo clubes no completos por defecto con toggle configurable | Must Have | Open |
| FR-005 | Implementar filtros por categorias maximo 5, libro actual y nombre de club | Must Have | Open |
| FR-006 | Mostrar 5 librerias mas proximas con detalle nombre direccion telefono | Must Have | Open |
| FR-007 | Registrar evento de visita al click en libreria y futuro click en pin | Should Have | Open |

### Non-Functional Requirements

| Req ID | Category | Description | Target |
|---|---|---|---|
| NFR-001 | Usabilidad | Criterios de orden deben ser consistentes y explicables | 100% de listas con regla deterministica |
| NFR-002 | Accesibilidad | Navegacion por teclado y semantica correcta en filtros y listados | Cumplimiento WCAG AA en pantallas clave |
| NFR-003 | Observabilidad | Eventos de interaccion deben incluir contexto minimo para analisis | Cobertura de eventos criticos 95% |
| NFR-004 | Rendimiento | Tiempo de carga de experiencia inicial de /explore/ | menor a 2.5 segundos p75 |