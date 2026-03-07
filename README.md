[index.html](https://github.com/user-attachments/files/25820064/index.html)
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>PresenQR</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fira+Code:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
:root{
  --bg:#060810;--s1:#0b0f1a;--s2:#111827;--s3:#1a2235;
  --border:#1e2d42;--border2:#263550;
  --teal:#00c9a7;--blue:#4f9cf9;--amber:#ffb547;--red:#ff4757;--violet:#a78bfa;
  --text:#b8cce0;--muted:#3d5470;--white:#ddeeff;
  --r:12px;--rl:18px;
  --glow:0 0 22px rgba(0,201,167,.22);
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Outfit',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;
  background-image:radial-gradient(ellipse at 15% 0%,rgba(0,201,167,.07) 0%,transparent 55%),
                   radial-gradient(ellipse at 85% 100%,rgba(79,156,249,.06) 0%,transparent 55%)}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}

/* ── TOPBAR ── */
#bar{position:fixed;top:0;left:0;right:0;z-index:400;height:60px;
  background:rgba(6,8,16,.9);backdrop-filter:blur(18px);
  border-bottom:1px solid var(--border);
  display:flex;align-items:center;padding:0 24px;gap:12px}
.logo{display:flex;align-items:center;gap:10px}
.logo-mark{width:34px;height:34px;border-radius:9px;
  background:linear-gradient(135deg,var(--teal),var(--blue));
  display:flex;align-items:center;justify-content:center;font-size:17px;
  box-shadow:var(--glow);flex-shrink:0}
.logo-word{font-size:17px;font-weight:800;color:var(--white)}
.logo-word em{color:var(--teal);font-style:normal}
.nav{display:flex;gap:2px;margin-left:auto;flex-wrap:wrap}
.nb{background:transparent;border:none;font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;
  color:var(--muted);padding:6px 13px;border-radius:8px;cursor:pointer;transition:all .2s;
  display:flex;align-items:center;gap:6px;white-space:nowrap}
.nb:hover{color:var(--text);background:var(--s3)}
.nb.on{color:var(--teal);background:rgba(0,201,167,.1)}

/* GAS status pill */
#gas-pill{display:flex;align-items:center;gap:7px;padding:5px 13px;
  border-radius:20px;font-size:12px;font-family:'Fira Code',monospace;cursor:pointer;
  border:1px solid var(--border);background:var(--s2);transition:all .2s;white-space:nowrap}
#gas-pill:hover{border-color:var(--teal)}
.gdot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.gdot.ok{background:var(--teal);box-shadow:0 0 8px var(--teal)}
.gdot.no{background:var(--muted)}
.gdot.ing{background:var(--amber);animation:blink 1s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}

/* ── LAYOUT ── */
.wrap{padding:80px 24px 48px;max-width:1100px;margin:0 auto}
.page{display:none;animation:up .3s ease}.page.on{display:block}
@keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.eyebrow{font-family:'Fira Code',monospace;font-size:10px;letter-spacing:3.5px;
  text-transform:uppercase;color:var(--teal);margin-bottom:7px}
.ptitle{font-size:26px;font-weight:800;color:var(--white);letter-spacing:-.3px}
.psub{font-size:14px;color:var(--muted);margin-top:5px;line-height:1.5}
.sec{margin-bottom:28px}

/* ── CARDS ── */
.card{background:var(--s2);border:1px solid var(--border);border-radius:var(--rl);padding:22px}
.card.hi{border-color:rgba(0,201,167,.3);box-shadow:var(--glow)}
.ct{font-family:'Fira Code',monospace;font-size:10px;letter-spacing:3px;
  text-transform:uppercase;color:var(--muted);margin-bottom:16px}

/* ── FORMS ── */
.field{margin-bottom:14px}
.field label{font-size:11px;font-family:'Fira Code',monospace;letter-spacing:1.5px;
  color:var(--muted);display:block;margin-bottom:6px;text-transform:uppercase}
.fi{width:100%;background:var(--s1);border:1px solid var(--border);color:var(--white);
  font-family:'Outfit',sans-serif;font-size:14px;border-radius:9px;padding:10px 13px;
  outline:none;transition:border .2s,box-shadow .2s}
.fi:focus{border-color:var(--teal);box-shadow:0 0 0 3px rgba(0,201,167,.12)}
.fi option{background:var(--s2)}
.row{display:flex;gap:12px}.row>.field{flex:1}

/* ── BUTTONS ── */
.btn{font-family:'Outfit',sans-serif;font-weight:600;font-size:13px;border:none;
  border-radius:9px;padding:10px 20px;cursor:pointer;transition:all .18s;
  display:inline-flex;align-items:center;gap:7px}
.btn:hover{transform:translateY(-1px);filter:brightness(1.1)}
.btn:active{transform:translateY(0)}
.btn-teal{background:var(--teal);color:#000}
.btn-teal:hover{box-shadow:var(--glow)}
.btn-blue{background:rgba(79,156,249,.15);color:var(--blue);border:1px solid rgba(79,156,249,.35)}
.btn-ghost{background:var(--s3);color:var(--text);border:1px solid var(--border)}
.btn-red{background:rgba(255,71,87,.12);color:var(--red);border:1px solid rgba(255,71,87,.28)}
.btn-sm{padding:6px 13px;font-size:12px}
.btn-xs{padding:4px 9px;font-size:11px;border-radius:6px}

/* ── CONECTAR GAS ── */
.step-gas{display:flex;gap:14px;margin-bottom:20px;align-items:flex-start}
.sn{width:28px;height:28px;border-radius:50%;background:rgba(0,201,167,.15);
  border:1px solid rgba(0,201,167,.4);color:var(--teal);font-size:13px;font-weight:700;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.st{font-size:14px;font-weight:600;color:var(--white);margin-bottom:5px}
.sd{font-size:13px;color:var(--muted);line-height:1.65}
code{background:var(--s3);border:1px solid var(--border);padding:2px 7px;border-radius:5px;
  font-family:'Fira Code',monospace;font-size:12px;color:var(--teal)}
a{color:var(--blue)}

/* ── UBICACIONES ── */
.loc-list{border-radius:var(--r);overflow:hidden;border:1px solid var(--border)}
.loc-row{background:var(--s2);display:flex;align-items:center;gap:14px;padding:14px 18px;
  transition:background .15s;border-bottom:1px solid rgba(30,45,66,.6)}
.loc-row:last-child{border-bottom:none}
.loc-row:hover{background:var(--s3)}
.pdot{width:9px;height:9px;border-radius:50%;background:var(--teal);flex-shrink:0;
  box-shadow:0 0 10px var(--teal);animation:pulse 2.5s infinite}
@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 10px var(--teal)}50%{opacity:.4;box-shadow:none}}
.rbadge{background:rgba(0,201,167,.1);color:var(--teal);font-size:10px;
  font-family:'Fira Code',monospace;padding:3px 9px;border-radius:20px;
  border:1px solid rgba(0,201,167,.22);white-space:nowrap}

/* ── EMPLEADOS TABLE ── */
.emp-row{display:grid;grid-template-columns:90px 1fr 100px;gap:10px;align-items:center;
  padding:10px 16px;border-bottom:1px solid rgba(30,45,66,.5);transition:background .15s}
.emp-row:hover{background:var(--s3)60}
.emp-row:last-child{border-bottom:none}

/* ── STATS ── */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
.stat{background:var(--s2);border:1px solid var(--border);border-radius:var(--rl);padding:18px}
.stn{font-size:36px;font-weight:800;line-height:1}
.stl{font-size:10px;font-family:'Fira Code',monospace;letter-spacing:2px;
  text-transform:uppercase;color:var(--muted);margin-top:5px}

