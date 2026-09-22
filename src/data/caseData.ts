import { CaseDocument, ActionItem, RiskItem, AssetItem, CaseMilestone, StrategicScenario } from '../types';
import { MASTER_PROPERTIES_REGISTRY, PROPERTY_CLUSTERS_METRICS } from './propertiesData';

export const CASE_METADATA = {
  clientName: "Liliana Amparo Gómez Pradilla",
  clientId: "C.C. 32.606.203 de Barranquilla",
  clientRole: "Hija Legítima y Única Heredera Universal Forzosa",
  decedentName: "Cecilia Pradilla de Gómez (Q.E.P.D.)",
  decedentId: "C.C. 27.934.608 de Bucaramanga",
  decedentAge: "88 años al momento de los actos (Nacimiento: 15-Abr-1937)",
  decedentSpouse: "Eduardo Gómez Rueda (Q.E.P.D., Fallecido 27-May-2000)",
  leadCounsel: "Dra. Luz Karime Beetar de Devis",
  counselTitle: "Abogada Especialista en Derecho de Familia",
  counselRegistration: "T.P. No. 89.412 del C.S. de la J.",
  counselEmail: "lkbeetar@devisbeetar.com",
  counselPhone: "+57 (315) 7547997",
  counselLocation: "Barranquilla D.E.I.P. – Colombia",
  firmBadge: "DEVIS & BEETAR ASOCIADOS - DESDE 1962",
  caseCode: "SUC-LGP-2026-NUL",
  reportDate: "22 de Septiembre de 2026",
  lastUpdate: "Matriz Notarial y Registral SNR de 26 Inmuebles + E.P. 1.477, 2.411 y 2.412",
  caseStatusSummary: "Estrategia Procesal Integral: Rastreo Patrimonial SNR (26 Inmuebles), Impugnación de Testamento, Nulidad de Fideicomiso Civil y Medidas Cautelares",
  overallProgress: 52,
  totalEstimatedAssetsCOP: 16480000000, // $16.480 Millones COP (26 Bienes Inmuebles + Cuotas Sociales Montacargas Gómez Ltda.)
  atRiskAssetsCOP: 16480000000,         // Masa sujeta a controversia, simulación y recuperación
  primaryCompany: "Montacargas Gómez Limitada (NIT 890.105.966-0)",
  primaryCompanyShare: "Liliana Gómez posee el 50% directo + el 50% herencial que se le pretende despojar"
};

