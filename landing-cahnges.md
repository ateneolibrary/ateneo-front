# Landing Ateneo — plan de cambios para efecto wow

## Diagnóstico actual

- La landing mantiene una base visual coherente con la identidad editorial/Bauhaus (bordes fuertes, acento rojo, tipografía en mayúsculas), pero el ritmo visual es muy homogéneo: casi todas las secciones usan el mismo bloque rectangular con borde + fondo claro.
- El hero tiene buena jerarquía de texto, pero no presenta una pieza protagonista de alto impacto (solo texto + CTAs + lista), por lo que el primer pantallazo no comunica una "escena" memorable.
- Falta progresión narrativa entre secciones: Beneficios, Cómo funciona, Prueba social, FAQ y cierre usan una densidad y estructura muy similares, sin cambios claros de escala, tensión o sorpresa.
- El bloque "Libro de la semana" tiene potencial pero hoy funciona aislado: no conecta con una secuencia previa/siguiente ni incluye interacción editorial que refuerce valor diferencial.
- Los CTAs son correctos en contraste y legibilidad, pero su comportamiento visual es estático en la página (sin refuerzo por contexto, sin estados de scroll, sin señal de prioridad por tramo).
- El header tiene animación de hover en links, pero no participa activamente de la narrativa de scroll (no cambia estado, no destaca acción principal, no aporta percepción premium durante la lectura).

## Principios de wow para Ateneo

1. **Contraste con intención**: alternar secciones de alta energía visual y secciones de lectura calmada para crear cadencia, no un bloque continuo uniforme.
2. **Una idea fuerte por tramo**: cada sección debe tener una promesa principal, una imagen mental clara y una acción asociada.
3. **Bauhaus funcional**: geometría, color y tipografía deben guiar decisiones de producto (jerarquía, claridad, conversiones), no solo decorar.
4. **Movimiento con propósito**: usar motion para revelar estructura y foco (entrada, transición, confirmación), evitando animación ornamental.
5. **Conversión contextual**: CTAs adaptados al momento de lectura (descubrimiento, confianza, decisión), no botones repetidos sin narrativa.
6. **Mobile primero en impacto**: el wow debe sobrevivir en pantallas pequeñas con composición vertical clara y microinteracciones livianas.

## Propuesta de cambios

### Hero

**Cambio 1 — Hero en 2 capas (manifiesto + pieza visual editorial)**
- Impacto esperado: primer pantallazo más memorable, mayor percepción de producto "vivo" y mejora de intención de registro.
- Costo: medio.
- Riesgo: saturar visualmente si no se controla contraste entre texto y decorativos.
- Criterios de aceptación:
  - El hero muestra una composición dual clara: columna narrativa + columna visual con geometrías/portada/insight.
  - En mobile, el orden se apila sin perder jerarquía de mensaje ni CTA principal visible sin scroll excesivo.
  - Se mantiene paleta actual (`--paper`, `--ink`, `--accent`) y bordes gruesos.

**Cambio 2 — Señal de confianza inmediata en hero (3 métricas o pruebas cortas)**
- Impacto esperado: más credibilidad en los primeros 10 segundos de lectura.
- Costo: bajo.
- Riesgo: métricas poco creíbles o demasiado genéricas.
- Criterios de aceptación:
  - Se agregan 2-3 señales concretas (p. ej. cantidad de clubes, constancia de reuniones, satisfacción).
  - Las señales quedan visualmente separadas del cuerpo de texto y no compiten con CTA.

### Storytelling sections

**Cambio 3 — Reemplazar bloques homogéneos por secuencia narrativa en 3 actos**
- Impacto esperado: lectura con mayor continuidad y menor sensación de plantilla repetida.
- Costo: medio.
- Riesgo: aumentar longitud de la página sin mejorar claridad.
- Criterios de aceptación:
  - Acto 1: problema real del coordinador.
  - Acto 2: cómo Ateneo ordena el club (flujo guiado), explicar las principales funcionalidades de gestión del club.
  (Gestión del libro actual de lectura y de futuros, estadísticas, gestión de enventos propoios...)
  - Acto 3: resultado concreto en participación/comunidad.
  - Cada acto tiene layout distinto (no solo cambio de texto).

