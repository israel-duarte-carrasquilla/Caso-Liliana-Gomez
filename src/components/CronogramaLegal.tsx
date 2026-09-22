import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Scale, 
  Building2, 
  ShieldAlert, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Filter, 
  ArrowUpRight,
  Gavel,
  Landmark,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Tag
} from 'lucide-react';
import { CASE_METADATA } from '../data/caseData';
import { CaseDocument, LegalFront } from '../types';
import { DocReferencePill } from './DocReferencePill';

export type TimelineEventType = 'audiencia' | 'termino_legal' | 'vencimiento_caducidad' | 'hito_procesal' | 'notarial_medico';

export interface TimelineMilestoneItem {
  id: string;
  code: string;
  title: string;
  dateString: string;
  isoDate: string; // YYYY-MM-DD for sorting
  type: TimelineEventType;
  legalFront: LegalFront;
  authority: string;
  status: 'completado' | 'en_termino' | 'critico_inminente' | 'proximo';
  daysRemaining?: number; // negative if past, positive if future
  legalTermText?: string; // e.g., "3 días hábiles", "5 días de traslado", "4 años Art. 1750 C.C."
  legalBasis: string; // e.g., "Art. 1012 C.C. / Art. 590 CGP"
  description: string;
  proceduralImpact: string;
  strategicDirective: string;
  referencedDocIds: string[];
  isCrucialDeadline?: boolean;
}