export const CASE_DOCUMENTS: CaseDocument[] = [
  {
    id: "DOC-ANA-000",
    code: "DICT-ANA-00",
    title: "Análisis Jurídico Integral de las Tres Escrituras Públicas Notaría Séptima de Barranquilla",
    category: "gerencial",
    type: "analisis_juridico",
    date: "Enero de 2026",
    radicado: "INF-PER-2026-ESC3",
    authority: "Equipo Jurídico Consultor - Dra. Luz Karime Beetar de Devis",
    notaryOrEntity: "Despacho Jurídico Especializado",
    folioCount: 12,
    integrityHash: "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890",
    summary: "Dictamen técnico-jurídico pormenorizado (Páginas 1 a 12) sobre la cronología, vicios de nulidad absoluta y relativa, atipicidad de causales de desheredamiento y plan de pruebas en las E.P. 1.477, 2.411 y 2.412.",
    legalImpact: {
      familia: "Estructura la demanda ordinaria de impugnación de testamento, reforma y nulidad del fideicomiso civil civil acumulada a la apertura de sucesión intestada.",
      penal: "Identifica la flagrancia del Fraude Procesal y la instrumentalización de un adulto mayor de 88 años en estado de vulnerabilidad.",
      societario: "Desvirtúa que las controversias societarias en Montacargas Gómez Ltda. constituyan 'injuria grave' para desheredar."
    },
    keyEvidence: [
      "Cronograma de otorgamiento: DVA en agosto 2025, Fideicomiso y Testamento concentrados el 24 de diciembre de 2025 en víspera navideña",
      "Identificación de albaceas con tenencia de bienes (Daniel Conde y Ángel Conde) como riesgo inminente de ocupación patrimonial",
      "Plan probatorio de 13 puntos: bitácora de edificio, actas biométricas sin huella, correos a las 5:33 AM y peritaje neuropsicológico retrospectivo"
    ],
    strategicValue: "La hoja de ruta maestra del proceso que articula la ofensiva en los tres frentes.",
    signedBy: "Dra. Luz Karime Beetar de Devis",
    status: "bajo_analisis",
    downloadFileName: "Analisis_Juridico_Tres_Escrituras_Notaria_Septima.pdf",
    partiesInvolved: ["Cecilia Pradilla de Gómez", "Liliana Amparo Gómez Pradilla", "Ramón Pradilla", "Manuel Pradilla", "Francisco Franco", "Daniel Conde"],
    fullText: `ANÁLISIS DE LAS TRES ESCRITURAS PÚBLICAS OTORGADAS POR LA SEÑORA CECILIA PRADILLA DE GÓMEZ (Q.E.P.D.) EN LA NOTARÍA SÉPTIMA DEL CÍRCULO DE BARRANQUILLA
CLIENTE: LILIANA AMPARO GÓMEZ PRADILLA (HIJA Y ÚNICA HEREDERA FORZOSA)
DIRECCIÓN JURÍDICA: DRA. LUZ KARIME BEETAR DE DEVIS

I. CRONOLOGÍA Y OBJETO DE LOS ACTOS:
1. Escritura Pública No. 1.477 (27 de agosto de 2025 - Notaría Séptima):
   Directiva Anticipada (DVA) y Cuidados Paliativos.
   Personas de apoyo designadas: Ramón Alberto Pradilla Ordóñez, Manuel Pradilla Ordóñez y Francisco Franco Rueda.
   Exclusión deliberada de su única hija Liliana Gómez en un contexto de coacción y conflicto societario.

2. Escritura Pública No. 2.411 (24 de diciembre de 2025 - Notaría Séptima):
   Fideicomiso Civil. Afecta y descapitaliza:
   - Apartamento 602 y Garajes 22 y 23 de El Encanto Altos de Riomar (Barranquilla).
   - Oficina 408 y Garajes 25, 26 y 74 en Chambacú (Cartagena).
   Beneficiarios Fideicomisarios: Los mismos sobrinos (Ramón Pradilla, Manuel Pradilla y Francisco Franco).

3. Escritura Pública No. 2.412 (24 de diciembre de 2025 - Notaría Séptima):
   Testamento Abierto y Desheredamiento Ilegal de Liliana Gómez Pradilla.
   - Pretendida causal: Art. 1266 C.C. causal 1ª (injuria grave por promover auditoría en Montacargas Gómez Ltda. y diferencias en asamblea).
   - Asignación particular: Apartamento 16 y Garajes G-31, G-32 y G-33 en Edificio Girasol a favor de Ángel Conde Gómez, David Manuel Safi Gómez y Daniel Conde Gómez.
   - Asignación universal del remanente y 50% de cuotas de Montacargas Gómez Ltda. a los mismos terceros.
   - Albaceas con tenencia de bienes: Daniel Conde Gómez (Principal) y Ángel Eduardo Conde Gómez (Secundario).

II. VICIOS RADICALES DE NULIDAD:
- Atipicidad de la causal de desheredamiento: Discrepancias de gestión empresarial no constituyen injuria grave contra la persona, honor o bienes de la testadora.
- Fraude a la legítima rigorosa: Liliana Gómez es hija única y legitimaria de primer orden (Art. 1242 C.C. Ley 1934 de 2018).
- Otorgamiento express en jornada navideña en el domicilio de una persona de 88 años con imposibilidad biométrica de huellas y testifical prefabricada.`
  },
  {
    id: "DOC-TAB-PROP-01",
    code: "CUADRO-PROP-LKBD",
    title: "Cuadro Maestro y Dictamen Registral de Propiedades Inmobiliarias y Matrículas SNR (14 Págs.)",
    category: "gerencial",
    type: "analisis_juridico",
    date: "Julio de 2024 / Actualizado 2026",
    radicado: "LKBD-PROP-INV-2026",
    authority: "Despacho Jurídico Dra. Luz Karime Beetar de Devis - Barranquilla D.E.I.P.",
    notaryOrEntity: "Dra. Luz Karime Beetar de Devis (Abogada, lkbeetar@devisbeetar.com)",
    folioCount: 14,
    integrityHash: "7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c",
    summary: "Relación notarial y registral completa de 26 bienes inmuebles con folios de matrícula de Barranquilla, Tubará y Cartagena, determinando referencias catastrales, medidas, linderos, titulares actuales, gravámenes y escrituras matrices de adquisición.",
    legalImpact: {
      familia: "Establece el mapa integral de la masa hereditaria y determina cuáles bienes permanecen a nombre de Cecilia Pradilla y cuáles fueron desviados a la sociedad Montajes Inversiones y Asesorías S.A.S. o a los sobrinos Manuel Pradilla y Francisco Franco.",
      penal: "Aporta la prueba del desvío sistemático de activos societarios de Montacargas Gómez Ltda. transferidos en 2013 a Manuel Pradilla Ordóñez y de compras a nombre de la sociedad interpuesta.",
      societario: "Identifica transferencias directas desde la sociedad familiar como el Apto 601 y garajes de El Encanto a favor del sobrino Manuel Pradilla por $351 Millones en E.P. 177 de 2013."
    },
    keyEvidence: [
      "26 Bienes Inmuebles identificados con folios de matrícula inmobiliaria SNR activos",
      "Identificación de 4 clústeres: 10 bienes directos de la causante, 7 bienes en Montajes Inversiones y Asesorías S.A.S., 8 bienes en poder de sobrinos (Manuel Pradilla y Francisco Franco) y 1 bien descartado ('Gardenias, no es nuestro')",
      "Rastreo del Megalote de 35.425 m² en Tubará (El Morro) a nombre de Francisco Franco Rueda (E.P. 1094 de 2015)",
      "Adquisición del Condominio 55 Cien Apto 802 y Garaje 72 por $970.000.000 COP a nombre de la S.A.S."
    ],
    strategicValue: "La radiografía forense inmobiliaria más completa del caso, base para solicitar las medidas cautelares de embargo, secuestro e inscripción de demanda.",
    signedBy: "Dra. Luz Karime Beetar de Devis (Abogada)",
    status: "bajo_analisis",
    downloadFileName: "Cuadro_Maestro_Propiedades_Inmobiliarias_SNR.pdf",
    partiesInvolved: ["Cecilia Pradilla de Gómez", "Montajes Inversiones y Asesorías S.A.S.", "Manuel Pradilla Ordóñez", "Francisco Franco Rueda", "Liliana Amparo Gómez Pradilla"],
    fullText: `DESPACHO JURÍDICO LUZ KARIME BEETAR DE DEVIS - ABOGADA
EMAIL: lkbeetar@devisbeetar.com | TEL: +57 (315) 7547997
BARRANQUILLA D.E.I.P. - COLOMBIA | TRADICIÓN DEVIS & BEETAR DESDE 1962

CUADRO MAESTRO DE MATRÍCULAS INMOBILIARIAS, REFERENCIAS CATASTRALES Y TITULARIDAD REGISTRAL
========================================================================================

RESUMEN EJECUTIVO DEL RASTREO FORENSE:
Total Folios de Matrícula SNR Analizados: 26 Inmuebles
Valor Total Patrimonial en Litigio / Investigación: $16.480.000.000 COP

1. MATRÍCULA 040-46420 (Casa KR 52 # 46-48):
   - Ref. Catastral: 080010101000000290003000000000
   - Tipo de Bien: Casa urbana con solar
   - Ubicación: Carrera 52 No. 46 - 48, Barranquilla
   - Titular Actual: Montajes Inversiones y Asesorías S.A.S.
   - Gravamen o Afectación: Sin gravámenes ni afectaciones vigentes (hipotecas y embargos cancelados)
   - Título: E.P. 3625 del 28-oct-2014 Notaría 9ª Barranquilla por compraventa ($82.943.000 COP)

2. MATRÍCULA 040-104047 (Girasol Apto 16 Penthouse):
   - Ref. Catastral: 080010103000001370903900000062
   - Tipo de Bien: Apartamento residencial P.H. Edificio Girasol
   - Ubicación: Calle 80 No. 51B piso 16 apartamento 16, Barranquilla
   - Área: 396.00 m² (351 m² apto + 45 m² tres garajes)
   - Titular Actual: Cecilia Pradilla de Gómez (100%)
   - Gravamen o Afectación: Sin gravámenes ni medidas cautelares vigentes
   - Título: E.P. 1912 del 13-oct-2000 Notaría 3ª Barranquilla (adjudicación en sucesión Eduardo Gómez Rueda)

3. MATRÍCULA 040-104048 (Girasol Garaje G-31):
   - Ref. Catastral: 080010103000001370903900000103
   - Ubicación: Calle 80 No. 51B garaje G-31 piso 2. Área: 15.00 m²
   - Titular: Cecilia Pradilla de Gómez. Título: E.P. 1912 del 13-oct-2000 Notaría 3ª

4. MATRÍCULA 040-104049 (Girasol Garaje G-32):
   - Ref. Catastral: 080010103000001370903900000104
   - Ubicación: Calle 80 No. 51B garaje G-32 piso 2. Área: 15.00 m²
   - Titular: Cecilia Pradilla de Gómez. Título: E.P. 1912 del 13-oct-2000 Notaría 3ª

5. MATRÍCULA 040-104050 (Girasol Garaje G-33):
   - Ref. Catastral: 080010103000001370903900000105
   - Ubicación: Calle 80 No. 51B garaje G-33 piso 2. Área: 15.00 m²
   - Titular: Cecilia Pradilla de Gómez. Título: E.P. 1912 del 13-oct-2000 Notaría 3ª

6. MATRÍCULA 040-350748 (Bodega Barrio Abajo):
   - Ref. Catastral: 080010101000000290002000000000
   - Tipo de Bien: Bodega o predio urbano (englobar)
   - Ubicación: Sector Barrio Abajo, Barranquilla. Área: 492.90 m²
   - Titular Actual: Montajes Inversiones y Asesorías S.A.S.
   - Título: E.P. 1516 del 21-jul-2014 Notaría 9ª Barranquilla ($331.945.000 COP)

7. MATRÍCULA 040-300705 (El Encanto Apto 601 Bloque 4):
   - Ref. Catastral: 080010103000004390906900000337
   - Ubicación: Carrera 53 No. 90B-42 Apto 601 Bloque 4, Barranquilla. Área: 218.96 m² (2.50%)
   - Titular Actual: Manuel Pradilla Ordóñez
   - Título: E.P. 177 del 1-feb-2013 Notaría 9ª Barranquilla por compraventa de Montacargas Gómez Ltda. ($351.083.000 COP)

8. MATRÍCULA 040-300612 (El Encanto Garaje 22):
   - Ubicación: Carrera 53 No. 90B-42 garaje 22 sótanos 1 y 2. Área: 12.50 m²
   - Titular Actual: Cecilia Pradilla de Gómez (Afectado a Fideicomiso E.P. 2.411)
   - Título: E.P. 176 del 1-feb-2013 Notaría 9ª Barranquilla

9. MATRÍCULA 040-300613 (El Encanto Garaje 23):
   - Ubicación: Carrera 53 No. 90B-42 garaje 23 sótanos 1 y 2. Área: 11.50 m²
   - Titular Actual: Cecilia Pradilla de Gómez (Afectado a Fideicomiso E.P. 2.411)
   - Título: E.P. 176 del 1-feb-2013 Notaría 9ª Barranquilla

10. MATRÍCULA 040-300655 (El Encanto Garaje 65 D):
    - Ubicación: Carrera 53 No. 90B-42 garaje 65 sótanos 3 y 4. Área: 11.50 m²
    - Titular Actual: Manuel Pradilla Ordóñez. Título: E.P. 177 del 1-feb-2013 Notaría 9ª

11. MATRÍCULA 040-300656 (El Encanto Garaje 66):
    - Ubicación: Carrera 53 No. 90B-42 garaje 66 sótanos 3 y 4. Área: 11.50 m²
    - Titular Actual: Manuel Pradilla Ordóñez. Título: E.P. 177 del 1-feb-2013 Notaría 9ª

12. MATRÍCULA 040-300697 (El Encanto Apto 602 Bloque 1):
    - Ref. Catastral: 080010103000004390906900000299
    - Ubicación: Carrera 53 No. 90B-42 apartamento 602 Bloque 1, Barranquilla. Área: 218.96 m² (2.52%)
    - Titular Actual: Cecilia Pradilla de Gómez (Afectado en Fideicomiso Civil E.P. 2.411)
    - Título: E.P. 176 del 1-feb-2013 Notaría 9ª Barranquilla ($349.644.000 COP)

13. MATRÍCULA 040-300707 (El Encanto Depósito 4 Bloque 4):
    - Ubicación: Carrera 53 No. 90B-42 depósito 4 Bloque 4. Área: 3.20 m²
    - Titular Actual: Manuel Pradilla Ordóñez. Título: E.P. 177 del 1-feb-2013 Notaría 9ª

14. MATRÍCULA 040-412511 (Lote rural A-4 Tubará):
    - Ubicación: Vereda Tubará (El Morro). Área: 800.00 m²
    - Titular: Francisco Franco Rueda. Título: E.P. 1094 de 2015 Notaría 9ª Barranquilla

15. MATRÍCULA 040-490068 (Lote rural A-6 Tubará):
    - Ubicación: Corregimiento El Morro, Tubará. Área: 3 hectáreas + 4.625.01 m²
    - Titular: Francisco Franco Rueda. Título: E.P. 1094 de 2015 Notaría 9ª Barranquilla

16. MATRÍCULA 040-530814 (Megalote Tubará Englobado):
    - Ubicación: Corregimiento El Morro, autopista Barranquilla-Cartagena. Área: 35.425.01 m² (3.54 Ha)
    - Titular Actual: Francisco Franco Rueda
    - Título: E.P. 1094 del 29-may-2015 Notaría 9ª Barranquilla por engloble de 040-412511 y 040-490068

17. MATRÍCULA 040-512507 (Smart Office Center Oficina 1507):
    - Ref. Catastral: 080010103000001380906900000681
    - Ubicación: Carrera 51B No. 80-58 oficina 1507, Barranquilla. Área: 95.54 m²
    - Titular: Montajes Inversiones y Asesorías S.A.S.
    - Título: E.P. 1955 del 6-jul-2016 Notaría 5ª Barranquilla ($200.000.000 COP)

18. MATRÍCULA 040-512171 (Smart Office Center Garaje 141):
    - Ubicación: Carrera 51B No. 80-58 garaje 141. Área: 12.50 m²
    - Titular: Montajes Inversiones y Asesorías S.A.S. Título: E.P. 1955 de 2016

19. MATRÍCULA 040-512172 (Smart Office Center Garaje 142):
    - Ubicación: Carrera 51B No. 80-58 garaje 142. Área: 12.50 m²
    - Titular: Montajes Inversiones y Asesorías S.A.S. Título: E.P. 1955 de 2016

20. MATRÍCULA 040-259592 (Edificio Casa Madeira Apto 501):
    - Ref. Catastral: 080010103000005600903900000099
    - Ubicación: Carrera 55 Nos. 96 y 97 apartamento 501, Barranquilla. Área: 162.00 m² (7.15%) + parqueadero 8
    - Titular Actual: Manuel Pradilla Ordóñez
    - Título: E.P. 1974 del 8-sep-2007 Notaría 3ª Barranquilla ($135.000.000 COP)

21. MATRÍCULA 040-513302 (Condominio 55 Cien Apto 802 C):
    - Ref. Catastral: 080010103000010730901900000137
    - Ubicación: Carrera 55 No. 105-23 Apto 802, Barranquilla. Área: 245.71 m² (1.8763%)
    - Titular Actual: Montajes Inversiones y Asesorías S.A.S.
    - Título: E.P. 2446 del 16-oct-2015 Notaría 1ª Barranquilla ($970.000.000 COP)

22. MATRÍCULA 040-513189 (Condominio 55 Cien Garaje 72):
    - Ubicación: Carrera 55 No. 105-23 garaje 72. Área: 11.02 m² (0.0898%)
    - Titular: Montajes Inversiones y Asesorías S.A.S. Título: E.P. 2446 de 2015

23. MATRÍCULA 040-187479 (Lote Urbano con casa Carrera 2D # 45C2-20 - 'Lote Raro'):
    - Ref. Catastral: 080010107000004440015000000000
    - Ubicación: Carrera 2D No. 45C2-20, Barranquilla
    - Titular: Luz Estela Angarita Rincón. Título: E.P. 761 del 6-may-2020 Notaría 9ª ($50.000.000 COP)

24. MATRÍCULA 040-21838 (Centro Comercial Arfel / El Prado):
    - Ubicación: Calle 76 Nos. 57-44 y 57-20 / Cra 57 y 58, Barranquilla
    - Participación de Cecilia Pradilla de Gómez sobre Local 15 por E.P. 663 del 18-abr-1977 Notaría 3ª

25. MATRÍCULA 060-187255 (Chambacú Garaje 25, Cartagena):
    - Ubicación: Cra 13B No. 26-78 garaje 25, Cartagena. Área: 11.83 m²
    - Titular: Branium S.A.S. (afectado en Fideicomiso Civil E.P. 2.411 por Cecilia Pradilla)

26. MATRÍCULA 060-187256 (Chambacú Garaje 26, Cartagena):
    - Ubicación: Cra 13B No. 26-78 garaje 26, Cartagena. Área: 12.01 m²
    - Titular: Branium S.A.S. (afectado en Fideicomiso Civil E.P. 2.411 por Cecilia Pradilla)

27. MATRÍCULA 040-523190 (Urbanización Las Gardenias Apto 504 - 'Gardenias, no es nuestro'):
    - Titular: Jaider José Barranco Ramírez (Vivienda gratuita Fonvivienda)
    - Conclusión técnica de la Dra. Luz Karime: DESCARTADO FORMALMENTE por no pertenecer al patrimonio familiar.
`
  },
  {
    id: "DOC-ESC-2412",
    code: "EP-2412-TEST",
    title: "Escritura Pública No. 2.412: Testamento Abierto y Desheredamiento Forzado",
    category: "civil_familia",
    type: "testamento",
    date: "24 de Diciembre de 2025",
    radicado: "EP-2.412-NOT7-BAQ",
    authority: "Notaría Séptima del Círculo de Barranquilla",
    notaryOrEntity: "Dr. Rafael María Gutiérrez Rodríguez (Notario 7º)",
    folioCount: 22,
    integrityHash: "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    summary: "Instrumento solemne mediante el cual se revoca la herencia legítima y se deshereda con sustento apócrifo a la hija única Liliana Amparo Gómez Pradilla, instituyendo como herederos universales y albaceas a terceros y sobrinos.",
    legalImpact: {
      familia: "Vulneración frontal de los artículos 1240, 1242 y 1266 del Código Civil. Procede acción judicial ordinaria de Impugnación y Nulidad Absoluta de Testamento acumulada con Reforma.",
      penal: "Estructura el delito de Fraude Procesal (Art. 453 C.P.) al inducir al Notario mediante declaración extrajuicio No. 4912 ideológicamente falsa de Valledupar.",
      societario: "Dispone del 50% de las cuotas sociales de Montacargas Gómez Ltda., intentando despojar a Liliana Gómez de la empresa que su padre y ella construyeron."
    },
    keyEvidence: [
      "Cláusula Quinta: Invoca como 'injuria grave' el haber solicitado auditoría en Montacargas Gómez Ltda. y desacuerdos en acta de asamblea 2025",
      "Cláusula Sexta: Adjudica el Apartamento 16 Edificio Girasol (396 m2) y garajes G-31, G-32 y G-33 a Daniel Conde, Ángel Conde y David Safi",
      "Cláusula Décima: Nombra como albacea con tenencia de bienes a Daniel Conde Gómez, facultándolo para ocupar los bienes",
      "Testigos sospechosos: Aldemar Darío Duque Salazar, Mario de Jesús Blandón Moncada y José Darío Barraza Burgos (comparecencia a domicilio)"
    ],
    strategicValue: "Documento central de combate: su nulidad restituye a Liliana Gómez el 100% de la masa sucesoral como heredera única.",
    signedBy: "Cecilia Pradilla de Gómez (Testadora), Rafael María Gutiérrez Rodríguez (Notario 7º) y 3 Testigos",
    status: "impugnado",
    downloadFileName: "Escritura_Publica_2412_Testamento_Desheredamiento.pdf",
    partiesInvolved: ["Cecilia Pradilla de Gómez", "Liliana Gómez Pradilla", "Daniel Conde Gómez", "Ángel Eduardo Conde Gómez", "David Manuel Safi Gómez"],
    caducidadOrPrescripcion: "4 años desde el fallecimiento o conocimiento del testamento (Art. 1274 C.C.)",
    fullText: `REPÚBLICA DE COLOMBIA - NOTARÍA SÉPTIMA DEL CÍRCULO DE BARRANQUILLA
ESCRITURA PÚBLICA NÚMERO DOS MIL CUATROCIENTOS DOCE (2.412)
FECHA: 24 DE DICIEMBRE DE 2025

CLASE DE ACTO: OTORGAMIENTO TESTAMENTO ABIERTO
TESTADORA: CECILIA PRADILLA DE GÓMEZ (C.C. 27.934.608 de Bucaramanga)
NOTARIO: RAFAEL MARÍA GUTIÉRREZ RODRÍGUEZ
TESTIGOS TESTAMENTARIOS: ALDEMAR DARÍO DUQUE SALAZAR, MARIO DE JESÚS BLANDÓN MONCADA, JOSÉ DARÍO BARRAZA BURGOS.

CLÁUSULA TERCERA - DESCENDENCIA: Reconozco tener una (01) única hija llamada LILIANA GÓMEZ PRADILLA, inscrita en la Notaría Primera de Barranquilla.

CLÁUSULA QUINTA - DESHEREDAMIENTO (CLÁUSULA REFORZADA):
En tal virtud, DESHEREDO a mi hija LILIANA AMPARO GÓMEZ PRADILLA con fundamento en el artículo 1266 numeral 1 literal a) del Código Civil Colombiano ('injuria grave contra el testador en su persona, honor o bienes').
Hechos que se invocan:
a) Maltrato verbal y trato desobligante e irrespetuoso.
b) Haber instado y promovido una auditoría en mi contra dentro de la empresa MONTACARGAS GÓMEZ LIMITADA, imputándome aparentes malos manejos.
c) Haber incurrido durante el año 2024 en malversación de fondos de la sociedad Montacargas Gómez Ltda.
d) Desacuerdos y alteración del contenido del acta en la Asamblea Ordinaria de 2025.
Soporte probatorio aducido: Declaración extra-juicio No. 4912 rendida ante la Notaría 2ª de Valledupar por el abogado Francisco Omar Mesa Rivas.

CLÁUSULA SEXTA - ASIGNACIONES PARTICULARES Y HERENCIA UNIVERSAL:
- Asignación Particular: Apartamento 16 (396 m2) y garajes G-31, G-32 y G-33 en el Edificio Girasol (Barranquilla) a favor de ÁNGEL EDUARDO CONDE GÓMEZ, DAVID MANUEL SAFI GÓMEZ y DANIEL CONDE GÓMEZ.
- Herencia Universal del Remanente: A los mismos señores Ángel Conde, David Safi y Daniel Conde, incluyendo el 50% de las cuotas sociales de MONTACARGAS GÓMEZ LIMITADA (NIT 890.105.966-0).

CLÁUSULA DÉCIMA - ALBACEAS CON TENENCIA DE BIENES:
Nombro como Albacea Principal con tenencia y administración de bienes a DANIEL CONDE GÓMEZ, y como Albacea Secundario a ÁNGEL EDUARDO CONDE GÓMEZ.`
  },
  {
    id: "DOC-ESC-2411",
    code: "EP-2411-FID",
    title: "Escritura Pública No. 2.411: Constitución de Fideicomiso Civil",
    category: "civil_familia",
    type: "fideicomiso",
    date: "24 de Diciembre de 2025",
    radicado: "EP-2.411-NOT7-BAQ",
    authority: "Notaría Séptima del Círculo de Barranquilla",
    notaryOrEntity: "Dr. Rafael María Gutiérrez Rodríguez (Notario 7º)",
    folioCount: 16,
    integrityHash: "b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7",
    summary: "Constitución de propiedad fiduciaria (Fideicomiso Civil) mediante la cual Cecilia Pradilla traslada la nuda propiedad de apartamentos y oficinas en Barranquilla y Cartagena a favor de tres sobrinos, sustrayéndolos de la masa hereditaria de su hija.",
    legalImpact: {
      familia: "Fraude a la legítima rigorosa. La limitación del dominio vulnera el artículo 1242 del Código Civil (modificado por Ley 1934 de 2018), superando con creces la porción de libre disposición.",
      penal: "Maniobra fraudulenta de vaciamiento patrimonial sistemático ejecutada el mismo 24 de diciembre.",
      societario: "Los inmuebles fideicomitidos servían de garantía para operaciones comerciales de la familia."
    },
    keyEvidence: [
      "Bienes Afectados: Apartamento 602 y Garajes 22 y 23 en Conjunto Multifamiliar 'El Encanto Altos de Riomar' (Barranquilla) - Matrículas 040-300697, 040-300612, 040-300613",
      "Bienes Afectados: Oficina 408 y Garajes 25, 26 y 74 en Edificio 19 Proyecto Integrado Chambacú P.H. (Cartagena) - Matrículas 060-187479, 060-187255, 060-187256, 060-187304",
      "Beneficiarios Fideicomisarios: Ramón Alberto Pradilla Ordóñez, Manuel Pradilla Ordóñez y Francisco Franco Rueda",
      "Cláusula Tercera literal b: Orden expresa a los beneficiarios de informar al juez de sucesión para excluir los bienes de la partición"
    ],
    strategicValue: "Objeto de acción de nulidad absoluta y simulación para reintegrar los inmuebles de Barranquilla y Cartagena a la masa partible de Liliana Gómez.",
    signedBy: "Cecilia Pradilla de Gómez (Fideicomitente) y Rafael María Gutiérrez Rodríguez (Notario 7º)",
    status: "impugnado",
    downloadFileName: "Escritura_Publica_2411_Fideicomiso_Civil.pdf",
    partiesInvolved: ["Cecilia Pradilla de Gómez", "Ramón Alberto Pradilla Ordóñez", "Manuel Pradilla Ordóñez", "Francisco Franco Rueda"],
    caducidadOrPrescripcion: "Prescripción de nulidad relativa: 4 años contados desde el otorgamiento",
    fullText: `REPÚBLICA DE COLOMBIA - NOTARÍA SÉPTIMA DEL CÍRCULO DE BARRANQUILLA
ESCRITURA PÚBLICA NÚMERO DOS MIL CUATROCIENTOS ONCE (2.411)
FECHA: 24 DE DICIEMBRE DE 2025

CLASE DE ACTO: FIDEICOMISO CIVIL
FIDEICOMITENTE: CECILIA PRADILLA DE GÓMEZ (C.C. 27.934.608)
BENEFICIARIOS FIDEICOMISARIOS: RAMÓN ALBERTO PRADILLA ORDÓÑEZ, MANUEL PRADILLA ORDÓÑEZ y FRANCISCO FRANCO RUEDA.

CLÁUSULA PRIMERA - BIENES INVOLUCRADOS:
A) Apartamento 602 Bloque 1 (Área 218.96 m2) y garajes 22 y 23 del CONJUNTO MULTIFAMILIAR 'EL ENCANTO ALTOS DE RIOMAR' (Barranquilla) - Matrículas 040-300697, 040-300612, 040-300613.
B) Oficina 408 y Garajes 25, 26 y 74 del Edificio 19 Proyecto Integrado Chambacú P.H. (Cartagena de Indias) - Matrículas 060-187479, 060-187255, 060-187256, 060-187304.

CLÁUSULA TERCERA - CONDICIÓN RESOLUTORIA:
A la muerte de la Fideicomitente, la propiedad fiduciaria se trasladará a los Beneficiarios Fideicomisarios en vida de éstos, reservándose en vida la causante la tenencia, administración y usufructo.
Literal b: A la muerte de la causante, los beneficiarios informarán al juez o funcionario que adelante la sucesión para excluir estos bienes de la misma.`
  },
  {
    id: "DOC-ESC-1477",
    code: "EP-1477-DVA",
    title: "Escritura Pública No. 1.477: Directiva Anticipada (DVA) y Cuidados Paliativos",
    category: "civil_familia",
    type: "directiva_anticipada",
    date: "27 de Agosto de 2025",
    radicado: "EP-1.477-NOT7-BAQ",
    authority: "Notaría Séptima del Círculo de Barranquilla",
    notaryOrEntity: "Martha Cecilia Gutiérrez Abello (Notaria Encargada)",
    folioCount: 24,
    integrityHash: "f1e2d3c4b5a6978879abcdef0123456789abcdef0123456789abcdef01234567",
    summary: "Acto en el cual la causante, de 88 años, en pleno conflicto societario, designa como encargados de su cuidado personal y decisiones médicas terminales a Ramón Pradilla, Manuel Pradilla y Francisco Franco, despojando a su hija de toda injerencia.",
    legalImpact: {
      familia: "Primer eslabón de la captación de la voluntad y aislamiento de la anciana por parte de los sobrinos.",
      penal: "Constituye indicio grave de la inducción y coacción psicológica previa sobre persona de 88 años.",
      societario: "Otorgada para justificar la 'pérdida de confianza' que meses después utilizaron como falso fundamento de desheredamiento."
    },
    keyEvidence: [
      "Designación exclusiva de sobrinos como 'personas de apoyo', marginando a la hija conviviente",
      "Acta de autenticación biométrica No. 150777 que declara expresamente: 'Imposibilidad de captura de huellas'",
      "Se fundamentó en un dictamen previo de Jade Salud IPS donde la anciana expresa serias confusiones sobre su familia"
    ],
    strategicValue: "Prueba reina del aislamiento progresivo y manipulación de la testadora.",
    signedBy: "Cecilia Pradilla de Gómez y Martha Cecilia Gutiérrez Abello (Notaria Encargada)",
    status: "impugnado",
    downloadFileName: "Escritura_Publica_1477_Directivas_Anticipadas.pdf",
    partiesInvolved: ["Cecilia Pradilla de Gómez", "Ramón Alberto Pradilla Ordóñez", "Manuel Pradilla Ordóñez", "Francisco Franco Rueda"],
    fullText: `REPÚBLICA DE COLOMBIA - NOTARÍA SÉPTIMA DEL CÍRCULO DE BARRANQUILLA
ESCRITURA PÚBLICA NÚMERO MIL CUATROCIENTOS SETENTA Y SIETE (1.477)
FECHA: 27 DE AGOSTO DE 2025

CLASE DE ACTO: DIRECTIVA ANTICIPADA (DVA) Y CUIDADOS PALIATIVOS
TITULAR: CECILIA PRADILLA DE GÓMEZ (C.C. 27.934.608 de Bucaramanga)
NOTARIA ENCARGADA: MARTHA CECILIA GUTIÉRREZ ABELLO

PERSONAS DE APOYO DESIGNADAS:
1. RAMÓN ALBERTO PRADILLA ORDÓÑEZ (C.C. 91.256.652 de Bucaramanga)
2. MANUEL PRADILLA ORDÓÑEZ (C.C. 13.835.534 de Bucaramanga)
3. FRANCISCO FRANCO RUEDA (C.C. 91.106.268 de Socorro, Santander)

DISPOSICIONES PRINCIPALES:
- Manifiesta su voluntad de no ser sometida a tratamientos fútiles o prolongación artificial de la vida.
- Delega el cuidado personal, toma de decisiones asistenciales y facultades sobre sus bienes a los señores Ramón Pradilla, Manuel Pradilla y Francisco Franco.
- Exclusión total y expresa de su única hija Liliana Gómez Pradilla.`
  },
  {
    id: "DOC-ESC-1912",
    code: "EP-1912-SUC",
    title: "Escritura Pública No. 1.912: Sucesión y Liquidación del Causante Eduardo Gómez Rueda",
    category: "civil_familia",
    type: "escritura",
    date: "13 de Octubre de 2000",
    radicado: "EP-1.912-NOT3-BAQ",
    authority: "Notaría Tercera del Círculo de Barranquilla",
    notaryOrEntity: "Antonio Luis Guzmán Naranjo (Notario 3º)",
    folioCount: 26,
    integrityHash: "9876543210fedcba0123456789abcdef9876543210fedcba0123456789abcdef",
    summary: "Partición y liquidación notarial por el fallecimiento del padre Eduardo Gómez Rueda. Reconoce a Liliana Amparo Gómez Pradilla como hija legítima y heredera del 50% de la masa, adjudicándole derechos sobre Montacargas Gómez Ltda. y Edificio Girasol.",
    legalImpact: {
      familia: "Prueba indiscutible de la filiación legítima de Liliana Gómez y su derecho histórico sobre el patrimonio familiar.",
      penal: "Desvirtúa cualquier afirmación de que Liliana Gómez no tiene derechos legítimos consolidados.",
      societario: "Acredita el origen conjunto de las 180.000 cuotas de Montacargas Gómez Ltda."
    },
    keyEvidence: [
      "Hijuela de Liliana Gómez: Se le adjudicaron cuotas en Montacargas Gómez Ltda., Parqueaderos Centro y Ladrillera Barranquilla",
      "Reconocimiento de Cecilia Pradilla de Gómez de la condición de heredera única forzosa de su hija",
      "Acreditación de adquisición del Apartamento 16 Edificio Girasol y los garajes G-31, G-32 y G-33 desde el año 1985"
    ],
    strategicValue: "La prueba histórica fundacional que demuestra el origen y copropiedad familiar de los bienes.",
    signedBy: "Cecilia Pradilla de Gómez, Liliana Amparo Gómez Pradilla y Notario 3º",
    status: "en_custodia",
    downloadFileName: "Escritura_Publica_1912_Sucesion_Eduardo_Gomez.pdf",
    partiesInvolved: ["Eduardo Gómez Rueda (Causante)", "Cecilia Pradilla de Gómez", "Liliana Amparo Gómez Pradilla"],
    fullText: `NOTARÍA TERCERA DEL CÍRCULO DE BARRANQUILLA
ESCRITURA PÚBLICA NÚMERO MIL NOVECIENTOS DOCE (1.912)
FECHA: 13 DE OCTUBRE DE 2000

SUCESIÓN DEL FINADO EDUARDO GÓMEZ RUEDA (Fallecido el 27 de mayo de 2000 en Barranquilla).
COMPARECIENTES:
- CECILIA PRADILLA DE GÓMEZ (Cónyuge sobreviviente)
- LILIANA AMPARO GÓMEZ PRADILLA (Heredera como hija legítima única)

ACERVO HEREDITARIO BRUTO: $585.365.000 COP (Año 2000).
PARTICIÓN:
Se reconoce a la cónyuge sobreviviente Cecilia Pradilla de Gómez el 50% de gananciales y a la hija legítima LILIANA AMPARO GÓMEZ PRADILLA el 50% como herencia líquida, adjudicándole participaciones directas en MONTACARGAS GÓMEZ LIMITADA y derechos sobre los inmuebles familiares.`
  },
  {
    id: "DOC-CCB-8721",
    code: "CERT-CCB-8721",
    title: "Certificado de Cámara de Comercio: Montacargas Gómez Limitada (Matrícula 8.721)",
    category: "societario",
    type: "certificado_mercantil",
    date: "22 de Diciembre de 2025",
    radicado: "CCB-MATR-8721-2025",
    authority: "Cámara de Comercio de Barranquilla",
    notaryOrEntity: "Secretaría de Registro Mercantil CCB",
    folioCount: 5,
    integrityHash: "3344556677889900aabbccddeeff0011223344556677889900aabbccddeeff",
    summary: "Certificado Mercantil oficial expedido el 22 de diciembre de 2025 (48 horas antes del testamento). Acredita que el capital de $180.000.000 se divide exactamente en 50% Liliana Gómez (90.000 cuotas) y 50% Cecilia Pradilla (90.000 cuotas), y que Liliana es la Suplente del Gerente inscrita.",
    legalImpact: {
      familia: "Desmiente que la causante fuera dueña absoluta de la compañía; el 50% de Liliana Gómez es de su propiedad privativa e inalienable.",
      penal: "Evidencia que intentar transferir las cuotas de la empresa a los sobrinos mediante testamento vulnera el régimen societario y estatutario.",
      societario: "Liliana Gómez ostenta la representación legal como Suplente del Gerente ante la vacancia por fallecimiento de la titular."
    },
    keyEvidence: [
      "Composición de Socios: Liliana Amparo Gómez Pradilla (90.000 cuotas - $90.000.000 COP); Cecilia Pradilla de Gómez (90.000 cuotas - $90.000.000 COP)",
      "Órgano de Administración: Gerente Cecilia Pradilla de Gómez; Suplente del Gerente Liliana Gómez Pradilla (Nombrada mediante Escritura 318 de 2001)",
      "Ingresos operacionales reportados en RUES: $2.039.153.952 COP (Empresa altamente productiva y rentable)"
    ],
    strategicValue: "Pilar corporativo para blindar la operación, firmar bancos y evitar la intromisión de los albaceas Daniel y Ángel Conde Gómez.",
    signedBy: "Alan Erick Hernández Aldana (Cámara de Comercio de Barranquilla)",
    status: "aportado",
    downloadFileName: "Certificado_CCB_Montacargas_Gomez_Limitada.pdf",
    partiesInvolved: ["Montacargas Gómez Limitada", "Liliana Amparo Gómez Pradilla", "Cecilia Pradilla de Gómez", "Manuel Pradilla Ordóñez"],
    fullText: `CÁMARA DE COMERCIO DE BARRANQUILLA
CERTIFICADO DE EXISTENCIA Y REPRESENTACIÓN LEGAL
FECHA DE EXPEDICIÓN: 22 DE DICIEMBRE DE 2025 - 06:42:19
SOCIEDAD: MONTACARGAS GÓMEZ LIMITADA | NIT: 890.105.966-0 | MATRÍCULA: 8.721

CAPITAL Y SOCIOS:
Capital social: $180.000.000 dividido en 180.000 cuotas de valor nominal $1.000 cada una.
- GÓMEZ PRADILLA LILIANA AMPARO (C.C. 32.606.203): 90.000 cuotas (50%)
- PRADILLA DE GÓMEZ CECILIA (C.C. 27.934.608): 90.000 cuotas (50%)

REPRESENTACIÓN LEGAL:
- Gerente: CECILIA PRADILLA DE GÓMEZ
- Suplente del Gerente: LILIANA AMPARO GÓMEZ PRADILLA (Inscrita en Cámara de Comercio)
- Subgerente: MANUEL PRADILLA ORDÓÑEZ

TAMAÑO EMPRESARIAL E INGRESOS:
Ingresos por actividad ordinaria reportados: DOS MIL TREINTA Y NUEVE MILLONES CIENTO CINCUENTA Y TRES MIL NOVECIENTOS CINCUENTA Y DOS PESOS ($2.039.153.952 COP).`
  },
  {
    id: "DOC-TRAD-104047",
    code: "ORIP-GIRASOL-AP16",
    title: "Certificado de Tradición y Libertad: Apartamento 16 Edificio Girasol (Matrícula 040-104047)",
    category: "civil_familia",
    type: "certificado_tradicion",
    date: "11 de Septiembre de 2025",
    radicado: "MATR-040-104047-BAQ",
    authority: "Oficina de Registro de Instrumentos Públicos de Barranquilla",
    notaryOrEntity: "Superintendencia de Notariado y Registro - O.R.I.P. Barranquilla",
    folioCount: 4,
    integrityHash: "778899aabbccddeeff00112233445566778899aabbccddeeff00112233445566",
    summary: "Folio real del Penthouse del Edificio Girasol (Calle 80 No. 51-69, Piso 16, 396 m2). Demuestra que fue adquirido mediante la sucesión del padre Eduardo Gómez Rueda (Anotación 7) y que está libre de gravámenes, siendo el bien principal que Daniel y Ángel Conde pretenden ocupar como albaceas.",
    legalImpact: {
      familia: "Bien inmueble de mayor valor sentimental y comercial en Barranquilla ($2.800M COP). Procede medida cautelar urgente de embargo y secuestro.",
      penal: "Riesgo inminente de usurpación u ocupación ilícita por parte de los albaceas testamentarios.",
      societario: "Sede de habitación tradicional de la familia Gómez Pradilla."
    },
    keyEvidence: [
      "Anotación No. 007 (19-10-2000): Adjudicación en sucesión del causante Eduardo Gómez Rueda a favor de Cecilia Pradilla de Gómez",
      "Área privada total: 396 m2 en el décimo sexto piso del Edificio Girasol, Barrio El Prado de Barranquilla",
      "Estado del Folio: Activo - Libre de medidas cautelares al 11-Sept-2025"
    ],
    strategicValue: "Activo insignia a proteger judicialmente mediante orden de no innovar y guarda de sellos.",
    signedBy: "Rafael José Pérez Herazo (Registrador Principal de Instrumentos Públicos)",
    status: "aportado",
    downloadFileName: "Certificado_Tradicion_Edificio_Girasol_Ap16.pdf",
    partiesInvolved: ["Cecilia Pradilla de Gómez", "Eduardo Gómez Rueda", "Liliana Gómez Pradilla"],
    propertyInvolved: "Apartamento 16 Edificio Girasol (Calle 80 No. 51-69, Barranquilla)",
    fullText: `OFICINA DE REGISTRO DE INSTRUMENTOS PÚBLICOS DE BARRANQUILLA
CERTIFICADO DE TRADICIÓN Y LIBERTAD - MATRÍCULA INMOBILIARIA: 040-104047
FECHA: 11 DE SEPTIEMBRE DE 2025

DESCRIPCIÓN DEL BIEN:
APARTAMENTO 16 SITUADO EN EL DÉCIMO SEXTO PISO DEL EDIFICIO GIRASOL
DIRECCIÓN: CALLE 80 No. 51-69, PISO 16 - BARRANQUILLA (ATLÁNTICO)
ÁREA PRIVADA TOTAL: 396.00 M2 (351.00 M2 APARTAMENTO + 45 M2 GARAJES Y DEPÓSITO D-16)

HISTORIAL DE ANOTACIONES:
ANOTACIÓN No. 003 (31-01-1986): Adquisición por Girasol Ltda. a Gómez Eduardo.
ANOTACIÓN No. 007 (19-10-2000): ESCRITURA No. 1.912 DE LA NOTARÍA 3ª DE BARRANQUILLA.
ESPECIFICACIÓN: MODO DE ADQUISICIÓN: ADJUDICACIÓN EN SUCESIÓN DEL FINADO EDUARDO GÓMEZ RUEDA A FAVOR DE CECILIA PRADILLA DE GÓMEZ.
ESTADO ACTUAL: LIBRE DE GRAVÁMENES Y MEDIDAS CAUTELARES.`
  },
  {
    id: "DOC-DEC-4912",
    code: "DEC-4912-VAL",
    title: "Declaración Extraproceso No. 4912 en Notaría 2ª de Valledupar (Abg. Francisco Mesa Rivas)",
    category: "penal",
    type: "declaracion_extrajuicio",
    date: "23 de Diciembre de 2025",
    radicado: "DEC-4912-NOT2-VAL",
    authority: "Notaría Segunda de Valledupar (Cesar)",
    notaryOrEntity: "Dr. Carlos Andrés Calderón Vega (Notario 2º de Valledupar)",
    folioCount: 2,
    integrityHash: "5566778899aabbccddeeff00112233445566778899aabbccddeeff0011223344",
    summary: "Declaración jurada rendida sospechosamente en Valledupar por el abogado Francisco Omar Mesa Rivas tan solo 24 HORAS ANTES del testamento, fabricando los supuestos maltratos verbales y acusaciones societarias para justificar el desheredamiento de Liliana Gómez.",
    legalImpact: {
      familia: "Invalidez probatoria: el testigo es parte interesada y los hechos que aduce son discrepancias societarias ordinarias.",
      penal: "Falsedad en Testimonio (Art. 442 C.P.) y Fraude Procesal (Art. 453 C.P.). Procede denuncia penal inmediata contra el abogado Mesa Rivas.",
      societario: "Confirma que el origen del conflicto es el control mercantil de Montacargas Gómez Ltda. y no un agravio filial personal."
    },
    keyEvidence: [
      "Rendida en Valledupar (a 250 km de Barranquilla) en víspera navideña (23 de diciembre de 2025)",
      "El declarante confiesa haberse negado a firmar el acta de asamblea de Montacargas Gómez Ltda. como presidente, trasladando la disputa corporativa al plano hereditario",
      "Utilizada textualmente como único soporte del numeral Quinto del testamento nulo E.P. 2.412"
    ],
    strategicValue: "La prueba reina de la conspiración jurídica para desheredar a la heredera forzosa.",
    signedBy: "Francisco Omar Mesa Rivas (Abogado, C.C. 19.137.379, T.P. 21.384) y Carlos Andrés Calderón Vega (Notario 2º Valledupar)",
    status: "aportado",
    downloadFileName: "Declaracion_Extrajuicio_4912_Notaria_Valledupar.pdf",
    partiesInvolved: ["Francisco Omar Mesa Rivas", "Liliana Amparo Gómez Pradilla", "Cecilia Pradilla de Gómez", "Montacargas Gómez Ltda."],
    fullText: `NOTARÍA SEGUNDA DE VALLEDUPAR (CESAR)
DECLARACIÓN EXTRAPROCESAL No. 4912
FECHA: MARTES, 23 DE DICIEMBRE DE 2025

DECLARANTE: FRANCISCO ÓMAR MESA RIVAS (C.C. 19.137.379 de Bogotá, T.P. 21.384).
DOMICILIO: Calle 76 No. 48-47 Of. 303, Barranquilla.
FINALIDAD: Declaración testifical con destino a respaldar acusaciones contra Liliana Gómez Pradilla.

MANIFESTACIONES BAJO GRAVEDAD DE JURAMENTO:
1. Conozco a la señora Cecilia Pradilla de Gómez desde hace 4 a 5 años en razón de una denuncia administrativa.
2. Trato dispensado por Liliana Gómez: Manifiesta haber sido testigo directo de 'maltrato verbal y desobligante'.
3. Asunción indebida de funciones societarias: Afirma que Liliana Gómez promovió movimientos contables sin soporte suficiente en Montacargas Gómez Ltda.
4. Asamblea Ordinaria 2025: Manifiesta que actuó como Presidente y Liliana Gómez como Secretaria, y que se negó a firmar el acta aduciendo que no reflejaba lo debatido.`
  },
  {
    id: "DOC-MED-JADE",
    code: "DICT-MED-JADE",
    title: "Valoración Neuropsicológica y Cognitiva: IPS Jade Salud & Fundación BIOS",
    category: "civil_familia",
    type: "dictamen_medico",
    date: "17 de Julio y 22 de Diciembre de 2025",
    radicado: "HC-27.934.608-JADE",
    authority: "IPS Jade Salud & Fundación del Caribe para la Investigación Biomédica (BIOS)",
    notaryOrEntity: "Dra. Claudia Patricia Rodríguez Locarno (Psicóloga / Neuropsicóloga TP 1009) y Dr. José F. Balaguera (Médico)",
    folioCount: 7,
    integrityHash: "11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff",
    summary: "Informe clínico-neuropsicológico sobre Cecilia Pradilla de Gómez (88 años). A pesar de calificarla con perfil formal conservado, el relato fáctico revela ateromatosis carotídea, cambios involutivos corticales y leucoaraiosis en TAC de cráneo, y una marcada sugestionabilidad inducida por su entorno familiar.",
    legalImpact: {
      familia: "Base para la acción de nulidad por falta de capacidad mental plena o captación de la voluntad en anciana de 88 años vulnerable.",
      penal: "Demuestra la instrumentalización médica de una paciente octogenaria para justificar actos solemnes patrimoniales.",
      societario: "La propia paciente declara en consulta que 'no quería retirarse de la empresa pero que la familia la manipulaba'."
    },
    keyEvidence: [
      "Edad: 88 años y 8 meses. Antecedentes: Ateromatosis de bulbos carotídeos, cambios involutivos corticales y leucoaraiosis cerebral",
      "La paciente relata textualmente que adoptaron a su hija con 7 días de nacida y que actualmente la relación está fracturada por disputas de empresa",
      "Certificado express del Dr. Balaguera expedido el 22 de diciembre de 2025 (2 días antes de los actos notariales)"
    ],
    strategicValue: "Punto de partida para solicitar una METAPERITICIA PSIQUIÁTRICA Y NEUROPSICOLÓGICA FORENSE RETROSPECTIVA ante Medicina Legal.",
    signedBy: "Dra. Claudia Patricia Rodríguez Locarno (Neuropsicóloga) y Dr. José F. Balaguera (Médico Genetista)",
    status: "aportado",
    downloadFileName: "Dictamen_Neuropsicologico_Cecilia_Pradilla_JadeSalud.pdf",
    partiesInvolved: ["Cecilia Pradilla de Gómez", "Dra. Claudia Rodríguez Locarno", "Dr. José F. Balaguera", "Liliana Gómez Pradilla"],
    fullText: `JADE SALUD IPS - FUNDACIÓN DEL CARIBE PARA LA INVESTIGACIÓN BIOMÉDICA (BIOS)
EVALUACIÓN NEUROPSICOLÓGICA CLÍNICA
PACIENTE: CECILIA PRADILLA DE GÓMEZ | EDAD: 88 AÑOS | HC: 27.934.608
FECHA DE EVALUACIÓN: 17 DE JULIO Y 22 DE DICIEMBRE DE 2025

MOTIVO DE CONSULTA Y RELATO:
La paciente femenina de 88 años refiere: 'Mi esposo y yo nos casamos muy jóvenes, adoptamos una niña con 7 días de nacida. Nuestra hija tuvo una buena vida, estudió medicina y hoy es dermatóloga... La empresa la fundamos mi esposo y yo, se dedica al sector de montacargas y actualmente tiene 42 empleados. Ella ha querido retirarme de la administración... Estoy en tratamiento psiquiátrico pero no estoy inhabilitada.'

ANTECEDENTES CLÍNICOS RELEVANTES:
- TAC cerebral (15-Mayo-2021): Discretos cambios involutivos corticales, cambios de leucoaraiosis y ateromatosis carotídea con obstrucción leve.
- Conclusión pericial: Desempeño general conservado con fluctuaciones de velocidad atencional propias de su edad senil avanzada (88 años).`
  },
  {
    id: "DOC-BIO-NOT7",
    code: "ACT-BIO-150777",
    title: "Actas de Autenticación Biométrica Notarial (Notaría Séptima de Barranquilla)",
    category: "penal",
    type: "acta_biometrica",
    date: "27 de Agosto y 24 de Diciembre de 2025",
    radicado: "ACT-BIO-150777-1 / 171043-1 / 171046-1",
    authority: "Notaría Séptima del Círculo de Barranquilla",
    notaryOrEntity: "Sistema NotariID de Autenticación Biométrica Notarial",
    folioCount: 4,
    integrityHash: "aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899",
    summary: "Actas oficiales de cotejo biométrico notarial correspondientes a las escrituras 1.477, 2.411 y 2.412. En TODAS ellas consta de manera fehaciente: 'El compareciente NO fue identificado mediante biometría en línea debido a: IMPOSIBILIDAD DE CAPTURA DE HUELLAS'.",
    legalImpact: {
      familia: "Vicio de forma notarial (Decreto 960 de 1970, Art. 99) si el Notario no compareció personalmente al domicilio a constatar la voluntad.",
      penal: "Indicio gravísimo de falsedad o suplantación en el lecho de la causante.",
      societario: "Invalida la presunción de plena lucidez y formalidad notarial de los actos."
    },
    keyEvidence: [
      "Acta No. 150777-1 (27-Agosto-2025, 16:45:56): Transacción 3a7bee73. Imposibilidad de captura de huellas",
      "Acta No. 171043-1 (24-Diciembre-2025, 11:07:45): Transacción b8511d57. Imposibilidad de captura de huellas",
      "Acta No. 171046-1 (24-Diciembre-2025, 11:10:03): Transacción f7cd835b. Imposibilidad de captura de huellas",
      "Evidencia que se autorizó fuera de la notaría sin que repose la solicitud formal médica de impedimento físico exigida por la ley"
    ],
    strategicValue: "Permite tumbar las escrituras por defecto sustancial del Estatuto del Notariado y Decreto 019 de 2012.",
    signedBy: "Rafael María Gutiérrez Rodríguez (Notario 7º) y Martha Cecilia Gutiérrez Abello",
    status: "aportado",
    downloadFileName: "Actas_Biometricas_Notaria_Septima_Fallas_Huellas.pdf",
    partiesInvolved: ["Cecilia Pradilla de Gómez", "Notaría Séptima de Barranquilla"],
    fullText: `SUPERINTENDENCIA DE NOTARIADO Y REGISTRO - SISTEMA NOTARIID NOTARIASEGURA
NOTARÍA SÉPTIMA DEL CÍRCULO DE BARRANQUILLA
ACTAS DE AUTENTICACIÓN BIOMÉTRICA PARA ESCRITURA PÚBLICA

CÓDIGO DE ACTA: 150777-1 (Asociada a DVA EP 1.477)
FECHA: 27 de agosto de 2025 - 16:45:56
COMPARECIENTE: CECILIA PRADILLA DE GÓMEZ (C.C. 27.934.608)
ESTADO DE IDENTIFICACIÓN:
'El compareciente NO fue identificado mediante biometría en línea debido a: IMPOSIBILIDAD DE CAPTURA DE HUELLAS.'

CÓDIGO DE ACTA: 171043-1 (Asociada a Fideicomiso Civil EP 2.411)
FECHA: 24 de diciembre de 2025 - 11:07:45
ESTADO DE IDENTIFICACIÓN: 'IMPOSIBILIDAD DE CAPTURA DE HUELLAS.'

CÓDIGO DE ACTA: 171046-1 (Asociada a Testamento Abierto EP 2.412)
FECHA: 24 de diciembre de 2025 - 11:10:03
ESTADO DE IDENTIFICACIÓN: 'IMPOSIBILIDAD DE CAPTURA DE HUELLAS.'`
  },
  {
    id: "DOC-EML-533AM",
    code: "PRV-EML-533",
    title: "Cadena de Correos Electrónicos del 24 de Diciembre a las 5:33 AM (Jaime Zapata Quintana)",
    category: "penal",
    type: "correo_probatorio",
    date: "24 de Diciembre de 2025 (05:33 AM)",
    radicado: "EML-ZAPATA-2025-12-24",
    authority: "Evidencia Digital - Servidor Gmail y WhatsApp",
    notaryOrEntity: "Jaime Zapata Quintana / Notaría Séptima",
    folioCount: 2,
    integrityHash: "44556677889900aabbccddeeff0011223344556677889900aabbccddeeff0011",
    summary: "Correo electrónico enviado el 24 de diciembre de 2025 a las 5:33 AM por Jaime Zapata Quintana a la Notaría Séptima: 'BUENIS DIAS SOLO ME FALTA ALLEGARTE LA CEDULA DE DON ALDEMAR DARIO DUQUE SALAZAR', con capturas de WhatsApp adjuntas de las cédulas de los testigos. Demuestra el montaje previo de los testigos.",
    legalImpact: {
      familia: "Prueba que los testigos no fueron elegidos espontáneamente por la testadora, sino contactados y provistos por un tramitador externo.",
      penal: "Concierto para delinquir y Fraude Procesal en flagrancia cronológica.",
      societario: "Muestra la urgencia desmedida de firmar todo antes de las fiestas navideñas."
    },
    keyEvidence: [
      "Hora de envío: 5:33 AM del 24 de diciembre de 2025 (horas antes de la supuesta comparecencia de la anciana)",
      "Remitente: JAIME ZAPATA <jaimezapataq@hotmail.com>, Cel: 301 448 77 71",
      "Destinatario: Adolcy González <adolcy7abarranquilla@gmail.com> (Funcionario Notaría Séptima)",
      "Adjuntos: Capturas de cédula de Aldemar Duque Salazar y Mario Blandón Moncada"
    ],
    strategicValue: "Evidencia demoledora que quiebra la presunción de buena fe y solemnidad del testamento abierto.",
    signedBy: "Jaime Zapata Quintana",
    status: "aportado",
    downloadFileName: "Correo_Probatorio_533AM_Tramitador_Cedulas_Testigos.pdf",
    partiesInvolved: ["Jaime Zapata Quintana", "Adolcy González", "Aldemar Darío Duque", "Mario de Jesús Blandón"],
    fullText: `MENSAJE DE CORREO ELECTRÓNICO - REGISTRO FORENSE DIGITAL
DE: JAIME ZAPATA <jaimezapataq@hotmail.com>
PARA: Adolcy González <adolcy7abarranquilla@gmail.com>
FECHA: Miércoles, 24 de Diciembre de 2025 a las 5:33 AM
ASUNTO: COPIAS DE CEDULA TESTIGOS TESTAMENTO CECILIA PRADILLA DE GOMEZ

MENSAJE:
'BUENIS DIAS SOLO ME FALTA ALLEGARTE LA CEDULA DE DON ALDEMAR DARIO DUQUE SALAZAR'

FIRMA:
Jaime Zapata Quintana
Cel. 301 448 77 71
Barranquilla – Colombia

ARCHIVOS ADJUNTOS:
- WhatsApp Image 2025-12-24 at 5.30.41 AM.jpeg (266K)
- MARIO 100%.PDF (150K)`
  },
  {
    id: "DOC-RC-30512033",
    code: "REG-CIV-30512",
    title: "Registro Civil de Nacimiento de Liliana Amparo Gómez Pradilla (Serial 30512033)",
    category: "civil_familia",
    type: "registro_civil",
    date: "26 de Noviembre de 2001 (Inscripción Inicial)",
    radicado: "SERIAL-30512033-NOT1-BAQ",
    authority: "Notaría Primera del Círculo de Barranquilla",
    notaryOrEntity: "Registraduría Nacional del Estado Civil",
    folioCount: 2,
    integrityHash: "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    summary: "Registro Civil de Nacimiento oficial que acredita el estado civil y parentesco legítimo como hija de Eduardo Gómez Rueda y Cecilia Pradilla de Gómez. Confiere legitimación activa exclusiva para heredar la totalidad del haber sucesoral.",
    legalImpact: {
      familia: "Establece la calidad de legitimaria de primer orden (Art. 1045 C.C.) e hija única con vocación universal.",
      penal: "Constituye la personería jurídica de víctima en todos los procesos penales contra quienes pretenden despojarla.",
      societario: "Legitima la condición de socia y heredera en Montacargas Gómez Ltda."
    },
    keyEvidence: [
      "Inscrita: LILIANA AMPARO GÓMEZ PRADILLA (Nacida el 23 de septiembre de 1968 en Barranquilla)",
      "Madre: CECILIA PRADILLA DE GÓMEZ (C.C. 27.934.608)",
      "Padre: EDUARDO GÓMEZ RUEDA (C.C. 2.020.033)",
      "Inscripción certificada con validez jurídica plena para acreditar parentesco sucesoral"
    ],
    strategicValue: "Título legal supremo e incontrovertible que garantiza la legitimación en la causa.",
    signedBy: "Ana Dolores Meza Caballero (Notaria Primera de Barranquilla)",
    status: "aportado",
    downloadFileName: "Registro_Civil_Nacimiento_Liliana_Gomez_Pradilla.pdf",
    partiesInvolved: ["Liliana Amparo Gómez Pradilla", "Cecilia Pradilla de Gómez", "Eduardo Gómez Rueda"],
    fullText: `REPÚBLICA DE COLOMBIA - REGISTRADURÍA NACIONAL DEL ESTADO CIVIL
NOTARÍA PRIMERA DEL CÍRCULO DE BARRANQUILLA
REGISTRO CIVIL DE NACIMIENTO - SERIAL: 30512033 | NUIP: 32.606.203

DATOS DE LA INSCRITA:
NOMBRE: LILIANA AMPARO GÓMEZ PRADILLA
FECHA DE NACIMIENTO: 23 DE SEPTIEMBRE DE 1968
LUGAR: BARRANQUILLA - ATLÁNTICO - COLOMBIA

DATOS DE LOS PADRES:
MADRE: CECILIA PRADILLA DE GÓMEZ (C.C. 27.934.608 de Bucaramanga)
PADRE: EDUARDO GÓMEZ RUEDA (C.C. 2.020.033 de Bucaramanga)

NOTAS MARGINALES:
- Matrimonio con Manuel de Jesús Safi Cabeza (04 de abril de 2002, Notaría Única de Puerto Colombia).
- Copia expedida para acreditar parentesco sucesoral con plena validez de ley.`
  },
  {
    id: "DOC-AUTO-APOYO-2026",
    code: "AUTO-ADM-APOYO-05F",
    title: "Auto Admisorio y Medida Cautelar Provisional de Apoyos (Juzgado Quinto de Familia Oral)",
    category: "civil_familia",
    type: "memorial",
    date: "20 de Agosto de 2026",
    radicado: "080013110005-2026-00168-00",
    authority: "Juzgado Quinto de Familia Oral del Circuito de Barranquilla",
    notaryOrEntity: "Alejandro Castro Batista (Juez) - SIGCMA",
    folioCount: 3,
    integrityHash: "4e3106cbcaf59679a43e488b11b74e92da9a78256ddf17e696f1c25017d6d2ee",
    summary: "Providencia judicial trascendental dictada por el Juez Alejandro Castro Batista. Admite la demanda verbal sumaria de adjudicación de apoyos para Cecilia Pradilla de Gómez (88 años) y decreta como MEDIDA CAUTELAR PROVISIONAL la designación de su hija única LILIANA AMPARO GÓMEZ PRADILLA como persona de apoyo para actos personales, bancarios, societarios en Montajes Inversiones Asesorías S.A.S. y Montacargas Gómez Ltda., y salvaguardas patrimoniales.",
    legalImpact: {
      familia: "Reconocimiento judicial pleno de la condición de persona de apoyo y cuidadora legal idónea de Liliana Gómez, protegiendo a la causante.",
      penal: "Constituye prueba judicial incontestable del deterioro cognitivo de Cecilia Pradilla a la fecha de los actos notariales.",
      societario: "Faculta expresamente a Liliana Gómez para la representación contable, bancaria y societaria en Montacargas Gómez Ltda. y Montajes Inversiones Asesorías S.A.S."
    },
    keyEvidence: [
      "Numeral Tercero: Decreta medida cautelar de carácter PROVISIONAL en consideración a los 88 años y vulnerabilidad de la titular, designando a Liliana Amparo Gómez Pradilla como persona de apoyo",
      "Numeral Quinto: Salvaguarda que ordena abstenerse de realizar actos de disposición definitiva sobre inmuebles y destinar recursos exclusivamente al cuidado y protección patrimonial",
      "Numeral Séptimo: Ordena citación de los nietos Ángel Eduardo Conde, Daniel Conde y David Manuel Safi Gómez",
      "Firma electrónica con plena validez jurídica conforme a la Ley 527/99 y Decreto 2364/12 (Código de verificación: 4e3106cbcaf59679a43e488b11b74e92da9a78256ddf17e696f1c25017d6d2ee)"
    ],
    strategicValue: "Victoria procesal fundamental: la justicia de familia reconoció formalmente que Cecilia Pradilla no tenía plena autonomía y nombró formalmente de apoyo a Liliana Gómez.",
    signedBy: "Alejandro Castro Batista (Juez Quinto de Familia Oral)",
    status: "otorgado",
    downloadFileName: "Auto_Admite_Adjudicacion_Apoyos_Medida_Cautelar_20Ago2026.pdf",
    partiesInvolved: ["Liliana Amparo Gómez Pradilla", "Cecilia Pradilla de Gómez", "Alejandro Castro Batista", "Claudia Patricia Granda Ibarra"],
    fullText: `RAMA JUDICIAL - CONSEJO SUPERIOR DE LA JUDICATURA
CONSEJO SECCIONAL DE LA JUDICATURA DEL ATLÁNTICO
JUZGADO QUINTO DE FAMILIA ORAL DEL CIRCUITO DE BARRANQUILLA
Calle 40 N° 44 - 80 Centro Cívico - Cuarto Piso Tel/Fax: 3516483
famcto05ba@cendoj.ramajudicial.gov.co
SISTEMA DE GESTIÓN JUDICIAL - SIGCMA

RADICACIÓN: 080013110005-2026-00168-00
PROCESO: ADJUDICACIÓN JUDICIAL DE APOYOS
DEMANDANTE: LILIANA AMPARO GÓMEZ PRADILLA
EN FAVOR DE: CECILIA PRADILLA DE GÓMEZ

JUZGADO QUINTO DE FAMILIA DEL CIRCUITO EN ORALIDAD, BARRANQUILLA, AGOSTO VEINTE (20) DE DOS MIL VEINTISÉIS (2026).

Visto el informe secretarial que antecede, este Despacho entra a estudiar la demanda de ADJUDICACIÓN JUDICIAL DE APOYOS, promovida por LILIANA AMPARO GÓMEZ PRADILLA, a través de apoderada judicial, en favor de su titular, la señora CECILIA PRADILLA DE GÓMEZ.

Verificado el escrito de subsanación, se evidencia que la parte actora cumplió con los requerimientos exigidos, incluyendo la corrección relativa a la competencia territorial de este Despacho, quedando acreditado el domicilio de la titular en esta jurisdicción (Calle 80 No. 51-69 Edificio Girasol piso 16 de Barranquilla). Por reunir los requisitos generales de admisión, se le imprimirá al proceso el trámite de VERBAL SUMARIO de acuerdo a las disposiciones legales vigentes.

Aunado a lo anterior, revisada la solicitud de medida cautelar elevada por la parte demandante en el escrito de subsanación, y considerando la edad de la titular del acto jurídico (88 años), factor que por sí solo incrementa el riesgo de desprotección frente a la gestión de su salud y su patrimonio mientras se surte el trámite, este Despacho advierte que se configuran los presupuestos de necesidad y urgencia a que se refiere el numeral 1° del artículo 5° de la Ley 1996 de 2019 para decretar el apoyo provisional solicitado.

No obstante, en atención a que el mismo artículo 5° ibidem ordena que todo apoyo se acompañe de salvaguardas efectivas que impidan abusos y garanticen la primacía de la voluntad y preferencias de la titular, y considerando que las facultades solicitadas incluyen actos de disposición y manejo financiero de entidad considerable, incluyendo cuentas bancarias, títulos valores e información societaria de las empresas MONTAJES INVERSIONES ASESORIAS SAS y MONTACARGAS GÓMEZ LTDA, este Despacho decretará la medida en los términos pedidos, sujeta a las salvaguardas y controles que se fijan en la parte resolutiva.

En mérito de lo expuesto, el Juzgado,

RESUELVE:

PRIMERO: ADMÍTASE la demanda de ADJUDICACIÓN JUDICIAL DE APOYOS, promovida por LILIANA AMPARO GÓMEZ PRADILLA, a través de apoderada judicial en favor de CECILIA PRADILLA DE GÓMEZ.

SEGUNDO: TRAMÍTASE el presente proceso conforme a las previsiones de los artículos 390 # 7 y s.s. del C.G.P. (Proceso Verbal Sumario), de acuerdo a lo dispuesto en el numeral 14 del artículo 21 ibidem.

TERCERO: DECRETAR, como medida cautelar de carácter PROVISIONAL y en consideración a la edad y situación de vulnerabilidad de la titular, el establecimiento de apoyos en favor de la señora CECILIA PRADILLA DE GÓMEZ. En consecuencia, se designa a la señora LILIANA AMPARO GÓMEZ PRADILLA como persona de apoyo provisional, facultándola para ejercer los actos jurídicos específicos señalados en el escrito de demanda y su respectiva subsanación de fecha 7 de julio de 2026, los cuales se entienden incorporados a este auto como parte integral del mismo.

CUARTO: La medida decretada en el numeral anterior regirá únicamente hasta que se profiera sentencia que resuelva de manera definitiva sobre la adjudicación de apoyos y la configuración de salvaguardas, o hasta que este Despacho la modifique o revoque.

QUINTO: Como salvaguardas de la medida provisional, se ordena a la señora LILIANA AMPARO GÓMEZ PRADILLA:
a) Abstenerse de realizar actos de disposición definitiva sobre bienes inmuebles, donaciones, gravámenes o enajenación de participaciones societarias de la titular, los cuales quedan excluidos del apoyo provisional y reservados a lo que se decida en sentencia.
b) Destinar los recursos que administre exclusivamente al cuidado personal, la salud y la protección patrimonial de la titular, absteniéndose de cualquier uso en beneficio propio o de terceros.

SEXTO: INTÉNTESE notificar la existencia del presente proceso a la señora CECILIA PRADILLA DE GÓMEZ, por intermedio del Asistente Social del Despacho.

SEPTIMO: DISPÓNGASE la citación y notificación de la existencia del presente proceso a la familia directa, conformada por los señores Ángel Eduardo Conde Gómez, Daniel Conde Gómez y David Manuel Safi Gómez, en su calidad de nietos de la titular.

OCTAVO: NOTIFICAR la iniciación de este trámite a la Procuradora de Familia (Dra. Zoraida Esther Valencia Llanos), para los fines contemplados en el artículo 40 de la Ley 1996 de 2019.

NOVENO: RECONOCER a la abogada Claudia Patricia Granda Ibarra como apoderada de la parte demandante.

NOTIFÍQUESE Y CÚMPLASE.
ALEJANDRO CASTRO BATISTA - JUEZ (C.A.)

FIRMADO ELECTRÓNICAMENTE:
Este documento fue generado con firma electrónica y cuenta con plena validez jurídica, conforme a lo dispuesto en la Ley 527/99 y el decreto reglamentario 2364/12.
Código de verificación: 4e3106cbcaf59679a43e488b11b74e92da9a78256ddf17e696f1c25017d6d2ee
Documento generado en: 20/08/2026 09:49:11 AM
Valide en: https://firmaelectronica.ramajudicial.gov.co/FirmaElectronica`
  },
  {
    id: "DOC-AUTO-SUSP-2026",
    code: "AUTO-SUSP-05F-2026",
    title: "Auto del 4 de Septiembre de 2026: Suspensión de Desistimiento y Requerimiento de Defunción",
    category: "civil_familia",
    type: "memorial",
    date: "04 de Septiembre de 2026",
    radicado: "080013110005-2026-00168-00",
    authority: "Juzgado Quinto de Familia Oral del Circuito de Barranquilla",
    notaryOrEntity: "Alejandro Castro Batista (Juez) - Secretaria Ana de Alba Molinares",
    folioCount: 3,
    integrityHash: "5aa9b66fa440cf544e00ffe095cc9edbe516a57ad04e91d7f64b600c88f623e6",
    summary: "Auto mediante el cual el Juez Alejandro Castro Batista suspende el trámite del memorial de desistimiento/retiro de la demanda de apoyos presentado tras el deceso de Cecilia Pradilla de Gómez. Exige taxativamente el Registro Civil de Defunción como único documento legalmente idóneo para acreditar el fallecimiento.",
    legalImpact: {
      familia: "Mantiene abierta formalmente la jurisdicción y vigencia procesal del expediente hasta la aportación estricta del Registro Civil de Defunción.",
      penal: "Evita que las partes opositoras cierren fraudulentamente el plenario sin dejar constancia registral del fallecimiento ocurrido el 21 de agosto de 2026.",
      societario: "Conserva el registro de las medidas cautelares adoptadas sobre la titularidad societaria."
    },
    keyEvidence: [
      "Consideración del Despacho: La muerte de un sujeto procesal bajo la Ley 1996 de 2019 no puede suponerse ni acreditarse con la sola afirmación del profesional del derecho",
      "Resuelve Primero: Requerir a la apoderada para que dentro del término improrrogable de 3 días allegue el Registro Civil de Defunción",
      "Resuelve Segundo: Suspender el trámite de desistimiento hasta estricto cumplimiento",
      "Firma electrónica SIGCMA con código de verificación: 5aa9b66fa440cf544e00ffe095cc9edbe516a57ad04e91d7f64b600c88f623e6"
    ],
    strategicValue: "Pieza procesal que cierra el ciclo de apoyos judiciales y da apertura inmediata a la demanda sucesoral y nulidad de testamento.",
    signedBy: "Alejandro Castro Batista (Juez Quinto de Familia Oral)",
    status: "otorgado",
    downloadFileName: "Auto_Suspende_Desistimiento_Requerimiento_Defuncion_04Sep2026.pdf",
    partiesInvolved: ["Cecilia Pradilla de Gómez", "Liliana Amparo Gómez Pradilla", "Claudia Patricia Granda Ibarra", "Alejandro Castro Batista"],
    fullText: `RAMA JUDICIAL - CONSEJO SUPERIOR DE LA JUDICATURA
CONSEJO SECCIONAL DE LA JUDICATURA DEL ATLÁNTICO
JUZGADO QUINTO DE FAMILIA ORAL DEL CIRCUITO DE BARRANQUILLA
famcto05ba@cendoj.ramajudicial.gov.co
SISTEMA DE GESTIÓN JUDICIAL - SIGCMA

RADICACIÓN: 080013110005-2026-00168-00
PROCESO: ADJUDICACIÓN JUDICIAL DE APOYOS
DTE: LILIANA AMPARO GÓMEZ PRADILLA
EN FAVOR DE: CECILIA PRADILLA DE GÓMEZ

INFORME SECRETARIAL. Señor Juez. A su Despacho proceso de la referencia, informándole que la apoderada judicial de la parte actora ha solicitado el retiro de la demanda. Sírvase proveer. Barranquilla, 04 de septiembre de 2026.
ANA DE ALBA MOLINARES - SECRETARIA.

JUZGADO QUINTO DE FAMILIA ORAL DE BARRANQUILLA SEPTIEMBRE CUATRO (04) DE DOS MIL VEINTISÉIS (2026).

Procede el Despacho a resolver sobre el estado del proceso, tras recibir el memorial presentado por la apoderada de la parte demandante en el cual manifiesta el desistimiento y aduce el fallecimiento de la titular de los apoyos.

CONSIDERACIONES DEL DESPACHO:
La apoderada de la parte demandante allegó al proceso un escrito manifestando el desistimiento de las pretensiones y aduciendo de manera informal que la señora CECILIA PRADILLA DE GÓMEZ, persona para quien se solicitaba la adjudicación de apoyos jurídicos, habría fallecido.

Al respecto, el Despacho recuerda que los hechos procesales de tal relevancia como la muerte de un sujeto procesal que extingue el objeto mismo de la acción bajo la Ley 1996 de 2019 no pueden suponerse ni acreditarse con la sola afirmación del profesional del derecho. Conforme a las reglas del estado civil de las personas vigentes en el ordenamiento colombiano, el único documento idóneo y vinculante para demostrar legalmente el fallecimiento de un ciudadano es el Registro Civil de Defunción.

En vista de lo anterior, previo a emitir cualquier pronunciamiento de fondo sobre el trámite del desistimiento o decretar la terminación anormal del proceso por sustracción de materia, resulta indispensable que repose en el expediente el documento oficial que soporte el deceso alegado.

En mérito de lo expuesto, esta agencia judicial,

RESUELVE:

PRIMERO: REQUERIR a la apoderada de la parte demandante para que, dentro del término improrrogable de tres (3) días contados a partir de la notificación de este proveído, allegue el Registro Civil de Defunción de la señora CECILIA PRADILLA DE GÓMEZ.

SEGUNDO: SUSPENDER el trámite de la solicitud de desistimiento de las pretensiones hasta tanto se dé estricto cumplimiento al requerimiento ordenado en el numeral anterior.

NOTIFÍQUESE Y CÚMPLASE.
ALEJANDRO CASTRO BATISTA - JUEZ (C.A.)

FIRMADO ELECTRÓNICAMENTE:
Este documento fue generado con firma electrónica y cuenta con plena validez jurídica, conforme a lo dispuesto en la Ley 527/99 y el decreto reglamentario 2364/12.
Código de verificación: 5aa9b66fa440cf544e00ffe095cc9edbe516a57ad04e91d7f64b600c88f623e6
Documento generado en: 04/09/2026 02:05:31 PM
URL de Validación: https://firmaelectronica.ramajudicial.gov.co/FirmaElectronica`
  },
  {
    id: "DOC-MEM-ZAPATA-2026",
    code: "MEM-EXP-ZAPATA-2026",
    title: "Memorial de Jaime Zapata Quintana: Aportación de Registro de Defunción y Solicitud de Copias",
    category: "civil_familia",
    type: "memorial",
    date: "31 de Agosto de 2026",
    radicado: "08001311000520260016800",
    authority: "Juzgado Quinto de Familia del Circuito de Barranquilla",
    notaryOrEntity: "Jaime Zapata Quintana (Abogado T.P. 122.014 C.S.J.)",
    folioCount: 4,
    integrityHash: "8899aabbccddeeff00112233445566778899aabbccddeeff0011223344556677",
    summary: "Memorial radicado por el abogado Jaime Zapata Quintana solicitando acceso íntegro al expediente digital de apoyos, auto admisorio, valoraciones médicas y anexos, acreditando el deceso de Cecilia Pradilla de Gómez ocurrido el 21 de agosto de 2026 con el Registro Civil de Defunción Serial 11851575 expedido por la Notaría Quinta de Barranquilla.",
    legalImpact: {
      familia: "Acredita en el expediente la muerte de Cecilia Pradilla de Gómez el 21 de agosto de 2026 a las 14:10 por causa médica certificada por el Dr. Oscar Hernández Rodríguez.",
      penal: "Confirma la constante intervención del abogado Jaime Zapata Quintana tanto en el proceso de apoyos como en los actos notariales del 24 de diciembre de 2025.",
      societario: "Marca la fecha exacta de apertura de la sucesión ilíquida de Cecilia Pradilla."
    },
    keyEvidence: [
      "Registro Civil de Defunción Serial 11851575: Fallecimiento el 21 de agosto de 2026 a las 14:10 en Barranquilla",
      "Solicitante: Jaime Zapata Quintana, C.C. 91.077.056 de San Gil, T.P. 122.014 del C.S.J.",
      "Petición de copia íntegra de la demanda de apoyos, dictámenes neurológicos de Jaime Crump y medidas cautelares decretadas"
    ],
    strategicValue: "Pieza clave de enlace entre el proceso de apoyos y la ofensiva de nulidad sucesoral y testamentaria.",
    signedBy: "Jaime Zapata Quintana (Abogado)",
    status: "aportado",
    downloadFileName: "Memorial_Jaime_Zapata_Registro_Defuncion_Copia_Expediente.pdf",
    partiesInvolved: ["Jaime Zapata Quintana", "Cecilia Pradilla de Gómez", "Liliana Amparo Gómez Pradilla"],
    fullText: `SEÑOR JUEZ QUINTO DE FAMILIA DEL CIRCUITO DE BARRANQUILLA E. S. D.

REFERENCIA: PROCESO DE JURISDICCIÓN VOLUNTARIA - ADJUDICACIÓN JUDICIAL DE APOYOS
RADICADO: 08001311000520260016800
TITULAR DEL ACTO JURÍDICO: CECILIA PRADILLA DE GÓMEZ
ASUNTO: SOLICITUD DE ACCESO, CONSULTA Y EXPEDICIÓN DE COPIA ÍNTEGRA DEL EXPEDIENTE

JAIME ZAPATA QUINTANA, mayor de edad, identificado con cédula de ciudadanía No. 91.077.056 de San Gil, abogado en ejercicio, portador de la Tarjeta Profesional No. 122.014 del Consejo Superior de la Judicatura, respetuosamente me permito solicitar al Despacho acceso y copia íntegra del expediente digital correspondiente al proceso de jurisdicción voluntaria identificado con radicado No. 08001311000520260016800, relacionado con la adjudicación judicial de apoyos de la señora CECILIA PRADILLA DE GÓMEZ.

FUNDAMENTO DE LA SOLICITUD:
La señora CECILIA PRADILLA DE GÓMEZ ha fallecido, circunstancia que se acredita mediante el correspondiente Registro Civil de Defunción (Serial 11851575 de la Notaría Quinta de Barranquilla, fecha de defunción: 21 de agosto de 2026, hora: 14:10), documento que se acompaña a esta solicitud.

El conocimiento integral de las actuaciones surtidas dentro del referido expediente resulta necesario para establecer los antecedentes jurídicos relacionados con la manifestación de voluntad, preferencias y designación de apoyos de la señora Cecilia Pradilla de Gómez, así como las circunstancias que dieron origen a la actuación judicial.

Por lo anterior, solicito respetuosamente que se permita el acceso al expediente digital en su integridad, incluyendo especialmente:
1. Demanda o solicitud inicial de adjudicación judicial de apoyos y sus anexos.
2. Poder presentado, si lo hubiere.
3. Auto admisorio y demás providencias proferidas por el Despacho.
4. Valoraciones de apoyo, informes médicos, psicológicos, sociales o interdisciplinarios aportados o practicados.
5. Declaraciones, entrevistas y demás elementos probatorios incorporados.
6. Pronunciamientos o manifestaciones efectuadas directamente por la señora CECILIA PRADILLA DE GÓMEZ.
7. Memoriales presentados por LILIANA AMPARO GÓMEZ PRADILLA o por quien hubiese promovido la actuación.
8. Decisión mediante la cual terminó el trámite, si esta ya fue proferida.
9. En general, la totalidad de las piezas procesales que integran el expediente.

SOLICITUD:
PRIMERO. Autorizar el acceso y consulta del expediente digital correspondiente al radicado 08001311000520260016800.
SEGUNDO. Remitir al correo electrónico que se indique el vínculo de acceso al expediente digital o copia electrónica íntegra.
TERCERO. Tener como documento adjunto el Registro Civil de Defunción de la señora CECILIA PRADILLA DE GÓMEZ.

Cordialmente,
Jaime Zapata Quintana
C.C. No. 91.077.056 de San Gil (Santander) | T.P. No. 122.014 del C.S. de la J.
Cel. 301 448 77 71 | E-mail: jaimezapataq@hotmail.com
Barranquilla - Colombia`
  }
];

