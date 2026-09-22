import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  UserCheck, 
  Filter, 
  ChevronRight, 
  FileText,
  Flame,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { ActionItem, CaseDocument, LegalFront } from '../types';
import { ACTION_MATRIX } from '../data/caseData';
import { DocReferencePill } from './DocReferencePill';

interface ActionPlanManagerProps {
  onOpenDoc: (doc: CaseDocument) => void;
}

export const ActionPlanManager: React.FC<ActionPlanManagerProps> = ({ onOpenDoc }) => {
  const [selectedFront, setSelectedFront] = useState<LegalFront | 'todos'>('todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [actions, setActions] = useState<ActionItem[]>(ACTION_MATRIX);

  const filteredActions = actions.filter((act) => {
    const matchesFront = selectedFront === 'todos' || act.legalFront === selectedFront;
    const matchesStatus = selectedStatus === 'todos' || act.status === selectedStatus;
    return matchesFront && matchesStatus;
  });

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'critica': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'alta': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded">
            <CheckCircle2 size={12} /> Completado
          </span>
        );
      case 'en_progreso':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded animate-pulse">
            <Clock size={12} /> En Ejecución
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
            <AlertCircle size={12} /> Programado
          </span>
        );
    }
  };

  const toggleActionStatus = (id: string) => {
    setActions(prev => prev.map(a => {
      if (a.id !== id) return a;
      if (a.status === 'completado') return { ...a, status: 'en_progreso', progress: 50 };
      if (a.status === 'en_progreso') return { ...a, status: 'completado', progress: 100 };
      return { ...a, status: 'en_progreso', progress: 50 };
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="matriz-acciones-view">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span>Roadmap Gerencial del Caso</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Matriz de Acciones Tácticas y Estratégicas
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-sans">
              Seguimiento operativo de cada actuación legal, entregable y documento procesal con impacto directo en los derechos de Liliana Gómez.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-right">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block font-mono">Tasa de Ejecución</span>
              <span className="text-lg font-bold font-mono text-emerald-700">82%</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-5 text-xs">
          {/* Legal Front filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Frente:</span>
            <button
              onClick={() => setSelectedFront('todos')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                selectedFront === 'todos' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedFront('civil_familia')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                selectedFront === 'civil_familia' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              Civil Familia
            </button>
            <button
              onClick={() => setSelectedFront('penal')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                selectedFront === 'penal' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              Penal
            </button>
            <button
              onClick={() => setSelectedFront('societario')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                selectedFront === 'societario' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Societario
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Estado:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="todos">Todos los Estados</option>
              <option value="en_progreso">En Ejecución Activa</option>
              <option value="completado">Completados</option>
              <option value="pendiente">Programados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Items List */}
      <div className="space-y-4">
        {filteredActions.map((action) => (
          <div
            key={action.id}
            className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition p-5 sm:p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                {/* Top tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {action.code}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${getPriorityStyle(action.priority)}`}>
                    Prioridad {action.priority}
                  </span>
                  {getStatusBadge(action.status)}
                  <span className="text-xs text-slate-400 font-mono">
                    Fase: <strong className="text-slate-600">{action.phase}</strong>
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif leading-snug">
                  {action.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {action.description}
                </p>

                {/* 3 Fronts Impact Accordion */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2">
                  <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2.5 text-[11px]">
                    <span className="font-bold text-blue-900 block mb-0.5">Impacto en Familia:</span>
                    <span className="text-slate-600">{action.impactCivil}</span>
                  </div>
                  <div className="bg-rose-50/50 border border-rose-100 rounded-lg p-2.5 text-[11px]">
                    <span className="font-bold text-rose-900 block mb-0.5">Impacto en Penal:</span>
                    <span className="text-slate-600">{action.impactPenal}</span>
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-2.5 text-[11px]">
                    <span className="font-bold text-emerald-900 block mb-0.5">Impacto en Societario:</span>
                    <span className="text-slate-600">{action.impactSocietario}</span>
                  </div>
                </div>

                {/* Expected Deliverable */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 text-xs flex items-start gap-2 text-slate-700">
                  <span className="font-bold text-slate-800 flex-shrink-0">Entregable Tangible:</span>
                  <span>{action.expectedDeliverable}</span>
                </div>
              </div>

              {/* Side Meta & Document References */}
              <div className="lg:w-72 bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between space-y-4">
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Responsable Técnico</span>
                    <strong className="text-slate-800">{action.responsible}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Vencimiento / Hito</span>
                    <span className="font-mono text-slate-700 font-semibold">{action.deadline}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-500 font-medium">Progreso</span>
                      <span className="font-mono font-bold text-slate-800">{action.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${action.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Direct Clickable Document Pills */}
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                    Archivos Vinculados (Click para Ver):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {action.referencedDocIds.map((docId) => (
                      <DocReferencePill key={docId} docId={docId} onOpenDoc={onOpenDoc} />
                    ))}
                  </div>
                </div>

                {/* Quick toggle check */}
                <button
                  type="button"
                  onClick={() => toggleActionStatus(action.id)}
                  className="w-full py-1.5 text-center text-xs font-semibold rounded-lg border border-slate-300 hover:bg-white text-slate-700 transition cursor-pointer"
                >
                  {action.status === 'completado' ? 'Marcar En Ejecución' : 'Marcar Completado ✓'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
