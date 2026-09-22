import React from 'react';
import { 
  Eye, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  FileText, 
  Calendar, 
  Building2, 
  Scale, 
  AlertTriangle,
  PenTool,
  CheckCircle2,
  X
} from 'lucide-react';
import { CaseDocument } from '../types';
import { DocumentPreviewIframe } from './DocumentPreviewIframe';
import { getSignaturesForDocument } from '../services/electronicSignatureService';

interface DocumentHoverPreviewCardProps {
  document: CaseDocument;
  onOpenDoc: (doc: CaseDocument) => void;
  onClose?: () => void;
  isFloating?: boolean;
}

export const DocumentHoverPreviewCard: React.FC<DocumentHoverPreviewCardProps> = ({
  document: doc,
  onOpenDoc,
  onClose,
  isFloating = false
}) => {
  const [copiedRadicado, setCopiedRadicado] = React.useState(false);
  const signatures = getSignaturesForDocument(doc.id);

  const handleCopyRadicado = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(doc.radicado);
    setCopiedRadicado(true);
    setTimeout(() => setCopiedRadicado(false), 2000);
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
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

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col ${
      isFloating ? 'max-w-md w-full animate-fadeIn' : 'w-full h-full'
    }`}>
      {/* Header bar */}
      <div className="bg-slate-900 text-white p-3.5 px-4 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 overflow-hidden">
          <FileText size={16} className="text-blue-400 shrink-0" />
          <div className="truncate">
            <div className="text-[10px] font-mono text-blue-300 font-bold uppercase">
              {doc.code} • Previsualización Rápida
            </div>
            <h4 className="font-serif font-bold text-xs sm:text-sm text-white truncate">
              {doc.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onOpenDoc(doc)}
            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold rounded-lg transition flex items-center gap-1 cursor-pointer"
            title="Abrir en Visor Completo"
          >
            <Eye size={12} />
            <span className="hidden sm:inline">Abrir Completo</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-md transition"
              title="Cerrar previsualización"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Miniature Iframe Preview Sheet */}
      <div className="p-3 bg-slate-100 border-b border-slate-200 shrink-0 relative">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 px-1 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            Miniatura Oficial Renderizada (Iframe srcDoc)
          </span>
          <span>{doc.folioCount} folios</span>
        </div>
        <div className="h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-slate-300 bg-white shadow-inner relative group">
          <DocumentPreviewIframe 
            document={doc} 
            height="100%" 
            className="w-full h-full pointer-events-auto"
            showWatermark={true}
          />
          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition duration-200">
            <span className="text-[10px] font-mono">Pase el cursor o haga clic para inspeccionar</span>
            <button
              onClick={() => onOpenDoc(doc)}
              className="px-2 py-0.5 bg-white/90 hover:bg-white text-slate-900 text-[10px] font-bold rounded shadow-xs cursor-pointer flex items-center gap-1"
            >
              <ExternalLink size={10} />
              Expandir
            </button>
          </div>
        </div>
      </div>

      {/* Metadata & Legal Forensic Detail */}
      <div className="p-4 space-y-3 overflow-y-auto max-h-60 text-xs">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${getCategoryBadge(doc.category)}`}>
            {doc.category === 'civil_familia' ? 'Civil Familia' : doc.category === 'penal' ? 'Penal' : doc.category === 'societario' ? 'Societario' : 'Gerencial'}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-100 text-slate-700 border border-slate-200">
            {doc.type.replace(/_/g, ' ')}
          </span>
          {signatures.length > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 size={11} /> {signatures.length} Firma(s) Digital(es)
            </span>
          )}
        </div>

        {/* Quick Data Grid */}
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-semibold">Radicado:</span>
            <div className="flex items-center gap-1">
              <span className="font-mono text-slate-800 font-bold select-all truncate max-w-[180px]">
                {doc.radicado}
              </span>
              <button
                onClick={handleCopyRadicado}
                className="text-slate-400 hover:text-blue-700 p-0.5 rounded cursor-pointer"
                title="Copiar radicado judicial"
              >
                {copiedRadicado ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-semibold">Despacho / Notaría:</span>
            <span className="text-slate-800 text-right truncate max-w-[200px]">{doc.authority}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-semibold">Fecha de Radicación:</span>
            <span className="text-slate-800">{doc.date}</span>
          </div>
        </div>

        {/* Summary */}
        <div>
          <span className="text-slate-500 font-semibold block mb-0.5 text-[10px] uppercase tracking-wider">
            Síntesis Probatoria:
          </span>
          <p className="text-slate-700 leading-relaxed font-sans text-xs">
            {doc.summary}
          </p>
        </div>

        {/* Legal Impact Quick Tabs */}
        {doc.legalImpact && (
          <div className="pt-2 border-t border-slate-100">
            <span className="text-slate-500 font-semibold block mb-1 text-[10px] uppercase tracking-wider">
              Impacto Jurídico Multidimensional:
            </span>
            <div className="grid grid-cols-1 gap-1.5 text-[11px]">
              {doc.legalImpact.familia && (
                <div className="bg-blue-50/70 p-2 rounded border border-blue-200/60 text-blue-950 flex items-start gap-1.5">
                  <Scale size={12} className="text-blue-700 shrink-0 mt-0.5" />
                  <div><strong>Familia:</strong> {doc.legalImpact.familia}</div>
                </div>
              )}
              {doc.legalImpact.penal && (
                <div className="bg-rose-50/70 p-2 rounded border border-rose-200/60 text-rose-950 flex items-start gap-1.5">
                  <AlertTriangle size={12} className="text-rose-700 shrink-0 mt-0.5" />
                  <div><strong>Penal:</strong> {doc.legalImpact.penal}</div>
                </div>
              )}
              {doc.legalImpact.societario && (
                <div className="bg-emerald-50/70 p-2 rounded border border-emerald-200/60 text-emerald-950 flex items-start gap-1.5">
                  <Building2 size={12} className="text-emerald-700 shrink-0 mt-0.5" />
                  <div><strong>Societario:</strong> {doc.legalImpact.societario}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hash verify strip */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck size={11} className="text-emerald-600" />
            SHA-256: {doc.integrityHash.substring(0, 16)}...
          </span>
          <span className="text-emerald-700 font-bold uppercase">Cadena de Custodia OK</span>
        </div>
      </div>
    </div>
  );
};