/* ── REGISTRO TABLE ── */
.rt{border-radius:var(--r);overflow:hidden;border:1px solid var(--border)}
.rth{display:grid;grid-template-columns:36px 1fr 150px 160px 90px;gap:10px;
  padding:9px 16px;background:var(--s3);border-bottom:1px solid var(--border)}
.rth span{font-size:10px;font-family:'Fira Code',monospace;letter-spacing:2px;
  text-transform:uppercase;color:var(--muted)}
.rr{display:grid;grid-template-columns:36px 1fr 150px 160px 90px;gap:10px;
  align-items:center;padding:12px 16px;border-bottom:1px solid rgba(30,45,66,.5);
  transition:background .15s}
.rr:last-child{border-bottom:none}
.rr:hover{background:rgba(26,34,53,.5)}
.av{width:32px;height:32px;border-radius:50%;background:var(--s3);
  border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;
  font-size:13px;font-weight:700;color:var(--teal)}
.gt{font-size:10px;font-family:'Fira Code',monospace;padding:2px 6px;border-radius:4px;margin-left:5px}
.gt.ok{background:rgba(0,201,167,.12);color:var(--teal)}
.gt.no{background:rgba(255,71,87,.12);color:var(--red)}

/* ── HISTORIAL ── */
.hrow{display:flex;align-items:center;gap:12px;padding:11px 18px;
  border-bottom:1px solid rgba(30,45,66,.4);font-size:13px;flex-wrap:wrap}
.hrow:last-child{border-bottom:none}
.hts{font-family:'Fira Code',monospace;font-size:10px;color:var(--muted);min-width:130px}

/* ── SYNC BADGE ── */
.sb{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;
  border-radius:20px;font-size:11px;font-family:'Fira Code',monospace}
.sb-ok{background:rgba(0,201,167,.1);color:var(--teal);border:1px solid rgba(0,201,167,.28)}
.sb-err{background:rgba(255,71,87,.1);color:var(--red);border:1px solid rgba(255,71,87,.28)}
.sb-ing{background:rgba(79,156,249,.1);color:var(--blue);border:1px solid rgba(79,156,249,.28)}

/* ── QR MODAL ── */
.mbg{position:fixed;inset:0;background:rgba(0,0,0,.82);backdrop-filter:blur(10px);
  z-index:700;display:flex;align-items:center;justify-content:center}
.modal{background:var(--s2);border:1px solid var(--border2);border-radius:22px;
  padding:32px 28px;width:370px;text-align:center;position:relative;
  box-shadow:0 40px 80px rgba(0,0,0,.6),var(--glow)}
.mclose{position:absolute;top:14px;right:16px;background:var(--s3);
  border:1px solid var(--border);color:var(--muted);width:28px;height:28px;
  border-radius:50%;cursor:pointer;font-size:16px;display:flex;
  align-items:center;justify-content:center;transition:all .15s}
.mclose:hover{color:var(--red);border-color:rgba(255,71,87,.4)}
#qr-box{background:#fff;border-radius:14px;padding:16px;display:inline-block;margin:16px 0}

/* ── CHECK-IN (vista empleado) ── */
.ci-shell{max-width:460px;margin:0 auto}
.ci-card{background:var(--s2);border:1px solid var(--border);border-radius:var(--rl);overflow:hidden}
.ci-top{background:linear-gradient(135deg,rgba(0,201,167,.15),rgba(79,156,249,.08));
  border-bottom:1px solid var(--border);padding:18px 22px;display:flex;align-items:center;gap:14px}
.ci-body{padding:22px}
.ci-res{border-radius:var(--r);padding:22px;text-align:center;margin-top:16px}
.ci-res.ok{background:rgba(0,201,167,.08);border:1px solid rgba(0,201,167,.28)}
.ci-res.fail{background:rgba(255,71,87,.08);border:1px solid rgba(255,71,87,.28)}
.ci-res.warn{background:rgba(255,181,71,.08);border:1px solid rgba(255,181,71,.28)}
.spinner{animation:spin 1.2s linear infinite;display:inline-block}
@keyframes spin{to{transform:rotate(360deg)}}

/* ── GAS SCRIPT BOX ── */
.script-box{position:relative;margin-top:10px}
.script-box textarea{width:100%;height:200px;background:var(--s1);border:1px solid var(--border);
  color:var(--teal);font-family:'Fira Code',monospace;font-size:11px;border-radius:9px;
  padding:14px;resize:none;outline:none;line-height:1.7}
.copy-btn{position:absolute;top:8px;right:8px}

@media(max-width:720px){
  .stats{grid-template-columns:1fr 1fr}
  .rth{display:none}
  .rr{grid-template-columns:32px 1fr;row-gap:6px}
  .rr>*:nth-child(n+3){grid-column:2}
  .nav .nb span:not(.ic){display:none}
}
</style>
</head>
<body>

<!-- TOPBAR -->
<div id="bar">
  <div class="logo">
    <div class="logo-mark">📍</div>
    <div class="logo-word">Presen<em>QR</em></div>
  </div>
  <nav class="nav">
    <button class="nb on"  onclick="nav('conectar',this)">🔌 <span>Conectar</span></button>
    <button class="nb"     onclick="nav('ubicaciones',this)">📍 <span>Ubicaciones</span></button>
    <button class="nb"     onclick="nav('empleados',this)">👥 <span>Empleados</span></button>
    <button class="nb"     onclick="nav('registro',this)">📋 <span>Registro</span></button>
    <button class="nb"     onclick="nav('historial',this)">🕐 <span>Historial</span></button>
    <button class="nb"     onclick="nav('checkin',this)">📱 <span>Vista empleado</span></button>
  </nav>
  <div id="gas-pill" onclick="nav('conectar', document.querySelector('.nb'))" title="Configurar conexión">
    <div class="gdot no" id="gas-dot"></div>
    <span id="gas-label">Sin conectar</span>
  </div>
</div>

<div class="wrap">

<!-- ═══════ CONECTAR ═══════ -->
<div id="page-conectar" class="page on">
  <div class="sec">
    <div class="eyebrow">// paso 1 de 1</div>
    <div class="ptitle">Conectar con Google Sheets</div>
    <div class="psub">Solo necesitás pegar la URL de tu Apps Script. Sin servidores, sin OAuth, sin complicaciones.</div>
  </div>

  <!-- URL input -->
  <div class="card hi" style="margin-bottom:20px">
    <div class="ct">URL de tu Google Apps Script</div>
    <div class="field">
      <label>Pegá aquí la URL (termina en /exec)</label>
      <input class="fi" id="gas-url" placeholder="https://script.google.com/macros/s/XXXXXX/exec" oninput="guardarUrl()"/>
    </div>
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
      <button class="btn btn-teal" onclick="probarConexion()">⚡ Probar conexión</button>
      <div id="test-result"></div>
    </div>
  </div>

  <!-- Instrucciones -->
  <div class="card">
    <div class="ct">Cómo configurarlo — 5 pasos, 5 minutos</div>

    <div class="step-gas">
      <div class="sn">1</div>
      <div>
        <div class="st">Abrí Google Sheets</div>
        <div class="sd">Entrá a <a href="https://sheets.google.com" target="_blank">sheets.google.com</a> y creá una planilla nueva. Llamala "PresenQR Asistencia" o como quieras.</div>
      </div>
    </div>

    <div class="step-gas">
      <div class="sn">2</div>
      <div>
        <div class="st">Abrí el editor de Apps Script</div>
        <div class="sd">En el menú de la planilla: <code>Extensiones</code> → <code>Apps Script</code>. Se abre una nueva pestaña con el editor de código.</div>
      </div>
    </div>

    <div class="step-gas">
      <div class="sn">3</div>
      <div>
        <div class="st">Pegá el código</div>
        <div class="sd">Borrá todo lo que hay en el editor y pegá el siguiente código completo:</div>
        <div class="script-box">
          <textarea id="gas-code" readonly></textarea>
          <button class="btn btn-ghost btn-xs copy-btn" onclick="copiarCodigo()">📋 Copiar</button>
        </div>
      </div>
    </div>

    <div class="step-gas">
      <div class="sn">4</div>
      <div>
        <div class="st">Publicar como aplicación web</div>
        <div class="sd">
          En Apps Script: <code>Implementar</code> → <code>Nueva implementación</code><br/>
          · Tipo: <strong style="color:var(--white)">Aplicación web</strong><br/>
          · Ejecutar como: <strong style="color:var(--white)">Yo</strong><br/>
          · Quién tiene acceso: <strong style="color:var(--white)">Cualquier persona</strong><br/>
          → <code>Implementar</code> → autorizá los permisos → copiá la URL que aparece.
        </div>
      </div>
    </div>

    <div class="step-gas">
      <div class="sn">5</div>
      <div>
        <div class="st">Pegá la URL arriba y probá la conexión</div>
        <div class="sd">La URL termina en <code>/exec</code>. Pegala en el campo de arriba y hacé click en <strong style="color:var(--teal)">⚡ Probar conexión</strong>. Si aparece ✓ verde, ¡listo!</div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════ UBICACIONES ═══════ -->