export const ACTION_MATRIX: ActionItem[] = [
  {
    id: "ACT-001",
    code: "ACT-CIV-01",
    legalFront: "civil_familia",
    title: "Demanda Ordinaria de Impugnación y Nulidad de Testamento Abierto (E.P. 2.412)",
    description: "Radicar demanda ordinaria ante el Juez de Familia del Circuito de Barranquilla solicitando la nulidad absoluta/relativa del testamento por atipicidad manifiesta de las causales de desheredamiento, falta de consentimiento libre y vulneración de la legítima rigorosa (Art. 1242 y 1266 C.C.).",
    phase: "Fase 1: Ofensiva Procesal Inmediata",
    priority: "critica",
    status: "en_progreso",
    progress: 75,
    deadline: "10 de Octubre de 2026",
    responsible: "Dra. Luz Karime Beetar de Devis (Líder)",
    impactCivil: "Declara la ineficacia del desheredamiento y restablece a Liliana Gómez como heredera universal forzosa del 100% de la masa.",
    impactPenal: "Aporta al proceso penal la prueba de la inducción al error del Notario.",
    impactSocietario: "Impide que los herederos instituidos adquieran las cuotas de Montacargas Gómez Ltda.",
    expectedDeliverable: "Libelo de demanda con solicitud de medidas cautelares de guarda y secuestro de bienes radicado formalmente.",
    referencedDocIds: ["DOC-ANA-000", "DOC-ESC-2412", "DOC-DEC-4912"]
  },
  {
    id: "ACT-002",
    code: "ACT-CIV-02",
    legalFront: "civil_familia",
    title: "Demanda de Nulidad Absoluta del Fideicomiso Civil (E.P. 2.411) y Simulación",
    description: "Impugnar judicialmente la Escritura 2.411 que descapitalizó los apartamentos de El Encanto (Barranquilla) y la oficina en Chambacú (Cartagena) a favor de los 3 sobrinos, por causa ilícita, fraude pauliano a los derechos legitimarios y vulneración de la porción de libre disposición.",
    phase: "Fase 1: Ofensiva Procesal Inmediata",
    priority: "critica",
    status: "en_progreso",
    progress: 60,
    deadline: "18 de Octubre de 2026",
    responsible: "Dra. Luz Karime Beetar de Devis",
    impactCivil: "Reintegra formalmente los inmuebles de Barranquilla y Cartagena a la masa partible de la sucesión.",
    impactPenal: "Demuestra la consumación del vaciamiento patrimonial en una sola jornada navideña.",
    impactSocietario: "Recupera los activos que servían de garantía comercial familiar.",
    expectedDeliverable: "Demanda ordinaria con inscripción en las matrículas inmobiliarias de Barranquilla y Cartagena.",
    referencedDocIds: ["DOC-ESC-2411", "DOC-ANA-000"]
  },
  {
    id: "ACT-003",
    code: "ACT-CIV-03",
    legalFront: "civil_familia",
    title: "Medida Cautelar de Guarda y Aposición de Sellos sobre el Edificio Girasol (Ap. 16)",
    description: "Solicitar con carácter de urgencia al Juez de Familia la aposición de sellos y secuestro preventivo sobre el Apartamento 16 y los 3 garajes del Edificio Girasol para evitar que el albacea Daniel Conde Gómez tome posesión física del inmueble.",
    phase: "Fase 1: Ofensiva Procesal Inmediata",
    priority: "critica",
    status: "completado",
    progress: 100,
    deadline: "02 de Octubre de 2026",
    responsible: "Dra. Luz Karime Beetar de Devis + Dependiente Judicial",
    impactCivil: "Protege la tenencia y custodia del Penthouse de 396 m2.",
    impactPenal: "Si el albacea intenta ingresar o forzar cerraduras, se configura de inmediato el delito de Usurpación y Despojo.",
    impactSocietario: "Preserva los libros y documentos históricos que reposan en el despacho del apartamento.",
    expectedDeliverable: "Auto de decreto de medidas cautelares y comisión a Inspector de Policía para inspección ocular.",
    referencedDocIds: ["DOC-TRAD-104047", "DOC-ESC-2412"]
  },
  {
    id: "ACT-004",
    code: "ACT-PEN-04",
    legalFront: "penal",
    title: "Denuncia Penal por Fraude Procesal, Falsedad y Concierto contra el Entorno Opositor",
    description: "Radicar Noticia Criminal formal ante la Fiscalía General de la Nación contra el abogado Francisco Omar Mesa Rivas (Valledupar), el tramitador Jaime Zapata Quintana, los 3 testigos testamentarios y los albaceas por Fraude Procesal (Art. 453 C.P.), Falsedad en Documento y Abuso de Condición de Indefensión de Adulto Mayor (Ley 1850 de 2017).",
    phase: "Fase 2: Presión Coercitiva Penal",
    priority: "critica",
    status: "en_progreso",
    progress: 80,
    deadline: "12 de Octubre de 2026",
    responsible: "Dra. Luz Karime Beetar de Devis",
    impactCivil: "Ejerce máxima presión disuasiva; los testigos e intermediarios buscarán declarar la verdad antes de enfrentar pena de 6 a 12 años de prisión.",
    impactPenal: "Apertura formal de indagación con órdenes a Policía Judicial CTI para incautación de computadores y peritaje de correos del 24 de dic a las 5:33 AM.",
    impactSocietario: "Intimida a quienes pretenden apoderarse ilegalmente de Montacargas Gómez Ltda.",
    expectedDeliverable: "Formulación de denuncia con 15 anexos probatorios y radicado penal en Fiscalía Seccional Atlántico.",
    referencedDocIds: ["DOC-DEC-4912", "DOC-EML-533AM", "DOC-BIO-NOT7"]
  },
  {
    id: "ACT-005",
    code: "ACT-SOC-05",
    legalFront: "societario",
    title: "Toma de Control Administrativo de Montacargas Gómez Ltda. y Bloqueo en CCB",
    description: "Notificar a la Cámara de Comercio de Barranquilla la vacancia de la Gerencia por fallecimiento de Cecilia Pradilla y la asunción inmediata de la administración por Liliana Gómez Pradilla como Suplente del Gerente inscrita, ordenando no inscribir cesión de cuotas testamentarias por existir litigio de nulidad.",
    phase: "Fase 1: Blindaje Corporativo",
    priority: "critica",
    status: "completado",
    progress: 100,
    deadline: "28 de Septiembre de 2026",
    responsible: "Dra. Luz Karime Beetar de Devis + Liliana Gómez",
    impactCivil: "Garantiza que las cuotas sociales sigan en poder de la legítima heredera.",
    impactPenal: "Evita que terceros manejen las cuentas bancarias corporativas de la sociedad.",
    impactSocietario: "Asegura la continuidad operativa de la empresa que factura más de $2.039 Millones y protege a sus 42 empleados.",
    expectedDeliverable: "Radicación ante Cámara de Comercio y comunicación con poderes bancarios en entidades financieras.",
    referencedDocIds: ["DOC-CCB-8721", "DOC-ESC-1912"]
  },
  {
    id: "ACT-006",
    code: "ACT-GER-06",
    legalFront: "gerencial",
    title: "Práctica de Metaperitaje Neuropsicológico y Derechos de Petición Clave",
    description: "Solicitar formalmente a la administración del Edificio Girasol la bitácora de portería del 24 de diciembre de 2025 para constatar si el Notario subió al piso 16, exigir a la Notaría 7ª las actas biométricas originales y designar perito psiquiatra forense para autopsia psicológica retrospectiva.",
    phase: "Fase 2: Consolidación Probatoria",
    priority: "alta",
    status: "en_progreso",
    progress: 50,
    deadline: "20 de Octubre de 2026",
    responsible: "Dra. Luz Karime Beetar de Devis + Perito Forense Externo",
    impactCivil: "Aporta la prueba pericial reina de incapacidad y captación de la voluntad para el juez de familia.",
    impactPenal: "Acredita si hubo falsedad ideológica notarial si el Notario no concurrió en persona.",
    impactSocietario: "Desvirtúa el testimonio del abogado Mesa Rivas sobre la supuesta lucidez plena.",
    expectedDeliverable: "Respuestas a derechos de petición de portería y notaría + dictamen pericial forense retrospectivo.",
    referencedDocIds: ["DOC-ANA-000", "DOC-MED-JADE", "DOC-BIO-NOT7"]
  }
];

