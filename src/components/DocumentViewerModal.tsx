import React, { useState, useEffect } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  ShieldCheck, 
  Scale, 
  FileText, 
  Building2, 
  AlertTriangle, 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight,
  Stamp,
  ExternalLink,
  PenTool,
  CheckCircle2,
  Award,
  Key,
  Hash
} from 'lucide-react';
import { CaseDocument, ElectronicSignatureRecord } from '../types';
import { FirmLogo } from './FirmLogo';
import { ElectronicSignatureModule } from './ElectronicSignatureModule';
import { getSignaturesForDocument } from '../services/electronicSignatureService';

interface DocumentViewerModalProps {
  document: CaseDocument | null;
  allDocuments: CaseDocument[];
  onClose: () => void;
  onSelectDocument: (doc: CaseDocument) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document: doc,
  allDocuments,
  onClose,
  onSelectDocument
}) => {
  const [activeTab, setActiveTab] = useState<'memorial' | 'firma' | 'analisis' | 'custodia'>('memorial');
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [signatures, setSignatures] = useState<ElectronicSignatureRecord[]>([]);

  useEffect(() => {
    if (doc) {
      setSignatures(getSignaturesForDocument(doc.id));
    }
  }, [doc?.id]);

  if (!doc) return null;

  const refreshSignatures = () => {
    setSignatures(getSignaturesForDocument(doc.id));
  };

  const currentIndex = allDocuments.findIndex(d => d.id === doc.id);
  const prevDoc = currentIndex > 0 ? allDocuments[currentIndex - 1] : null;
  const nextDoc = currentIndex < allDocuments.length - 1 ? allDocuments[currentIndex + 1] : null;

  const handleCopyText = () => {
    navigator.clipboard.writeText(doc.fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([doc.fullText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = doc.downloadFileName || `${doc.code}_${doc.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case 'civil_familia':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'penal':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'societario':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'civil_familia': return 'Civil Familia';
      case 'penal': return 'Derecho Penal';
      case 'societario': return 'Derecho Societario';
      default: return 'Auditoría Gerencial';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto animate-fadeIn"
      id="document-viewer-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className={`bg-white rounded-xl shadow-2xl flex flex-col border border-slate-200 transition-all duration-300 w-full ${
          isFullscreen 
            ? 'h-[98vh] max-w-[98vw]' 
            : 'max-h-[92vh] max-w-5xl'
        }`}
        id="document-viewer-modal-container"
      >
        {/* Top Directorial Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 px-4 sm:px-6 py-3.5 bg-slate-50/80 rounded-t-xl gap-2">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded border ${getBadgeStyle(doc.category)}`}>
              {getCategoryLabel(doc.category)}
            </span>
            <span className="font-mono text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded">
              {doc.code}
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Radicado: <strong className="text-slate-700 font-mono">{doc.radicado}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Quick navigator */}
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs mr-1">
              <button
                onClick={() => prevDoc && onSelectDocument(prevDoc)}
                disabled={!prevDoc}
                title="Documento Anterior"
                className="p-1.5 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-white text-slate-600 transition"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-[11px] font-medium px-2 text-slate-500 font-mono">
                {currentIndex + 1}/{allDocuments.length}
              </span>
              <button
                onClick={() => nextDoc && onSelectDocument(nextDoc)}
                disabled={!nextDoc}
                title="Siguiente Documento"
                className="p-1.5 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-white text-slate-600 transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <button
              onClick={() => setActiveTab('firma')}
              className={`p-2 rounded-lg transition text-xs flex items-center gap-1.5 border ${
                activeTab === 'firma'
                  ? 'bg-blue-900 text-white border-blue-950 shadow-xs'
                  : signatures.length > 0
                    ? 'text-blue-900 bg-blue-50 hover:bg-blue-100 border-blue-200'
                    : 'text-slate-700 bg-white hover:bg-slate-100 border-slate-200'
              }`}
              title="Módulo de Validación y Firma Electrónica Simplificada (Ley 527/99)"
            >
              <PenTool size={15} className={signatures.length > 0 ? "text-emerald-600" : "text-blue-700"} />
              <span className="font-semibold hidden sm:inline">
                {signatures.length > 0 ? `Firmas (${signatures.length})` : 'Validar / Firmar'}
              </span>
            </button>

            <button
              onClick={handleCopyText}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition text-xs flex items-center gap-1.5"
              title="Copiar texto oficial"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              <span className="hidden md:inline">{copied ? 'Copiado' : 'Copiar'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition text-xs flex items-center gap-1.5"
              title="Imprimir documento con membrete"
            >
              <Printer size={16} />
              <span className="hidden md:inline">Imprimir</span>
            </button>

            <button
              onClick={handleDownload}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition text-xs flex items-center gap-1.5"
              title="Descargar copia oficial"
            >
              <Download size={16} />
              <span className="hidden md:inline">Descargar</span>
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition hidden sm:flex"
              title={isFullscreen ? "Restaurar tamaño" : "Pantalla completa"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition ml-1"
              title="Cerrar visor"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Document Title & Authority Ribbon */}
        <div className="px-4 sm:px-8 py-3 bg-white border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug font-serif">
              {doc.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
              <span><strong>Despacho / Autoridad:</strong> {doc.authority}</span>
              <span><strong>Fecha:</strong> {doc.date}</span>
              <span><strong>Folios:</strong> {doc.folioCount} pags.</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck size={13} /> Integridad Certificada
              </span>
              {signatures.length > 0 && (
                <span className="inline-flex items-center gap-1 text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-medium">
                  <CheckCircle2 size={12} className="text-emerald-600" /> {signatures.length} Firma(s) Electrónica(s)
                </span>
              )}
            </div>
          </div>

          {/* Inspection View Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg self-start md:self-auto border border-slate-200">
            <button
              onClick={() => setActiveTab('memorial')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                activeTab === 'memorial' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Memorial Judicial
            </button>
            <button
              onClick={() => setActiveTab('firma')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 ${
                activeTab === 'firma' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PenTool size={13} className={signatures.length > 0 ? "text-emerald-600" : "text-blue-700"} />
              <span>Validación & Firma</span>
              {signatures.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center font-mono">
                  {signatures.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('analisis')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                activeTab === 'analisis' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Impacto Estratégico
            </button>
            <button
              onClick={() => setActiveTab('custodia')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                activeTab === 'custodia' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cadena de Custodia
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#F4F6F9]" id="document-content-scrollable">
          {activeTab === 'memorial' && (
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-slate-200 p-6 sm:p-12 relative overflow-hidden text-slate-800">
              {/* Judicial Letterhead */}
              <div className="border-b-2 border-slate-900/80 pb-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <FirmLogo size="sm" />
                <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4">
                  <div className="text-[10px] tracking-widest uppercase text-slate-400 font-semibold font-mono">
                    EXPEDIENTE JUDICIAL ELECTRÓNICO
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-800 mt-0.5">
                    RAD: {doc.radicado}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Despacho: {doc.authority}
                  </div>
                </div>
              </div>

              {/* Watermark / Judicial stamp */}
              <div className="absolute right-8 top-32 pointer-events-none opacity-8 border-4 border-slate-900 rounded-lg p-4 rotate-12 select-none">
                <div className="text-xl font-black uppercase text-center font-mono">RADICADO VÁLIDO</div>
                <div className="text-xs text-center font-mono">{doc.date}</div>
              </div>

              {/* Document Text Body formatted as formal legal paper */}
              <div 
                className="font-serif text-[15px] sm:text-[16px] leading-relaxed text-slate-800 whitespace-pre-line tracking-wide"
                style={{ fontSize: `${zoomLevel}%` }}
              >
                {doc.fullText}
              </div>

              {/* Signatures & Certification Block */}
              <div className="mt-12 pt-8 border-t-2 border-slate-200 space-y-6">
                {/* Traditional Signature of Counsel */}
                <div className="flex flex-col sm:flex-row justify-between items-end gap-6">
                  <div>
                    <div className="h-10 w-44 border-b border-slate-400 mb-2 relative flex items-end">
                      <span className="font-serif italic text-sm text-blue-950 font-bold select-none">
                        Luz Karime Beetar de Devis
                      </span>
                    </div>
                    <p className="font-sans font-bold text-xs uppercase text-slate-800">
                      Dra. Luz Karime Beetar de Devis
                    </p>
                    <p className="font-sans text-[11px] text-slate-600">
                      Abogada Titulada • T.P. No. 89.412 del C.S. de la J.
                    </p>
                    <p className="font-sans text-[11px] text-slate-500">
                      Apoderada Principal de la Sra. Liliana Gómez
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded p-2.5 text-right font-mono text-[10px] text-slate-500 max-w-xs">
                    <div>CÓDIGO: {doc.code}</div>
                    <div>HASH SHA-256: {doc.integrityHash.substring(0, 18)}...</div>
                    <div className="text-emerald-700 font-semibold mt-0.5">● RADICADO JUDICIAL OFICIAL</div>
                  </div>
                </div>

                {/* Stamped Electronic Signatures Banner (Ley 527 de 1999) */}
                {signatures.length > 0 ? (
                  <div className="bg-slate-50 rounded-xl p-4 border border-blue-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-950 uppercase tracking-wider font-serif">
                        <Award size={15} className="text-blue-700" />
                        <span>Estampado de Firma Electrónica Simplificada (Ley 527 de 1999 / Dec. 2364 de 2012)</span>
                      </div>
                      <button
                        onClick={() => setActiveTab('firma')}
                        className="text-[11px] text-blue-700 hover:text-blue-900 font-sans font-medium underline flex items-center gap-1"
                      >
                        <PenTool size={11} /> Gestionar / Validar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {signatures.map((s) => (
                        <div key={s.id} className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1 shadow-2xs">
                          <div className="flex justify-between items-start">
                            <div>
                              <strong className="text-slate-900 font-serif block">{s.signerName}</strong>
                              <span className="text-[10px] text-slate-500 block leading-tight">{s.signerRole}</span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                              CERTIFICADO
                            </span>
                          </div>
                          
                          {s.signatureDataUrl ? (
                            <div className="pt-1">
                              <img src={s.signatureDataUrl} alt="Firma" className="h-8 object-contain" />
                            </div>
                          ) : (
                            <div className="font-serif italic text-blue-900 text-xs pt-1">
                              {s.signatureText || s.signerName}
                            </div>
                          )}

                          <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-100 truncate">
                            Cod: <span className="text-blue-900 select-all font-bold">{s.verificationCode.substring(0, 24)}...</span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {s.formattedDate}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50/60 border border-dashed border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <PenTool size={20} className="text-blue-700 shrink-0" />
                      <div className="text-xs text-slate-700">
                        <strong className="text-blue-950 font-serif block">Firma Electrónica Disponible</strong>
                        Este documento puede ser firmado y validado electrónicamente con código criptográfico verificable.
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('firma')}
                      className="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0 shadow-2xs"
                    >
                      <PenTool size={13} />
                      <span>Firmar Documento Ahora</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'firma' && (
            <ElectronicSignatureModule
              document={doc}
              onSignatureAdded={() => {
                refreshSignatures();
              }}
            />
          )}

          {activeTab === 'analisis' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Strategic Value Card */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2.5 mb-3 text-slate-900">
                  <Scale className="text-blue-700" size={20} />
                  <h3 className="font-bold text-base">Valor Estratégico para la Gerencia del Caso</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-sans bg-blue-50/60 border border-blue-100 p-4 rounded-lg">
                  {doc.strategicValue}
                </p>
              </div>

              {/* 3 Legal Fronts Impact Breakdown */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
                  Impacto en los 3 Frentes Jurídicos del Proceso
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Civil Familia */}
                  <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider mb-2">
                      <Scale size={15} />
                      Civil Familia
                    </div>
                    <p className="text-xs text-slate-700 leading-normal">
                      {doc.legalImpact.familia}
                    </p>
                  </div>

                  {/* Penal */}
                  <div className="bg-rose-50/70 border border-rose-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wider mb-2">
                      <AlertTriangle size={15} />
                      Derecho Penal
                    </div>
                    <p className="text-xs text-slate-700 leading-normal">
                      {doc.legalImpact.penal}
                    </p>
                  </div>

                  {/* Societario */}
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider mb-2">
                      <Building2 size={15} />
                      Derecho Societario
                    </div>
                    <p className="text-xs text-slate-700 leading-normal">
                      {doc.legalImpact.societario}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Evidence Points */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
                <h3 className="font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
                  <FileText className="text-slate-700" size={18} />
                  Elementos Probatorios Incorporados en este Archivo
                </h3>
                <ul className="space-y-2">
                  {doc.keyEvidence.map((evidence, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                        {i + 1}
                      </span>
                      <span>{evidence}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'custodia' && (
            <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <ShieldCheck className="text-emerald-600" size={28} />
                <div>
                  <h3 className="font-bold text-base text-slate-900">Cadena de Custodia y Trazabilidad Probatoria</h3>
                  <p className="text-xs text-slate-500">Registro inalterable con verificación criptográfica para validez procesal</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block font-medium uppercase text-[10px]">Identificador Único</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">{doc.code}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block font-medium uppercase text-[10px]">Radicado Oficial</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">{doc.radicado}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block font-medium uppercase text-[10px]">Autoridad Emisora</span>
                  <span className="font-semibold text-slate-800">{doc.authority}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block font-medium uppercase text-[10px]">Fecha de Entrada en Plenario</span>
                  <span className="font-semibold text-slate-800">{doc.date}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block text-xs font-semibold mb-1 uppercase tracking-wider">
                  Firma Criptográfica SHA-256 (Garantía de No Modificación)
                </span>
                <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-lg break-all select-all">
                  {doc.integrityHash}
                </div>
              </div>

              {/* Signatures in Custody Log */}
              {signatures.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 block text-xs font-semibold uppercase tracking-wider">
                      Firmas Electrónicas Certificadas en Cadena de Custodia ({signatures.length})
                    </span>
                    <button
                      onClick={() => setActiveTab('firma')}
                      className="text-xs text-blue-700 hover:text-blue-900 font-medium flex items-center gap-1"
                    >
                      <PenTool size={12} /> Gestionar Firmas
                    </button>
                  </div>
                  <div className="space-y-2">
                    {signatures.map((sig) => (
                      <div key={sig.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="font-bold text-slate-900 font-serif">{sig.signerName}</div>
                          <div className="text-[11px] text-slate-500">{sig.signerRole} • {sig.signerIdNumber}</div>
                          <div className="text-[10px] font-mono text-blue-900">Hash: {sig.documentHashSHA256.substring(0, 20)}...</div>
                        </div>
                        <div className="text-right sm:border-l sm:border-slate-200 sm:pl-3">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {sig.status.toUpperCase()}
                          </span>
                          <div className="text-[10px] text-slate-400 mt-0.5">{sig.formattedDate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Stamp className="text-emerald-700" size={24} />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-900">Estado de Custodia: Radicado y Conforme a Derecho</h4>
                    <p className="text-[11px] text-emerald-700">Aportado al Despacho Judicial con valor procesal pleno.</p>
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-medium transition flex items-center gap-1.5 shadow-xs"
                >
                  <Download size={14} />
                  Descargar Copia
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="border-t border-slate-200 px-4 sm:px-6 py-3 bg-slate-50 flex items-center justify-between text-xs text-slate-500 rounded-b-xl">
          <div className="flex items-center gap-2">
            <span>Zoom de lectura:</span>
            <button 
              onClick={() => setZoomLevel(Math.max(80, zoomLevel - 10))}
              className="px-2 py-0.5 bg-white border border-slate-200 rounded hover:bg-slate-100 font-mono"
            >
              -
            </button>
            <span className="font-mono text-slate-700">{zoomLevel}%</span>
            <button 
              onClick={() => setZoomLevel(Math.min(140, zoomLevel + 10))}
              className="px-2 py-0.5 bg-white border border-slate-200 rounded hover:bg-slate-100 font-mono"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">Caso Liliana Gómez • Dirección: Dra. Luz Karime Beetar de Devis</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition"
            >
              Cerrar Visor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
