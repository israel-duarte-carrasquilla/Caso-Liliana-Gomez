/**
 * Tipos e interfaces del Sistema de Gerencia Legal y Caso de la Sra. Liliana Gómez Pradilla
 * Dirección Jurídica: Dra. Luz Karime Beetar de Devis (Especialista en Derecho de Familia)
 * Caso: Nulidad de Fideicomiso Civil, Impugnación de Testamento con Desheredamiento e Intervención Societaria
 */

export type LegalFront = 'civil_familia' | 'penal' | 'societario' | 'gerencial';

export type DocumentType = 
  | 'escritura'
  | 'testamento'
  | 'fideicomiso'
  | 'directiva_anticipada'
  | 'certificado_tradicion'
  | 'certificado_mercantil'
  | 'declaracion_extrajuicio'
  | 'dictamen_medico'
  | 'acta_biometrica'
  | 'registro_civil'
  | 'analisis_juridico'
  | 'memorial'
  | 'correo_probatorio';

export interface LegalImpactDetail {
  familia: string;
  penal: string;
  societario: string;
}

export interface CaseDocument {
  id: string;
  code: string;
  title: string;
  category: LegalFront;
  type: DocumentType;
  date: string;
  radicado: string;
  authority: string;
  notaryOrEntity: string;
  folioCount: number;
  integrityHash: string;
  summary: string;
  legalImpact: LegalImpactDetail;
  keyEvidence: string[];
  strategicValue: string;
  fullText: string;
  downloadFileName: string;
  status: 'otorgado' | 'impugnado' | 'en_custodia' | 'aportado' | 'bajo_analisis';
  signedBy: string;
  partiesInvolved: string[];
  propertyInvolved?: string;
  caducidadOrPrescripcion?: string;
}

export interface ActionItem {
  id: string;
  code: string;
  legalFront: LegalFront;
  title: string;
  description: string;
  phase: string;
  priority: 'critica' | 'alta' | 'media';
  status: 'completado' | 'en_progreso' | 'pendiente' | 'en_espera';
  progress: number;
  deadline: string;
  responsible: string;
  impactCivil: string;
  impactPenal: string;
  impactSocietario: string;
  expectedDeliverable: string;
  referencedDocIds: string[];
}

export interface RiskItem {
  id: string;
  code: string;
  category: LegalFront;
  title: string;
  description: string;
  probability: number; // 1-5
  severity: number;    // 1-5
  score: number;
  level: 'Critico' | 'Alto' | 'Medio' | 'Bajo';
  triggerIndicator: string;
  mitigationAction: string;
  mitigationStatus: 'mitigado' | 'en_mitigacion' | 'alerta_activa';
  referencedDocIds: string[];
}

export type AssetCluster = 
  | 'causante_directo'        // A nombre directo de Cecilia Pradilla de Gómez
  | 'vehiculo_sas'            // Desviado a Montajes Inversiones y Asesorías S.A.S.
  | 'desviado_sobrinos'       // A nombre de Manuel Pradilla o Francisco Franco
  | 'bajo_averiguacion'       // Local 15 Arfel, etc.
  | 'descartado_no_propio';   // Gardenias ("no es nuestro")

export interface AssetItem {
  id: string;
  code: string;
  name: string;
  type: 'inmueble' | 'cuotas_sociales' | 'oficina_comercial' | 'vehiculo_garaje' | 'bodega' | 'lote_rural' | 'remanente';
  matriculaInmobiliaria: string;
  referenciaCatastral: string;
  matriculaOrNit?: string;
  tipoDeBien: string;
  ubicacion: string;
  location?: string;
  medidasLinderos: string;
  titularActual: string;
  gravamenAfectacion: string;
  tituloAdquisicion: string;
  precioAdquisicion: string;
  estimatedValueCOP: number;
  cluster: AssetCluster;
  legalStatus: string;
  cautelarStatus: 'en_fideicomiso_impugnado' | 'en_testamento_impugnado' | 'en_riesgo_albacea' | 'asegurado' | 'bajo_investigacion' | 'descartado';
  referencedDocIds: string[];
  strategicNote?: string;
}

export interface ElectronicSignatureRecord {
  id: string;
  documentId: string;
  documentCode: string;
  signerName: string;
  signerRole: string;
  signerIdNumber: string;
  signerProfessionalId?: string;
  signerEmail: string;
  signatureType: 'manuscrita' | 'caligrafica' | 'rubrica_registrada';
  signatureDataUrl?: string;
  signatureText?: string;
  verificationCode: string;
  timestamp: string;
  formattedDate: string;
  legalPurpose: string;
  documentHashSHA256: string;
  ipAddress: string;
  location: string;
  legalFramework: string;
  status: 'valido' | 'revocado' | 'en_verificacion';
}

export interface CaseMilestone {
  id: string;
  phase: number;
  phaseName: string;
  title: string;
  description: string;
  targetDate: string;
  status: 'completado' | 'en_curso' | 'proximo';
  progress: number;
  keyDeliverable: string;
  leadingFront: LegalFront;
  referencedDocIds: string[];
}

export interface StrategicScenario {
  id: string;
  name: string;
  probability: string;
  timeframe: string;
  financialExpectation: string;
  description: string;
  tacticalAdvantage: string;
  potentialRisks: string;
  recommendedPosition: string;
}