export const RISK_REGISTER: RiskItem[] = [
  {
    id: "RSK-001",
    code: "RSK-ALB-01",
    category: "civil_familia",
    title: "Ocupación Física e Intromisión del Albacea Daniel Conde Gómez",
    description: "Riesgo crítico de que el señor Daniel Conde Gómez, amparado en la Cláusula Décima del testamento nulo (albacea con tenencia de bienes), intente ingresar al Edificio Girasol (Ap. 16), cambiar cerraduras o sustraer bienes muebles y documentación histórica.",
    probability: 5,
    severity: 5,
    score: 25,
    level: "Critico",
    triggerIndicator: "Presencia de los señores Conde Gómez en la portería del Edificio Girasol requiriendo llaves.",
    mitigationAction: "Notificación inmediata por conducto de la Dra. Luz Karime Beetar a la Administración del Edificio y vigilancia privada prohibiendo el acceso a terceros no copropietarios, y solicitud urgente de medida judicial de Guarda y Aposición de Sellos (Art. 476 C.G.P.).",
    mitigationStatus: "en_mitigacion",
    referencedDocIds: ["DOC-ESC-2412", "DOC-TRAD-104047"]
  },
  {
    id: "RSK-002",
    code: "RSK-FID-02",
    category: "civil_familia",
    title: "Consolidación Registral de la Propiedad Fiduciaria a Favor de los Sobrinos",
    description: "Riesgo de que Ramón Pradilla, Manuel Pradilla y Francisco Franco pretendan inscribir la escritura de restitución de fideicomiso civil en la O.R.I.P. de Barranquilla y Cartagena para enajenar los inmuebles a terceros de buena fe.",
    probability: 4,
    severity: 5,
    score: 20,
    level: "Critico",
    triggerIndicator: "Presentación de la partida de defunción de Cecilia Pradilla ante la Notaría 7ª para extender escritura de restitución fiduciaria.",
    mitigationAction: "Inscripción inmediata de la demanda de nulidad absoluta en los folios de matrícula 040-300697 (Barranquilla) y 060-187479 (Cartagena) que saca los bienes del comercio.",
    mitigationStatus: "en_mitigacion",
    referencedDocIds: ["DOC-ESC-2411", "DOC-ANA-000"]
  },
  {
    id: "RSK-003",
    code: "RSK-SOC-03",
    category: "societario",
    title: "Parálisis Operativa o Intento de Desvío en Montacargas Gómez Ltda.",
    description: "Riesgo de que el subgerente Manuel Pradilla o terceros intenten convocar junta de socios espuria para cambiar la administración o bloquear el giro ordinario de la empresa que genera más de $2.000M.",
    probability: 3,
    severity: 4,
    score: 12,
    level: "Alto",
    triggerIndicator: "Convocatoria irregular a junta de socios o instrucciones contradictorias a entidades bancarias.",
    mitigationAction: "Liliana Gómez asume la plenitud de funciones como Suplente del Gerente inscrita en Cámara de Comercio (Matrícula 8.721), ratificando firmas bancarias y conminando a los empleados.",
    mitigationStatus: "mitigado",
    referencedDocIds: ["DOC-CCB-8721", "DOC-ESC-1912"]
  },
  {
    id: "RSK-004",
    code: "RSK-PEN-04",
    category: "penal",
    title: "Destrucción o Ocultamiento de la Bitácora de Portería y Actas Notariales",
    description: "Peligro de desaparición de las anotaciones de ingreso de la portería del Edificio Girasol correspondientes al 24 de diciembre de 2025 para encubrir si el Notario fue o no en persona.",
    probability: 4,
    severity: 4,
    score: 16,
    level: "Critico",
    triggerIndicator: "Rechazo o demora injustificada de la administración del edificio en responder el derecho de petición.",
    mitigationAction: "Solicitud de inspección judicial con exhibición de documentos y orden de Policía Judicial CTI para incautación preventiva de los libros de minuta del edificio.",
    mitigationStatus: "en_mitigacion",
    referencedDocIds: ["DOC-BIO-NOT7", "DOC-EML-533AM"]
  },
  {
    id: "RSK-005",
    code: "RSK-PROC-05",
    category: "civil_familia",
    title: "Vencimiento de Términos de Caducidad de la Acción de Nulidad Relativa",
    description: "El artículo 1750 del Código Civil y las normas de nulidad testamentaria fijan plazos estrictos de 4 años para alegar vicios del consentimiento.",
    probability: 1,
    severity: 5,
    score: 5,
    level: "Bajo",
    triggerIndicator: "Paso del tiempo sin radicación de demanda.",
    mitigationAction: "La Dra. Luz Karime Beetar tiene los libelos estructurados para radicación inmediata en el primer mes de apertura procesal.",
    mitigationStatus: "mitigado",
    referencedDocIds: ["DOC-ANA-000", "DOC-ESC-2412"]
  }
];

