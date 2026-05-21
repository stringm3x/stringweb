"use client";

// ── Opciones por flow ──────────────────────────────────────────────────────────
const opcionesServicios = {
  canal: [
    { value: "instagram", label: "Instagram / Redes" },
    { value: "whatsapp", label: "WhatsApp directo" },
    { value: "recomendacion", label: "Recomendaciones" },
    { value: "google", label: "Google / Web" },
    { value: "presencial", label: "Presencial" },
  ],
  quien: [
    { value: "dueno", label: "El dueño siempre" },
    { value: "staff", label: "Staff designado" },
    { value: "cualquiera", label: "Quien pueda" },
    { value: "nadie", label: "Nadie definido" },
  ],
  respuesta: [
    { value: "rapido", label: "Menos de 30 min" },
    { value: "horas", label: "1 a 4 horas" },
    { value: "dia", label: "El mismo día o más" },
    { value: "nadie", label: "Depende / No siempre" },
  ],
  volumen: [
    { value: "4", label: "1 – 4 / semana" },
    { value: "10", label: "5 – 10 / semana" },
    { value: "22", label: "10 – 30 / semana" },
    { value: "40", label: "Más de 30 / semana" },
  ],
  conversion: [
    { value: "2", label: "1 – 2 de cada 10" },
    { value: "4", label: "3 – 4 de cada 10" },
    { value: "6", label: "5 – 6 de cada 10" },
    { value: "8", label: "7+ de cada 10" },
  ],
  registro: [
    { value: "nada", label: "No registramos nada" },
    { value: "papel", label: "Papel / libreta" },
    { value: "excel", label: "Excel / Sheets" },
    { value: "crm", label: "CRM o sistema" },
  ],
};

const opcionesEcommerce = {
  "canal-eco": [
    { value: "instagram", label: "Instagram / TikTok" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "meli", label: "MercadoLibre" },
    { value: "fisica", label: "Tienda física" },
    { value: "mixto", label: "Mixto / Varios" },
  ],
  compra: [
    { value: "whatsapp", label: "Por WhatsApp" },
    { value: "presencial", label: "Presencial" },
    { value: "plataforma", label: "Plataforma externa" },
    { value: "mixto", label: "Mixto" },
  ],
  "pago-online": [
    { value: "no", label: "No / Solo transferencia" },
    { value: "plataforma", label: "Plataforma (MeLi, etc.)" },
    { value: "si", label: "Sí, tienda propia" },
  ],
  catalogo: [
    { value: "10", label: "Menos de 10 productos" },
    { value: "30", label: "10 – 30 productos" },
    { value: "100", label: "30 – 100 productos" },
    { value: "500", label: "Más de 100 productos" },
  ],
  volumen: [
    { value: "5", label: "Menos de 5 / semana" },
    { value: "20", label: "5 – 20 / semana" },
    { value: "60", label: "20 – 60 / semana" },
    { value: "150", label: "Más de 60 / semana" },
  ],
};

const opcionesMenu = {
  pedidos: [
    { value: "mostrador", label: "Solo mostrador" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "plataforma", label: "Plataforma (Rappi, etc.)" },
    { value: "mixto", label: "Mixto" },
  ],
  menu: [
    { value: "fisico", label: "Menú físico / impreso" },
    { value: "foto", label: "Foto en WhatsApp / redes" },
    { value: "digital", label: "Menú digital (QR / web)" },
  ],
  volumen: [
    { value: "10", label: "Menos de 10 / día" },
    { value: "40", label: "10 – 40 / día" },
    { value: "80", label: "40 – 80 / día" },
    { value: "150", label: "Más de 80 / día" },
  ],
  operadores: [
    { value: "2", label: "1 – 2 personas" },
    { value: "5", label: "3 – 5 personas" },
    { value: "10", label: "6 – 10 personas" },
    { value: "20", label: "Más de 10 personas" },
  ],
  domicilio: [
    { value: "no", label: "No hay delivery" },
    { value: "plataforma", label: "Plataformas (Rappi, etc.)" },
    { value: "propio", label: "Delivery propio" },
  ],
};

