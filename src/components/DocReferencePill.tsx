import React from 'react';
import { FileText, Eye } from 'lucide-react';
import { CASE_DOCUMENTS } from '../data/caseData';
import { CaseDocument } from '../types';

interface DocReferencePillProps {
  docId: string;
  onOpenDoc: (doc: CaseDocument) => void;
  customLabel?: string;
  size?: 'sm' | 'md';
}

export const DocReferencePill: React.FC<DocReferencePillProps> = ({
  docId,
  onOpenDoc,
  customLabel,
  size = 'sm'
}) => {
  const doc = CASE_DOCUMENTS.find(d => d.id === docId);

  if (!doc) {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
        {docId}
      </span>
    );
  }

  const getColors = (cat: string) => {
    switch (cat) {
      case 'civil_familia':
        return 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200';
      case 'penal':
        return 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200';
      case 'societario':
        return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200';
      default:
        return 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200';
    }
  };

  const displayText = customLabel || doc.code;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenDoc(doc);
      }}
      title={`Visualizar inmediatamente: ${doc.title} (${doc.authority})`}
      className={`inline-flex items-center gap-1.5 font-medium rounded border transition shadow-2xs group cursor-pointer ${getColors(
        doc.category
      )} ${size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'}`}
    >
      <FileText size={size === 'sm' ? 12 : 14} className="opacity-80 group-hover:scale-110 transition-transform" />
      <span className="font-mono font-semibold">{displayText}</span>
      <Eye size={11} className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5" />
    </button>
  );
};
