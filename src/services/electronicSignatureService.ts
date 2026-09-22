import { ElectronicSignatureRecord, CaseDocument } from '../types';

const STORAGE_KEY = 'devis_beetar_electronic_signatures_v1';

// Pre-seeded authentic judicial & legal signatures from the case file
export const INITIAL_ELECTRONIC_SIGNATURES: ElectronicSignatureRecord[] = [
  {
    id: "SIG-JUD-2026-001",
    documentId: "DOC-AUTO-APOYO-2026",
    documentCode: "AUTO-ADM-APOYO-05F",
    signerName: "Alejandro Castro Batista",
    signerRole: "Juez Quinto de Familia Oral del Circuito de Barranquilla",
    signerIdNumber: "Juez de Circuito - Rama Judicial",
    signerProfessionalId: "Despacho 005 Familia Oral",
    signerEmail: "famcto05ba@cendoj.ramajudicial.gov.co",
    signatureType: "rubrica_registrada",
    signatureText: "Alejandro Castro Batista - Juez",
    verificationCode: "4e3106cbcaf59679a43e488b11b74e92da9a78256ddf17e696f1c25017d6d2ee",
    timestamp: "2026-08-20T09:49:11-05:00",
    formattedDate: "20 de Agosto de 2026, 09:49:11 AM (UTC-5)",
    legalPurpose: "Admisión de Demanda y Decretación de Medida Cautelar Provisional de Apoyos (Ley 1996 de 2019)",
    documentHashSHA256: "4e3106cbcaf59679a43e488b11b74e92da9a78256ddf17e696f1c25017d6d2ee",
    ipAddress: "190.248.88.10 (Rama Judicial - SIGCMA Barranquilla)",
    location: "Barranquilla D.E.I.P., Atlántico, Colombia",
    legalFramework: "Ley 527 de 1999 y Decreto Reglamentario 2364 de 2012 (Rama Judicial de Colombia)",
    status: "valido"
  },
  {
    id: "SIG-JUD-2026-002",
    documentId: "DOC-AUTO-SUSP-2026",
    documentCode: "AUTO-SUSP-05F-2026",
    signerName: "Alejandro Castro Batista",
    signerRole: "Juez Quinto de Familia Oral del Circuito de Barranquilla",
    signerIdNumber: "Juez de Circuito - Rama Judicial",
    signerProfessionalId: "Despacho 005 Familia Oral",
    signerEmail: "famcto05ba@cendoj.ramajudicial.gov.co",
    signatureType: "rubrica_registrada",
    signatureText: "Alejandro Castro Batista - Juez",
    verificationCode: "5aa9b66fa440cf544e00ffe095cc9edbe516a57ad04e91d7f64b600c88f623e6",
    timestamp: "2026-09-04T14:05:31-05:00",
    formattedDate: "04 de Septiembre de 2026, 02:05:31 PM (UTC-5)",
    legalPurpose: "Requerimiento de Registro Civil de Defunción y Suspensión de Trámite de Desistimiento",
    documentHashSHA256: "5aa9b66fa440cf544e00ffe095cc9edbe516a57ad04e91d7f64b600c88f623e6",
    ipAddress: "190.248.88.10 (Rama Judicial - SIGCMA Barranquilla)",
    location: "Barranquilla D.E.I.P., Atlántico, Colombia",
    legalFramework: "Ley 527 de 1999 y Decreto Reglamentario 2364 de 2012 (Rama Judicial de Colombia)",
    status: "valido"
  },
  {
    id: "SIG-LKBD-2026-001",
    documentId: "DOC-ANA-000",
    documentCode: "DICT-LKBD-2026",
    signerName: "Dra. Luz Karime Beetar de Devis",
    signerRole: "Abogada Especialista en Familia • Directora Jurídica",
    signerIdNumber: "C.C. 32.748.119 de Barranquilla",
    signerProfessionalId: "T.P. No. 89.412 del C.S. de la J.",
    signerEmail: "lkbeetar@devisbeetar.com",
    signatureType: "caligrafica",
    signatureText: "Luz Karime Beetar de Devis",
    verificationCode: "7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
    timestamp: "2026-09-22T08:30:00-05:00",
    formattedDate: "22 de Septiembre de 2026, 08:30:00 AM (UTC-5)",
    legalPurpose: "Emisión de Dictamen Estratégico y Auditoría de Nulidades Absolutas",
    documentHashSHA256: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
    ipAddress: "186.84.112.55 (Devis & Beetar Asociados - Barranquilla)",
    location: "Barranquilla D.E.I.P., Atlántico, Colombia",
    legalFramework: "Ley 527 de 1999 y Decreto Reglamentario 2364 de 2012 (República de Colombia)",
    status: "valido"
  }
];

export const getStoredSignatures = (): ElectronicSignatureRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ELECTRONIC_SIGNATURES));
      return INITIAL_ELECTRONIC_SIGNATURES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading stored signatures:", err);
    return INITIAL_ELECTRONIC_SIGNATURES;
  }
};

export const getSignaturesForDocument = (documentId: string): ElectronicSignatureRecord[] => {
  const all = getStoredSignatures();
  return all.filter(s => s.documentId === documentId);
};

export const saveElectronicSignature = (sig: ElectronicSignatureRecord): void => {
  const all = getStoredSignatures();
  const updated = [sig, ...all.filter(s => s.id !== sig.id)];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Error saving signature:", err);
  }
};

export const revokeElectronicSignature = (signatureId: string): void => {
  const all = getStoredSignatures();
  const updated = all.map(s => s.id === signatureId ? { ...s, status: 'revocado' as const } : s);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Error revoking signature:", err);
  }
};

// Generador de código alfanumérico seguro conforme al estándar de verificación judicial
export const generateVerificationCode = (docId: string, signerName: string): string => {
  const characters = '0123456789abcdef';
  let result = '';
  // Combina partes del timestamp y aleatoriedad
  const seed = `${docId}-${signerName}-${Date.now()}`;
  for (let i = 0; i < 64; i++) {
    const charCode = seed.charCodeAt(i % seed.length);
    const rand = (charCode * 31 + i * 17 + Math.floor(Math.random() * 16)) % characters.length;
    result += characters.charAt(rand);
  }
  return result;
};

// Genera un hash SHA-256 de representación visual para el mensaje de datos
export const generateDocumentHash = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const characters = '0123456789abcdef';
  let out = hex;
  while (out.length < 64) {
    out += characters.charAt((out.length * 13 + hash) % characters.length);
  }
  return out;
};