export default function PasoSituacion({ respuestas, flow, onChange }) {
  if (!flow) return null;

  if (flow === "servicios") {
    return (
      <PasoBase titulo="Situación actual — Captación">
        <Grupo
          label="¿Por dónde llegan los prospectos principalmente?"
          campo="canal"
          opciones={opcionesServicios.canal}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Quién responde los mensajes de prospectos?"
          campo="quien"
          opciones={opcionesServicios.quien}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Cuánto tarda en responder normalmente?"
          campo="respuesta"
          opciones={opcionesServicios.respuesta}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Cuántos prospectos nuevos llegan por semana?"
          campo="volumen"
          opciones={opcionesServicios.volumen}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="De cada 10 prospectos, ¿cuántos se convierten en clientes?"
          campo="conversion"
          opciones={opcionesServicios.conversion}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Cómo registran a los prospectos que llegan?"
          campo="registro"
          opciones={opcionesServicios.registro}
          respuestas={respuestas}
          onChange={onChange}
        />
      </PasoBase>
    );
  }

  if (flow === "ecommerce") {
    return (
      <PasoBase titulo="Situación actual — Ventas">
        <Grupo
          label="¿Por dónde venden principalmente?"
          campo="canal-eco"
          opciones={opcionesEcommerce["canal-eco"]}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Cómo concreta la compra el cliente?"
          campo="compra"
          opciones={opcionesEcommerce.compra}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Aceptan pago en línea hoy?"
          campo="pago-online"
          opciones={opcionesEcommerce["pago-online"]}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Cuántos productos tienen en catálogo?"
          campo="catalogo"
          opciones={opcionesEcommerce.catalogo}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Cuántos pedidos reciben por semana?"
          campo="volumen"
          opciones={opcionesEcommerce.volumen}
          respuestas={respuestas}
          onChange={onChange}
        />
      </PasoBase>
    );
  }

  if (flow === "menu") {
    return (
      <PasoBase titulo="Situación actual — Pedidos">
        <Grupo
          label="¿Cómo reciben los pedidos hoy?"
          campo="pedidos"
          opciones={opcionesMenu.pedidos}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Qué tipo de menú tienen actualmente?"
          campo="menu"
          opciones={opcionesMenu.menu}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Cuántos pedidos reciben por día?"
          campo="volumen"
          opciones={opcionesMenu.volumen}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Cuántas personas operan el negocio?"
          campo="operadores"
          opciones={opcionesMenu.operadores}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Tienen servicio a domicilio?"
          campo="domicilio"
          opciones={opcionesMenu.domicilio}
          respuestas={respuestas}
          onChange={onChange}
        />
      </PasoBase>
    );
  }

  return null;
}

// ── Componentes auxiliares ─────────────────────────────────────────────────────
function PasoBase({ titulo, children }) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
          Paso 3 · Situación
        </span>
        <h1 className="font-anton text-4xl text-white uppercase tracking-tight leading-tight">
          {titulo.split("—")[0]}
          <br />
          <span className="text-green">{titulo.split("—")[1]?.trim()}</span>
        </h1>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function Grupo({ label, campo, opciones, respuestas, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-mono text-gray uppercase tracking-widest">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-2">
        {opciones.map((op) => (
          <button
            key={op.value}
            onClick={() => onChange(campo, op.value)}
            className={`px-3 py-2.5 border text-xs font-bold uppercase tracking-wide text-left transition-all duration-150 ${
              respuestas[campo] === op.value
                ? "border-green bg-green/10 text-green"
                : "border-white/10 hover:border-white/30 text-white/70"
            }`}
          >
            {op.label}
          </button>
        ))}
      </div>
    </div>
  );
}
