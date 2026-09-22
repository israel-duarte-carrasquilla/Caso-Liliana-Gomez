import React from 'react';
import { 
  FileText, 
  Printer, 
  ShieldCheck, 
  Clock, 
  User, 
  Scale, 
  Building2, 
  AlertTriangle,
  FolderGit2
} from 'lucide-react';
import { FirmLogo } from './FirmLogo';
import { CASE_METADATA } from '../data/caseData';

interface FirmHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReportModal: () => void;
  documentCount: number;
}

export const FirmHeader: React.FC<FirmHeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenReportModal,
  documentCount
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs" id="firm-header">
      {/* Top Banner with Firm Identity & Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <FirmLogo size="md" />
        </div>

        {/* Executive Case Badge & Action */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="bg-slate-50 border border-slate-200/90 rounded-lg px-3 py-1.5 text-right hidden sm:block">
            <div className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 font-mono">
              CÓDIGO DE CONTROL
            </div>
            <div className="text-xs font-mono font-bold text-slate-800">
              {CASE_METADATA.caseCode}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-wider font-semibold text-emerald-600">Estado del Proyecto</div>
              <div className="text-xs font-bold text-emerald-950">Fase II: Ofensiva & Cautelares</div>
            </div>
          </div>

          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
            title="Generar vista imprimible o descargar informe ejecutivo"
          >
            <Printer size={15} />
            <span>Informe Directivo PDF</span>
          </button>
        </div>
      </div>

      {/* Case Subheader: Client Identification & Management Bar */}
      <div className="bg-slate-50/70 border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 font-medium text-slate-900">
              <User size={14} className="text-slate-500" />
              Cliente Representada: <strong className="font-semibold text-slate-900">{CASE_METADATA.clientName}</strong>
            </span>
            <span className="text-slate-400 hidden md:inline">|</span>
            <span className="text-slate-600">
              C.C.: <span className="font-mono text-slate-800">32.845.912</span>
            </span>
            <span className="text-slate-400 hidden md:inline">|</span>
            <span className="text-slate-600">
              Dirección Jurídica: <strong className="text-slate-800">{CASE_METADATA.leadCounsel}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              Corte al: <strong>{CASE_METADATA.reportDate}</strong>
            </span>
            <span className="bg-slate-200/80 px-2 py-0.5 rounded font-mono font-medium text-slate-700">
              {documentCount} Archivos Radicados
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Project Management Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('resumen')}
            className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'resumen'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FolderGit2 size={16} />
            <span>Tablero Gerencial</span>
          </button>

          <button
            onClick={() => setActiveTab('frentes')}
            className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'frentes'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scale size={16} />
            <span>Análisis 3 Frentes (Familia • Penal • Societario)</span>
          </button>

          <button
            onClick={() => setActiveTab('expediente')}
            className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'expediente'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText size={16} />
            <span>Expediente Digital ({documentCount})</span>
            <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              Visor Inmediato
            </span>
          </button>

          <button
            onClick={() => setActiveTab('acciones')}
            className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'acciones'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Matriz de Acciones & Hitos</span>
          </button>

          <button
            onClick={() => setActiveTab('riesgos')}
            className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'riesgos'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle size={15} />
            <span>Matriz de Riesgos</span>
          </button>

          <button
            onClick={() => setActiveTab('patrimonio')}
            className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'patrimonio'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 size={16} />
            <span>Activos en Litigio</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