export const TIMELINE_MILESTONES_DATA: TimelineMilestoneItem[] = [
  {
    id: "TL-001",
    code: "HITO-CCB-71",
    title: "Constitución Mercantil de Montacargas Gómez Limitada",
    dateString: "10 de Septiembre de 1971",
    isoDate: "1971-09-10",
    type: "hito_procesal",
    legalFront: "societario",
    authority: "Cámara de Comercio de Barranquilla • Notaría 1ª",
    status: "completado",
    legalBasis: "Código de Comercio Art. 353 y s.s. • E.P. 1.438 Notaría 1ª",
    description: "Creación formal de la sociedad familiar Montacargas Gómez Ltda. Matrícula No. 8.721. Capital social distribuido 50% Eduardo Gómez Rueda y 50% Liliana Amparo Gómez Pradilla.",
    proceduralImpact: "Determina que el 50% de la empresa siempre ha pertenecido a Liliana Gómez y que el 50% restante compone la masa de la herencia sin que los sobrinos puedan alegar despojo societario.",
    strategicDirective: "Blindar el control operativo a través del nombramiento de Liliana como Suplente del Gerente con plenas facultades estatutarias.",
    referencedDocIds: ["DOC-CCB-8721"],
    isCrucialDeadline: false
  },
  {
    id: "TL-002",
    code: "HITO-SUC-00",
    title: "Fallecimiento de Eduardo Gómez Rueda y Liquidación Sucesoral",
    dateString: "27 de Mayo de 2000",
    isoDate: "2000-05-27",
    type: "hito_procesal",
    legalFront: "civil_familia",
    authority: "Notaría Tercera de Barranquilla (E.P. 1.912)",
    status: "completado",
    legalBasis: "Código Civil Art. 1012 • Decreto 1260 de 1970",
    description: "Fallecimiento del patriarca Eduardo Gómez Rueda. En la liquidación conyugal y partición sucesoral se adjudica a Cecilia Pradilla el Penthouse del Edificio Girasol (Apto 16 y Garajes G31-G33) y el 50% de las cuotas de Montacargas Gómez Ltda.",
    proceduralImpact: "Crea el antecedente registral matriz y certifica que los bienes raíces ingresaron a Cecilia a título de liquidación de sociedad conyugal, con plena vocación sucesoral para su única hija Liliana.",
    strategicDirective: "Acreditar en la demanda sucesoral el inventario histórico intacto de la causante.",
    referencedDocIds: ["DOC-RC-DEF-EGR", "DOC-TRAD-104047"],
    isCrucialDeadline: false
  },
  {
    id: "TL-003",
    code: "MED-CRUMP-24",
    title: "Primer Dictamen Neurológico: Estenosis Carotídea Severa (70%-90%)",
    dateString: "16 de Julio de 2024",
    isoDate: "2024-07-16",
    type: "notarial_medico",
    legalFront: "civil_familia",
    authority: "Dr. Jaime Crump (Neurólogo • Consultorio 201 Barranquilla)",
    status: "completado",
    legalBasis: "Ley 1996 de 2019 • Historia Clínica ID 8504329",
    description: "Evaluación clínica neurológica en Barranquilla. Diagnóstico de oclusión arterial carotídea severa (CIE10 I652) y trastorno cognoscitivo leve con hipoperfusión cerebral y sensación de 'ruido' permanente en la cabeza.",
    proceduralImpact: "Fija el inicio del deterioro neurológico incapacitante que privó a Cecilia Pradilla de la autonomía volitiva necesaria para suscribir escrituras complejas de fideicomiso y desheredamiento.",
    strategicDirective: "Aportar como prueba madre del vicio de consentimiento y falta de discernimiento en el peritaje retrospectivo.",
    referencedDocIds: ["DOC-ANA-000"],
    isCrucialDeadline: false
  },
  {
    id: "TL-004",
    code: "NOT-DVA-1477",
    title: "Escritura Pública 1.477: Directiva Anticipada y Cuidados Paliativos",
    dateString: "27 de Agosto de 2025",
    isoDate: "2025-08-27",
    type: "notarial_medico",
    legalFront: "civil_familia",
    authority: "Notaría Séptima de Barranquilla (E.P. 1.477)",
    status: "completado",
    legalBasis: "Ley 1996 de 2019 • Resolución 2665 de 2018 Minsalud",
    description: "Otorgamiento instrumentalizado de la Directiva Médica Anticipada (DVA). Se nombran como personas de apoyo a los sobrinos Ramón Pradilla, Manuel Pradilla y Francisco Franco, aislando deliberadamente a su única hija Liliana Gómez.",
    proceduralImpact: "Primera fase de la maniobra de captación y exclusión de la heredera forzosa en estado de vulnerabilidad médica.",
    strategicDirective: "Solicitar nulidad absoluta por falta de capacidad y violación del deber de salvaguarda de la voluntad real de la paciente.",
    referencedDocIds: ["DOC-ESC-1477", "DOC-ANA-000"],
    isCrucialDeadline: false
  },
  {
    id: "TL-005",
    code: "NOT-DESPOJO-24D",
    title: "Escrituras 2.411 (Fideicomiso) y 2.412 (Testamento/Desheredamiento)",
    dateString: "24 de Diciembre de 2025",
    isoDate: "2025-12-24",
    type: "notarial_medico",
    legalFront: "civil_familia",
    authority: "Notaría Séptima de Barranquilla (Diligencia a Domicilio)",
    status: "completado",
    legalBasis: "Código Civil Arts. 794, 1055, 1266 y 1740 • Ley 1934 de 2018",
    description: "Jornada express de víspera navideña. Suscripción a domicilio de la E.P. 2.411 (Fideicomiso que vacía los inmuebles de El Encanto y Chambacú a favor de sobrinos) y E.P. 2.412 (Testamento Abierto que pretende desheredar a Liliana Gómez e instituye a Daniel Conde como albacea con tenencia).",
    proceduralImpact: "Hecho generador de las nulidades absolutas por fraude pauliano, atipicidad de causales del Art. 1266 C.C., correos fraudulentos a las 5:33 AM y fallas biométricas sin huella dactilar.",
    strategicDirective: "Demanda principal de acumulación de nulidades testamentarias y restitución total a la masa sucesoral forzosa.",
    referencedDocIds: ["DOC-ESC-2411", "DOC-ESC-2412", "DOC-EML-533AM", "DOC-BIO-NOT7"],
    isCrucialDeadline: false
  },
  {
    id: "TL-006",
    code: "RAD-APOYO-26",
    title: "Radicación de Demanda de Adjudicación Judicial de Apoyos",
    dateString: "14 de Marzo de 2026",
    isoDate: "2026-03-14",
    type: "hito_procesal",
    legalFront: "civil_familia",
    authority: "Oficina Judicial de Barranquilla (Demanda en Línea)",
    status: "completado",
    legalBasis: "Ley 1996 de 2019 Art. 38 • CGP Art. 390 # 7",
    description: "Liliana Amparo Gómez Pradilla impetra demanda verbal sumaria de apoyos y configuración de salvaguardas para proteger la salud y el patrimonio de su madre Cecilia Pradilla ante la manipulación de terceros.",
    proceduralImpact: "Activa la competencia jurisdiccional de familia para salvaguardar a la titular antes de su deceso.",
    strategicDirective: "Acreditar el interés legítimo, oportuno y diligente de la hija única en la custodia jurídica de su progenitora.",
    referencedDocIds: ["DOC-AUTO-APOYO-2026"],
    isCrucialDeadline: false
  },
  {
    id: "TL-007",
    code: "REP-FAM05-26",
    title: "Reparto Judicial Asignado al Juzgado Quinto de Familia Oral",
    dateString: "24 de Abril de 2026",
    isoDate: "2026-04-24",
    type: "hito_procesal",
    legalFront: "civil_familia",
    authority: "Juzgado Quinto de Familia Oral de Barranquilla (Juez Castro Batista)",
    status: "completado",
    legalBasis: "CGP Art. 22 # 14 • Radicación 080013110005-2026-00168-00",
    description: "Acta individual de reparto secuencia 6366688. El despacho del Juez Alejandro Castro Batista avoca competencia exclusiva para la protección y salvaguardas de la causante.",
    proceduralImpact: "Fija el tribunal competente que más adelante decretará la medida cautelar provisional de apoyos y requerirá la acreditación de la defunción.",
    strategicDirective: "Radicar ante este mismo despacho de familia la apertura de la sucesión y nulidad sucesoral para preservar el fuero procesal.",
    referencedDocIds: ["DOC-AUTO-APOYO-2026"],
    isCrucialDeadline: false
  },
  {
    id: "TL-008",
    code: "INAD-SUBS-26",
    title: "Auto de Inadmisión y Término Legal de 5 Días para Subsanar",
    dateString: "30 de Julio de 2026",
    isoDate: "2026-07-30",
    type: "termino_legal",
    legalFront: "civil_familia",
    authority: "Juzgado Quinto de Familia Oral de Barranquilla",
    status: "completado",
    legalTermText: "5 días hábiles (CGP Art. 90)",
    legalBasis: "Código General del Proceso Art. 90",
    description: "Inadmisión de la demanda de apoyos por error involuntario de digitación en la ciudad de notificación (se mencionó Medellín, debiendo ser Calle 80 No. 51-69 Girasol Barranquilla). Término perentorio de 5 días para subsanación.",
    proceduralImpact: "El término vencía el 6 de agosto de 2026; la parte actora radicó el cumplimiento de requisitos el 3 de agosto de 2026, evitando el rechazo de la demanda.",
    strategicDirective: "Demuestra la diligencia y estricto cumplimiento de los términos procesales por parte del equipo apoderado de Liliana Gómez.",
    referencedDocIds: ["DOC-AUTO-APOYO-2026"],
    isCrucialDeadline: false
  },
  {
    id: "TL-009",
    code: "AUTO-ADM-CAUTELAR",
    title: "Auto Admisorio y Medida Cautelar Provisional de Apoyos a Liliana Gómez",
    dateString: "20 de Agosto de 2026",
    isoDate: "2026-08-20",
    type: "audiencia",
    legalFront: "civil_familia",
    authority: "Juzgado Quinto de Familia Oral de Barranquilla (Juez Castro Batista)",
    status: "completado",
    legalBasis: "Ley 1996 de 2019 Art. 5° # 1 • CGP Art. 390",
    description: "Providencia judicial histórica con firma electrónica SIGCMA. Admite la demanda verbal sumaria y decreta MEDIDA CAUTELAR PROVISIONAL nombrando formalmente a LILIANA AMPARO GÓMEZ PRADILLA como persona de apoyo de su madre Cecilia Pradilla, facultándola para manejo bancario, societario en Montacargas Gómez Ltda. y salvaguarda patrimonial.",
    proceduralImpact: "El Juzgado de Familia certificó formalmente la urgencia y vulnerabilidad de Cecilia Pradilla a sus 88 años y reconoció a Liliana Gómez como la protectora legal idónea de su madre.",
    strategicDirective: "Prueba reina que desvirtúa de plano el presunto desheredamiento por abandono o 'injuria grave' contemplado en el testamento del 24 de diciembre.",
    referencedDocIds: ["DOC-AUTO-APOYO-2026"],
    isCrucialDeadline: true
  },
  {
    id: "TL-010",
    code: "DEF-CECILIA-26",
    title: "Fallecimiento de Cecilia Pradilla de Gómez (Q.E.P.D.) y Apertura de Sucesión",
    dateString: "21 de Agosto de 2026 (14:10)",
    isoDate: "2026-08-21",
    type: "vencimiento_caducidad",
    legalFront: "civil_familia",
    authority: "Notaría Quinta de Barranquilla (Registro Civil Serial 11851575)",
    status: "completado",
    legalBasis: "Código Civil Art. 1012 • Decreto 1260 de 1970 Art. 73",
    description: "Fallecimiento de la causante a las 14:10 en Barranquilla, certificado por el Dr. Oscar Enrique Hernández Rodríguez. Cesa la vigencia del proceso de apoyos judiciales y se da apertura de pleno derecho a la sucesión ilíquida.",
    proceduralImpact: "Momento procesal exacto en que nace el derecho hereditario actual e irrevocable de Liliana Gómez Pradilla como heredera universal forzosa del 100% de la masa.",
    strategicDirective: "Interponer inmediatamente medidas cautelares preventivas de secuestro y guarda de bienes para frenar cualquier acto de los sobrinos o albaceas.",
    referencedDocIds: ["DOC-RC-DEF-CPG", "DOC-MEM-ZAPATA-2026"],
    isCrucialDeadline: true
  },
  {
    id: "TL-011",
    code: "TERM-DEF-3DIAS",
    title: "Auto del 4 de Septiembre: Suspensión de Desistimiento y Requerimiento de Defunción",
    dateString: "04 de Septiembre de 2026",
    isoDate: "2026-09-04",
    type: "termino_legal",
    legalFront: "civil_familia",
    authority: "Juzgado Quinto de Familia Oral de Barranquilla (Juez Castro Batista)",
    status: "completado",
    legalTermText: "3 días improrrogables",
    legalBasis: "Ley 1996 de 2019 • Ley 527 de 1999 (Código 5aa9b66fa440c...)",
    description: "El Juez suspende la solicitud de retiro formulada por la apoderada y advierte que la muerte de un sujeto procesal bajo la Ley 1996 de 2019 no puede suponerse: requiere formalmente el Registro Civil de Defunción dentro de 3 días.",
    proceduralImpact: "Asegura que el expediente de apoyos mantenga plena trazabilidad y no pueda ser archivado informalmente por terceros interesados.",
    strategicDirective: "Copia íntegra del expediente aportada al plenario de la demanda ordinaria sucesoral.",
    referencedDocIds: ["DOC-AUTO-SUSP-2026", "DOC-MEM-ZAPATA-2026"],
    isCrucialDeadline: false
  },
  {
    id: "TL-012",
    code: "VENC-SELLOS-GIR",
    title: "Vencimiento Ejecutoria y Aposición de Sellos sobre Apto 16 Edificio Girasol",
    dateString: "02 de Octubre de 2026",
    isoDate: "2026-10-02",
    type: "vencimiento_caducidad",
    legalFront: "civil_familia",
    authority: "Juzgado de Familia de Barranquilla • Policía Judicial",
    status: "critico_inminente",
    daysRemaining: 10,
    legalTermText: "Término perentorio urgente",
    legalBasis: "Código General del Proceso Art. 476 y 477 (Guarda y Aposición de Sellos)",
    description: "Fecha límite para perfeccionar la diligencia judicial de aposición de sellos y entrega de llaves del Penthouse de 396 m² del Edificio Girasol para impedir que el albacea Daniel Conde Gómez o los sobrinos tomen posesión indebida del inmueble.",
    proceduralImpact: "Si no se perfecciona la guarda, existe riesgo inminente de ocultamiento de minutas notariales, joyas, títulos valores y documentos contables de Montacargas Gómez Ltda.",
    strategicDirective: "Diligenciamiento con cerrajero judicial y escolta policial autorizada por el despacho de la Dra. Luz Karime Beetar de Devis.",
    referencedDocIds: ["DOC-TRAD-104047", "DOC-ESC-2412"],
    isCrucialDeadline: true
  },
  {
    id: "TL-013",
    code: "VENC-DEM-TEST",
    title: "Vencimiento para Radicación de Demanda Ordinaria de Nulidad de Testamento (E.P. 2.412)",
    dateString: "10 de Octubre de 2026",
    isoDate: "2026-10-10",
    type: "vencimiento_caducidad",
    legalFront: "civil_familia",
    authority: "Reparto Judicial de Familia - Circuito de Barranquilla",
    status: "critico_inminente",
    daysRemaining: 18,
    legalTermText: "Plazo de radicación inmediata Fase 1",
    legalBasis: "Código Civil Arts. 1055, 1059, 1266 • Ley 1934 de 2018",
    description: "Vencimiento del cronograma interno para presentar la demanda ordinaria de impugnación de testamento y declaratoria de ineficacia de la cláusula de desheredamiento con medidas cautelares de embargo y secuestro.",
    proceduralImpact: "Frena de raíz cualquier pretensión de partición voluntaria que intenten tramitar los sobrinos o el albacea ante notaría.",
    strategicDirective: "Radicar con solicitud inmediata de acumulación a la apertura del proceso sucesoral intestado.",
    referencedDocIds: ["DOC-ESC-2412", "DOC-ANA-000", "DOC-DEC-4912"],
    isCrucialDeadline: true
  },
  {
    id: "TL-014",
    code: "VENC-DEM-FIDEI",
    title: "Vencimiento para Demanda de Nulidad de Fideicomiso Civil (E.P. 2.411) e Inscripción en SNR",
    dateString: "18 de Octubre de 2026",
    isoDate: "2026-10-18",
    type: "vencimiento_caducidad",
    legalFront: "civil_familia",
    authority: "Oficinas de Registro de Barranquilla y Cartagena",
    status: "en_termino",
    daysRemaining: 26,
    legalTermText: "Inscripción cautelar perentoria",
    legalBasis: "Código Civil Art. 794 • CGP Art. 590 Numeral 1° Literal A",
    description: "Radicación de la demanda de nulidad absoluta y simulación de la E.P. 2.411 que afectó los bienes de El Encanto y Chambacú, con solicitud de inscripción de la demanda en los 26 folios de matrícula inmobiliaria.",
    proceduralImpact: "Saca los inmuebles del comercio impidiendo que los sobrinos puedan hipotecar, gravar o vender a terceros de presunta buena fe.",
    strategicDirective: "Oficiar a las ORIP de Barranquilla y Cartagena para garantizar la oponibilidad ante terceros.",
    referencedDocIds: ["DOC-ESC-2411", "DOC-TAB-PROP-01"],
    isCrucialDeadline: true
  },
  {
    id: "TL-015",
    code: "AUD-CONCIL-PRE",
    title: "Audiencia de Conciliación Extrajudicial Prejudicial en Derecho",
    dateString: "05 de Noviembre de 2026 (09:30 AM)",
    isoDate: "2026-11-05",
    type: "audiencia",
    legalFront: "civil_familia",
    authority: "Centro de Arbitraje y Conciliación de la Cámara de Comercio de Barranquilla",
    status: "proximo",
    daysRemaining: 44,
    legalTermText: "Audiencia fijada en calendario",
    legalBasis: "Ley 2220 de 2022 (Estatuto de Conciliación)",
    description: "Audiencia formal convocada contra Daniel Conde Gómez, Ángel Eduardo Conde Gómez, David Manuel Safi Gómez y los sobrinos Manuel y Ramón Pradilla para fijar inventario preliminar de bienes y exigir la restitución voluntaria del fideicomiso.",
    proceduralImpact: "Requisito de procedibilidad cumplido para la demanda declarativa. Permite tantear la disposición de allanamiento (Escenario A) bajo la presión penal.",
    strategicDirective: "La Dra. Luz Karime Beetar de Devis mantendrá postura de cero concesiones de legítimas forzosas: la herencia de Liliana es indivisible y total.",
    referencedDocIds: ["DOC-RC-30512033", "DOC-ESC-2411"],
    isCrucialDeadline: false
  },
  {
    id: "TL-016",
    code: "AUD-IMPUT-PENAL",
    title: "Audiencia de Formulación de Imputación Penal por Fraude Procesal y Falsedad",
    dateString: "20 de Noviembre de 2026 (02:00 PM)",
    isoDate: "2026-11-20",
    type: "audiencia",
    legalFront: "penal",
    authority: "Juzgado de Control de Garantías de Barranquilla • Fiscalía 12 Seccional",
    status: "proximo",
    daysRemaining: 59,
    legalTermText: "Audiencia Preliminar Concentrada",
    legalBasis: "Código Penal Colombiano Arts. 286, 287, 453 • Ley 906 de 2004",
    description: "Audiencia de imputación de cargos contra el abogado redactor Jaime Zapata Quintana, el abogado Carlos Mesa Rivas (testigo de Valledupar) y coautores por los delitos de Fraude Procesal y Falsedad Ideológica en Documento Público en la Notaría Séptima.",
    proceduralImpact: "Quiebre decisivo de la contraparte. La inminencia de medidas no privativas o privativas de la libertad precipita el allanamiento y la entrega pacífica de las escrituras.",
    strategicDirective: "Aportar los registros de llamadas, el dictamen de biometría fallida y los testimonios de las empleadas domésticas.",
    referencedDocIds: ["DOC-DEC-4912", "DOC-EML-533AM", "DOC-BIO-NOT7"],
    isCrucialDeadline: true
  },
  {
    id: "TL-017",
    code: "TERM-CADUC-4ANOS",
    title: "Término Extremo de Caducidad de la Acción de Nulidad Relativa (4 Años)",
    dateString: "24 de Diciembre de 2029",
    isoDate: "2029-12-24",
    type: "vencimiento_caducidad",
    legalFront: "civil_familia",
    authority: "Jurisdicción Civil y de Familia de Colombia",
    status: "proximo",
    daysRemaining: 1188,
    legalTermText: "4 años (Art. 1750 C.C.)",
    legalBasis: "Código Civil Colombiano Art. 1750",
    description: "Plazo legal perentorio de 4 años para alegar vicios del consentimiento (fuerza, dolo, error) en las escrituras otorgadas el 24 de diciembre de 2025.",
    proceduralImpact: "Al interponer la demanda ordinaria en octubre de 2026, la acción queda blindada con una antelación superior a 3 años, neutralizando cualquier excepción de caducidad.",
    strategicDirective: "Dejar formalmente interrumpida la prescripción con la notificación del auto admisorio.",
    referencedDocIds: ["DOC-ESC-2412", "DOC-ESC-2411"],
    isCrucialDeadline: false
  }
];

