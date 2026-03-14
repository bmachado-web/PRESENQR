// src/utils/sheets.ts
//
// Este módulo envía el check-in al mismo servidor Node.js que ya tenés.
// Cambiá SERVER_URL por la URL real de tu servidor (con HTTPS).
//
export const SERVER_URL = 'https://TU-SERVIDOR.com'; // ← Cambiá esto

export interface CheckinPayload {
  spreadsheetId: string;
  registro: {
    fecha: string;
    legajo: string;
    nombre: string;
    ubicacion: string;
    horaInicioDeclarada: string;
    horaEscaneoReal: string;
    horasCumplir: string;
    geoOk: string;
    distancia: string;
    lat: string;
    lng: string;
  };
}

export async function enviarCheckin(payload: CheckinPayload): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${SERVER_URL}/api/checkin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { ok: true, ...data };
  } catch (e: any) {
    return { ok: false, error: e.message };
  }
}

// ─── ALTERNATIVA DIRECTA SIN SERVIDOR ────────────────────────────────────────
// Si no tenés servidor, podés escribir directo a Sheets con un Service Account.
// Descargá el JSON de credenciales de Google Cloud Console y usá esta función:
//
// import { GoogleSpreadsheet } from 'google-spreadsheet'; // npm install google-spreadsheet
//
// export async function enviarCheckinDirecto(payload, creds) {
//   const doc = new GoogleSpreadsheet(payload.spreadsheetId, { credentials: creds });
//   await doc.loadInfo();
//   const sheet = doc.sheetsByIndex[0];
//   await sheet.addRow(payload.registro);
//   return { ok: true };
// }
// ─────────────────────────────────────────────────────────────────────────────
