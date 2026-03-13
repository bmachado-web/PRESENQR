# PresenQR — App móvil (Expo / React Native)

App nativa para Android e iOS que reemplaza la vista de check-in web,
resolviendo el problema de permisos de GPS en navegadores móviles.

---

## Flujo de la app

```
Empleado abre la app
       ↓
  Escanea QR (con la cámara nativa → permisos garantizados)
       ↓
  Ingresa: Legajo, Nombre, Hora inicio, Horas a cumplir
       ↓
  La app obtiene GPS de alta precisión (permiso nativo)
       ↓
  Calcula distancia al punto de trabajo
       ↓
  Si está dentro del radio → envía a Google Sheets ✓
  Si está fuera del radio  → bloquea el fichaje   ✗
```

---

## Instalación y desarrollo

### Requisitos
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI (para builds): `npm install -g eas-cli`
- Cuenta gratuita en [expo.dev](https://expo.dev)

### 1. Instalar dependencias

```bash
cd PresenQR
npm install
```

### 2. Configurar la URL del servidor

Editá el archivo `src/utils/sheets.ts` y cambiá:

```ts
export const SERVER_URL = 'https://TU-SERVIDOR.com';
```

Por la URL real de tu servidor Node.js (el mismo que ya tenés para el sistema web).
El servidor debe tener HTTPS para que la app pueda comunicarse desde producción.

### 3. Probar en tu celular (sin compilar)

```bash
npx expo start
```

Escaneá el QR con la app **Expo Go** desde tu celular.
> ⚠️ La cámara de la app no funciona en Expo Go por limitaciones del sandboxing.
> Para probar el escaneo completo, hacé un build de desarrollo:

```bash
eas build --profile development --platform android
```

---

## Generar el APK para distribuir

### Opción A — APK directo (para distribuir por WhatsApp/Drive, sin Play Store)

```bash
# Loguearse en Expo
eas login

# Configurar el proyecto (primera vez)
eas build:configure

# Generar APK
eas build --profile preview --platform android
```

Cuando termine, EAS te da un link para descargar el `.apk`.
Los empleados lo instalan habilitando "Instalar apps de fuentes desconocidas" en Android.

### Opción B — AAB para Play Store (distribución formal)

```bash
eas build --profile production --platform android
```

Subís el `.aab` a Google Play Console.

### iOS (iPhone)

```bash
eas build --profile preview --platform ios
```

Requiere cuenta de Apple Developer ($99/año) para distribuir fuera del simulador.

---

## Integración con Google Sheets

La app usa el mismo endpoint `/api/checkin` que ya tiene tu servidor Node.js.

El servidor recibe este JSON:

```json
{
  "spreadsheetId": "ID_DE_TU_PLANILLA",
  "registro": {
    "fecha": "2025-01-15",
    "legajo": "1234",
    "nombre": "Pérez, Juan",
    "ubicacion": "Sucursal Centro",
    "horaInicioDeclarada": "08:00",
    "horaEscaneoReal": "08:03",
    "horasCumplir": "8",
    "geoOk": "SÍ",
    "distancia": "23",
    "lat": "-34.603722",
    "lng": "-58.381592"
  }
}
```

El `spreadsheetId` viene embebido en el QR (lo genera el sistema web al crear la ubicación).

---

## Estructura del proyecto

```
PresenQR/
├── app/
│   ├── _layout.tsx          ← Configuración de navegación
│   └── index.tsx            ← Pantalla principal
├── src/
│   ├── screens/
│   │   └── CheckinScreen.tsx ← Toda la lógica: QR + GPS + form + resultado
│   └── utils/
│       ├── theme.ts          ← Colores y constantes de diseño
│       ├── geo.ts            ← Cálculo de distancia Haversine
│       └── sheets.ts         ← Envío de datos al servidor
├── app.json                  ← Config Expo (permisos, íconos, etc.)
├── eas.json                  ← Config de builds
└── package.json
```

---

## Permisos declarados

### Android (`app.json`)
- `ACCESS_FINE_LOCATION` — GPS preciso
- `ACCESS_COARSE_LOCATION` — GPS aproximado (fallback)
- `CAMERA` — Escaneo de QR

### iOS (`app.json → infoPlist`)
- `NSLocationWhenInUseUsageDescription` — GPS al usar la app
- `NSCameraUsageDescription` — Cámara para QR

---

## Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Colores de la app | `src/utils/theme.ts` |
| URL del servidor | `src/utils/sheets.ts` |
| Nombre/ícono de la app | `app.json` → `name`, `icon` |
| Bundle ID (Android) | `app.json` → `android.package` |
| Bundle ID (iOS) | `app.json` → `ios.bundleIdentifier` |

---

## Notas importantes

- **El legajo y nombre se guardan localmente** (`AsyncStorage`) para que el empleado no tenga que escribirlos cada vez.
- **El GPS se pide en el momento del fichaje**, no en background. Esto es intencional y lo más apropiado para la privacidad.
- **Si el servidor no está disponible**, el check-in queda bloqueado solo en la parte de Sheets, pero la verificación GPS sí se hace localmente en el dispositivo.