**Cambio 4 — Introducir bloques "editoriales" intercalados (citas, recortes, highlights)**
- Impacto esperado: mayor identidad de marca y retención durante scroll largo.
- Costo: medio.
- Riesgo: perder claridad funcional si hay exceso de recursos visuales.
- Criterios de aceptación:
  - Se incorporan al menos 2 módulos de respiración editorial entre secciones funcionales.
  - Los módulos usan microcopy accionable (no frases vacías de branding).

### Libro de la semana

**Cambio 5 — Convertirlo en módulo protagonista interactivo**
- Impacto esperado: refuerzo del diferencial literario y mayor tiempo de permanencia.
- Costo: medio.
- Riesgo: depender de contenido que no se actualice con frecuencia.
- Criterios de aceptación:
  - Incluye mini narrativa estructurada: "por qué se eligió", "pregunta disparadora", "qué esperar de la sesión".
  - La portada tiene tratamiento visual protagonista (marco, sombra geométrica, layering) sin romper performance.
  - Existe CTA contextual directo desde el módulo (p. ej. "Ver dinámica de esta semana").

**Cambio 6 — Estado alternativo para rotación semanal**
- Impacto esperado: sensación de producto activo y no estático.
- Costo: bajo/medio.
- Riesgo: inconsistencia si no hay dato disponible.
- Criterios de aceptación:
  - El módulo soporta visualmente "semana actual" y "próxima lectura".
  - Si no hay próxima lectura, se muestra fallback editorial coherente.

### CTAs

**Cambio 7 — Sistema de CTAs por intención de etapa**
- Impacto esperado: mejora de conversión por ajuste de mensaje según momento del usuario.
- Costo: bajo.
- Riesgo: complejidad de tracking si no se define nomenclatura.
- Criterios de aceptación:
  - CTA hero: descubrimiento (crear cuenta).
  - CTA intermedio: prueba de valor (ver cómo funciona / demo guiada).
  - CTA final: decisión (activar club ahora).
  - Todos los CTA conservan tracking por `origin` y nomenclatura consistente.

**Cambio 8 — Estado sticky/inline del CTA principal en scroll**
- Impacto esperado: mayor probabilidad de acción sin volver al inicio.
- Costo: medio.
- Riesgo: invasivo en mobile si ocupa demasiado alto.
- Criterios de aceptación:
  - Aparece solo después de superar el hero.
  - Respeta safe areas en mobile y no tapa contenido crítico.
  - Puede cerrarse o minimizarse.

### Footer

**Cambio 20 — Footer base de producto serio (navegacion + legal + contacto)**
- Impacto esperado: cierre profesional de la landing, mejor confianza y mejor orientacion para usuarios y buscadores.
- Costo: bajo/medio.
- Riesgo: sumar enlaces sin destino real.
- Criterios de aceptación:
  - Incluye 4 zonas: marca/copy breve, navegacion del sitio, enlaces legales, contacto.
  - Navegacion minima: Inicio, Explorar recorrido, Crear cuenta, Entrar.
  - Enlaces legales visibles: Terminos, Privacidad, Cookies (si no existen, crear paginas estaticas minimas).
  - Contacto minimo: email de soporte y horario de respuesta estimado.

**Cambio 21 — Footer con confianza operacional verificable**
- Impacto esperado: mayor conversion en usuarios que necesitan validacion racional antes de registrarse.
- Costo: bajo.
- Riesgo: claims ambiguos o no verificables.
- Criterios de aceptación:
  - Incluye 2-3 mensajes concretos (por ejemplo: soporte humano, compromiso de continuidad semanal, privacidad de datos).
  - Evita claims tecnicos no comprobables.
  - Se diferencia visualmente del bloque de testimonios para no mezclar prueba social con informacion institucional.

**Cambio 22 — Footer responsive con prioridad mobile**
- Impacto esperado: mejor legibilidad en mobile y menor friccion para acciones finales.
- Costo: bajo.
- Riesgo: perder jerarquia si todo queda en una sola columna larga.
- Criterios de aceptación:
  - En mobile prioriza: CTA final, legal minimo, contacto.
  - Targets de enlace >= 44px y foco visible.
  - En desktop usa 3-4 columnas maximo con jerarquia clara.

### Motion/scroll effects