<div id="page-ubicaciones" class="page">
  <div class="sec">
    <div class="eyebrow">// configuración</div>
    <div class="ptitle">Puntos de trabajo</div>
    <div class="psub">Cada ubicación genera su propio QR. El empleado debe estar dentro del radio al escanear.</div>
  </div>
  <div class="card hi" style="margin-bottom:20px">
    <div class="ct">Nueva ubicación</div>
    <div class="row">
      <div class="field"><label>Nombre del lugar</label><input class="fi" id="f-nombre" placeholder="Ej: Sucursal Centro"/></div>
      <div class="field" style="max-width:165px"><label>Radio (metros)</label><input class="fi" id="f-radio" type="number" value="50" min="10"/></div>
    </div>
    <div class="row">
      <div class="field"><label>Latitud</label><input class="fi" id="f-lat" placeholder="-34.603722"/></div>
      <div class="field"><label>Longitud</label><input class="fi" id="f-lng" placeholder="-58.381592"/></div>
      <div class="field" style="display:flex;align-items:flex-end">
        <button class="btn btn-ghost" style="width:100%;justify-content:center" onclick="usarGPS()">📍 Usar mi GPS</button>
      </div>
    </div>
    <button class="btn btn-teal" onclick="guardarUbicacion()">Guardar ubicación</button>
  </div>
  <div id="ubi-empty" style="display:none;text-align:center;padding:48px;color:var(--muted);font-size:14px">No hay ubicaciones. Agregá la primera arriba ↑</div>
  <div id="ubi-list"></div>
</div>

<!-- ═══════ EMPLEADOS ═══════ -->
<div id="page-empleados" class="page">
  <div class="sec">
    <div class="eyebrow">// nómina</div>
    <div class="ptitle">Gestión de empleados</div>
    <div class="psub">Sin límite. Importá desde CSV/Excel o agregá uno por uno. Los datos también se sincronizan en tu planilla.</div>
  </div>

  <!-- IMPORTAR -->
  <div class="card hi" style="margin-bottom:16px">
    <div class="ct">Importar desde archivo (CSV o Excel)</div>
    <div style="font-size:13px;color:var(--muted);margin-bottom:14px;line-height:1.6">
      Dos columnas: <code>LEGAJO</code> y <code>APELLIDO Y NOMBRE</code>. La primera fila puede ser encabezado.
    </div>
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <label style="display:inline-flex;align-items:center;gap:8px;background:var(--s3);
        border:1px solid var(--border);border-radius:9px;padding:9px 18px;cursor:pointer;
        font-size:13px;font-weight:600;color:var(--text);transition:border .2s"
        onmouseover="this.style.borderColor='var(--teal)'" onmouseout="this.style.borderColor='var(--border)'">
        📂 Elegir archivo
        <input type="file" id="imp-file" accept=".csv,.xlsx,.xls" style="display:none" onchange="importarArchivo(this)"/>
      </label>
      <span id="imp-fn" style="font-size:12px;color:var(--muted)">Ningún archivo seleccionado</span>
      <div id="imp-st" style="margin-left:auto"></div>
    </div>
    <div style="margin-top:14px;background:var(--s1);border:1px solid var(--border);border-radius:8px;padding:12px 16px">
      <div style="font-size:10px;font-family:'Fira Code',monospace;letter-spacing:2px;color:var(--muted);margin-bottom:6px">FORMATO CSV DE EJEMPLO</div>
      <pre style="font-family:'Fira Code',monospace;font-size:12px;color:var(--teal);line-height:1.8">LEGAJO,APELLIDO Y NOMBRE
1001,García Ana
1002,López Carlos</pre>
    </div>
  </div>

  <!-- AGREGAR UNO -->
  <div class="card" style="margin-bottom:16px">
    <div class="ct">Agregar manualmente</div>
    <div class="row">
      <div class="field"><label>Legajo</label><input class="fi" id="ne-leg" placeholder="1006" inputmode="numeric"/></div>
      <div class="field"><label>Apellido y Nombre</label><input class="fi" id="ne-nom" placeholder="Fernández, Paula" onkeydown="if(event.key==='Enter')agregarEmp()"/></div>
      <div class="field" style="display:flex;align-items:flex-end;max-width:140px">
        <button class="btn btn-teal" style="width:100%;justify-content:center" onclick="agregarEmp()">+ Agregar</button>
      </div>
    </div>
  </div>

  <!-- LISTA -->
  <div class="card">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
      <div class="ct" style="margin:0">Nómina</div>
      <span id="emp-badge" style="background:var(--s3);border:1px solid var(--border);
        border-radius:20px;font-family:'Fira Code',monospace;font-size:11px;
        color:var(--muted);padding:3px 10px">0 empleados</span>
      <button class="btn btn-blue btn-sm" onclick="syncEmpleadosSheets()">☁ Subir a Sheets</button>
      <input class="fi" id="emp-q" placeholder="🔍 Buscar..." style="max-width:240px;margin-left:auto" oninput="renderEmps()"/>
      <button class="btn btn-red btn-xs" onclick="borrarTodosEmps()">🗑 Borrar todos</button>
    </div>
    <div style="display:grid;grid-template-columns:90px 1fr 100px;gap:10px;
      padding:8px 16px;background:var(--s3);border-radius:8px;margin-bottom:4px">
      <span style="font-size:10px;font-family:'Fira Code',monospace;letter-spacing:2px;text-transform:uppercase;color:var(--muted)">Legajo</span>
      <span style="font-size:10px;font-family:'Fira Code',monospace;letter-spacing:2px;text-transform:uppercase;color:var(--muted)">Apellido y Nombre</span>
      <span></span>
    </div>
    <div id="emp-list" style="max-height:500px;overflow-y:auto"></div>
    <div id="emp-empty" style="display:none;text-align:center;padding:36px;color:var(--muted);font-size:14px">
      No hay empleados. Importá un archivo o agregá uno arriba ↑
    </div>
  </div>
</div>

