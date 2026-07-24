# Backend — Servicios de asistencia vial

API para gestionar solicitudes de asistencia vial (grúa, batería, llanta, combustible,
cerrajería) con un ciclo de estados controlado por reglas de dominio.

## Stack

NestJS · Prisma · SQLite (base de datos local, un archivo `dev.db`)

## Arquitectura

```text
src/servicios/
├── domain/          # entidad Servicio, enums, reglas de transición, errores, puerto del repositorio
├── application/      # casos de uso (crear, listar, cambiar estado)
└── infrastructure/   # Prisma (persistencia), controller/DTOs (HTTP), exception filter
```

El dominio no importa nada de NestJS ni de Prisma. La aplicación no importa nada de NestJS
(los casos de uso son clases TypeScript planas; el wiring con el framework vive en
`servicios.module.ts`, usando `useFactory` para inyectar el repositorio por su puerto).

## Cómo correrlo

```bash
cd backend
npm install
cp .env.example .env          # DATABASE_URL="file:./dev.db"
npx prisma migrate dev         # crea dev.db con la tabla servicios (solo la primera vez)
npm run start:dev              # servidor en http://localhost:3000
```

El servidor escucha en `0.0.0.0`, no solo en `localhost`, para que un dispositivo móvil
en la misma red (Expo Go) pueda conectarse.

## Cómo correr los tests

```bash
npm test              # 14 tests: reglas del dominio + casos de uso con repositorio en memoria
npm run test:cov       # con reporte de cobertura
```

## Contrato de la API

| Acción | Método y ruta | Body | Respuesta OK | Errores |
|---|---|---|---|---|
| Listar servicios | `GET /servicios` | — | `200` → `Servicio[]` | — |
| Crear servicio | `POST /servicios` | `{ tipo, descripcion, ubicacion }` | `201` → `Servicio` (nace en `PENDIENTE`) | `400` DTO inválido |
| Cambiar estado | `PATCH /servicios/:id/estado` | `{ estado }` | `200` → `Servicio` actualizado | `404` id inexistente · `409` transición no permitida · `400` estado inválido |

`tipo`: `GRUA` \| `BATERIA` \| `LLANTA` \| `COMBUSTIBLE` \| `CERRAJERIA`
`estado`: `PENDIENTE` → `ASIGNADO` → `EN_RUTA` → `FINALIZADO`, con `CANCELADO` permitido solo desde `PENDIENTE` o `ASIGNADO`.

## Probarlo a mano con curl

Con el servidor corriendo (`npm run start:dev`):

```bash
# Crear un servicio (queda en PENDIENTE)
curl -X POST http://localhost:3000/servicios \
  -H "Content-Type: application/json" \
  -d '{"tipo":"GRUA","descripcion":"Vehiculo varado","ubicacion":"Autopista Norte km 12"}'

# Listar
curl http://localhost:3000/servicios

# Cambiar estado (usa el id devuelto arriba) — transición válida
curl -X PATCH http://localhost:3000/servicios/<ID>/estado \
  -H "Content-Type: application/json" -d '{"estado":"ASIGNADO"}'

# Transición inválida a propósito -> debe responder 409
curl -X PATCH http://localhost:3000/servicios/<ID>/estado \
  -H "Content-Type: application/json" -d '{"estado":"FINALIZADO"}'

# Id que no existe -> debe responder 404
curl -X PATCH http://localhost:3000/servicios/no-existe/estado \
  -H "Content-Type: application/json" -d '{"estado":"ASIGNADO"}'
```