**Cambio 9 — Revelado por secciones con stagger leve**
- Impacto esperado: percepción premium y guía visual del recorrido.
- Costo: medio.
- Riesgo: fatiga visual si las animaciones son largas.
- Criterios de aceptación:
  - Transiciones entre 180ms y 320ms con easing consistente.
  - No bloquea lectura ni navegación por teclado.
  - `prefers-reduced-motion` desactiva efectos no esenciales.

**Cambio 10 — Transformaciones de fondo geométrico según scroll**
- Impacto esperado: mayor profundidad y personalidad sin cambiar la paleta.
- Costo: alto.
- Riesgo: impacto de performance en dispositivos modestos.
- Criterios de aceptación:
  - Máximo 1-2 capas de fondo animadas por viewport.
  - Mantiene 60fps objetivo en equipos medios (validación manual).
  - No afecta legibilidad de títulos y cuerpo.

### Mobile experience

**Cambio 11 — Rejerarquía de contenido para 360-430px**
- Impacto esperado: experiencia más contundente en primer scroll móvil.
- Costo: medio.
- Riesgo: duplicar reglas CSS si no se simplifica layout.
- Criterios de aceptación:
  - Hero muestra título + lead + CTA primario + 1 prueba social antes del segundo viewport.
  - Se reduce ruido de elementos secundarios en primera pantalla.
  - Tappable targets mantienen mínimo 44px.

**Cambio 12 — Header marketing más claro en estado sticky móvil**
- Impacto esperado: navegación y conversión más directas en pantallas chicas.
- Costo: bajo/medio.
- Riesgo: pérdida de identidad si se simplifica demasiado.
- Criterios de aceptación:
  - Prioriza marca + 1 acción principal + menú/acción secundaria.
  - Mantiene contraste y visibilidad durante scroll.
  - No genera saltos de layout al cambiar de estado.

**Cambio 13 - Cambiar la comunicación** 
- Impacto esperado: Uso de un español más estándar
- Coste: bajo/medio.
- Riesgo: Ninguno
- Criterios de aceptación:
  - Que el lenguaje de la pantalla no se asocie a ningún acento concreto sino que esa un español estandar
  - No usar palabras como Convertí sino Convierte, Definí por define, Sumá por suma etc

**Cambio 14 - Cambiar estilo de los botones**
- Impacto esperado: mantener la consistencia la aplicación y sus botones
- Coste: bajo
- Riesgo ningúno
- Criterios de aceptación:
  - Los botones del navbar de arriba no puede ser negros cuando te pones encima, el hover y la animación debe ser sobre rojo.
  - Los botones del hover deben tener relieve (shadow) y que cuando te pongas encima de la sensción de hundimiento
  - Respetar la regla del colores 60 30 10 siendo 60 --paper, el 30 --ink y el 10 el color --accent

### Modernidad 2026 (sin romper Bauhaus)

**Cambio 15 — Materialidad sutil en superficies clave (papel premium, no glassmorphism)**
- Impacto esperado: percepción más contemporánea y cuidada sin abandonar la estética editorial.
- Costo: medio.
- Riesgo: sobreestilizar sombras o texturas y perder limpieza visual.
- Criterios de aceptación:
  - Hero, tarjetas de prueba social y módulo de libro incorporan un sistema de profundidad sutil (1 sombra base + 1 sombra de contacto).
  - Se mantiene contraste alto entre `--paper` y `--ink`, sin transparencias dominantes ni efecto vidrio.
  - La materialidad no incrementa el peso visual en mobile ni reduce legibilidad.

**Cambio 16 — Microfísica de interacción en CTAs y elementos interactivos**
- Impacto esperado: sensación de producto más robusto y moderno en interacciones pequeñas.
- Costo: medio.
- Riesgo: inconsistencias entre componentes si no se centralizan duraciones y curvas.
- Criterios de aceptación:
  - Todos los botones y links principales usan un mismo set de estados (hover, active, focus-visible) con desplazamiento de 1-2px y respuesta breve.
  - Se define una escala de timing común (por ejemplo 120ms/180ms/240ms) para toda la landing.
  - No hay animaciones en propiedades costosas cuando existe alternativa equivalente.

