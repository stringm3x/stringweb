import { z } from "zod";
// Esquema principal de validación
export const quoteSchema = z.object({
  // Nombre - Solo letras y espacios, mínimo 2 caracteres
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios")
    .transform((name) => name.trim()), // Limpiar espacios extras

  // Email - Opcional. Si se captura, debe tener formato válido.
  // trim/toLowerCase van ANTES de min/max/email: así un email pegado con
  // espacios accidentales se normaliza antes de validarse, en vez de
  // rechazarse por espacios que el usuario ni notó que llevaba.
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(100, "El email no puede exceder 100 caracteres")
    .refine((val) => val === "" || z.string().email().safeParse(val).success, {
      message: "Por favor, ingresa un email válido",
    })
    .optional(),

  // WhatsApp - Solo números, entre 10 y 15 dígitos
  whatsapp: z
    .string()
    .min(10, "El número debe tener al menos 10 dígitos")
    .max(15, "El número no puede exceder 15 dígitos")
    .regex(/^[0-9]+$/, "Solo se permiten números (sin espacios, guiones o +)")
    .transform((whatsapp) => whatsapp.trim()),

  // Tipo de negocio - Texto libre, obligatorio
  businessType: z
    .string()
    .min(2, "Cuéntanos qué tipo de negocio tienes")
    .max(80, "Máximo 80 caracteres")
    .transform((val) => val.trim()),

  // Tipo de proyecto - Opcional. Si se elige, debe ser un nivel válido.
  projectType: z
    .string()
    .optional()
    .refine(
      (val) => !val || ["nivel1", "nivel2", "nivel3", "nivel4"].includes(val),
      { message: "Selecciona un nivel del sistema STRING válido" }
    ),

  // "¿Qué te está pasando hoy?" - Texto libre, obligatorio
  objective: z
    .string()
    .min(10, "Cuéntanos qué te está pasando con más detalle (mínimo 10 caracteres)")
    .max(500, "El texto no puede exceder 500 caracteres")
    .transform((objective) => objective.trim())
    .refine(
      (text) => text.split(" ").length >= 3,
      "Por favor, cuéntanos con al menos 3 palabras"
    ),

  // Fecha ideal - Opcional. Si se elige, debe ser futura.
  idealDate: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      {
        message: "La fecha ideal debe ser hoy o una fecha futura",
      }
    ),

  // Presupuesto - Opcional. Si se captura, debe ser un número positivo.
  budget: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: "Ingresa un presupuesto válido (mayor a 0)",
      }
    )
    .refine(
      (val) => {
        if (!val) return true;
        const num = Number(val);
        return num <= 1000000; // 1 millón USD máximo
      },
      {
        message: "El presupuesto máximo es 1,000,000 USD",
      }
    ),
});

// Función de validación reutilizable (para backend/frontend)
export const validateQuote = (data) => {
  try {
    const validated = quoteSchema.parse(data);
    return {
      success: true,
      data: validated,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.flatten().fieldErrors,
      };
    }

    // Error inesperado
    return {
      success: false,
      data: null,
      errors: {
        _form: ["Error inesperado en la validación"],
      },
    };
  }
};

// Validación parcial (para validación en tiempo real)
export const validatePartial = (data) => {
  try {
    // safeParse no lanza excepción
    const result = quoteSchema.partial().safeParse(data);

    if (result.success) {
      return { success: true, errors: null };
    }

    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  } catch (error) {
    return { success: false, errors: { _form: ["Error de validación"] } };
  }
};

// Mensajes de ayuda por campo (para UI)
export const fieldHelpText = {
  name: "Tu nombre completo como aparecerá en la cotización",
  email: "Opcional. Te enviaremos los detalles del proyecto aquí",
  whatsapp: "Código de país + número (ej: 521234567890)",
  businessType: "¿A qué se dedica tu negocio?",
  projectType: "Opcional. Selecciona el tipo que mejor describa tu proyecto",
  objective: "Cuéntanos qué te está pasando hoy con tu negocio",
  idealDate: "Opcional. ¿Para cuándo necesitas tenerlo listo?",
  budget: "Opcional. Indica tu rango de inversión estimado en MXN",
};

