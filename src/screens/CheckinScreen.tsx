// src/screens/CheckinScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert, Animated, Easing,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import { C } from '../utils/theme';
import { calcDist, hoy, horaStr } from '../utils/geo';
import { enviarCheckin, SERVER_URL } from '../utils/sheets';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface QRData {
  locId: string;
  lat: number;
  lng: number;
  r: number;
  n: string;
  sid: string;
}

type Step = 'scan' | 'form' | 'verifying' | 'result';
type ResultType = 'ok' | 'fail' | 'geo_fail';

// ─── Parser de QR ─────────────────────────────────────────────────────────────
function parseQR(raw: string): QRData | null {
  try {
    const url = new URL(raw);
    const p = url.searchParams;
    if (p.get('ci') !== '1') return null;
    return {
      locId: p.get('locId') || '',
      lat: parseFloat(p.get('lat') || '0'),
      lng: parseFloat(p.get('lng') || '0'),
      r: parseInt(p.get('r') || '50'),
      n: decodeURIComponent(p.get('n') || 'Lugar de trabajo'),
      sid: p.get('sid') || '',
    };
  } catch {
    return null;
  }
}

// ─── Animación de pulso ───────────────────────────────────────────────────────
function PulseCircle({ color }: { color: string }) {
  const anim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1.25, duration: 900, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
        Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true, easing: Easing.in(Easing.ease) }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View style={{
      width: 80, height: 80, borderRadius: 40,
      backgroundColor: color + '20',
      alignItems: 'center', justifyContent: 'center',
      transform: [{ scale: anim }],
    }}>
      <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: color + '40', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: color }} />
      </View>
    </Animated.View>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function CheckinScreen() {
  const [camPerm, requestCamPerm] = useCameraPermissions();
  const [step, setStep] = useState<Step>('scan');
  const [qrData, setQrData] = useState<QRData | null>(null);
  const [scanned, setScanned] = useState(false);

  // Form fields
  const [legajo, setLegajo] = useState('');
  const [nombre, setNombre] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horas, setHoras] = useState('');

  // Result
  const [result, setResult] = useState<{ type: ResultType; title: string; body: string } | null>(null);
  const [savedLegajo, setSavedLegajo] = useState('');
  const [savedNombre, setSavedNombre] = useState('');

  // Fade animation para transiciones
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Recuperar legajo/nombre guardados para re-uso
    AsyncStorage.multiGet(['legajo', 'nombre']).then(pairs => {
      const l = pairs[0][1]; const n = pairs[1][1];
      if (l) { setLegajo(l); setSavedLegajo(l); }
      if (n) { setNombre(n); setSavedNombre(n); }
    });
    // Hora por defecto = ahora
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    setHoraInicio(`${h}:${m}`);
  }, []);

  function fadeTransition(fn: () => void) {
    Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
      fn();
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    });
  }

  function onQRScanned({ data }: { data: string }) {
    if (scanned) return;
    setScanned(true);
    const parsed = parseQR(data);
    if (!parsed) {
      Alert.alert('QR inválido', 'Este código no es un QR de PresenQR. Escaneá el código de tu lugar de trabajo.', [
        { text: 'Reintentar', onPress: () => setScanned(false) },
      ]);
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setQrData(parsed);
    fadeTransition(() => setStep('form'));
  }

  async function hacerCheckin() {
    if (!legajo.trim() || !nombre.trim() || !horaInicio || !horas) {
      Alert.alert('Campos incompletos', 'Completá todos los campos antes de continuar.');
      return;
    }
    if (!qrData) return;

    // Guardar para próxima vez
    AsyncStorage.multiSet([['legajo', legajo], ['nombre', nombre]]);

    fadeTransition(() => setStep('verifying'));

    // 1. Pedir permiso de ubicación
    const locPerm = await Location.requestForegroundPermissionsAsync();
    if (!locPerm.granted) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setResult({
        type: 'fail',
        title: 'Ubicación denegada',
        body: 'Debés permitir el acceso a la ubicación para registrar tu asistencia. Habilitalo en Configuración → Apps → PresenQR → Permisos.',
      });
      fadeTransition(() => setStep('result'));
      return;
    }

    // 2. Obtener GPS con alta precisión
    let position;
    try {
      position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
    } catch {
      setResult({
        type: 'fail',
        title: 'Error de GPS',
        body: 'No se pudo obtener tu ubicación. Asegurate de tener el GPS activado y señal.',
      });
      fadeTransition(() => setStep('result'));
      return;
    }

    const dist = Math.round(calcDist(
      position.coords.latitude, position.coords.longitude,
      qrData.lat, qrData.lng
    ));
    const dentroDeZona = dist <= qrData.r;

    if (!dentroDeZona) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setResult({
        type: 'geo_fail',
        title: `Fuera de zona — ${dist}m`,
        body: `Debés estar a menos de ${qrData.r}m de "${qrData.n}" para registrar tu asistencia.\n\nFichaje BLOQUEADO. Acercate al lugar y volvé a intentar.`,
      });
      fadeTransition(() => setStep('result'));
      return;
    }

    // 3. Geo OK → enviar a Sheets
    const payload = {
      spreadsheetId: qrData.sid,
      registro: {
        fecha: hoy(),
        legajo,
        nombre,
        ubicacion: qrData.n,
        horaInicioDeclarada: horaInicio,
        horaEscaneoReal: horaStr(),
        horasCumplir: horas,
        geoOk: 'SÍ',
        distancia: String(dist),
        lat: String(position.coords.latitude),
        lng: String(position.coords.longitude),
      },
    };

    const res = await enviarCheckin(payload);

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setResult({
      type: 'ok',
      title: '¡Servicio iniciado! ✓',
      body: res.ok
        ? `Ubicación verificada a ${dist}m del objetivo.\nRegistro guardado en Google Sheets.\n\n¡Que tengas un buen turno, ${nombre.split(' ')[0]}!`
        : `Ubicación verificada a ${dist}m del objetivo.\nNo se pudo sincronizar con Sheets (${res.error}).\nTu registro quedó pendiente.`,
    });
    fadeTransition(() => setStep('result'));
  }

  function reiniciar() {
    setScanned(false);
    setQrData(null);
    setResult(null);
    setHoras('');
    const now = new Date();
    setHoraInicio(`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
    fadeTransition(() => setStep('scan'));
  }

  // ── RENDER ────────────────────────────────────────────────────────────────
  if (!camPerm) return <View style={styles.center}><ActivityIndicator color={C.teal} /></View>;

  if (!camPerm.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.icon}>📷</Text>
        <Text style={styles.h2}>Cámara requerida</Text>
        <Text style={styles.sub}>PresenQR necesita la cámara para escanear el QR de tu lugar de trabajo.</Text>
        <TouchableOpacity style={styles.btnTeal} onPress={requestCamPerm}>
          <Text style={styles.btnTealTxt}>Permitir cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <View style={styles.logoMark}><Text style={{ fontSize: 18 }}>📍</Text></View>
          <Text style={styles.logoText}>Presen<Text style={{ color: C.teal }}>QR</Text></Text>
          {step !== 'scan' && (
            <TouchableOpacity style={styles.backBtn} onPress={reiniciar}>
              <Text style={styles.backBtnTxt}>← Nuevo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ══ PASO 1: ESCANEAR QR ══════════════════════════════════════════ */}
        {step === 'scan' && (
          <View style={{ flex: 1 }}>
            <View style={styles.scanInfo}>
              <Text style={styles.eyebrow}>// paso 1 de 2</Text>
              <Text style={styles.h1}>Escaneá el QR</Text>
              <Text style={styles.sub}>Apuntá la cámara al código QR ubicado en tu lugar de trabajo</Text>
            </View>
            <View style={{ flex: 1, position: 'relative' }}>
              <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                onBarcodeScanned={scanned ? undefined : onQRScanned}
              />
              {/* Overlay con esquinas */}
              <View style={styles.scanOverlay}>
                <View style={styles.scanFrame}>
                  <View style={[styles.corner, styles.tl]} />
                  <View style={[styles.corner, styles.tr]} />
                  <View style={[styles.corner, styles.bl]} />
                  <View style={[styles.corner, styles.br]} />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* ══ PASO 2: FORMULARIO ═══════════════════════════════════════════ */}
        {step === 'form' && qrData && (
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            {/* Loc card */}
            <View style={styles.locCard}>
              <View style={styles.locDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.locName}>{qrData.n}</Text>
                <Text style={styles.locMeta}>Radio: {qrData.r}m · QR verificado ✓</Text>
              </View>
            </View>

            <Text style={styles.eyebrow}>// paso 2 de 2</Text>
            <Text style={styles.h1}>Tus datos</Text>
            <Text style={styles.sub}>Completá la información para registrar tu asistencia</Text>

            <View style={{ marginTop: 24 }}>
              <Field label="N° de Legajo">
                <TextInput
                  style={styles.input}
                  placeholder="Ej: 1234"
                  placeholderTextColor={C.muted}
                  keyboardType="numeric"
                  value={legajo}
                  onChangeText={setLegajo}
                  returnKeyType="next"
                />
              </Field>
              <Field label="Apellido y Nombre">
                <TextInput
                  style={styles.input}
                  placeholder="Ej: Pérez, Juan"
                  placeholderTextColor={C.muted}
                  value={nombre}
                  onChangeText={setNombre}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </Field>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <Field label="Hora inicio (hh:mm)">
                    <TextInput
                      style={styles.input}
                      placeholder="08:00"
                      placeholderTextColor={C.muted}
                      value={horaInicio}
                      onChangeText={setHoraInicio}
                      keyboardType="numbers-and-punctuation"
                      returnKeyType="next"
                    />
                  </Field>
                </View>
                <View style={{ flex: 1 }}>
                  <Field label="Horas a cumplir">
                    <TextInput
                      style={styles.input}
                      placeholder="8"
                      placeholderTextColor={C.muted}
                      keyboardType="numeric"
                      value={horas}
                      onChangeText={setHoras}
                      returnKeyType="done"
                      onSubmitEditing={hacerCheckin}
                    />
                  </Field>
                </View>
              </View>
            </View>

            <TouchableOpacity style={[styles.btnTeal, { marginTop: 12 }]} onPress={hacerCheckin} activeOpacity={0.85}>
              <Text style={{ fontSize: 18, marginRight: 8 }}>📍</Text>
              <Text style={styles.btnTealTxt}>Iniciar servicio y verificar GPS</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              Tu ubicación solo se usa en este momento para verificar que estás en el lugar de trabajo. No se guarda ni se rastrea de forma continua.
            </Text>
          </ScrollView>
        )}

        {/* ══ VERIFICANDO ══════════════════════════════════════════════════ */}
        {step === 'verifying' && (
          <View style={styles.center}>
            <PulseCircle color={C.teal} />
            <Text style={[styles.h2, { marginTop: 32 }]}>Verificando ubicación...</Text>
            <Text style={styles.sub}>Obteniendo señal GPS de alta precisión</Text>
            <ActivityIndicator color={C.teal} style={{ marginTop: 24 }} />
          </View>
        )}

        {/* ══ RESULTADO ════════════════════════════════════════════════════ */}
        {step === 'result' && result && (
          <View style={styles.center}>
            <View style={[
              styles.resultCard,
              result.type === 'ok'
                ? { borderColor: C.teal + '55', backgroundColor: C.teal + '10' }
                : { borderColor: C.red + '55', backgroundColor: C.red + '10' }
            ]}>
              <Text style={{ fontSize: 58, marginBottom: 16 }}>
                {result.type === 'ok' ? '✅' : '🚫'}
              </Text>
              <Text style={[
                styles.h2,
                { color: result.type === 'ok' ? C.teal : C.red, marginBottom: 12 }
              ]}>
                {result.title}
              </Text>
              <Text style={[styles.sub, { textAlign: 'center' }]}>{result.body}</Text>
            </View>

            {result.type === 'ok' ? (
              <TouchableOpacity style={[styles.btnGhost, { marginTop: 24 }]} onPress={reiniciar}>
                <Text style={styles.btnGhostTxt}>Registrar otro empleado</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.btnTeal, { marginTop: 24 }]} onPress={reiniciar}>
                <Text style={styles.btnTealTxt}>Reintentar</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

      </Animated.View>
    </KeyboardAvoidingView>
  );
}

// ─── Sub-componente Field ──────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={fieldStyles.label}>{label}</Text>
      {children}
    </View>
  );
}
const fieldStyles = StyleSheet.create({
  label: { fontFamily: 'Courier New', fontSize: 10, letterSpacing: 2, color: C.muted, marginBottom: 7, textTransform: 'uppercase' },
});

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: C.bg },
  scrollContent: { padding: 24, paddingBottom: 48 },

  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16,
    backgroundColor: C.s1, borderBottomWidth: 1, borderBottomColor: C.border,
  },
  logoMark: {
    width: 34, height: 34, borderRadius: 9,
    backgroundColor: C.teal + '30', borderWidth: 1, borderColor: C.teal + '60',
    alignItems: 'center', justifyContent: 'center',
  },
  logoText: { fontSize: 18, fontWeight: '800', color: C.white, letterSpacing: -0.3 },
  backBtn: { marginLeft: 'auto', backgroundColor: C.s3, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: C.border },
  backBtnTxt: { color: C.text, fontSize: 13 },

  eyebrow: { fontFamily: 'Courier New', fontSize: 10, letterSpacing: 3.5, color: C.teal, textTransform: 'uppercase', marginBottom: 6 },
  h1: { fontSize: 26, fontWeight: '800', color: C.white, letterSpacing: -0.4, marginBottom: 6 },
  h2: { fontSize: 20, fontWeight: '700', color: C.white, letterSpacing: -0.3 },
  sub: { fontSize: 14, color: C.muted, lineHeight: 22 },
  icon: { fontSize: 48, marginBottom: 16 },

  scanInfo: { padding: 24, paddingBottom: 16 },

  // QR frame
  scanOverlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  scanFrame: { width: 240, height: 240, position: 'relative' },
  corner: { position: 'absolute', width: 28, height: 28, borderColor: C.teal, borderWidth: 3 },
  tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 6 },
  tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 6 },
  bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 6 },
  br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 6 },

  // Loc card
  locCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: C.s2, borderWidth: 1, borderColor: C.teal + '40',
    borderRadius: 12, padding: 16, marginBottom: 24,
  },
  locDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.teal },
  locName: { fontSize: 15, fontWeight: '700', color: C.white },
  locMeta: { fontFamily: 'Courier New', fontSize: 11, color: C.muted, marginTop: 3 },

  // Inputs
  input: {
    backgroundColor: C.s1, borderWidth: 1, borderColor: C.border,
    color: C.white, fontSize: 15, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,
  },

  // Buttons
  btnTeal: {
    backgroundColor: C.teal, borderRadius: 12, paddingVertical: 15, paddingHorizontal: 24,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    shadowColor: C.teal, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6,
  },
  btnTealTxt: { color: '#000', fontSize: 15, fontWeight: '700' },
  btnGhost: {
    backgroundColor: C.s3, borderWidth: 1, borderColor: C.border,
    borderRadius: 12, paddingVertical: 13, paddingHorizontal: 28,
  },
  btnGhostTxt: { color: C.text, fontSize: 14, fontWeight: '600' },

  disclaimer: { fontSize: 11, color: C.muted, textAlign: 'center', marginTop: 24, lineHeight: 17 },

  resultCard: {
    width: '100%', borderWidth: 1, borderRadius: 18,
    padding: 32, alignItems: 'center',
  },
});
