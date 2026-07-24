# Móvil — Servicios de asistencia vial

App en Expo que consume el backend: una pantalla con la lista de servicios, un formulario
para crear uno nuevo y botones para cambiar su estado.

## Stack

Expo · React Native · NativeWind (Tailwind) · Zod

## Arquitectura

```text
src/
├── config/
│   └── env.ts                  # lee EXPO_PUBLIC_API_URL
└── servicios/
    ├── domain/                 # tipos + schemas Zod (contrato con el backend)
    ├── data/                   # cliente HTTP (fetch) + error tipado
    ├── state/                  # ServiciosContext + hook useServicios
    └── ui/                     # pantalla y componentes
```

El dominio no sabe nada de React ni de `fetch`; la capa de datos valida con Zod tanto lo
que se envía como lo que llega del backend; la UI solo consume el hook `useServicios`, sin
llamar a `fetch` directamente.

## Cómo correrlo con Expo Go

1. **El backend debe estar corriendo** en tu computador (ver `backend/README.md`) y
   escuchando en `0.0.0.0` (ya viene configurado así).

2. **Encuentra la IP de tu computador en tu red WiFi** (no `localhost`: el celular con
   Expo Go es un dispositivo distinto):

   ```bash
   ipconfig          # Windows — busca "Dirección IPv4" de tu adaptador WiFi
   ```

3. **Configura la URL del backend:**

   ```bash
   cd mobile
   cp .env.example .env
   # Edita .env y reemplaza la IP por la tuya, por ejemplo:
   # EXPO_PUBLIC_API_URL=http://192.168.101.15:3000
   ```

4. **Instala dependencias y arranca:**

   ```bash
   npm install
   npm run start
   ```

5. **Abre la app Expo Go** en tu celular (misma red WiFi que tu computador) y escanea el
   código QR que aparece en la terminal.

## Cómo correr los tests

```bash
npm test    # 5 tests de la capa de datos (cliente HTTP con fetch mockeado)
```

## Notas

- Si cambias de red WiFi, la IP de tu computador probablemente cambie — repite el paso 2 y
  actualiza `.env`.
- El backend debe tener CORS habilitado (ya lo tiene) para que el navegador/app en otro
  dispositivo pueda llamarlo.