**Cambio 17 — Señales de seriedad de producto (confianza operacional visible)**
- Impacto esperado: mayor confianza para crear cuenta y avanzar a activación de club.
- Costo: bajo/medio.
- Riesgo: introducir claims ambiguos sin respaldo real.
- Criterios de aceptación:
  - Se añade un bloque compacto de confianza con mensajes verificables (privacidad, disponibilidad del servicio, soporte, continuidad semanal).
  - El bloque aparece antes del CTA final y utiliza tono concreto, sin lenguaje promocional vacío.
  - La información de confianza se distingue visualmente de testimonios y beneficios.

**Cambio 18 — Consistencia de motion por narrativa (entrada, transición, confirmación)**
- Impacto esperado: recorrido más fluido y percepción de calidad sistemática.
- Costo: medio.
- Riesgo: sumar motion redundante que compita con el contenido.
- Criterios de aceptación:
  - Cada sección adopta una intención de movimiento clara: entrada de contenido, transición de bloque o confirmación de acción.
  - No se mezclan curvas/easings arbitrarios; se usa un set limitado y repetible.
  - `prefers-reduced-motion` mantiene funcionalidad completa con reducción real de animación no esencial.

**Cambio 19 — Guardrails explícitos de performance y accesibilidad para marketing**
- Impacto esperado: modernización sostenible sin degradar rendimiento ni inclusión.
- Costo: medio.
- Riesgo: que los guardrails queden declarativos y no se validen.
- Criterios de aceptación:
  - Se documentan y respetan límites mínimos: LCP objetivo de landing, budget de animaciones simultáneas y contraste AA en componentes clave.
  - Todo efecto visual nuevo tiene fallback para dispositivos de gama media y navegación por teclado.
  - Se incorpora checklist de revisión previo a release (motion, foco visible, orden de tabulación, legibilidad en mobile).

## Decisiones cerradas

- [x] Hero: priorizar visual estatica potente en primer pantallazo. Las microinteracciones quedan para fases posteriores y siempre subordinadas a conversion.
- [x] CTA intermedio: usar "Explorar recorrido". Evita prometer una demo que hoy no existe y mantiene coherencia con el flujo actual.
- [x] Libro de la semana: alimentarlo desde estructura de datos de `components/mock-app/data.ts` con actualizacion semanal manual (sin CMS ni backend en esta fase).
- [x] Motion: nivel conservador (reveal leve + transiciones cortas). Se pospone motion expresivo de fondos al roadmap avanzado.
- [x] Header sticky mobile: incluir CTA persistente principal a `/create-account` con comportamiento no invasivo y minimizable.
- [x] Señal de confianza prioritaria: actividad semanal del club (mensajes orientados a continuidad real), apoyada por testimonios como refuerzo secundario.

## Plan por fases

### Fase 1 — Quick wins (bajo costo, alto impacto)

- Rejerarquizar hero (estructura de 2 capas sin cambios complejos de lógica).
- Introducir señales de confianza inmediatas en hero.
- Diferenciar CTAs por intención (hero/intermedio/cierre) y estandarizar `origin`.
- Ajustar header marketing móvil para priorizar acción principal.
- Añadir cambios 13 y 14

### Fase 2 — Cambios medios (mejoran narrativa y conversión)

- Reestructurar bloques en storytelling de 3 actos con layouts distintos.
- Potenciar "Libro de la semana" con mini narrativa + CTA contextual.
- Incorporar reveal por secciones con accesibilidad (`prefers-reduced-motion`).
- Implementar CTA sticky no invasivo después del hero.
- Implementar footer base con navegacion, legal y contacto (cambio 20).
- Ajustar footer responsive con prioridad mobile (cambio 22).

### Fase 3 — Avanzado (wow diferencial)

- Añadir capas geométricas reactivas al scroll con presupuesto de performance.
- Diseñar variaciones visuales por tramo de página (ritmo editorial avanzado).
- Implementar estado alternativo "próxima lectura" para reforzar continuidad semanal.

### Fase 4 — Refinamiento Modernidad 2026

- Aplicar materialidad sutil y sistema de profundidad premium en superficies clave (cambio 15).
- Unificar microfísica y timing de interacción en CTAs y controles relevantes (cambios 16 y 18).
- Integrar bloque de confianza operacional con mensajes verificables antes del cierre (cambio 17).
- Validar y cerrar guardrails de performance/accesibilidad como criterio de salida de landing (cambio 19).
- Consolidar mensajes de confianza operacional en footer institucional (cambio 21).
