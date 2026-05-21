// ─── Storage — diagnósticos en localStorage ───────────────────────────────────
// Sin Supabase — todo local en el navegador del vendedor

const STORAGE_KEY = "string_diagnosticos";

// Guardar diagnóstico
export const guardarDiagnostico = (diagnostico) => {
  try {
    const existentes = obtenerDiagnosticos();
    const nuevo = {
      ...diagnostico,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const actualizados = [nuevo, ...existentes];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
    return nuevo;
  } catch (e) {
    console.error("Error guardando diagnóstico:", e);
    return null;
  }
};

// Obtener todos los diagnósticos
export const obtenerDiagnosticos = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Obtener un diagnóstico por id
export const obtenerDiagnostico = (id) => {
  const todos = obtenerDiagnosticos();
  return todos.find((d) => d.id === id) || null;
};

// Eliminar diagnóstico por id
export const eliminarDiagnostico = (id) => {
  try {
    const existentes = obtenerDiagnosticos();
    const filtrados = existentes.filter((d) => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
    return true;
  } catch {
    return false;
  }
};

// Limpiar todos los diagnósticos
export const limpiarDiagnosticos = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
};
