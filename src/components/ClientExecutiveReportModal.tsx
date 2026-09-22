import React from 'react';
import { X, Printer, ShieldCheck, Scale, Building2, AlertTriangle } from 'lucide-react';
import { FirmLogo } from './FirmLogo';
import { CASE_METADATA, CASE_DOCUMENTS, ASSET_INVENTORY, ACTION_MATRIX } from '../data/caseData';

interface ClientExecutiveReportModalProps {
  onClose: () => void;
}

export const ClientExecutiveReportModal: React.FC<ClientExecutiveReportModalProps> = ({ onClose }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-2 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[94vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-amber-400 bg-slate-800 px-2.5 py-1 rounded">
              DOCUMENTO DIRECTIVO PRIVADO
            </span>
            <span className="text-xs text-slate-300 hidden sm:inline">
              Informe Gerencial Sucesoral para la Sra. Liliana Gómez
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer size={15} />
              <span>Imprimir / Exportar a PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Report Canvas */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-12 bg-white text-slate-800 space-y-8 print:p-0" id="printable-client-report">
          {/* Official Letterhead */}
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <FirmLogo size="md" />
            <div className="text-right sm:border-l sm:border-slate-300 sm:pl-5 text-xs text-slate-600 space-y-0.5">
              <div className="font-bold text-slate-900 text-sm font-mono">INFORME GERENCIAL SUCESORAL No. 01-2026</div>
              <div>Fecha: {CASE_METADATA.reportDate}</div>
              <div>Causante: Cecilia Pradilla de Gómez (Q.E.P.D.)</div>
              <div>Barranquilla D.E.I.P. – Colombia</div>
            </div>
          </div>

          {/* Recipient & Case Details */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-slate-400 uppercase text-[10px] block font-bold">Cliente y Heredera Universal:</span>
              <strong className="text-sm text-slate-900 block font-serif">{CASE_METADATA.clientName}</strong>
              <span className="text-slate-600">C.C. 30.512.033 de Barranquilla • Hija Única Forzosa</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] block font-bold">Dirección Jurídica:</span>
              <strong className="text-sm text-slate-900 block font-serif">{CASE_METADATA.leadCounsel}</strong>
              <span className="text-slate-600">T.P. No. 89.412 del C.S. de la J. • Especialista en Familia</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 uppercase tracking-tight">
              Informe Gerencial de Estado Procesal, Impacto y Acciones Estratégicas
            </h1>
            <p className="text-xs text-slate-500 italic">
              Defensa del haber hereditario frente al desheredamiento de la E.P. 2.412 y el fideicomiso de la E.P. 2.411
            </p>
          </div>

          {/* Section 1: Executive Diagnosis */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-mono">
              1. Diagnóstico Ejecutivo del Caso
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-sans">
              La dirección jurídica a cargo de la <strong className="text-slate-900">Dra. Luz Karime Beetar de Devis</strong> ha estructurado un esquema de ofensiva procesal
              integral para salvaguardar la totalidad de los derechos sucesorales de la señora <strong className="text-slate-900">Liliana Gómez Pradilla</strong>,
              en su calidad indiscutible de <strong className="text-slate-900">hija única y heredera universal forzosa</strong> de doña Cecilia Pradilla de Gómez.
              Frente al otorgamiento irregular de las Escrituras 1.477, 2.411 y 2.412 de la Notaría 7ª de Barranquilla, se articuló una estrategia de impacto
              en tres frentes que permite anular el pretendido desheredamiento por falta absoluta de causal legal (Art. 1266 C.C.), desmantelar el fideicomiso civil
              por fraude a las legítimas (Art. 1242 C.C.) y recuperar el haber sucesoral total valorado en{' '}
              <strong>{formatCurrency(CASE_METADATA.totalEstimatedAssetsCOP)}</strong>.
            </p>
          </div>

          {/* Section 2: Three Fronts Summary */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-mono">
              2. Estado de Situación en los Tres Frentes Jurídicos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <strong className="text-blue-900 font-bold block mb-1">A. Civil Familia (Juez de Familia)</strong>
                <p className="text-slate-600 mb-2">
                  Demanda de Nulidad de Testamento (E.P. 2.412) y Fideicomiso (E.P. 2.411). Guarda y aposición de sellos en Edificio Girasol para impedir la posesión del albacea Daniel Conde.
                </p>
                <span className="text-[10px] font-mono text-blue-700 font-bold">Estado: Medidas Cautelares Solicitadas</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <strong className="text-emerald-900 font-bold block mb-1">B. Societario (Montacargas Gómez)</strong>
                <p className="text-slate-600 mb-2">
                  Liliana Gómez ejerce la Gerencia en calidad de Suplente inscrita y dueña del 50% de las cuotas. Se bloqueó en Cámara de Comercio la inscripción de cesiones testamentarias a sobrinos.
                </p>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">Estado: Control Directivo Asegurado</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <strong className="text-rose-900 font-bold block mb-1">C. Penal (Fiscalía Seccional)</strong>
                <p className="text-slate-600 mb-2">
                  Noticia criminal por Fraude Procesal y Falsedad Ideológica contra el abogado Francisco Mesa Rivas (Valledupar), Jaime Zapata y los testigos reclutados a las 5:33 AM del 24 de diciembre.
                </p>
                <span className="text-[10px] font-mono text-rose-700 font-bold">Estado: Indagación Penal Activa</span>
              </div>
            </div>
          </div>

          {/* Section 3: Key Assets Table */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-mono">
              3. Inventario y Avalúo de Bienes Hereditarios
            </h2>

            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Bien / Activo</th>
                    <th className="p-2.5">Matrícula / NIT</th>
                    <th className="p-2.5 text-right">Avalúo Estimado</th>
                    <th className="p-2.5">Situación Cautelar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {ASSET_INVENTORY.map((asset) => (
                    <tr key={asset.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-medium text-slate-900">
                        {asset.name}
                        <div className="text-[10px] text-slate-500 font-mono">{asset.titularActual}</div>
                      </td>
                      <td className="p-2.5 font-mono text-slate-600">{asset.matriculaInmobiliaria || asset.matriculaOrNit}</td>
                      <td className="p-2.5 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(asset.estimatedValueCOP)}
                      </td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          asset.cautelarStatus === 'asegurado' ? 'bg-emerald-100 text-emerald-800' :
                          asset.cautelarStatus === 'en_fideicomiso_impugnado' ? 'bg-rose-100 text-rose-800' :
                          asset.cautelarStatus === 'en_testamento_impugnado' ? 'bg-amber-100 text-amber-800' :
                          asset.cautelarStatus === 'descartado' ? 'bg-slate-100 text-slate-500' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {asset.cautelarStatus === 'asegurado' ? 'En Posesión Liliana' :
                           asset.cautelarStatus === 'en_fideicomiso_impugnado' ? 'Fideicomiso Impugnado' :
                           asset.cautelarStatus === 'en_testamento_impugnado' ? 'Testamento Impugnado' :
                           asset.cautelarStatus === 'descartado' ? 'Descartado (Ajeno)' :
                           'Acción Simulación/Reinv.'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Signature Box */}
          <div className="pt-8 border-t border-slate-300 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs text-slate-600">
            <div>
              <p className="text-[11px] max-w-sm italic">
                Este informe gerencial se expide con destino exclusivo a la cliente Liliana Gómez Pradilla y está amparado
                por la reserva legal y el secreto profesional del ejercicio de la abogacía.
              </p>
            </div>

            <div className="text-right space-y-1">
              <div className="font-serif font-bold text-slate-900 text-base">
                Dra. Luz Karime Beetar de Devis
              </div>
              <div className="font-mono text-xs text-slate-700">T.P. No. 89.412 del C.S. de la J.</div>
              <div className="text-slate-500 text-[11px]">Especialista en Derecho de Familia & Litigio Patrimonial</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