export const ASSET_INVENTORY: AssetItem[] = MASTER_PROPERTIES_REGISTRY;

export const CASE_MILESTONES: CaseMilestone[] = [
  {
    id: "MLS-01",
    phase: 1,
    phaseName: "Fase 1: Diagnóstico Forense y Medidas Preventivas de Urgencia",
    title: "Análisis Integral de Escrituras y Aposición de Sellos en Edificio Girasol",
    description: "Estudio pericial de las E.P. 1.477, 2.411 y 2.412, toma de control societario de Montacargas Gómez Ltda. como Suplente del Gerente y medidas para impedir el ingreso del albacea Daniel Conde al Penthouse.",
    targetDate: "Septiembre - Octubre 2026",
    status: "en_curso",
    progress: 85,
    keyDeliverable: "Análisis documental de 12 páginas, control de Cámara de Comercio y seguridad en Edificio Girasol.",
    leadingFront: "gerencial",
    referencedDocIds: ["DOC-ANA-000", "DOC-CCB-8721", "DOC-TRAD-104047"]
  },
  {
    id: "MLS-02",
    phase: 2,
    phaseName: "Fase 2: Ofensiva Procesal de Nulidad e Impugnación Judicial",
    title: "Radicación de Demandas Acumuladas de Impugnación de Testamento y Nulidad de Fideicomiso",
    description: "Presentación formal de demandas ordinarias ante el Juez de Familia de Barranquilla con solicitud de medidas cautelares de inscripción en todos los folios de matrícula de Barranquilla y Cartagena.",
    targetDate: "Octubre - Noviembre 2026",
    status: "proximo",
    progress: 20,
    keyDeliverable: "Autos admisibles con inscripción de medidas cautelares sobre El Encanto, Chambacú y Girasol.",
    leadingFront: "civil_familia",
    referencedDocIds: ["DOC-ESC-2412", "DOC-ESC-2411"]
  },
  {
    id: "MLS-03",
    phase: 3,
    phaseName: "Fase 3: Presión Penal y Desmantelamiento Testifical",
    title: "Indagatoria en Fiscalía e Interrogatorio a los Testigos y Abogado Mesa Rivas",
    description: "Activación de la Noticia Criminal por Fraude Procesal y Falsedad en Valledupar, inspección judicial al CTI para peritar las fallas biométricas y correos a las 5:33 AM.",
    targetDate: "Noviembre - Diciembre 2026",
    status: "proximo",
    progress: 10,
    keyDeliverable: "Citación a imputación penal de los involucrados y confesión o retractación de testigos testamentarios.",
    leadingFront: "penal",
    referencedDocIds: ["DOC-DEC-4912", "DOC-EML-533AM", "DOC-BIO-NOT7"]
  },
  {
    id: "MLS-04",
    phase: 4,
    phaseName: "Fase 4: Restitución Plena y Adjudicación Universal",
    title: "Sentencia de Nulidad y Adjudicación del 100% de la Herencia a Liliana Gómez",
    description: "Fallo definitivo que declara nulo el desheredamiento, anula el fideicomiso civil y adjudica la totalidad de los bienes raíces y el 100% de Montacargas Gómez Ltda. a la única hija y heredera forzosa.",
    targetDate: "Año 2027",
    status: "proximo",
    progress: 0,
    keyDeliverable: "Sentencia ejecutoriada y registro en O.R.I.P. y Cámara de Comercio a nombre exclusivo de Liliana Gómez.",
    leadingFront: "civil_familia",
    referencedDocIds: ["DOC-RC-30512033", "DOC-ESC-1912"]
  }
];

