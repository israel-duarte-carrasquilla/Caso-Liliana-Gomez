import React from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Building2, 
  AlertTriangle, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  FileText,
  Clock,
  UserCheck
} from 'lucide-react';
import { CASE_METADATA, CASE_DOCUMENTS, CASE_MILESTONES, STRATEGIC_SCENARIOS } from '../data/caseData';
import { CaseDocument } from '../types';
import { DocReferencePill } from './DocReferencePill';

interface ExecutiveSummaryProps {
  onOpenDoc: (doc: CaseDocument) => void;
  onNavigateTab: (tab: string) => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  onOpenDoc,
  onNavigateTab
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn" id="tablero-gerencial-view">
      {/* Executive Directorial Brief Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#10223D] text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-end pr-8">
          <Scale size={240} />
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold tracking-wide uppercase">
            <span>Diagnóstico Gerencial del Caso Sucesoral</span>
            <span>•</span>
            <span>Liliana Gómez (Hija y Única Heredera Universal)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white leading-tight">
            Informe de Situación y Estrategia Gerencial Multidimensional
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans font-light">
            Bajo la dirección de la <strong className="text-white font-medium">Dra. Luz Karime Beetar de Devis</strong>,
            hemos estructurado la defensa judicial y patrimonial de la señora <strong className="text-white font-medium">Liliana Gómez Pradilla</strong>,
            hija legítima y única heredera forzosa de la causante <strong className="text-white font-medium">Cecilia Pradilla de Gómez (Q.E.P.D.)</strong>.
            Frente al entramado notarial de despojo orquestado en la Notaría 7ª de Barranquilla mediante las Escrituras 1.477, 2.411 y 2.412,
            desplegamos una estrategia en tres frentes coordinados —<span className="text-blue-300 font-medium">Civil Familia</span>,{' '}
            <span className="text-rose-300 font-medium">Penal</span> y{' '}
            <span className="text-emerald-300 font-medium">Societario</span>— para anular el falso desheredamiento, tumbar el fideicomiso civil y recuperar el{' '}
            <strong className="text-amber-300 font-semibold">100% de la masa sucesoral ($9.850 Millones COP)</strong>.
          </p>

          {/* Quick Direct Document References in Lead */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Archivos auténticos analizados:</span>
            <DocReferencePill docId="DOC-ANA-000" onOpenDoc={onOpenDoc} customLabel="Análisis de las 3 Escrituras" />
            <DocReferencePill docId="DOC-ESC-2412" onOpenDoc={onOpenDoc} customLabel="E.P. 2.412 (Testamento/Desheredamiento)" />
            <DocReferencePill docId="DOC-ESC-2411" onOpenDoc={onOpenDoc} customLabel="E.P. 2.411 (Fideicomiso El Encanto/Chambacú)" />
            <DocReferencePill docId="DOC-ESC-1477" onOpenDoc={onOpenDoc} customLabel="E.P. 1.477 (DVA Cuidados Paliativos)" />
            <DocReferencePill docId="DOC-CCB-8721" onOpenDoc={onOpenDoc} customLabel="Certificado CCB Montacargas Gómez" />
          </div>
        </div>
      </div>

      {/* KPI Directorial Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Assets at stake */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Patrimonio Hereditario en Disputa</span>
            <DollarSign size={18} className="text-slate-700" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {formatCurrency(CASE_METADATA.totalEstimatedAssetsCOP)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
            <span className="font-semibold text-slate-700">Inmuebles + 50% Montacargas</span>
            <span>• 100% masa</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Dictamen pericial:</span>
            <DocReferencePill docId="DOC-ANA-000" onOpenDoc={onOpenDoc} />
          </div>
        </div>

        {/* Metric 2: Liliana's Exclusive Right */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-800">Vocación Hereditaria de Liliana</span>
            <Scale size={20} className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-900">
            100% Legítima
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-700 font-medium mt-2">
            <span>Única Hija Forzosa (Art. 1045 C.C.)</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Registro Civil:</span>
            <DocReferencePill docId="DOC-RC-30512033" onOpenDoc={onOpenDoc} />
          </div>
        </div>

        {/* Metric 3: Company Control */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">Control Montacargas Gómez Ltda.</span>
            <Building2 size={20} className="text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-700">
            50% Directo + Suplente
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 mt-2">
            <span className="font-semibold">Facturación:</span>
            <span>{'>'}$2.039M COP en RUES</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Cámara Comercio:</span>
            <DocReferencePill docId="DOC-CCB-8721" onOpenDoc={onOpenDoc} />
          </div>
        </div>

        {/* Metric 4: Penal Vulnerabilities of Opposition */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-800">Vulnerabilidades del Opositor</span>
            <AlertTriangle size={18} className="text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>4 Delitos</span>
            <span className="text-xs font-sans font-semibold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
              Fraude Procesal
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2">
            <span>Mesa Rivas + Zapata + Testigos 5:33 AM</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Prueba extrajuicio:</span>
            <DocReferencePill docId="DOC-DEC-4912" onOpenDoc={onOpenDoc} />
          </div>
        </div>
      </div>

      {/* Cross-Impact Strategic Pincher Diagram (Familia + Penal + Societario) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Layers size={16} className="text-blue-700" />
              <span>Metodología de Gerencia Jurídica</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-1">
              Estrategia 'Pinza' Tridimensional de Alto Impacto
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Cómo interactúan las tres áreas del derecho para proteger los derechos hereditarios de Liliana Gómez y neutralizar el despojo.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('frentes')}
            className="self-start md:self-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Ver Análisis Detallado por Frente</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 3 Columns Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Column 1: Civil Familia */}
          <div className="rounded-xl border border-blue-200/80 bg-blue-50/30 p-5 flex flex-col justify-between hover:border-blue-300 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
                  <Scale size={14} />
                  Frente 1: Civil Familia
                </span>
                <span className="text-[11px] font-mono text-blue-700 font-semibold">Juzgado de Familia BAQ</span>
              </div>

              <h3 className="font-bold text-slate-900 text-base mb-2">
                Nulidad de Testamento, Fideicomiso & Sucesión Intestada
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Impugnación de las E.P. 2.412 y 2.411 por atipicidad manifiesta de la causal de desheredamiento (Art. 1266 C.C.), fraude a la legítima rigorosa (Art. 1242 C.C.) y captación de la voluntad en anciana de 88 años.
              </p>

              <div className="space-y-2 mb-4 text-xs">
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Guarda y aposición de sellos en Edificio Girasol (Ap. 16 y garajes).</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Inscripción de demanda en folios de Barranquilla (El Encanto) y Cartagena (Chambacú).</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Reconocimiento universal de Liliana Gómez como única heredera legítima.</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-blue-200/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Escritura atacada:</span>
              <DocReferencePill docId="DOC-ESC-2412" onOpenDoc={onOpenDoc} />
            </div>
          </div>

          {/* Column 2: Societario */}
          <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/30 p-5 flex flex-col justify-between hover:border-emerald-300 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                  <Building2 size={14} />
                  Frente 2: Societario Comercial
                </span>
                <span className="text-[11px] font-mono text-emerald-700 font-semibold">Cámara Comercio BAQ</span>
              </div>

              <h3 className="font-bold text-slate-900 text-base mb-2">
                Control de Montacargas Gómez Ltda. & Bloqueo Registral
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Liliana Gómez posee el 50% propio de la empresa y es la Suplente del Gerente inscrita. Se asume la administración, se ratifican firmas bancarias y se bloquea el traspaso del 50% hereditario.
              </p>

              <div className="space-y-2 mb-4 text-xs">
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Asunción de la Gerencia por vacancia definitiva de la causante.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Bloqueo ante Cámara de Comercio para impedir cesión de cuotas a los sobrinos.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Auditoría contable para desmentir las acusaciones falsas de malversación.</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-200/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Soporte CCB:</span>
              <DocReferencePill docId="DOC-CCB-8721" onOpenDoc={onOpenDoc} />
            </div>
          </div>

          {/* Column 3: Penal */}
          <div className="rounded-xl border border-rose-200/80 bg-rose-50/30 p-5 flex flex-col justify-between hover:border-rose-300 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-100 text-rose-900 border border-rose-200">
                  <AlertTriangle size={14} />
                  Frente 3: Derecho Penal
                </span>
                <span className="text-[11px] font-mono text-rose-700 font-semibold">Fiscalía Seccional</span>
              </div>

              <h3 className="font-bold text-slate-900 text-base mb-2">
                Fraude Procesal, Falsedad & Abuso de Adulto Mayor
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Noticia criminal formal contra el abogado Francisco Omar Mesa Rivas (Valledupar), el tramitador Jaime Zapata y los testigos del 24 de diciembre.
              </p>

              <div className="space-y-2 mb-4 text-xs">
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 size={14} className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>Prueba del correo de las 5:33 AM tramitando cédulas de los testigos.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 size={14} className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>Actas biométricas con constancia oficial de imposibilidad de huellas.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 size={14} className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>Denuncia penal por inducción en error al Notario e instrumentalización de anciana de 88 años.</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-rose-200/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Correo acusatorio:</span>
              <DocReferencePill docId="DOC-EML-533AM" onOpenDoc={onOpenDoc} />
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Roadmap Milestones */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div>
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Cronograma de Fases y Hitos Procesales (Roadmap Gerencial)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Planificación secuencial de actuaciones judiciales con entregables tangibles.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('acciones')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 transition flex items-center gap-1 cursor-pointer"
          >
            <span>Ver Matriz de Acciones</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CASE_MILESTONES.map((ms) => (
            <div key={ms.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="font-mono font-bold text-slate-400">FASE {ms.phase}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    ms.status === 'en_curso' ? 'bg-blue-100 text-blue-800 animate-pulse' :
                    ms.status === 'completado' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {ms.status === 'en_curso' ? 'En Ejecución' : ms.status === 'completado' ? 'Listo' : 'Próximo'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1 leading-snug">{ms.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{ms.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/80">
                <div className="text-[11px] text-slate-500 mb-2">
                  <strong>Entregable:</strong> {ms.keyDeliverable}
                </div>
                <div className="flex flex-wrap gap-1">
                  {ms.referencedDocIds.map(docId => (
                    <DocReferencePill key={docId} docId={docId} onOpenDoc={onOpenDoc} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Scenarios */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h2 className="text-xl font-bold font-serif text-slate-900">
            Escenarios Estratégicos de Resolución
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Modelación de desenlaces procesales según el comportamiento procesal de los terceros y la contundencia probatoria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STRATEGIC_SCENARIOS.map((scn) => (
            <div key={scn.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold mb-1 text-blue-900">
                  <span>{scn.name}</span>
                  <span className="text-slate-500 font-sans">{scn.timeframe}</span>
                </div>
                <div className="text-xs font-semibold text-emerald-800 mb-2">
                  Probabilidad estimada: {scn.probability}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {scn.description}
                </p>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="text-blue-950 font-semibold">Ventaja Táctica:</div>
                  <div className="text-slate-600">{scn.tacticalAdvantage}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs">
                <span className="font-bold text-slate-800">Posición de la Dra. Luz Karime Beetar:</span>{' '}
                <span className="text-slate-600">{scn.recommendedPosition}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
