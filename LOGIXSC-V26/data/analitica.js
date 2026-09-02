/*
 * Datos de Analítica por empresa.
 * NOTA: valores de referencia/ilustrativos a la espera de la carga del Excel de
 * Analítica oficial. Reemplazar los campos "valor" y "detalle" sin tocar el diseño.
 */
window.LOGIXSC_DATA = window.LOGIXSC_DATA || {};

window.LOGIXSC_DATA.analitica = {
  empresas: [
    {
      id: "san-fernando",
      nombre: "San Fernando",
      resumen: "Analítica de la operación logística de San Fernando: transporte de aves vivas, alimento balanceado y distribución.",
      indicadores: [
        { etiqueta: "Nivel de servicio", valor: "97.4%", detalle: "Entregas a tiempo y completas" },
        { etiqueta: "Costo logístico / venta", valor: "6.8%", detalle: "Ratio de eficiencia logística" },
        { etiqueta: "Ocupación de flota", valor: "89%", detalle: "Uso promedio de capacidad de transporte" },
        { etiqueta: "Rutas monitoreadas GPS", valor: "100%", detalle: "Trazabilidad en tiempo real" }
      ],
      soluciones: [
        "Tableros Power BI de nivel de servicio y OTIF",
        "Modelo de planificación de rutas y flota",
        "Seguimiento GPS y geocercas de unidades"
      ]
    },
    {
      id: "chimu",
      nombre: "Chimú",
      resumen: "Analítica de la operación logística de Chimú: ganado vivo, macroinsumos y almacenamiento central.",
      indicadores: [
        { etiqueta: "Nivel de servicio", valor: "96.1%", detalle: "Entregas a tiempo y completas" },
        { etiqueta: "Costo logístico / venta", valor: "7.2%", detalle: "Ratio de eficiencia logística" },
        { etiqueta: "Rotación de almacén", valor: "12.5x", detalle: "Rotación anual de inventario" },
        { etiqueta: "Rutas monitoreadas GPS", valor: "98%", detalle: "Trazabilidad en tiempo real" }
      ],
      soluciones: [
        "Tableros Power BI de costo logístico y flota",
        "Modelo predictivo de demanda de transporte",
        "Panel de macroinsumos y capacidad portuaria"
      ]
    }
  ],
  businessIntelligence: {
    titulo: "Business Intelligence & Power BI",
    descripcion: "La Gerencia de Logística centraliza su información operativa en tableros Power BI conectados a las fuentes de gestión de transporte, almacenamiento y flota, habilitando decisiones basadas en datos en tiempo real.",
    capacidades: [
      "Tableros interactivos por negocio y por empresa",
      "Modelos de datos gobernados y trazables",
      "Alertas e indicadores en tiempo real",
      "Autoservicio analítico para las jefaturas"
    ]
  }
};
