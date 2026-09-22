import React from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert, 
  ArrowRight, 
  Flame, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { RiskItem, CaseDocument } from '../types';
import { RISK_REGISTER } from '../data/caseData';
import { DocReferencePill } from './DocReferencePill';

interface RiskMatrixProps {
  onOpenDoc: (doc: CaseDocument) => void;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ onOpenDoc }) => {
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Critico':
        return 'bg-rose-100 text-rose-900 border-rose-200';
      case 'Alto':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'Medio':
        return 'bg-yellow-100 text-yellow-900 border-yellow-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'mitigado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded">
            <CheckCircle2 size={12} /> Mitigado con Éxito
          </span>
        );
      case 'en_mitigacion':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded">
            <ShieldCheck size={12} /> En Plan de Mitigación
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded animate-pulse">
            <Flame size={12} /> Alerta Activa
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="matriz-riesgos-view">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <div className="border-b border-slate-100 pb-5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <AlertTriangle size={15} className="text-amber-600" />
            <span>Gestión Proactiva de Contingencias</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
            Matriz de Riesgos y Planes de Mitigación
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl font-sans">
            Identificación temprana de los riesgos procesales, societarios y personales a los que se enfrenta la Sra. Liliana Gómez, junto con las defensas jurídicas diseñadas para neutralizarlos.
          </p>
        </div>

        {/* Executive summary pill bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 text-rose-950">
            <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700">Riesgos Críticos Identificados</span>
            <div className="text-2xl font-bold font-mono mt-1">3 Contingencias</div>
            <p className="text-[11px] text-rose-800 mt-0.5">Dilución en S.A.S., Cuentas Offshore y Presión Psicológica</p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-blue-950">
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700">Protocolo de Mitigación</span>
            <div className="text-2xl font-bold font-mono mt-1">100% Cobertura</div>
            <p className="text-[11px] text-blue-800 mt-0.5">Cada riesgo cuenta con medida cautelar u orden en Fiscalía</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-950">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">Nivel Residual de Amenaza</span>
            <div className="text-2xl font-bold font-mono mt-1">Controlado</div>
            <p className="text-[11px] text-emerald-800 mt-0.5">Medidas judiciales inscritas impiden consumar el fraude</p>
          </div>
        </div>
      </div>

      {/* Risk Items Detail */}
      <div className="space-y-4">
        {RISK_REGISTER.map((risk) => (
          <div
            key={risk.id}
            className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {risk.code}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${getLevelBadge(risk.level)}`}>
                    Nivel {risk.level} (Score {risk.score}/25)
                  </span>
                  {getStatusBadge(risk.mitigationStatus)}
                </div>

                <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif">
                  {risk.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {risk.description}
                </p>

                {/* Trigger Indicator */}
                <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-950">
                  <span className="font-bold text-amber-900 block mb-0.5">Disparador / Señal de Alerta Temprana:</span>
                  <span>{risk.triggerIndicator}</span>
                </div>

                {/* Mitigation Action */}
                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-lg p-3 text-xs text-emerald-950">
                  <span className="font-bold text-emerald-900 block mb-0.5">Estrategia de Mitigación Diseñada:</span>
                  <span>{risk.mitigationAction}</span>
                </div>
              </div>

              {/* Direct Documents Reference Box */}
              <div className="lg:w-64 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 font-mono">
                    Archivos que Blindan el Riesgo:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {risk.referencedDocIds.map((docId) => (
                      <DocReferencePill key={docId} docId={docId} onOpenDoc={onOpenDoc} />
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500">
                  Probabilidad: <strong>{risk.probability}/5</strong> • Severidad: <strong>{risk.severity}/5</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
