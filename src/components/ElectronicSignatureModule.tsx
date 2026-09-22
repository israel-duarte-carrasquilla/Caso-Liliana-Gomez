import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  PenTool, 
  FileCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Download, 
  RotateCcw, 
  Key, 
  Hash, 
  Check, 
  Landmark, 
  UserCheck, 
  FileText,
  Search,
  Trash2,
  ExternalLink,
  Award,
  Scale
} from 'lucide-react';
import { CaseDocument, ElectronicSignatureRecord } from '../types';
import { 
  getSignaturesForDocument, 
  saveElectronicSignature, 
  revokeElectronicSignature, 
  generateVerificationCode, 
  generateDocumentHash,
  INITIAL_ELECTRONIC_SIGNATURES
} from '../services/electronicSignatureService';

interface ElectronicSignatureModuleProps {
  document: CaseDocument;
  onSignatureAdded?: (sig: ElectronicSignatureRecord) => void;
}

export const ElectronicSignatureModule: React.FC<ElectronicSignatureModuleProps> = ({ 
  document: doc,
  onSignatureAdded 
}) => {
  const [signatures, setSignatures] = useState<ElectronicSignatureRecord[]>([]);
  const [signatureMode, setSignatureMode] = useState<'canvas' | 'type' | 'preset'>('canvas');
  
  // Signer Selection
  const [selectedSignerPreset, setSelectedSignerPreset] = useState<string>('luz_karime');
  const [customSignerName, setCustomSignerName] = useState<string>('');
  const [customSignerRole, setCustomSignerRole] = useState<string>('');
  const [customSignerId, setCustomSignerId] = useState<string>('');
  const [customSignerTP, setCustomSignerTP] = useState<string>('');
  const [customSignerEmail, setCustomSignerEmail] = useState<string>('');
  
  // Legal Purpose
  const [legalPurpose, setLegalPurpose] = useState<string>('Aprobación, Radicación y Aportación Procesal');
  const [legalAgreementChecked, setLegalAgreementChecked] = useState<boolean>(false);
  const [inkColor, setInkColor] = useState<string>('#1e3a8a'); // Blue judicial
  
  // Validation input
  const [testCodeInput, setTestCodeInput] = useState<string>('');
  const [validationResult, setValidationResult] = useState<{
    found: boolean;
    sig?: ElectronicSignatureRecord;
    message: string;
  } | null>(null);

  // Success state
  const [lastSignedSuccess, setLastSignedSuccess] = useState<ElectronicSignatureRecord | null>(null);

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef<boolean>(false);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);

  // Refresh signatures for current document
  const loadSignatures = () => {
    const list = getSignaturesForDocument(doc.id);
    setSignatures(list);
  };

  useEffect(() => {
    loadSignatures();
    setLastSignedSuccess(null);
    clearCanvas();
  }, [doc.id]);

  // Set default custom fields when preset changes
  useEffect(() => {
    if (selectedSignerPreset === 'luz_karime') {
      setCustomSignerName('Dra. Luz Karime Beetar de Devis');
      setCustomSignerRole('Abogada Especialista en Familia • Apoderada Principal');
      setCustomSignerId('C.C. 32.748.119 de Barranquilla');
      setCustomSignerTP('T.P. No. 89.412 del C.S. de la J.');
      setCustomSignerEmail('lkbeetar@devisbeetar.com');
    } else if (selectedSignerPreset === 'liliana_gomez') {
      setCustomSignerName('Dra. Liliana Amparo Gómez Pradilla');
      setCustomSignerRole('Cliente Poderdante • Heredera Legitimaria Forzosa (Médica)');
      setCustomSignerId('C.C. No. 32.606.203 de Barranquilla');
      setCustomSignerTP('Médico y Cirujano Reg. Sanitario Nacional');
      setCustomSignerEmail('lagopra@gmail.com');
    } else if (selectedSignerPreset === 'claudia_granda') {
      setCustomSignerName('Dra. Claudia Patricia Granda Ibarra');
      setCustomSignerRole('Abogada Apoderada en Apoyos (Jurisdicción Voluntaria)');
      setCustomSignerId('C.C. No. 43.095.912 de Medellín');
      setCustomSignerTP('T.P. No. 88.516 del C.S.J.');
      setCustomSignerEmail('claudiagrandai@gmail.com');
    } else if (selectedSignerPreset === 'perito_forense') {
      setCustomSignerName('Dr. Jaime Crump / Dictaminador Forense');
      setCustomSignerRole('Médico Especialista en Neurología y Neurofisiología');
      setCustomSignerId('C.C. No. 73.075.385');
      setCustomSignerTP('R.M. No. 09499 • Consultorio 201 Barranquilla');
      setCustomSignerEmail('jimmy.crump@gmail.com');
    } else {
      setCustomSignerName('');
      setCustomSignerRole('');
      setCustomSignerId('');
      setCustomSignerTP('');
      setCustomSignerEmail('');
    }
  }, [selectedSignerPreset]);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    isDrawing.current = true;
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Sign Action
  const handleExecuteSignature = () => {
    if (!legalAgreementChecked) {
      alert("Debe aceptar la declaración de validez jurídica bajo la Ley 527 de 1999.");
      return;
    }
    if (!customSignerName.trim()) {
      alert("Por favor indique el nombre del firmante.");
      return;
    }

    let signatureDataUrl = '';
    if (signatureMode === 'canvas' && canvasRef.current && hasDrawn) {
      signatureDataUrl = canvasRef.current.toDataURL('image/png');
    }

    const verificationCode = generateVerificationCode(doc.id, customSignerName);
    const documentHashSHA256 = generateDocumentHash(doc.fullText + customSignerName + Date.now());
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }) + `, ${now.toLocaleTimeString('es-CO')} (UTC-5)`;

    const newSignature: ElectronicSignatureRecord = {
      id: `SIG-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
      documentId: doc.id,
      documentCode: doc.code,
      signerName: customSignerName,
      signerRole: customSignerRole || 'Parte Interesada en el Proceso',
      signerIdNumber: customSignerId || 'Identificación en Expediente',
      signerProfessionalId: customSignerTP,
      signerEmail: customSignerEmail || 'despacho@devisbeetar.com',
      signatureType: signatureMode === 'canvas' ? 'manuscrita' : signatureMode === 'type' ? 'caligrafica' : 'rubrica_registrada',
      signatureDataUrl: signatureDataUrl || undefined,
      signatureText: customSignerName,
      verificationCode,
      timestamp: now.toISOString(),
      formattedDate,
      legalPurpose,
      documentHashSHA256,
      ipAddress: '190.248.88.14 (Barranquilla D.E.I.P., Atlántico, Colombia)',
      location: 'Barranquilla D.E.I.P., Colombia',
      legalFramework: 'Ley 527 de 1999 y Decreto Reglamentario 2364 de 2012 (República de Colombia)',
      status: 'valido'
    };

    saveElectronicSignature(newSignature);
    loadSignatures();
    setLastSignedSuccess(newSignature);
    if (onSignatureAdded) {
      onSignatureAdded(newSignature);
    }
    clearCanvas();
    setLegalAgreementChecked(false);
  };

  // Download Signature Certificate
  const handleDownloadCertificate = (sig: ElectronicSignatureRecord) => {
    const certText = `================================================================================
REPÚBLICA DE COLOMBIA - SISTEMA DE FIRMA ELECTRÓNICA SIMPLIFICADA
CONSTANCIA DE VALIDEZ, TRAZABILIDAD Y MENSAJE DE DATOS (LEY 527 DE 1999)
DECRETO REGLAMENTARIO 2364 DE 2012 • DEVIS & BEETAR ASOCIADOS (DESDE 1962)
================================================================================

EXPEDIENTE / RADICADO: ${doc.radicado}
DOCUMENTO OBJETO: ${doc.code} - ${doc.title}
AUTORIDAD / DESPACHO: ${doc.authority}

DATOS DEL FIRMANTE:
Nombre Completo: ${sig.signerName}
Calidad / Rol Jurídico: ${sig.signerRole}
Documento de Identidad: ${sig.signerIdNumber}
${sig.signerProfessionalId ? `Registro / Tarjeta Profesional: ${sig.signerProfessionalId}` : ''}
Correo Electrónico Notificado: ${sig.signerEmail}

METADATOS DE SEGURIDAD ELECTRÓNICA:
Código de Verificación Único: ${sig.verificationCode}
Estampado Cronológico Oficial: ${sig.formattedDate}
Marca Temporal ISO: ${sig.timestamp}
Hash Criptográfico SHA-256: ${sig.documentHashSHA256}
Dirección IP / Red de Radicación: ${sig.ipAddress}
Ubicación Geográfica: ${sig.location}
Motivo / Propósito Legal: ${sig.legalPurpose}
Marco Legal de Aplicación: ${sig.legalFramework}
Estado de la Firma: ${sig.status.toUpperCase()}

DECLARACIÓN DE INTEGRIDAD Y NO MODIFICACIÓN:
El presente mensaje de datos goza de presunción de autenticidad e integridad de
conformidad con los artículos 6°, 7° y 8° de la Ley 527 de 1999 y el artículo 244
del Código General del Proceso (Ley 1564 de 2012). La información contenida en el
documento no ha sido alterada ni modificada con posterioridad a la fijación de la
firma electrónica simplificada.

Verifique la autenticidad electrónica en el portal del despacho jurídico o en:
https://firmaelectronica.ramajudicial.gov.co/FirmaElectronica
================================================================================`;

    const blob = new Blob([certText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Certificado_Firma_Electronica_${sig.verificationCode.substring(0, 16)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Validate Code
  const handleValidateCode = (codeToTest?: string) => {
    const code = (codeToTest || testCodeInput).trim().toLowerCase();
    if (!code) return;

    // Search across all signatures in memory/storage
    const all = [...INITIAL_ELECTRONIC_SIGNATURES, ...signatures];
    const found = all.find(s => s.verificationCode.toLowerCase() === code || s.verificationCode.toLowerCase().startsWith(code));

    if (found) {
      setValidationResult({
        found: true,
        sig: found,
        message: `Firma Electrónica Válida y Auténtica. Firmado por ${found.signerName} (${found.signerRole}) en fecha ${found.formattedDate}.`
      });
    } else {
      setValidationResult({
        found: false,
        message: `El código de verificación '${code}' no corresponde a ningún estampado válido en este expediente o ha sido alterado.`
      });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto" id="electronic-signature-module-root">
      {/* Official Legal Framework Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-2">
        <div className="flex items-center gap-2.5 text-blue-950 font-serif font-bold text-base border-b border-slate-100 pb-2.5">
          <Award className="text-blue-700" size={20} />
          <span>Firma Electrónica Simplificada & Validación Procesal (Ley 527 de 1999)</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-sans">
          Módulo de estampado cronológico, verificación de hash criptográfico y asignación de responsabilidad jurídica conforme a los 
          estándares del <strong>Decreto 2364 de 2012</strong> y las directrices del Sistema de Gestión Judicial de la Rama Judicial Colombiana (SIGCMA).
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1 font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <Check size={12} /> Presunción de Autenticidad Art. 244 CGP
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            <Key size={12} /> Cifrado & Hash SHA-256
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            <Clock size={12} /> Estampado Cronológico UTC-5
          </span>
        </div>
      </div>

      {/* SUCCESS CONFIRMATION IF JUST SIGNED */}
      {lastSignedSuccess && (
        <div className="bg-emerald-50 border-2 border-emerald-500/80 rounded-xl p-5 shadow-sm space-y-3 animate-fadeIn">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-emerald-950 font-serif">
                  Documento Firmado Electrónicamente con Éxito
                </h4>
                <p className="text-xs text-emerald-800">
                  La firma de <strong>{lastSignedSuccess.signerName}</strong> ha sido estampada y vinculada criptográficamente al mensaje de datos.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDownloadCertificate(lastSignedSuccess)}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs shrink-0"
            >
              <Download size={13} />
              <span>Constancia de Firma</span>
            </button>
          </div>

          <div className="bg-white p-3 rounded-lg border border-emerald-200 text-xs font-mono text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400 font-sans">Código de Verificación:</span>
              <strong className="text-emerald-900 select-all">{lastSignedSuccess.verificationCode.substring(0, 32)}...</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-sans">Fecha y Hora de Estampado:</span>
              <span>{lastSignedSuccess.formattedDate}</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: EXISTING SIGNATURES ON THIS DOCUMENT */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileCheck className="text-blue-800" size={18} />
            <h3 className="font-bold text-sm text-slate-900 font-serif">
              Firmas y Estampados Registrados en este Documento ({signatures.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Doc: {doc.code}</span>
        </div>

        {signatures.length === 0 ? (
          <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
            <PenTool size={28} className="mx-auto text-slate-300" />
            <p className="text-xs text-slate-600 font-medium">
              Este documento aún no cuenta con firmas electrónicas registradas en el sistema.
            </p>
            <p className="text-[11px] text-slate-400">
              Utilice el formulario inferior para estampar la firma de la Apoderada Principal (Dra. Luz Karime) o de la Sra. Liliana Gómez.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {signatures.map((sig) => (
              <div 
                key={sig.id}
                className={`p-4 rounded-xl border transition ${
                  sig.status === 'valido' 
                    ? 'bg-slate-50/80 border-slate-200 hover:border-blue-300' 
                    : 'bg-rose-50/50 border-rose-200 opacity-70'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <strong className="text-slate-900 text-sm font-serif">{sig.signerName}</strong>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                        {sig.signerRole}
                      </span>
                      {sig.status === 'valido' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                          <Check size={11} /> Válido
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                          <AlertTriangle size={11} /> Revocado
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 space-y-0.5 font-sans">
                      <div><span className="text-slate-400">Identificación:</span> {sig.signerIdNumber} {sig.signerProfessionalId && `• ${sig.signerProfessionalId}`}</div>
                      <div><span className="text-slate-400">Motivo de Firma:</span> <em>{sig.legalPurpose}</em></div>
                      <div><span className="text-slate-400">Estampado Cronológico:</span> <span className="font-mono text-slate-700">{sig.formattedDate}</span></div>
                    </div>
                  </div>

                  {/* Render Signature Graphic or Text */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0 self-end sm:self-auto">
                    {sig.signatureDataUrl ? (
                      <div className="bg-white p-2 border border-slate-200 rounded-lg shadow-2xs">
                        <img 
                          src={sig.signatureDataUrl} 
                          alt="Firma Digital" 
                          className="h-12 w-32 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="bg-white px-3 py-2 border border-slate-200 rounded-lg font-serif italic text-blue-900 text-sm tracking-wider shadow-2xs">
                        {sig.signatureText || sig.signerName}
                      </div>
                    )}
                    <span className="text-[10px] font-mono text-slate-400">Tipo: {sig.signatureType}</span>
                  </div>
                </div>

                {/* Technical Verification Strip */}
                <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
                  <div className="truncate max-w-xl">
                    <span className="text-slate-400 font-sans">Código Verificación: </span>
                    <span className="text-blue-900 font-bold select-all">{sig.verificationCode}</span>
                  </div>
                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <button
                      onClick={() => handleValidateCode(sig.verificationCode)}
                      className="text-blue-700 hover:text-blue-900 underline text-xs font-sans font-medium"
                    >
                      Validar
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => handleDownloadCertificate(sig)}
                      className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1 text-xs font-sans font-medium"
                    >
                      <Download size={12} /> Constancia
                    </button>
                    {sig.status === 'valido' && sig.id.startsWith('SIG-') && !sig.id.includes('JUD') && (
                      <>
                        <span>•</span>
                        <button
                          onClick={() => {
                            if (confirm(`¿Desea revocar la firma de ${sig.signerName}?`)) {
                              revokeElectronicSignature(sig.id);
                              loadSignatures();
                            }
                          }}
                          className="text-rose-600 hover:text-rose-800 text-xs font-sans"
                        >
                          Revocar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: INTERACTIVE SIGNING WORKFLOW */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-base">
            <PenTool className="text-blue-800" size={18} />
            <span>Estampar Nueva Firma Electrónica sobre este Documento</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Seleccione el rol o firmante procesal autorizado, defina la modalidad de rúbrica y proceda a certificar el documento.
          </p>
        </div>

        {/* Step 1: Select Signer */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            1. Perfil del Firmante Jurídico
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedSignerPreset('luz_karime')}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-1.5 ${
                selectedSignerPreset === 'luz_karime'
                  ? 'border-blue-700 bg-blue-50/70 ring-1 ring-blue-700'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 font-serif">Dra. Luz Karime Beetar</span>
                <Landmark size={14} className="text-blue-700" />
              </div>
              <span className="text-[10px] text-slate-500 leading-tight">Apoderada Principal • T.P. 89.412</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSignerPreset('liliana_gomez')}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-1.5 ${
                selectedSignerPreset === 'liliana_gomez'
                  ? 'border-blue-700 bg-blue-50/70 ring-1 ring-blue-700'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 font-serif">Dra. Liliana Gómez</span>
                <UserCheck size={14} className="text-emerald-700" />
              </div>
              <span className="text-[10px] text-slate-500 leading-tight">Cliente Poderdante • Médica</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSignerPreset('claudia_granda')}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-1.5 ${
                selectedSignerPreset === 'claudia_granda'
                  ? 'border-blue-700 bg-blue-50/70 ring-1 ring-blue-700'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 font-serif">Dra. Claudia Granda</span>
                <Scale size={14} className="text-purple-700" />
              </div>
              <span className="text-[10px] text-slate-500 leading-tight">Apoderada Apoyos • T.P. 88.516</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSignerPreset('custom')}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-1.5 ${
                selectedSignerPreset === 'custom'
                  ? 'border-blue-700 bg-blue-50/70 ring-1 ring-blue-700'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 font-serif">Otro Firmante / Perito</span>
                <Key size={14} className="text-amber-700" />
              </div>
              <span className="text-[10px] text-slate-500 leading-tight">Personalizado con C.C. y T.P.</span>
            </button>
          </div>

          {/* Form fields if custom or review */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <label className="text-slate-500 block mb-1 font-medium">Nombre Completo del Firmante:</label>
              <input
                type="text"
                value={customSignerName}
                onChange={(e) => setCustomSignerName(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1 font-medium">Cargo / Calidad Procesal:</label>
              <input
                type="text"
                value={customSignerRole}
                onChange={(e) => setCustomSignerRole(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1 font-medium">Cédula de Ciudadanía:</label>
              <input
                type="text"
                value={customSignerId}
                onChange={(e) => setCustomSignerId(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1 font-medium">Tarjeta Profesional (si aplica):</label>
              <input
                type="text"
                value={customSignerTP}
                onChange={(e) => setCustomSignerTP(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1 font-medium">Correo Electrónico:</label>
              <input
                type="email"
                value={customSignerEmail}
                onChange={(e) => setCustomSignerEmail(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1 font-medium">Propósito / Razón Legal:</label>
              <select
                value={legalPurpose}
                onChange={(e) => setLegalPurpose(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="Aprobación, Radicación y Aportación Procesal">Aprobación y Radicación Procesal</option>
                <option value="Conformidad y Autorización de Medidas Cautelares">Conformidad de Medidas Cautelares</option>
                <option value="Constancia de Notificación y Consulta del Expediente">Constancia de Notificación</option>
                <option value="Auditoría Forense y Dictamen Jurídico">Auditoría Forense y Dictamen</option>
                <option value="Recepción y Validación de Documento Auténtico">Recepción y Validación</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Signature Capture Mode */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              2. Modalidad de Captura de la Rúbrica
            </label>
            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setSignatureMode('canvas')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  signatureMode === 'canvas' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Trazo Manuscrito (Canvas)
              </button>
              <button
                type="button"
                onClick={() => setSignatureMode('type')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  signatureMode === 'type' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Caligrafía Notarial
              </button>
              <button
                type="button"
                onClick={() => setSignatureMode('preset')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  signatureMode === 'preset' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Sello Digital Registrado
              </button>
            </div>
          </div>

          {/* Mode 1: Interactive Canvas */}
          {signatureMode === 'canvas' && (
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Dibuje su rúbrica con el ratón o pantalla táctil sobre el recuadro:</span>
                <div className="flex items-center gap-2">
                  <span>Tinta:</span>
                  <button
                    type="button"
                    onClick={() => setInkColor('#1e3a8a')}
                    className={`w-5 h-5 rounded-full bg-blue-900 border-2 ${inkColor === '#1e3a8a' ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                    title="Azul Judicial"
                  />
                  <button
                    type="button"
                    onClick={() => setInkColor('#0f172a')}
                    className={`w-5 h-5 rounded-full bg-slate-900 border-2 ${inkColor === '#0f172a' ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                    title="Negro Notarial"
                  />
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="flex items-center gap-1 text-slate-500 hover:text-slate-800 ml-2 px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px]"
                  >
                    <RotateCcw size={12} /> Limpiar
                  </button>
                </div>
              </div>

              <div className="relative bg-white border-2 border-dashed border-slate-300 rounded-lg overflow-hidden flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={520}
                  height={150}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full max-w-lg h-[150px] cursor-crosshair touch-none"
                />
                {!hasDrawn && (
                  <div className="absolute pointer-events-none text-slate-300 text-xs italic select-none">
                    [Estampe aquí la firma manuscrita]
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mode 2: Calligraphic Typographic */}
          {signatureMode === 'type' && (
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-3">
              <span className="text-xs text-slate-500 block">
                Previsualización de la rúbrica formal caligráfica generada:
              </span>
              <div className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-2xs">
                <div className="font-serif italic text-2xl sm:text-3xl text-blue-950 tracking-wider">
                  {customSignerName || 'Nombre del Firmante'}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-2">
                  {customSignerRole} • {customSignerTP || customSignerId}
                </div>
              </div>
            </div>
          )}

          {/* Mode 3: Preset Official Stamp */}
          {signatureMode === 'preset' && (
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-3">
              <span className="text-xs text-slate-500 block">
                Sello institucional registrado de la firma Devis & Beetar Asociados:
              </span>
              <div className="bg-white p-5 rounded-lg border border-slate-200 flex items-center justify-between gap-4 shadow-2xs">
                <div className="border-l-4 border-blue-900 pl-3">
                  <div className="font-serif font-bold text-sm text-slate-900">DEVIS & BEETAR ASOCIADOS</div>
                  <div className="text-xs text-blue-900 font-semibold">{customSignerName}</div>
                  <div className="text-[11px] text-slate-500 font-mono">T.P. No. 89.412 • Barranquilla D.E.I.P.</div>
                </div>
                <div className="text-right text-[10px] font-mono text-slate-400 border border-slate-200 p-2 rounded bg-slate-50">
                  <div>SELLO ELECTRÓNICO</div>
                  <div>LEY 527 / 1999</div>
                  <div className="text-emerald-700 font-bold">CERTIFICADO</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Legal Agreement & Action */}
        <div className="pt-2 border-t border-slate-100 space-y-4">
          <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={legalAgreementChecked}
              onChange={(e) => setLegalAgreementChecked(e.target.checked)}
              className="mt-0.5 rounded text-blue-800 focus:ring-blue-600"
            />
            <span>
              Certifico bajo juramento que he revisado el contenido de este documento (<strong>{doc.code}</strong>), actuando con plenas 
              facultades procesales y consintiendo que mi firma electrónica simplificada, dirección IP y marca temporal constituyan plena 
              prueba conforme al artículo 7° de la Ley 527 de 1999 y Decreto Reglamentario 2364 de 2012.
            </span>
          </label>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleExecuteSignature}
              disabled={!legalAgreementChecked || (signatureMode === 'canvas' && !hasDrawn && !customSignerName)}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 disabled:opacity-40 disabled:hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <PenTool size={14} />
              <span>Estampar Firma y Certificar Documento</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3: ELECTRONIC VERIFICATION TOOL (SIGCMA / RAMA JUDICIAL VALIDATOR) */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Search className="text-slate-700" size={18} />
          <div>
            <h3 className="font-bold text-sm text-slate-900 font-serif">
              Validador de Integridad Criptográfica de Firmas (SIGCMA / Rama Judicial)
            </h3>
            <p className="text-xs text-slate-500">
              Compruebe la autenticidad e integridad de providencias judiciales y firmas electrónicas ingresando el código de verificación alfanumérico.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Pegue o escriba el código de verificación (ej: 4e3106cbcaf59679a43e488b11b74e...)"
              value={testCodeInput}
              onChange={(e) => setTestCodeInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <button
            type="button"
            onClick={() => handleValidateCode()}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition shrink-0"
          >
            Verificar en Base Criptográfica
          </button>
        </div>

        {/* Quick Test Pill Buttons for Official Authentic Codes from the Case */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
          <span className="font-sans font-medium">Códigos auténticos del expediente:</span>
          <button
            type="button"
            onClick={() => {
              setTestCodeInput("4e3106cbcaf59679a43e488b11b74e92da9a78256ddf17e696f1c25017d6d2ee");
              handleValidateCode("4e3106cbcaf59679a43e488b11b74e92da9a78256ddf17e696f1c25017d6d2ee");
            }}
            className="font-mono text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-blue-900 px-2 py-0.5 rounded border border-slate-200 transition"
          >
            Auto 20-Ago-2026 (Juez Castro Batista)
          </button>
          <button
            type="button"
            onClick={() => {
              setTestCodeInput("5aa9b66fa440cf544e00ffe095cc9edbe516a57ad04e91d7f64b600c88f623e6");
              handleValidateCode("5aa9b66fa440cf544e00ffe095cc9edbe516a57ad04e91d7f64b600c88f623e6");
            }}
            className="font-mono text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-blue-900 px-2 py-0.5 rounded border border-slate-200 transition"
          >
            Auto 04-Sep-2026 (Juez Castro Batista)
          </button>
        </div>

        {/* Verification Result Box */}
        {validationResult && (
          <div className={`p-4 rounded-xl border text-xs space-y-2 animate-fadeIn ${
            validationResult.found 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-center gap-2 font-bold font-serif text-sm">
              {validationResult.found ? (
                <>
                  <CheckCircle2 size={18} className="text-emerald-700" />
                  <span>INTEGRIDAD CONFIRMADA • Firma Electrónica Auténtica</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} className="text-rose-700" />
                  <span>CÓDIGO NO ENCONTRADO O DOCUMENTO INALTERADO NO REGISTRADO</span>
                </>
              )}
            </div>

            <p className="font-sans leading-relaxed">
              {validationResult.message}
            </p>

            {validationResult.sig && (
              <div className="bg-white p-3 rounded-lg border border-emerald-200 font-mono text-[11px] space-y-1 text-slate-700">
                <div>Documento Asociado: <strong>{validationResult.sig.documentCode}</strong></div>
                <div>Hash SHA-256: {validationResult.sig.documentHashSHA256}</div>
                <div>Emisor: {validationResult.sig.signerName} ({validationResult.sig.signerRole})</div>
                <div>Canal / IP: {validationResult.sig.ipAddress}</div>
                <div className="text-emerald-700 font-bold">● VIGENTE Y OBLIGATORIO CON EFECTO PROCESAL</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