interface CronogramaLegalProps {
  onOpenDoc: (doc: CaseDocument) => void;
  onNavigateTab?: (tab: string) => void;
}

export const CronogramaLegal: React.FC<CronogramaLegalProps> = ({
  onOpenDoc,
  onNavigateTab
}) => {
  const [filterType, setFilterType] = useState<string>('todos');
  const [filterFront, setFilterFront] = useState<string>('todos');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedItemId, setExpandedItemId] = useState<string | null>("TL-012"); // default expand urgent one

  // Metrics
  const metrics = useMemo(() => {
    const total = TIMELINE_MILESTONES_DATA.length;
    const completed = TIMELINE_MILESTONES_DATA.filter(m => m.status === 'completado').length;
    const critical = TIMELINE_MILESTONES_DATA.filter(m => m.status === 'critico_inminente').length;
    const inTerm = TIMELINE_MILESTONES_DATA.filter(m => m.status === 'en_termino').length;
    const hearings = TIMELINE_MILESTONES_DATA.filter(m => m.type === 'audiencia').length;
    const deadlines = TIMELINE_MILESTONES_DATA.filter(m => m.type === 'vencimiento_caducidad').length;

    return { total, completed, critical, inTerm, hearings, deadlines };
  }, []);

  // Filtered timeline items
  const filteredItems = useMemo(() => {
    return TIMELINE_MILESTONES_DATA.filter(item => {
      // Type filter
      if (filterType !== 'todos' && item.type !== filterType) return false;
      // Front filter
      if (filterFront !== 'todos' && item.legalFront !== filterFront) return false;
      // Status filter
      if (filterStatus !== 'todos' && item.status !== filterStatus) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.authority.toLowerCase().includes(q) ||
          item.legalBasis.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filterType, filterFront, filterStatus, searchQuery]);

  const getStatusBadge = (status: TimelineMilestoneItem['status']) => {
    switch (status) {
      case 'completado':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 size={11} /> Evacuado / Cumplido
          </span>
        );
      case 'critico_inminente':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
            <AlertTriangle size={11} /> Vencimiento Crítico Inminente
          </span>
        );
      case 'en_termino':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
            <Clock size={11} /> En Término Legal Activo
          </span>
        );
      case 'proximo':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
            <Calendar size={11} /> Programado en Calendario
          </span>
        );
    }
  };

  const getTypeIcon = (type: TimelineEventType) => {
    switch (type) {
      case 'audiencia':
        return <Gavel size={16} className="text-amber-600" />;
      case 'termino_legal':
        return <Clock size={16} className="text-blue-600" />;
      case 'vencimiento_caducidad':
        return <AlertCircle size={16} className="text-rose-600" />;
      case 'notarial_medico':
        return <Building2 size={16} className="text-purple-600" />;
      case 'hito_procesal':
        return <Landmark size={16} className="text-slate-600" />;
    }
  };

  const getFrontLabel = (front: LegalFront) => {
    switch (front) {
      case 'civil_familia':
        return { label: 'Civil Familia', color: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'penal':
        return { label: 'Penal Fiscalía', color: 'bg-rose-50 text-rose-800 border-rose-200' };
      case 'societario':
        return { label: 'Societario Mercantil', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'gerencial':
        return { label: 'Gerencial Directivo', color: 'bg-slate-50 text-slate-800 border-slate-200' };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden" id="componente-cronograma-legal">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-7 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-300 font-semibold tracking-wider uppercase">
              <Calendar size={15} />
              <span>Cronograma Procesal Oficial • Ley 1564/2012 (CGP) & Ley 1996/2019</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-white">
              Cronograma Legal de Audiencias, Términos y Vencimientos
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Monitoreo perentorio de términos judiciales, fechas de fijación en lista, requerimientos de los Juzgados de Familia,
              sesiones de conciliación y control de caducidades bajo la dirección de la <strong>Dra. Luz Karime Beetar de Devis</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <div className="bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/15 text-right font-mono">
              <div className="text-[10px] text-blue-200 font-sans uppercase">Hitos Procesales</div>
              <div className="text-lg font-bold text-white leading-none mt-0.5">{metrics.total} Registrados</div>
            </div>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-5 border-t border-white/10 text-xs">
          <div className="bg-white/5 rounded-lg p-2.5 border border-white/10 flex items-center justify-between">
            <span className="text-slate-300">Evacuados / Pasados:</span>
            <strong className="font-mono text-emerald-400 font-bold">{metrics.completed}</strong>
          </div>
          <div className="bg-white/5 rounded-lg p-2.5 border border-white/10 flex items-center justify-between">
            <span className="text-slate-300">Vencimientos Críticos:</span>
            <strong className="font-mono text-rose-400 font-bold">{metrics.critical}</strong>
          </div>
          <div className="bg-white/5 rounded-lg p-2.5 border border-white/10 flex items-center justify-between">
            <span className="text-slate-300">Términos Activos:</span>
            <strong className="font-mono text-blue-300 font-bold">{metrics.inTerm}</strong>
          </div>
          <div className="bg-white/5 rounded-lg p-2.5 border border-white/10 flex items-center justify-between">
            <span className="text-slate-300">Audiencias Fijadas:</span>
            <strong className="font-mono text-amber-300 font-bold">{metrics.hearings}</strong>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="bg-slate-50/80 p-4 border-b border-slate-200 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Buscar por acto, despacho, término, norma (ej: 'sellos', 'inadmisión', 'Crump', 'imputación')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-700 shadow-2xs"
            />
          </div>

          {/* Quick Filter Selects */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-700 shadow-2xs"
            >
              <option value="todos">Todos los Tipos ({metrics.total})</option>
              <option value="audiencia">Audiencias Judiciales ({metrics.hearings})</option>
              <option value="termino_legal">Términos Legales</option>
              <option value="vencimiento_caducidad">Vencimientos y Caducidad ({metrics.deadlines})</option>
              <option value="notarial_medico">Actos Notariales & Médicos</option>
              <option value="hito_procesal">Hitos Procesales Históricos</option>
            </select>

            <select
              value={filterFront}
              onChange={(e) => setFilterFront(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-700 shadow-2xs"
            >
              <option value="todos">Todos los Frentes</option>
              <option value="civil_familia">Civil Familia</option>
              <option value="penal">Penal Fiscalía</option>
              <option value="societario">Societario Mercantil</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-700 shadow-2xs"
            >
              <option value="todos">Cualquier Estado</option>
              <option value="critico_inminente">Críticos Inminentes</option>
              <option value="en_termino">En Término Legal</option>
              <option value="completado">Completados</option>
              <option value="proximo">Próximos</option>
            </select>
          </div>
        </div>

        {/* Informative Urgent Notice */}
        <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-950">
          <AlertTriangle size={16} className="text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-snug">
            <strong>Atención de Términos (Septiembre - Octubre 2026):</strong> Se encuentran corriendo los plazos 
            para la radicación perentoria de la <em>Demanda Ordinaria de Nulidad de Testamento (E.P. 2.412)</em> y la{' '}
            <em>Aposición de Sellos sobre el Edificio Girasol</em> para neutralizar al albacea Daniel Conde Gómez.
          </div>
        </div>
      </div>

      {/* Main Timeline View */}
      <div className="p-5 sm:p-7 space-y-4">
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <Calendar size={36} className="mx-auto text-slate-300" />
            <p className="text-sm font-medium text-slate-600">No se encontraron hitos procesales con los filtros seleccionados.</p>
            <button
              onClick={() => { setFilterType('todos'); setFilterFront('todos'); setFilterStatus('todos'); setSearchQuery(''); }}
              className="text-xs text-blue-700 underline font-semibold"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-6">
            {filteredItems.map((item, index) => {
              const isExpanded = expandedItemId === item.id;
              const frontInfo = getFrontLabel(item.legalFront);

              return (
                <div 
                  key={item.id} 
                  className="relative pl-6 sm:pl-8 group"
                >
                  {/* Timeline Node Icon */}
                  <div className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center shadow-xs transition ${
                    item.status === 'critico_inminente' 
                      ? 'border-rose-500 bg-rose-50 text-rose-700 ring-4 ring-rose-100' 
                      : item.status === 'completado'
                        ? 'border-emerald-500 text-emerald-700'
                        : item.status === 'en_termino'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-4 ring-blue-50'
                          : 'border-slate-300 text-slate-500'
                  }`}>
                    {getTypeIcon(item.type)}
                  </div>

                  {/* Card Container */}
                  <div className={`rounded-xl border transition ${
                    item.status === 'critico_inminente'
                      ? 'bg-rose-50/40 border-rose-200 shadow-2xs hover:border-rose-300'
                      : isExpanded
                        ? 'bg-slate-50/70 border-blue-200 shadow-xs ring-1 ring-blue-100'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}>
                    {/* Header Row (Clickable) */}
                    <div 
                      onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                      className="p-4 sm:p-5 cursor-pointer select-none space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        {/* Date & Tags */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                            {item.dateString}
                          </span>

                          {item.daysRemaining !== undefined && item.daysRemaining > 0 && (
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono ${
                              item.daysRemaining <= 15 
                                ? 'bg-rose-600 text-white animate-pulse' 
                                : 'bg-amber-100 text-amber-900 border border-amber-200'
                            }`}>
                              ⏳ Faltan {item.daysRemaining} días
                            </span>
                          )}

                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${frontInfo.color}`}>
                            {frontInfo.label}
                          </span>

                          {item.legalTermText && (
                            <span className="font-mono text-[10px] bg-purple-50 text-purple-900 border border-purple-200 px-2 py-0.5 rounded font-semibold">
                              {item.legalTermText}
                            </span>
                          )}
                        </div>

                        {/* Status Badge & Expand Caret */}
                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          {getStatusBadge(item.status)}
                          <div className="text-slate-400 group-hover:text-slate-700 transition">
                            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                          </div>
                        </div>
                      </div>

                      {/* Title & Authority */}
                      <div>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug group-hover:text-blue-900 transition">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <Landmark size={13} className="text-slate-400" />
                            {item.authority}
                          </span>
                          <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                            <Tag size={12} className="text-slate-400" />
                            Base: {item.legalBasis}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Expandable Deep Forensic & Procedural Details */}
                    {isExpanded && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 border-t border-slate-200/80 space-y-3.5 animate-fadeIn">
                        {/* Procedural Impact Box */}
                        <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-blue-950 font-serif">
                            <Scale size={14} className="text-blue-700" />
                            <span>Trascendencia Procesal y Jurídica:</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed font-sans">
                            {item.proceduralImpact}
                          </p>
                        </div>

                        {/* Directoria Dra. Luz Karime */}
                        <div className="bg-blue-50/60 p-3.5 rounded-lg border border-blue-200 space-y-1 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-blue-950 font-serif">
                            <ShieldCheck size={14} className="text-blue-800" />
                            <span>Directriz Estratégica del Despacho (Dra. Luz Karime Beetar):</span>
                          </div>
                          <p className="text-blue-950 leading-relaxed font-sans font-medium">
                            {item.strategicDirective}
                          </p>
                        </div>

                        {/* Associated Documents Strip */}
                        {item.referencedDocIds && item.referencedDocIds.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                            <span className="text-slate-500 font-semibold flex items-center gap-1">
                              <FileText size={13} />
                              Documentos Vinculados al Hito:
                            </span>
                            {item.referencedDocIds.map((docId) => (
                              <DocReferencePill
                                key={docId}
                                docId={docId}
                                onOpenDoc={onOpenDoc}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Summary Notice */}
      <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldAlert size={15} className="text-blue-800" />
          <span>Control estricto de términos conforme al Código General del Proceso (Ley 1564 de 2012)</span>
        </div>
        {onNavigateTab && (
          <button
            onClick={() => onNavigateTab('acciones')}
            className="text-blue-800 hover:text-blue-950 font-semibold flex items-center gap-1 transition cursor-pointer"
          >
            <span>Consultar Matriz de Acciones Procesales</span>
            <ArrowUpRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