<!-- ═══════ REGISTRO ═══════ -->
<div id="page-registro" class="page">
  <div class="sec">
    <div class="eyebrow">// asistencia diaria</div>
    <div class="ptitle">Registro del día</div>
  </div>
  <div style="display:flex;gap:10px;align-items:center;margin-bottom:20px;flex-wrap:wrap">
    <input type="date" id="reg-fecha" class="fi" style="width:185px" onchange="renderRegistro()"/>
    <select id="reg-loc" class="fi" style="width:200px" onchange="renderRegistro()"><option value="">Todos los lugares</option></select>
    <div id="sync-badge" style="margin-left:auto"></div>
    <button class="btn btn-blue btn-sm" onclick="syncRegistro()">☁ Sincronizar Sheets</button>
    <button class="btn btn-ghost btn-sm" onclick="exportCSV()">⬇ CSV</button>
  </div>
  <div class="stats">
    <div class="stat"><div class="stn" id="s-t" style="color:var(--white)">0</div><div class="stl">Empleados</div></div>
    <div class="stat"><div class="stn" id="s-r" style="color:var(--teal)">0</div><div class="stl">Registrados</div></div>
    <div class="stat"><div class="stn" id="s-g" style="color:var(--teal)">0</div><div class="stl">GEO ✓</div></div>
    <div class="stat"><div class="stn" id="s-a" style="color:var(--red)">0</div><div class="stl">Alertas GEO ✗</div></div>
  </div>
  <div class="card">
    <div class="ct">Nómina del día</div>
    <div class="rt">
      <div class="rth"><span></span><span>Empleado</span><span>Hora inicio / Hs</span><span>Ubicación</span><span>Registrado</span></div>
      <div id="reg-body"></div>
    </div>
  </div>
</div>

<!-- ═══════ HISTORIAL ═══════ -->
<div id="page-historial" class="page">
  <div class="sec">
    <div class="eyebrow">// trazabilidad</div>
    <div class="ptitle">Historial de check-ins</div>
    <div class="psub">Todos los registros con verificación GPS. GEO ✗ = intento fuera del radio.</div>
  </div>
  <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap;align-items:center">
    <select id="h-loc" class="fi" style="width:200px" onchange="renderHistorial()"><option value="">Todas las ubicaciones</option></select>
    <select id="h-emp" class="fi" style="width:200px" onchange="renderHistorial()"><option value="">Todos los empleados</option></select>
    <select id="h-geo" class="fi" style="width:180px" onchange="renderHistorial()">
      <option value="">Cualquier verificación</option>
      <option value="ok">Solo GEO ✓</option>
      <option value="fail">Solo GEO ✗</option>
    </select>
  </div>
  <div class="card"><div id="h-body"></div></div>
</div>

<!-- ═══════ CHECK-IN ═══════ -->
<div id="page-checkin" class="page">
  <div class="sec">
    <div class="eyebrow">// vista del empleado</div>
    <div class="ptitle">Simulador de check-in</div>
    <div class="psub">Así ve el empleado la pantalla al escanear el QR con el celular.</div>
  </div>
  <div class="ci-shell">
    <!-- Aviso si no hay URL de Sheets configurada -->
    <div id="ci-no-gas" style="display:none;background:rgba(255,181,71,.08);border:1px solid rgba(255,181,71,.3);border-radius:var(--r);padding:14px 18px;margin-bottom:14px;font-size:13px;color:var(--amber);line-height:1.6">
      ⚠️ <strong>Este dispositivo no tiene la URL de Sheets configurada.</strong><br/>
      El registro se guardará localmente. Para enviarlo a Google Sheets, abrí primero la app en el navegador, pegá la URL en la pestaña 🔌 Conectar, y volvé a escanear el QR.
    </div>
    <div class="card" style="margin-bottom:14px">
      <div class="ct">Seleccionar ubicación</div>
      <select id="ci-loc" class="fi" onchange="onCiLoc()"><option value="">-- Elegí una ubicación --</option></select>
    </div>
    <div id="ci-panel" style="display:none">
      <div class="ci-card">
        <div class="ci-top">
          <div style="width:44px;height:44px;border-radius:12px;background:rgba(0,201,167,.15);
            border:1px solid rgba(0,201,167,.35);display:flex;align-items:center;justify-content:center;font-size:22px">📍</div>
          <div>
            <div id="ci-loc-name" style="font-size:17px;font-weight:700;color:var(--white)">—</div>
            <div id="ci-loc-r" style="font-size:11px;font-family:'Fira Code',monospace;color:var(--muted)">Radio: 50m</div>
          </div>
        </div>
        <div class="ci-body">
          <div class="field"><label>Legajo</label><input class="fi" id="ci-legajo" placeholder="1001" inputmode="numeric"/></div>
          <div class="field"><label>Apellido y Nombre</label><input class="fi" id="ci-nombre" placeholder="García, Ana"/></div>
          <div class="row">
            <div class="field"><label>Hora inicio del servicio</label><input class="fi" id="ci-hinicio" type="time"/></div>
            <div class="field"><label>Cantidad de horas</label><input class="fi" id="ci-horas" type="number" min="1" max="24" placeholder="8"/></div>
          </div>
          <button class="btn btn-teal" style="width:100%;padding:14px;font-size:15px;justify-content:center" onclick="hacerCheckin()">
            📍 Verificar ubicación y registrar
          </button>
          <div id="ci-result" style="margin-top:14px"></div>
        </div>
      </div>
    </div>
  </div>
</div>

</div><!-- /wrap -->

<!-- QR MODAL -->
<div id="qr-modal" class="mbg" style="display:none" onclick="if(event.target===this)cerrarQR()">
  <div class="modal">
    <button class="mclose" onclick="cerrarQR()">×</button>
    <div style="font-family:'Fira Code',monospace;font-size:10px;letter-spacing:3px;color:var(--muted);margin-bottom:8px">QR DE ASISTENCIA</div>
    <div id="qr-title" style="font-size:20px;font-weight:800;color:var(--white)"></div>
    <div id="qr-sub" style="font-size:11px;font-family:'Fira Code',monospace;color:var(--muted);margin-top:4px"></div>
    <div id="qr-box"><div id="qrcode"></div></div>
    <div id="qr-url" style="font-size:10px;font-family:'Fira Code',monospace;color:var(--muted);word-break:break-all;background:var(--s1);border-radius:7px;padding:9px;text-align:left;margin-bottom:16px"></div>
    <div style="display:flex;gap:8px;justify-content:center">
      <button class="btn btn-teal btn-sm" onclick="imprimirQR()">🖨 Imprimir</button>
      <button class="btn btn-ghost btn-sm" onclick="cerrarQR()">Cerrar</button>
    </div>
  </div>
</div>

