import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Home, 
  Coins, 
  Car, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  AlertTriangle,
  Scale,
  Search,
  Table as TableIcon,
  LayoutGrid,
  FileText,
  MapPin,
  ExternalLink,
  Info,
  CheckCircle2,
  XCircle,
  FileCheck,
  Building,
  UserCheck,
  Landmark,
  Eye,
  X
} from 'lucide-react';
import { AssetItem, CaseDocument, AssetCluster } from '../types';
import { ASSET_INVENTORY, CASE_METADATA } from '../data/caseData';
import { PROPERTY_CLUSTERS_METRICS } from '../data/propertiesData';
import { DocReferencePill } from './DocReferencePill';

interface AssetProtectionBoardProps {
  onOpenDoc: (doc: CaseDocument) => void;
}

export const AssetProtectionBoard: React.FC<AssetProtectionBoardProps> = ({ onOpenDoc }) => {
  const [activeCluster, setActiveCluster] = useState<AssetCluster | 'todos'>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedAsset, setSelectedAsset] = useState<AssetItem | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const filteredAssets = useMemo(() => {
    return ASSET_INVENTORY.filter((asset) => {
      const matchesCluster = activeCluster === 'todos' || asset.cluster === activeCluster;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = !q || (
        asset.name.toLowerCase().includes(q) ||
        asset.matriculaInmobiliaria?.toLowerCase().includes(q) ||
        asset.referenciaCatastral?.toLowerCase().includes(q) ||
        asset.titularActual?.toLowerCase().includes(q) ||
        asset.ubicacion?.toLowerCase().includes(q) ||
        asset.tituloAdquisicion?.toLowerCase().includes(q) ||
        asset.code.toLowerCase().includes(q)
      );
      return matchesCluster && matchesSearch;
    });
  }, [activeCluster, searchTerm]);

  const getStatusBadge = (status: AssetItem['cautelarStatus']) => {
    switch (status) {
      case 'asegurado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            <ShieldCheck size={12} className="text-emerald-600" /> En Posesión / Asegurado
          </span>
        );
      case 'en_fideicomiso_impugnado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
            <AlertTriangle size={12} className="text-rose-600" /> Fideicomiso E.P. 2.411 Impugnado
          </span>
        );
      case 'en_testamento_impugnado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            <Clock size={12} className="text-amber-600" /> Testamento E.P. 2.412 Impugnado
          </span>
        );
      case 'bajo_investigacion':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
            <Scale size={12} className="text-purple-600" /> Acción Reinv./Simulación S.A.S.
          </span>
        );
      case 'descartado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
            <XCircle size={12} /> Descartado (Bien Ajeno)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
            <AlertTriangle size={12} /> Bajo Riesgo Albacea
          </span>
        );
    }
  };

  const getClusterBadge = (cluster: AssetCluster) => {
    switch (cluster) {
      case 'causante_directo':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
            <UserCheck size={11} className="text-blue-700" /> Causante Directo (Cecilia Pradilla)
          </span>
        );
      case 'vehiculo_sas':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-900 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
            <Building size={11} className="text-indigo-700" /> Vehículo S.A.S. (Montajes Inversiones)
          </span>
        );
      case 'desviado_sobrinos':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            <AlertTriangle size={11} className="text-amber-700" /> Desviado Sobrinos (Manuel / Francisco)
          </span>
        );
      case 'bajo_averiguacion':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
            <Search size={11} className="text-slate-600" /> Bajo Averiguación / Lote Raro
          </span>
        );
      case 'descartado_no_propio':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded line-through">
            <XCircle size={11} className="text-rose-500" /> Descartado ('No es nuestro')
          </span>
        );
    }
  };

  const getAssetIcon = (type: AssetItem['type']) => {
    switch (type) {
      case 'inmueble': return <Home size={16} className="text-blue-700" />;
      case 'cuotas_sociales': return <Coins size={16} className="text-emerald-700" />;
      case 'oficina_comercial': return <Building2 size={16} className="text-indigo-700" />;
      case 'vehiculo_garaje': return <Car size={16} className="text-purple-700" />;
      case 'bodega': return <Building size={16} className="text-cyan-700" />;
      case 'lote_rural': return <MapPin size={16} className="text-amber-700" />;
      default: return <CreditCard size={16} className="text-slate-700" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="activos-patrimonio-view">
      {/* Official Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-100 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md">
                <Landmark size={13} className="text-blue-700" />
                Despacho Dra. Luz Karime Beetar de Devis • Devis & Beetar Asociados
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                Tradición Jurídica desde 1962 • Barranquilla D.E.I.P.
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tracking-tight">
              Matriz Notarial y Registral de Propiedades Inmobiliarias (SNR)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-3xl font-sans leading-relaxed">
              Consolidación forense de 26 bienes inmuebles identificados en los círculos registrales de Barranquilla, Tubará y Cartagena, determinando referencias catastrales, medidas, linderos, titulares actuales y títulos matrices de adquisición.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2.5 shrink-0">
            <button
              onClick={() => onOpenDoc({
                id: "DOC-TAB-PROP-01",
                code: "CUADRO-PROP-LKBD",
                title: "Cuadro Maestro y Dictamen Registral de Propiedades Inmobiliarias y Matrículas SNR (14 Págs.)",
                category: "gerencial",
                type: "analisis_juridico",
                date: "Julio de 2024 / Actualizado 2026",
                radicado: "LKBD-PROP-INV-2026",
                authority: "Despacho Jurídico Dra. Luz Karime Beetar de Devis",
                notaryOrEntity: "Dra. Luz Karime Beetar de Devis (lkbeetar@devisbeetar.com)",
                folioCount: 14,
                integrityHash: "7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c",
                summary: "Relación notarial y registral completa de 26 bienes inmuebles con folios de matrícula SNR de Barranquilla, Tubará y Cartagena.",
                legalImpact: {
                  familia: "Establece el mapa integral de la masa hereditaria y determina los bienes en litigio.",
                  penal: "Aporta la prueba del desvío sistemático de activos societarios.",
                  societario: "Identifica transferencias a favor de Manuel Pradilla y Francisco Franco."
                },
                keyEvidence: ["26 Inmuebles analizados", "4 clústeres patrimoniales", "Megalote Tubará 35.425 m²"],
                strategicValue: "La radiografía inmobiliaria completa del caso.",
                signedBy: "Dra. Luz Karime Beetar de Devis",
                status: "bajo_analisis",
                downloadFileName: "Cuadro_Maestro_Propiedades_Inmobiliarias_SNR.pdf",
                partiesInvolved: ["Cecilia Pradilla de Gómez", "Montajes Inversiones y Asesorías S.A.S.", "Manuel Pradilla Ordóñez", "Francisco Franco Rueda"],
                fullText: `CONSULTA MAESTRA DE PROPIEDADES DISPONIBLE EN EL PANEL.`
              })}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs transition"
            >
              <FileText size={15} />
              <span>Ver Cuadro Maestro (14 Págs)</span>
            </button>
            <div className="text-[11px] font-mono text-slate-500 text-right">
              Cliente: <strong className="text-slate-800">{CASE_METADATA.clientName}</strong>
            </div>
          </div>
        </div>

        {/* Patrimonial Clusters Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mt-5">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Masa Investigada</span>
            <strong className="text-base sm:text-lg font-bold font-mono text-slate-900 block mt-0.5">
              {formatCurrency(PROPERTY_CLUSTERS_METRICS.totalEstimatedValueCOP)}
            </strong>
            <span className="text-[10px] text-slate-500 font-medium">26 Inmuebles + 50% Empresa</span>
          </div>

          <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-700 block">Causante Directa (Cecilia)</span>
            <strong className="text-base sm:text-lg font-bold font-mono text-blue-950 block mt-0.5">
              {formatCurrency(PROPERTY_CLUSTERS_METRICS.causanteDirectValueCOP)}
            </strong>
            <span className="text-[10px] text-blue-700 font-medium">10 Bienes (Girasol, 602, Chambacú)</span>
          </div>

          <div className="bg-indigo-50/70 p-3.5 rounded-xl border border-indigo-200">
            <span className="text-[10px] uppercase font-bold text-indigo-700 block">Montajes Inversiones S.A.S.</span>
            <strong className="text-base sm:text-lg font-bold font-mono text-indigo-950 block mt-0.5">
              {formatCurrency(PROPERTY_CLUSTERS_METRICS.vehiculoSasValueCOP)}
            </strong>
            <span className="text-[10px] text-indigo-700 font-medium">7 Bienes (55 Cien, Smart, Bodega)</span>
          </div>

          <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-800 block">Desviados a Sobrinos</span>
            <strong className="text-base sm:text-lg font-bold font-mono text-amber-950 block mt-0.5">
              {formatCurrency(PROPERTY_CLUSTERS_METRICS.desviadoSobrinosValueCOP)}
            </strong>
            <span className="text-[10px] text-amber-800 font-medium">8 Bienes (Manuel P. & Francisco F.)</span>
          </div>

          <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 col-span-2 sm:col-span-4 lg:col-span-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Montacargas Gómez Ltda.</span>
            <strong className="text-base sm:text-lg font-bold font-mono text-emerald-950 block mt-0.5">
              {formatCurrency(PROPERTY_CLUSTERS_METRICS.montacargasGomezValueCOP)}
            </strong>
            <span className="text-[10px] text-emerald-800 font-medium">50% Cuotas (Bajo Control)</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters, Search and View Toggle */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Buscar por Matrícula (ej: 040-104047, 040-530814), dirección, titular, Notaría o bien..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-1 bg-slate-50 self-end md:self-auto shrink-0">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                viewMode === 'table' ? 'bg-white text-blue-900 shadow-2xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon size={14} />
              <span>Matriz Notarial</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                viewMode === 'cards' ? 'bg-white text-blue-900 shadow-2xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid size={14} />
              <span>Fichas Resumen</span>
            </button>
          </div>
        </div>

        {/* Cluster Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
            Filtrar Clúster:
          </span>
          <button
            onClick={() => setActiveCluster('todos')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
              activeCluster === 'todos' 
                ? 'bg-slate-900 text-white font-semibold shadow-2xs' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({ASSET_INVENTORY.length})
          </button>
          <button
            onClick={() => setActiveCluster('causante_directo')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
              activeCluster === 'causante_directo' 
                ? 'bg-blue-900 text-white font-semibold shadow-2xs' 
                : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
            }`}
          >
            Causante Directo ({ASSET_INVENTORY.filter(a => a.cluster === 'causante_directo').length})
          </button>
          <button
            onClick={() => setActiveCluster('vehiculo_sas')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
              activeCluster === 'vehiculo_sas' 
                ? 'bg-indigo-900 text-white font-semibold shadow-2xs' 
                : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100'
            }`}
          >
            Vehículo S.A.S. ({ASSET_INVENTORY.filter(a => a.cluster === 'vehiculo_sas').length})
          </button>
          <button
            onClick={() => setActiveCluster('desviado_sobrinos')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
              activeCluster === 'desviado_sobrinos' 
                ? 'bg-amber-900 text-white font-semibold shadow-2xs' 
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
          >
            Desviados a Sobrinos ({ASSET_INVENTORY.filter(a => a.cluster === 'desviado_sobrinos').length})
          </button>
          <button
            onClick={() => setActiveCluster('bajo_averiguacion')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
              activeCluster === 'bajo_averiguacion' 
                ? 'bg-purple-900 text-white font-semibold shadow-2xs' 
                : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
            }`}
          >
            Bajo Averiguación ({ASSET_INVENTORY.filter(a => a.cluster === 'bajo_averiguacion').length})
          </button>
          <button
            onClick={() => setActiveCluster('descartado_no_propio')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
              activeCluster === 'descartado_no_propio' 
                ? 'bg-rose-900 text-white font-semibold shadow-2xs' 
                : 'bg-rose-50 text-rose-900 hover:bg-rose-100'
            }`}
          >
            Descartados ('No es nuestro') ({ASSET_INVENTORY.filter(a => a.cluster === 'descartado_no_propio').length})
          </button>
        </div>
      </div>

      {/* RESULTS COUNT */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-mono">
        <span>Mostrando {filteredAssets.length} de {ASSET_INVENTORY.length} registros forenses</span>
        <span>Haz clic en cualquier inmueble para ver la Ficha Notarial Detallada</span>
      </div>

      {/* VIEW 1: COMPLETE NOTARIAL MASTER TABLE (AS IN DRA. LUZ KARIME'S DOCUMENT) */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider font-sans">
                  <th className="py-3 px-3.5 whitespace-nowrap">Matrícula Inmobiliaria y Ref. Catastral</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">Tipo de Bien</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">Ubicación</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">Titular Actual</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">Gravamen / Afectación</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">Título de Adquisición</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">Precio / Avalúo</th>
                  <th className="py-3 px-3.5 text-center whitespace-nowrap">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAssets.map((asset) => (
                  <tr 
                    key={asset.id} 
                    onClick={() => setSelectedAsset(asset)}
                    className="hover:bg-blue-50/50 transition cursor-pointer group"
                  >
                    {/* Matrícula & Catastro */}
                    <td className="py-3.5 px-3.5 align-top">
                      <div className="font-mono font-bold text-slate-900 group-hover:text-blue-900 text-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                        {asset.matriculaInmobiliaria}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 mt-0.5 truncate max-w-[180px]" title={asset.referenciaCatastral}>
                        Ref: {asset.referenciaCatastral || 'Sin Ref. Catastral'}
                      </div>
                      <div className="mt-1.5">
                        {getClusterBadge(asset.cluster)}
                      </div>
                    </td>

                    {/* Tipo de Bien */}
                    <td className="py-3.5 px-3.5 align-top max-w-[200px]">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                        {getAssetIcon(asset.type)}
                        <span>{asset.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {asset.tipoDeBien}
                      </div>
                    </td>

                    {/* Ubicación */}
                    <td className="py-3.5 px-3.5 align-top max-w-[190px]">
                      <div className="text-slate-800 font-medium leading-snug">
                        {asset.ubicacion}
                      </div>
                    </td>

                    {/* Titular Actual */}
                    <td className="py-3.5 px-3.5 align-top max-w-[180px]">
                      <strong className={`block text-xs ${
                        asset.titularActual.includes('Cecilia') ? 'text-blue-950 font-bold' :
                        asset.titularActual.includes('Montajes') ? 'text-indigo-950 font-bold' :
                        asset.titularActual.includes('Manuel') || asset.titularActual.includes('Francisco') ? 'text-amber-950 font-bold' :
                        'text-slate-700'
                      }`}>
                        {asset.titularActual}
                      </strong>
                    </td>

                    {/* Gravamen / Afectación */}
                    <td className="py-3.5 px-3.5 align-top max-w-[210px]">
                      <div className="text-[11px] text-slate-600 leading-snug">
                        {asset.gravamenAfectacion}
                      </div>
                      <div className="mt-1">
                        {getStatusBadge(asset.cautelarStatus)}
                      </div>
                    </td>

                    {/* Título de Adquisición */}
                    <td className="py-3.5 px-3.5 align-top max-w-[220px]">
                      <div className="text-[11px] text-slate-700 leading-snug font-sans">
                        {asset.tituloAdquisicion}
                      </div>
                    </td>

                    {/* Precio Adquisición / Avalúo */}
                    <td className="py-3.5 px-3.5 align-top whitespace-nowrap">
                      <div className="text-slate-900 font-bold font-mono text-xs">
                        {formatCurrency(asset.estimatedValueCOP)}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 max-w-[130px] truncate" title={asset.precioAdquisicion}>
                        Acto: {asset.precioAdquisicion}
                      </div>
                    </td>

                    {/* Acción */}
                    <td className="py-3.5 px-3.5 align-middle text-center whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAsset(asset);
                        }}
                        className="p-1.5 text-blue-700 hover:bg-blue-100 rounded-md transition"
                        title="Ver Ficha Técnica"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VIEW 2: BENTO GRID / CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-blue-300 transition flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-blue-100 transition">
                      {getAssetIcon(asset.type)}
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-800">
                      {asset.matriculaInmobiliaria}
                    </span>
                  </div>
                  {getClusterBadge(asset.cluster)}
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-serif leading-snug group-hover:text-blue-900 transition">
                    {asset.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-start gap-1">
                    <MapPin size={13} className="shrink-0 text-slate-400 mt-0.5" />
                    <span>{asset.ubicacion}</span>
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-sans text-[11px]">Titular:</span>
                    <strong className="text-slate-900 text-right truncate max-w-[170px]">{asset.titularActual}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-sans text-[11px]">Avalúo Estimado:</span>
                    <strong className="text-blue-950 font-bold">{formatCurrency(asset.estimatedValueCOP)}</strong>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1 border-t border-slate-200/60 font-sans">
                    <span>Precio Acto:</span>
                    <span className="truncate max-w-[170px] font-mono">{asset.precioAdquisicion}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 bg-blue-50/40 p-2.5 rounded-lg border border-blue-100/60">
                  <span className="font-semibold text-slate-700 block text-[10px] uppercase tracking-wider mb-0.5">
                    Título de Adquisición:
                  </span>
                  <p className="line-clamp-2">{asset.tituloAdquisicion}</p>
                </div>

                <div className="pt-1">
                  {getStatusBadge(asset.cautelarStatus)}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">Ref: {asset.code}</span>
                <span className="text-blue-700 font-medium group-hover:underline flex items-center gap-1 text-[11px]">
                  Ver Ficha <Eye size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAILED PROPERTY MODAL */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    Matrícula: {selectedAsset.matriculaInmobiliaria}
                  </span>
                  {getClusterBadge(selectedAsset.cluster)}
                </div>
                <h2 className="text-xl font-bold font-serif text-slate-900">
                  {selectedAsset.name}
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Ref. Catastral: {selectedAsset.referenciaCatastral || 'Sin información registrada en cabecera'}
                </p>
              </div>

              <button
                onClick={() => setSelectedAsset(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">Titular Actual Registrado</span>
                  <strong className="text-slate-900 text-sm">{selectedAsset.titularActual}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">Valor Peritado Estimado</span>
                  <strong className="text-blue-950 font-mono text-sm font-bold">{formatCurrency(selectedAsset.estimatedValueCOP)}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">Ubicación</span>
                  <span className="text-slate-800">{selectedAsset.ubicacion}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">Precio de Adquisición en Escritura</span>
                  <span className="text-slate-800 font-mono">{selectedAsset.precioAdquisicion}</span>
                </div>
              </div>

              {/* Medidas y Linderos */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  Cabida, Medidas y Linderos según Certificado SNR:
                </span>
                <p className="text-xs text-slate-700 font-mono leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {selectedAsset.medidasLinderos}
                </p>
              </div>

              {/* Título de Adquisición */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  Título de Adquisición y Tradición Notarial:
                </span>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {selectedAsset.tituloAdquisicion}
                </p>
              </div>

              {/* Gravamen o Afectación */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  Gravámenes, Limitaciones y Afectaciones:
                </span>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-xs text-slate-800 font-medium">
                    {selectedAsset.gravamenAfectacion}
                  </p>
                  <div>
                    {getStatusBadge(selectedAsset.cautelarStatus)}
                  </div>
                </div>
              </div>

              {/* Situación Procesal y Estrategia */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-blue-900 block tracking-wider">
                  Estrategia Jurídica del Despacho (Dra. Luz Karime Beetar):
                </span>
                <p className="text-xs text-blue-950 font-sans leading-relaxed">
                  {selectedAsset.legalStatus}
                </p>
                {selectedAsset.strategicNote && (
                  <p className="text-[11px] text-blue-800 italic mt-1 font-serif">
                    Nota clave: {selectedAsset.strategicNote}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Oficina de Registro: Barranquilla / Tubará / Cartagena
              </span>
              <button
                onClick={() => setSelectedAsset(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