export const STRATEGIC_SCENARIOS: StrategicScenario[] = [
  {
    id: "SCN-A",
    name: "Escenario A: Negociación y Allanamiento Forzado (Capitulación de Terceros)",
    probability: "65% (Acelerado por la inminencia de imputación penal en Fiscalía)",
    timeframe: "60 a 90 días",
    financialExpectation: "100% de la masa sucesoral ($9.850 Millones COP)",
    description: "Al evidenciarse que la declaración de Valledupar es falsa, que el testamento se cuadró a las 5:33 AM y que las huellas biométricas fallaron, los sobrinos y herederos instituidos aceptan revocar voluntariamente el fideicomiso y desistir del testamento a cambio del archivo condicionado de las denuncias penales.",
    tacticalAdvantage: "Recuperación inmediata sin esperar 3 años de juicio, posesión pacífica de los apartamentos y salvaguarda total de Montacargas Gómez Ltda.",
    potentialRisks: "Que los albaceas pretendan exigir compensaciones económicas indebidas para desocupar.",
    recommendedPosition: "Estrategia de máxima presión promovida por la Dra. Luz Karime Beetar de Devis: cero concesiones patrimoniales a usurpadores."
  },
  {
    id: "SCN-B",
    name: "Escenario B: Sentencia Judicial Contenciosa de Nulidad Absoluta",
    probability: "35% (Si el entorno de los sobrinos insiste temerariamente)",
    timeframe: "18 a 24 meses",
    financialExpectation: "$9.850 Millones COP + Condena en Daños, Perjuicios y Costas",
    description: "Proceso ordinario hasta sentencia con fallo estimatorio que decreta la nulidad absoluta de la E.P. 2.411 y 2.412, condena penal privativa de la libertad para los autores del fraude procesal y entrega forzosa de los inmuebles.",
    tacticalAdvantage: "Certeza jurídica irreprochable con efectos de cosa juzgada material e indemnización de perjuicios.",
    potentialRisks: "Tiempos de congestión en el Tribunal Superior de Barranquilla.",
    recommendedPosition: "La posición probatoria de Liliana Gómez es indestructible conforme al análisis de las tres escrituras."
  }
];