<script>
// ═══════════════════════════════════════════════════════
// CÓDIGO APPS SCRIPT (se muestra en el paso 3)
// ═══════════════════════════════════════════════════════
const GAS_CODE = `var HOJA_REGISTROS = "Registros";
var HOJA_EMPLEADOS = "Empleados";
var ENCABEZADOS = ["FECHA Y HORA","LEGAJO","APELLIDO Y NOMBRE",
  "HORA DE INICIO DEL SERVICIO","CANTIDAD DE HORAS DEL SERVICIO",
  "UBICACIÓN","GEO OK","DISTANCIA (m)"];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var accion = data.accion || "checkin";
    if (accion === "checkin")          return responder(registrarCheckin(data));
    if (accion === "sync")             return responder(sincronizarDia(data));
    if (accion === "importarEmpleados")return responder(importarEmpleados(data));
    return responder({ok:false,error:"Acción desconocida"});
  } catch(err) { return responder({ok:false,error:err.toString()}); }
}

function doGet(e) {
  return responder({ok:true,msg:"PresenQR conectado"});
}

function registrarCheckin(data) {
  var ss   = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = obtenerOCrearHoja(ss, HOJA_REGISTROS, ENCABEZADOS);
  hoja.appendRow([data.fechaHora||"",data.legajo||"",data.apellidoNombre||"",
    data.horaInicio||"",data.cantHoras||"",data.ubicacion||"",data.geoOk||"",data.distancia||""]);
  formatearUltimaFila(hoja, data.geoOk);
  return {ok:true};
}

function sincronizarDia(data) {
  var ss   = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = obtenerOCrearHoja(ss, HOJA_REGISTROS, ENCABEZADOS);
  (data.filas||[]).forEach(function(f){
    hoja.appendRow([f.fechaHora,f.legajo,f.apellidoNombre,
      f.horaInicio,f.cantHoras,f.ubicacion,f.geoOk,f.distancia]);
    formatearUltimaFila(hoja, f.geoOk);
  });
  return {ok:true,rows:(data.filas||[]).length};
}

function importarEmpleados(data) {
  var ss   = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = obtenerOCrearHoja(ss, HOJA_EMPLEADOS, ["LEGAJO","APELLIDO Y NOMBRE"]);
  var last = hoja.getLastRow();
  if(last>1) hoja.getRange(2,1,last-1,2).clearContent();
  (data.empleados||[]).forEach(function(emp){ hoja.appendRow([emp.legajo,emp.apellidoNombre]); });
  return {ok:true,rows:(data.empleados||[]).length};
}

function obtenerOCrearHoja(ss,nombre,enc) {
  var h = ss.getSheetByName(nombre);
  if(!h){
    h = ss.insertSheet(nombre);
    h.appendRow(enc);
    var r = h.getRange(1,1,1,enc.length);
    r.setBackground("#0d3b52").setFontColor("#fff").setFontWeight("bold");
    h.setFrozenRows(1);
  }
  return h;
}

function formatearUltimaFila(h, geoOk) {
  var row = h.getLastRow(); if(row<2) return;
  var c = h.getRange(row,7);
  if(geoOk==="Sí") c.setBackground("#d4edda").setFontColor("#155724");
  else if(geoOk==="No") c.setBackground("#f8d7da").setFontColor("#721c24");
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}`;

// ═══════════════════════════════════════════════════════
// BASE DE DATOS LOCAL
// ═══════════════════════════════════════════════════════
const LS = {
  get: k => { try{ return JSON.parse(localStorage.getItem('pqr_'+k)||'null') }catch(e){return null} },
  set: (k,v) => localStorage.setItem('pqr_'+k, JSON.stringify(v))
};
let DB = {
  ubi: LS.get('ubi')||[],
  emp: LS.get('emp')||[],
  reg: LS.get('reg')||[],
  gasUrl: LS.get('gasUrl')||''
};
function saveDB(){ LS.set('ubi',DB.ubi);LS.set('emp',DB.emp);LS.set('reg',DB.reg);LS.set('gasUrl',DB.gasUrl); }

const hoy       = () => new Date().toISOString().split('T')[0];
const horaStr   = () => new Date().toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'});
const fechaHora = () => new Date().toLocaleString('es-AR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'});

// ═══════════════════════════════════════════════════════
// CONECTAR — GAS
// ═══════════════════════════════════════════════════════
document.getElementById('gas-code').value = GAS_CODE;
if(DB.gasUrl) document.getElementById('gas-url').value = DB.gasUrl;

function guardarUrl(){
  DB.gasUrl = document.getElementById('gas-url').value.trim();
  saveDB();
  actualizarPill();
}

function actualizarPill(estado){
  const dot   = document.getElementById('gas-dot');
  const label = document.getElementById('gas-label');
  if(estado==='ok'){
    dot.className='gdot ok'; label.textContent='Conectado';
  } else if(estado==='ing'){
    dot.className='gdot ing'; label.textContent='Probando...';
  } else if(estado==='err'){
    dot.className='gdot no'; label.textContent='Error';
  } else {
    dot.className = DB.gasUrl ? 'gdot ok' : 'gdot no';
    label.textContent = DB.gasUrl ? 'Conectado' : 'Sin conectar';
  }
}

async function probarConexion(){
  const url = document.getElementById('gas-url').value.trim();
  if(!url){ alert('Pegá primero la URL del Apps Script.'); return; }
  DB.gasUrl = url; saveDB();
  actualizarPill('ing');
  const el = document.getElementById('test-result');
  el.innerHTML = '<span class="sb sb-ing"><span class="spinner">⟳</span> Probando...</span>';
  try {
    // no-cors no devuelve body, pero si no tira error la URL es válida
    await fetch(url, { method:'GET', mode:'no-cors' });
    el.innerHTML = '<span class="sb sb-ok">✓ Conexión exitosa — podés empezar a usar el sistema</span>';
    actualizarPill('ok');
  } catch(e) {
    el.innerHTML = '<span class="sb sb-err">✗ No se pudo conectar — verificá la URL</span>';
    actualizarPill('err');
  }
}

function copiarCodigo(){
  navigator.clipboard.writeText(GAS_CODE).then(()=>{
    const b = document.querySelector('.copy-btn');
    b.textContent='✓ Copiado'; setTimeout(()=>b.textContent='📋 Copiar',2000);
  });
}

// Llamada POST al Apps Script
async function gasPost(body){
  if(!DB.gasUrl) throw new Error('Sin URL configurada');
  const res = await fetch(DB.gasUrl,{
    method:'POST',
    mode:'no-cors', // necesario para Apps Script desde otro dominio
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(body)
  });
  // no-cors no retorna body legible, pero si no arroja error el envío fue OK
  return { ok: true };
}

// ═══════════════════════════════════════════════════════
// NAVEGACIÓN
// ═══════════════════════════════════════════════════════
function nav(id,btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.nb').forEach(b=>b.classList.remove('on'));
  document.getElementById('page-'+id).classList.add('on');
  if(btn) btn.classList.add('on');
  if(id==='empleados') renderEmps();
  if(id==='registro')  initRegistro();
  if(id==='historial') initHistorial();
  if(id==='checkin')   initCheckin();
}

