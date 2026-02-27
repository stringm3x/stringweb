export const generateEmailTemplate = (data) => {
  const projectTypeLabels = {
    basica: "Básica",
    intermedia: "Intermedia",
    avanzada: "Avanzada",
  };

  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb;">
        
        <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Nueva Cotización Recibida</h1>
            <p style="color: #bfdbfe; margin: 8px 0 0 0; font-size: 16px;">Proyecto Web Personalizado</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 32px;">
            
            <!-- Client Info -->
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 16px 0; font-weight: 600;">Información del Cliente</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; width: 100px;">Nombre:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${
                    data.name
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Email:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    <a href="mailto:${
                      data.email
                    }" style="color: #3b82f6; text-decoration: none;">${
    data.email
  }</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">WhatsApp:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    <a href="https://wa.me/${
                      data.whatsapp
                    }" style="color: #25D366; text-decoration: none;">+${
    data.whatsapp
  }</a>
                  </td>
                </tr>
              </table>
            </div>
            
            <!-- Project Details -->
            <div style="margin-bottom: 24px;">
              <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 16px 0; font-weight: 600;">Detalles del Proyecto</h2>
              
              <div style="display: grid; gap: 16px;">
                
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
                  <div style="color: #64748b; font-size: 14px; margin-bottom: 4px;">Tipo de Proyecto</div>
                  <div style="color: #1e293b; font-size: 16px; font-weight: 600;">${
                    projectTypeLabels[data.projectType]
                  }</div>
                </div>
                
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
                  <div style="color: #64748b; font-size: 14px; margin-bottom: 4px;">Objetivo del Sitio</div>
                  <div style="color: #1e293b; font-size: 16px;">${
                    data.objective
                  }</div>
                </div>
                
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
                  <div style="color: #64748b; font-size: 14px; margin-bottom: 4px;">Fecha Ideal de Entrega</div>
                  <div style="color: #1e293b; font-size: 16px; font-weight: 500;">${new Date(
                    data.idealDate
                  ).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</div>
                </div>
                
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
                  <div style="color: #64748b; font-size: 14px; margin-bottom: 4px;">Presupuesto Estimado</div>
                  <div style="color: #1e293b; font-size: 24px; font-weight: 700;">$${
                    data.budget
                  } USD</div>
                </div>
                
              </div>
            </div>
            
            <!-- Action Button -->
            <div style="text-align: center; margin-top: 32px;">
              <a href="https://wa.me/${data.whatsapp}?text=${encodeURIComponent(
    `Hola ${data.name}! Recibí tu cotización para un proyecto ${
      projectTypeLabels[data.projectType]
    }. Me encantaría agendar una llamada para entender mejor tus necesidades.`
  )}" 
                 style="display: inline-block; background-color: #25D366; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 500; font-size: 16px;">
                Contactar por WhatsApp
              </a>
            </div>
            
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f1f5f9; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; margin: 0; font-size: 14px;">
              Este es un mensaje automático de tu sistema de cotizaciones.<br>
              <a href="https://tusitio.com" style="color: #3b82f6; text-decoration: none;">tusitio.com</a>
            </p>
          </div>
          
        </div>
        
      </body>
      </html>
    `;
};