// Ejemplos de datos válidos (para testing)
// projectType usa los mismos ids que PROJECT_TYPES (app/lib/constants/project-types.js)
export const validExamples = {
  basico: {
    name: "Juan Pérez",
    email: "juan@email.com",
    whatsapp: "521234567890",
    businessType: "Consultoría",
    projectType: "nivel1",
    objective: "Landing page para mi negocio de consultoría",
    idealDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    budget: "3000",
  },
  intermedio: {
    name: "María García",
    email: "maria@empresa.com",
    whatsapp: "521234567891",
    businessType: "Despacho de arquitectura",
    projectType: "nivel2",
    objective: "Sitio web corporativo con blog y área de clientes",
    idealDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    budget: "8500",
  },
  avanzado: {
    name: "Carlos Rodríguez",
    email: "carlos@startup.io",
    whatsapp: "521234567892",
    businessType: "Marca de productos artesanales",
    projectType: "nivel4",
    objective: "Marketplace para productos artesanales con pasarela de pagos",
    idealDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    budget: "25000",
  },
  // Solo los 4 campos obligatorios, el resto queda vacío/ausente
  minimo: {
    name: "Ana López",
    whatsapp: "521234567893",
    businessType: "Salón de belleza",
    objective: "No sé por dónde empezar con mi presencia digital",
  },
};

// Datos inválidos para testing
export const invalidExamples = {
  nombreCorto: { name: "a" },
  emailInvalido: { email: "correo@" },
  whatsappConEspacios: { whatsapp: "52 123 456 7890" },
  tipoNegocioCorto: { businessType: "A" },
  objetivoCorto: { objective: "Hola" },
  fechaPasada: { idealDate: "2020-01-01" },
  presupuestoNegativo: { budget: "-100" },
};

// Configuración de reglas de negocio
export const businessRules = {
  minBudget: {
    basica: 2000,
    intermedia: 5000,
    avanzada: 12000,
  },
  maxBudget: 1000000,
  minProjectLength: {
    basica: 15, // días
    intermedia: 30,
    avanzada: 60,
  },
  requiredFields: ["name", "whatsapp", "businessType", "objective"],
};

// Validación de reglas de negocio (más allá de formato)
export const validateBusinessRules = (data) => {
  const errors = {};

  // Verificar presupuesto mínimo por tipo de proyecto
  if (data.projectType && data.budget) {
    const minRequired = businessRules.minBudget[data.projectType];
    const budgetNum = Number(data.budget);

    if (budgetNum < minRequired) {
      errors.budget = `Para proyectos ${data.projectType}s, el presupuesto mínimo sugerido es $${minRequired} USD`;
    }
  }

  // Verificar plazo mínimo
  if (data.idealDate && data.projectType) {
    const selectedDate = new Date(data.idealDate);
    const today = new Date();
    const daysDiff = Math.ceil((selectedDate - today) / (1000 * 60 * 60 * 24));
    const minDays = businessRules.minProjectLength[data.projectType];

    if (daysDiff < minDays) {
      errors.idealDate = `Para proyectos ${data.projectType}s, recomiendo mínimo ${minDays} días de desarrollo`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

// Función de validación completa (formato + negocio)
export const validateFull = (data) => {
  // Primero validación de formato
  const formatValidation = validateQuote(data);

  if (!formatValidation.success) {
    return formatValidation;
  }

  // Luego reglas de negocio
  const businessValidation = validateBusinessRules(formatValidation.data);

  if (!businessValidation.valid) {
    return {
      success: false,
      data: formatValidation.data,
      errors: businessValidation.errors,
    };
  }

  return {
    success: true,
    data: formatValidation.data,
    errors: null,
  };
};

// Sanitización de datos (seguridad)
export const sanitizeData = (data) => {
  const sanitized = { ...data };

  // Prevenir XSS en campos de texto
  if (sanitized.name) {
    sanitized.name = sanitized.name
      .replace(/<[^>]*>/g, "") // Remover HTML tags
      .replace(/[<>]/g, ""); // Remover < y > sueltos
  }

  if (sanitized.objective) {
    sanitized.objective = sanitized.objective
      .replace(/<[^>]*>/g, "")
      .replace(/[<>]/g, "")
      .slice(0, 500); // Limitar longitud por seguridad
  }

  if (sanitized.businessType) {
    sanitized.businessType = sanitized.businessType
      .replace(/<[^>]*>/g, "")
      .replace(/[<>]/g, "")
      .slice(0, 80);
  }

  // Email siempre en minúsculas
  if (sanitized.email) {
    sanitized.email = sanitized.email.toLowerCase().trim();
  }

  // WhatsApp solo números
  if (sanitized.whatsapp) {
    sanitized.whatsapp = sanitized.whatsapp.replace(/\D/g, "");
  }

  return sanitized;
};

// Export default con todo el conjunto
export default {
  schema: quoteSchema,
  validate: validateQuote,
  validatePartial,
  validateFull,
  sanitize: sanitizeData,
  fieldHelpText,
  businessRules,
  examples: validExamples,
};