// ═══════════════════════════════════════════════════════
// UBICACIONES
// ═══════════════════════════════════════════════════════
function usarGPS(){
  if(!navigator.geolocation){alert('GPS no disponible.');return;}
  navigator.geolocation.getCurrentPosition(p=>{
    document.getElementById('f-lat').value=p.coords.latitude.toFixed(7);
    document.getElementById('f-lng').value=p.coords.longitude.toFixed(7);
  },()=>alert('No se pudo obtener el GPS.'),{enableHighAccuracy:true});
}
function guardarUbicacion(){
  const n=document.getElementById('f-nombre').value.trim();
  const lat=parseFloat(document.getElementById('f-lat').value);
  const lng=parseFloat(document.getElementById('f-lng').value);
  const r=parseInt(document.getElementById('f-radio').value)||50;
  if(!n||isNaN(lat)||isNaN(lng)){alert('Completá nombre, latitud y longitud.');return;}
  DB.ubi.push({id:Date.now(),nombre:n,lat,lng,radio:r});
  saveDB();
  ['f-nombre','f-lat','f-lng'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('f-radio').value='50';
  renderUbis();
}
function eliminarUbi(id){
  if(!confirm('¿Eliminar esta ubicación?'))return;
  DB.ubi=DB.ubi.filter(u=>u.id!==id);saveDB();renderUbis();
}
function renderUbis(){
  const el=document.getElementById('ubi-list');
  const em=document.getElementById('ubi-empty');
  if(!DB.ubi.length){el.innerHTML='';el.style.display='none';em.style.display='block';return;}
  em.style.display='none';el.className='loc-list';
  el.innerHTML=DB.ubi.map(u=>`
    <div class="loc-row">
      <div class="pdot"></div>
      <div style="flex:1">
        <div style="font-size:15px;font-weight:700;color:var(--white)">${u.nombre}</div>
        <div style="font-size:11px;font-family:'Fira Code',monospace;color:var(--muted)">📍 ${u.lat.toFixed(5)}, ${u.lng.toFixed(5)}</div>
      </div>
      <div class="rbadge">⊙ ${u.radio}m</div>
      <div style="display:flex;gap:8px;margin-left:10px">
        <button class="btn btn-blue btn-sm" onclick="verQR(${u.id})">🔲 QR</button>
        <button class="btn btn-red btn-sm" onclick="eliminarUbi(${u.id})">Eliminar</button>
      </div>
    </div>`).join('');
}

// QR
function verQR(id){
  const u=DB.ubi.find(x=>x.id===id);if(!u)return;
  const base=window.location.origin+window.location.pathname;
  // NO incluimos la URL del Apps Script en el QR — eso lo hace demasiado largo
  // El celular del empleado la obtiene del localStorage (guardada al visitar la app)
  const url=`${base}?ci=1&locId=${id}&lat=${u.lat}&lng=${u.lng}&r=${u.radio}&n=${encodeURIComponent(u.nombre)}`;
  document.getElementById('qr-title').textContent=u.nombre;
  document.getElementById('qr-sub').textContent=`Radio: ${u.radio}m · ${u.lat.toFixed(4)}, ${u.lng.toFixed(4)}`;
  document.getElementById('qr-url').textContent=url;
  document.getElementById('qrcode').innerHTML='';
  new QRCode(document.getElementById('qrcode'),{text:url,width:220,height:220,colorDark:'#000',colorLight:'#fff',correctLevel:QRCode.CorrectLevel.H});
  document.getElementById('qr-modal').style.display='flex';
}
function cerrarQR(){document.getElementById('qr-modal').style.display='none';}
function imprimirQR(){
  const t=document.getElementById('qr-title').textContent;
  const w=window.open('','_blank');
  w.document.write(`<html><head><title>QR ${t}</title><style>body{font-family:sans-serif;text-align:center;padding:50px}h2{margin:0 0 6px}p{color:#666;font-size:14px;margin:0 0 24px}</style></head><body><h2>${t}</h2><p>Escaneá para registrar tu asistencia</p>${document.getElementById('qr-box').innerHTML}</body></html>`);
  w.document.close();w.print();
}

// ═══════════════════════════════════════════════════════
// EMPLEADOS
// ═══════════════════════════════════════════════════════
function agregarEmp(){
  const leg=document.getElementById('ne-leg').value.trim();
  const nom=document.getElementById('ne-nom').value.trim();
  if(!leg){alert('Ingresá el legajo.');return;}
  if(!nom){alert('Ingresá el apellido y nombre.');return;}
  if(DB.emp.find(e=>String(e.legajo)===String(leg))){alert(`Legajo ${leg} ya existe.`);return;}
  DB.emp.push({id:Date.now(),legajo:leg,apellidoNombre:nom});
  saveDB();
  document.getElementById('ne-leg').value='';
  document.getElementById('ne-nom').value='';
  document.getElementById('ne-leg').focus();
  renderEmps();
}
function eliminarEmp(id){
  if(!confirm('¿Eliminar empleado?'))return;
  DB.emp=DB.emp.filter(e=>e.id!==id);saveDB();renderEmps();
}
function borrarTodosEmps(){
  if(!DB.emp.length)return;
  if(!confirm(`¿Borrar los ${DB.emp.length} empleados?`))return;
  DB.emp=[];saveDB();renderEmps();
}
function renderEmps(){
  const q=(document.getElementById('emp-q')?.value||'').toLowerCase();
  const el=document.getElementById('emp-list');
  const em=document.getElementById('emp-empty');
  const bd=document.getElementById('emp-badge');
  if(bd) bd.textContent=DB.emp.length+' empleado'+(DB.emp.length!==1?'s':'');
  const f=DB.emp.filter(e=>!q||String(e.legajo).includes(q)||e.apellidoNombre.toLowerCase().includes(q));
  if(!f.length){el.innerHTML='';em.style.display='block';return;}
  em.style.display='none';
  el.innerHTML=f.map(e=>`
    <div class="emp-row">
      <div style="font-family:'Fira Code',monospace;font-size:13px;color:var(--teal);font-weight:500">${e.legajo}</div>
      <div style="font-size:14px;color:var(--white)">${e.apellidoNombre}</div>
      <div style="text-align:right"><button class="btn btn-red btn-xs" onclick="eliminarEmp(${e.id})">Eliminar</button></div>
    </div>`).join('');
}

// Importar CSV / Excel
async function importarArchivo(input){
  const file=input.files[0];if(!file)return;
  document.getElementById('imp-fn').textContent=file.name;
  const ext=file.name.split('.').pop().toLowerCase();
  try{
    if(ext==='csv') procesarCSV(await file.text());
    else if(['xlsx','xls'].includes(ext)) await importarExcel(file);
    else alert('Usá .csv, .xlsx o .xls');
  }catch(e){ document.getElementById('imp-st').innerHTML='<span class="sb sb-err">✗ Error al leer el archivo</span>'; }
  input.value='';
}
function procesarCSV(text){
  const sep=text.includes(';')?';':',';
  const filas=text.split(/\r?\n/).map(l=>l.split(sep).map(c=>c.replace(/^["']|["']$/g,'').trim())).filter(f=>f.length>=2&&f.some(c=>c));
  procesarFilas(filas);
}
async function importarExcel(file){
  if(!window.XLSX){
    await new Promise((res,rej)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';s.onload=res;s.onerror=rej;document.head.appendChild(s);});
  }
  const buf=await file.arrayBuffer();
  const wb=XLSX.read(buf,{type:'array'});
  const ws=wb.Sheets[wb.SheetNames[0]];
  procesarFilas(XLSX.utils.sheet_to_json(ws,{header:1,defval:''}).map(r=>r.map(c=>String(c).trim())));
}
function procesarFilas(filas){
  if(!filas.length){document.getElementById('imp-st').innerHTML='<span class="sb sb-err">✗ Archivo vacío</span>';return;}
  const primera=filas[0];
  const esEnc=isNaN(primera[0])||primera[0].toUpperCase().includes('LEG')||primera[0].toUpperCase().includes('COD');
  const datos=esEnc?filas.slice(1):filas;
  let ag=0,dup=0,err=0;
  datos.forEach(f=>{
    const leg=String(f[0]||'').trim();
    const nom=String(f[1]||'').trim();
    if(!leg||!nom){err++;return;}
    if(DB.emp.find(e=>String(e.legajo)===leg)){dup++;return;}
    DB.emp.push({id:Date.now()+Math.random(),legajo:leg,apellidoNombre:nom});
    ag++;
  });
  saveDB();renderEmps();
  const p=[];
  if(ag)  p.push(`<span style="color:var(--teal)">✓ ${ag} agregados</span>`);
  if(dup) p.push(`<span style="color:var(--amber)">${dup} duplicados</span>`);
  if(err) p.push(`<span style="color:var(--red)">${err} inválidos</span>`);
  document.getElementById('imp-st').innerHTML=`<span class="sb" style="background:var(--s3);border:1px solid var(--border)">${p.join(' · ')}</span>`;
}
async function syncEmpleadosSheets(){
  if(!DB.gasUrl){alert('Primero configurá la conexión con Google Sheets en la pestaña "Conectar".');return;}
  if(!DB.emp.length){alert('No hay empleados para sincronizar.');return;}
  try{
    await gasPost({accion:'importarEmpleados',empleados:DB.emp.map(e=>({legajo:e.legajo,apellidoNombre:e.apellidoNombre}))});
    alert(`✓ ${DB.emp.length} empleados enviados a la hoja "Empleados" en Sheets`);
  }catch(e){alert('✗ Error al enviar. Verificá la URL en la pestaña Conectar.');}
}

// ═══════════════════════════════════════════════════════
// REGISTRO
// ═══════════════════════════════════════════════════════
function initRegistro(){
  const fi=document.getElementById('reg-fecha');
  if(!fi.value) fi.value=hoy();
  document.getElementById('reg-loc').innerHTML=
    '<option value="">Todos los lugares</option>'+
    DB.ubi.map(u=>`<option value="${u.id}">${u.nombre}</option>`).join('');
  renderRegistro();
}
function renderRegistro(){
  const fecha=document.getElementById('reg-fecha').value;
  const rh=DB.reg.filter(r=>r.fecha===fecha);
  document.getElementById('s-t').textContent=DB.emp.length;
  document.getElementById('s-r').textContent=rh.length;
  document.getElementById('s-g').textContent=rh.filter(r=>r.geoOk===true).length;
  document.getElementById('s-a').textContent=rh.filter(r=>r.geoOk===false).length;
  document.getElementById('reg-body').innerHTML=DB.emp.length
    ? DB.emp.map(emp=>{
        const reg=rh.filter(r=>r.empId===emp.id).sort((a,b)=>b.ts-a.ts)[0];
        const gT=reg?.geoOk===true?'<span class="gt ok">GEO ✓</span>':reg?.geoOk===false?'<span class="gt no">GEO ✗</span>':'';
        return `<div class="rr">
          <div class="av">${(emp.apellidoNombre[0]||'?')}</div>
          <div>
            <div style="font-size:14px;font-weight:600;color:var(--white)">${emp.apellidoNombre}${gT}</div>
            <div style="font-size:11px;font-family:'Fira Code',monospace;color:var(--muted)">Legajo: ${emp.legajo}</div>
          </div>
          <div>
            ${reg?`<div style="font-size:13px;color:var(--white);font-weight:600">${reg.horaInicio||'—'}</div>
                   <div style="font-size:11px;color:var(--muted)">${reg.cantHoras?reg.cantHoras+'hs':'—'}</div>`
                :'<span style="font-size:12px;color:var(--muted)">Sin registro</span>'}
          </div>
          <div style="font-size:12px;font-family:\'Fira Code\',monospace;color:var(--blue)">${reg?.locNombre||'—'}${reg?.geo?.dist?`<br/><span style="color:var(--muted)">${reg.geo.dist}m</span>`:''}</div>
          <div style="font-family:'Fira Code',monospace;font-size:11px;color:var(--muted)">${reg?.fechaHora||'—'}</div>
        </div>`;
      }).join('')
    : '<div style="padding:28px;text-align:center;color:var(--muted);font-size:14px">Cargá empleados en la pestaña 👥 Empleados primero.</div>';
}
function exportCSV(){
  const fecha=document.getElementById('reg-fecha').value;
  const rh=DB.reg.filter(r=>r.fecha===fecha);
  const rows=[['FECHA Y HORA','LEGAJO','APELLIDO Y NOMBRE','HORA DE INICIO DEL SERVICIO','CANTIDAD DE HORAS DEL SERVICIO','UBICACIÓN','GEO OK','DISTANCIA (m)']];
  DB.emp.forEach(emp=>{
    const r=rh.filter(x=>x.empId===emp.id).sort((a,b)=>b.ts-a.ts)[0];
    rows.push([r?.fechaHora||'',emp.legajo,emp.apellidoNombre,r?.horaInicio||'',r?.cantHoras||'',r?.locNombre||'',r?.geoOk!=null?(r.geoOk?'Sí':'No'):'',r?.geo?.dist||'']);
  });
  const csv=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  Object.assign(document.createElement('a'),{href:'data:text/csv;charset=utf-8,\uFEFF'+encodeURIComponent(csv),download:`presentismo_${fecha}.csv`}).click();
}
async function syncRegistro(){
  if(!DB.gasUrl){alert('Configurá la conexión en la pestaña "Conectar".');return;}
  const fecha=document.getElementById('reg-fecha').value;
  const rh=DB.reg.filter(r=>r.fecha===fecha);
  const filas=DB.emp.map(emp=>{
    const r=rh.filter(x=>x.empId===emp.id).sort((a,b)=>b.ts-a.ts)[0];
    return{fechaHora:r?.fechaHora||'',legajo:emp.legajo,apellidoNombre:emp.apellidoNombre,
      horaInicio:r?.horaInicio||'',cantHoras:r?.cantHoras||'',ubicacion:r?.locNombre||'',
      geoOk:r?.geoOk!=null?(r.geoOk?'Sí':'No'):'',distancia:r?.geo?.dist||''};
  });
  const badge=document.getElementById('sync-badge');
  badge.innerHTML='<span class="sb sb-ing"><span class="spinner">⟳</span> Enviando...</span>';
  try{
    await gasPost({accion:'sync',filas});
    badge.innerHTML=`<span class="sb sb-ok">✓ ${filas.length} filas enviadas a Sheets</span>`;
  }catch(e){
    badge.innerHTML='<span class="sb sb-err">✗ Error al enviar</span>';
  }
  setTimeout(()=>badge.innerHTML='',5000);
}

// ═══════════════════════════════════════════════════════
// HISTORIAL
// ═══════════════════════════════════════════════════════
function initHistorial(){
  document.getElementById('h-loc').innerHTML='<option value="">Todas las ubicaciones</option>'+DB.ubi.map(u=>`<option value="${u.id}">${u.nombre}</option>`).join('');
  document.getElementById('h-emp').innerHTML='<option value="">Todos los empleados</option>'+DB.emp.map(e=>`<option value="${e.id}">${e.apellidoNombre} (${e.legajo})</option>`).join('');
  renderHistorial();
}
function renderHistorial(){
  const lf=document.getElementById('h-loc').value;
  const ef=document.getElementById('h-emp').value;
  const gf=document.getElementById('h-geo').value;
  let rows=[...DB.reg].sort((a,b)=>b.ts-a.ts);
  if(lf) rows=rows.filter(r=>r.locId==lf);
  if(ef) rows=rows.filter(r=>r.empId==ef);
  if(gf==='ok')   rows=rows.filter(r=>r.geoOk===true);
  if(gf==='fail') rows=rows.filter(r=>r.geoOk===false);
  const el=document.getElementById('h-body');
  if(!rows.length){el.innerHTML='<div style="padding:28px;text-align:center;color:var(--muted);font-size:14px">No hay registros con esos filtros.</div>';return;}
  el.innerHTML=rows.slice(0,200).map(r=>{
    const emp=DB.emp.find(e=>e.id===r.empId)||{apellidoNombre:'?',legajo:''};
    const gT=r.geoOk===true?'<span class="gt ok">GEO ✓</span>':r.geoOk===false?'<span class="gt no">GEO ✗</span>':'';
    return `<div class="hrow">
      <div class="hts">${r.fechaHora||r.fecha||''}</div>
      <div style="font-family:'Fira Code',monospace;font-size:11px;color:var(--teal);min-width:58px">${emp.legajo}</div>
      <div style="flex:1;font-weight:600;color:var(--white)">${emp.apellidoNombre}</div>
      <div style="font-size:12px;font-family:'Fira Code',monospace;color:var(--teal)">${r.horaInicio||'—'}${r.cantHoras?' · '+r.cantHoras+'hs':''}</div>
      <div style="font-size:11px;font-family:'Fira Code',monospace;color:var(--blue);min-width:120px">${r.locNombre||''}</div>
      ${r.geo?.dist?`<div style="font-size:10px;font-family:'Fira Code',monospace;color:var(--muted)">${r.geo.dist}m</div>`:''}
      ${gT}
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════
// CHECK-IN
// ═══════════════════════════════════════════════════════
function initCheckin(){
  // Mostrar aviso si el celular no tiene la URL de Sheets guardada
  const noGas = document.getElementById('ci-no-gas');
  if(noGas) noGas.style.display = DB.gasUrl ? 'none' : 'block';

  document.getElementById('ci-loc').innerHTML=
    '<option value="">-- Seleccioná una ubicación --</option>'+
    DB.ubi.map(u=>`<option value="${u.id}">${u.nombre}</option>`).join('');

  // Auto-cargar si viene de QR (?ci=1&locId=...)
  const p=new URLSearchParams(window.location.search);
  if(p.get('ci')==='1'&&p.get('locId')){
    const locId=parseInt(p.get('locId'));
    // Registrar ubicación localmente si no la tiene aún
    if(!DB.ubi.find(u=>u.id===locId)){
      DB.ubi.push({
        id:locId,
        nombre:decodeURIComponent(p.get('n')||'Lugar'),
        lat:parseFloat(p.get('lat')),
        lng:parseFloat(p.get('lng')),
        radio:parseInt(p.get('r'))||50
      });
      saveDB();renderUbis();
      // Refrescar select con la nueva ubicación
      document.getElementById('ci-loc').innerHTML=
        '<option value="">-- Seleccioná una ubicación --</option>'+
        DB.ubi.map(u=>`<option value="${u.id}">${u.nombre}</option>`).join('');
    }
    document.getElementById('ci-loc').value=locId;
    onCiLoc();
  }
}
function onCiLoc(){
  const id=parseInt(document.getElementById('ci-loc').value);
  const panel=document.getElementById('ci-panel');
  if(!id){panel.style.display='none';return;}
  const u=DB.ubi.find(x=>x.id===id);
  if(u){document.getElementById('ci-loc-name').textContent=u.nombre;document.getElementById('ci-loc-r').textContent=`Radio permitido: ${u.radio}m`;}
  panel.style.display='block';
  document.getElementById('ci-result').innerHTML='';
}
function hacerCheckin(){
  const locId    =parseInt(document.getElementById('ci-loc').value);
  const legajo   =document.getElementById('ci-legajo').value.trim();
  const nombre   =document.getElementById('ci-nombre').value.trim();
  const horaInicio=document.getElementById('ci-hinicio').value;
  const cantHoras=document.getElementById('ci-horas').value.trim();
  if(!legajo)    {alert('Ingresá tu legajo.');return;}
  if(!nombre)    {alert('Ingresá tu apellido y nombre.');return;}
  if(!horaInicio){alert('Ingresá la hora de inicio del servicio.');return;}
  if(!cantHoras) {alert('Ingresá la cantidad de horas.');return;}
  const loc=DB.ubi.find(u=>u.id===locId);
  if(!loc){alert('Ubicación no encontrada.');return;}
  const res=document.getElementById('ci-result');
  res.innerHTML=`<div class="ci-res warn" style="text-align:center">
    <div style="font-size:40px;margin-bottom:10px"><span class="spinner">⟳</span></div>
    <div style="font-size:17px;font-weight:700;color:var(--amber)">Obteniendo GPS...</div>
    <div style="font-size:13px;color:var(--muted);margin-top:6px">Permití el acceso a la ubicación</div>
  </div>`;
  if(!navigator.geolocation){
    showCI(res,'warn','⚠️','Sin GPS disponible','Tu dispositivo no soporta geolocalización. El registro se guarda sin verificación.');
    guardarCI(legajo,nombre,horaInicio,cantHoras,loc,null,null);return;
  }
  navigator.geolocation.getCurrentPosition(pos=>{
    const dist=calcDist(pos.coords.latitude,pos.coords.longitude,loc.lat,loc.lng);
    const ok=dist<=loc.radio;
    if(ok){
      showCI(res,'ok','✅','¡Asistencia confirmada!',`Distancia al punto: ${Math.round(dist)}m · ${horaStr()}`);
      guardarCI(legajo,nombre,horaInicio,cantHoras,loc,true,{lat:pos.coords.latitude,lng:pos.coords.longitude,dist:Math.round(dist)});
    } else {
      showCI(res,'fail','🚫',`Fuera de zona — ${Math.round(dist)}m`,`Radio permitido: ${loc.radio}m. Estás ${Math.round(dist-loc.radio)}m más lejos del límite. El intento queda registrado con alerta.`);
      guardarCI(legajo,nombre,horaInicio,cantHoras,loc,false,{lat:pos.coords.latitude,lng:pos.coords.longitude,dist:Math.round(dist)});
    }
  },()=>showCI(res,'warn','⚠️','GPS denegado','Debés permitir el acceso a la ubicación para registrar la asistencia.'),
  {enableHighAccuracy:true,timeout:12000,maximumAge:0});
}
function showCI(el,type,icon,title,sub){
  const c={ok:'var(--teal)',fail:'var(--red)',warn:'var(--amber)'};
  el.innerHTML=`<div class="ci-res ${type}" style="text-align:center">
    <div style="font-size:44px;margin-bottom:12px">${icon}</div>
    <div style="font-size:20px;font-weight:700;color:${c[type]}">${title}</div>
    <div style="font-size:13px;color:var(--muted);margin-top:7px;line-height:1.5">${sub}</div>
  </div>`;
}
async function guardarCI(legajo,nombre,horaInicio,cantHoras,loc,geoOk,geo){
  let emp=DB.emp.find(e=>String(e.legajo)===String(legajo));
  if(!emp){emp={id:Date.now(),legajo,apellidoNombre:nombre};DB.emp.push(emp);}
  else emp.apellidoNombre=nombre;
  const fh=fechaHora();
  const fecha=hoy();
  const idx=DB.reg.findIndex(r=>r.empId===emp.id&&r.fecha===fecha);
  const entry={empId:emp.id,locId:loc.id,locNombre:loc.nombre,fecha,fechaHora:fh,horaInicio,cantHoras,ts:Date.now(),geoOk,geo};
  if(idx>=0) DB.reg[idx]=entry; else DB.reg.push(entry);
  saveDB();
  // Enviar a Google Sheets via Apps Script
  if(DB.gasUrl){
    try{
      await gasPost({accion:'checkin',fechaHora:fh,legajo:emp.legajo,apellidoNombre:emp.apellidoNombre,
        horaInicio,cantHoras,ubicacion:loc.nombre,geoOk:geoOk!=null?(geoOk?'Sí':'No'):'',distancia:geo?.dist||''});
    }catch(e){/* guardado local, intento de envío fallido */}
  }
}

// ═══════════════════════════════════════════════════════
// GEO UTILS
// ═══════════════════════════════════════════════════════
function calcDist(lat1,lon1,lat2,lon2){
  const R=6371000,dL=(lat2-lat1)*Math.PI/180,dl=(lon2-lon1)*Math.PI/180;
  const a=Math.sin(dL/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dl/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
actualizarPill();
renderUbis();

// Si viene de un QR escaneado, ir directo al check-in
const _p=new URLSearchParams(window.location.search);
if(_p.get('ci')==='1'){
  document.querySelectorAll('.nb').forEach(b=>b.classList.remove('on'));
  nav('checkin', document.querySelectorAll('.nb')[5]);
}
</script>
</body>
</html>
