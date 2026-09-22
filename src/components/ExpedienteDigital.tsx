import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Plus, 
  ShieldCheck, 
  Scale, 
  AlertTriangle, 
  Building2, 
  Check, 
  X, 
  FileUp, 
  FolderOpen, 
  PenTool, 
  CheckCircle2, 
  LayoutGrid, 
  List, 
  Columns2,
  Sparkles,
  ExternalLink,
  Copy,
  Calendar,
  Tag,
  Hash,
  ArrowRight
} from 'lucide-react';
import { CaseDocument, LegalFront, DocumentType } from '../types';
import { FirmLogo } from './FirmLogo';
import { getSignaturesForDocument } from '../services/electronicSignatureService';
import { DocumentPreviewIframe } from './DocumentPreviewIframe';
import { DocumentHoverPreviewCard } from './DocumentHoverPreviewCard';

interface ExpedienteDigitalProps {
  documents: CaseDocument[];
  onOpenDoc: (doc: CaseDocument) => void;
  onAddDocument: (newDoc: CaseDocument) => void;
}

export const ExpedienteDigital: React.FC<ExpedienteDigitalProps> = ({
  documents,
  onOpenDoc,
  onAddDocument
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LegalFront | 'todos'>('todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'grid' | 'list'>('split');
  const [hoverPreviewEnabled, setHoverPreviewEnabled] = useState(true);
  
  // Currently hovered/selected document for preview
  const [activePreviewDoc, setActivePreviewDoc] = useState<CaseDocument | null>(documents[0] || null);

  // Floating hover popover state (for grid or cursor hover)
  const [floatingDoc, setFloatingDoc] = useState<CaseDocument | null>(null);
  const [popoverCoords, setPopoverCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // New Document Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<LegalFront>('civil_familia');
  const [newType, setNewType] = useState<DocumentType>('memorial');
  const [newAuthority, setNewAuthority] = useState('Juzgado Cuarto de Familia de Barranquilla');
  const [newRadicado, setNewRadicado] = useState('08001-31-10-004-2024-00382-00');
  const [newSummary, setNewSummary] = useState('');
  const [newStrategicValue, setNewStrategicValue] = useState('');
  const [newFullText, setNewFullText] = useState('');

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.radicado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.authority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'todos' || doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Ensure active preview doc stays valid if list changes
  React.useEffect(() => {
    if (filteredDocs.length > 0) {
      if (!activePreviewDoc || !filteredDocs.some(d => d.id === activePreviewDoc.id)) {
        setActivePreviewDoc(filteredDocs[0]);
      }
    } else {
      setActivePreviewDoc(null);
    }
  }, [filteredDocs]);

  const handleRowMouseEnter = (doc: CaseDocument) => {
    if (!hoverPreviewEnabled) return;
    setActivePreviewDoc(doc);
  };

  const handleGridCardMouseEnter = (e: React.MouseEvent, doc: CaseDocument) => {
    if (!hoverPreviewEnabled) return;
    setActivePreviewDoc(doc);

    // Optional floating popover calculation
    const rect = e.currentTarget.getBoundingClientRect();
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    // Set popover position
    const x = Math.min(rect.right + 12, window.innerWidth - 440);
    const y = Math.max(10, rect.top);
    setPopoverCoords({ x, y });
    setFloatingDoc(doc);
  };

  const handleGridCardMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setFloatingDoc(null);
    }, 250);
  };

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const prefix = 
      newCategory === 'civil_familia' ? 'DOC-FAM' :
      newCategory === 'penal' ? 'DOC-PEN' :
      newCategory === 'societario' ? 'DOC-SOC' : 'DOC-GER';
    
    const count = documents.length + 1;
    const code = `${prefix}-${String(count).padStart(3, '0')}`;

    const newDoc: CaseDocument = {
      id: `DOC-CUSTOM-${Date.now()}`,
      code,
      title: newTitle,
      category: newCategory,
      type: newType,
      date: new Intl.DateTimeFormat('es-CO', { dateStyle: 'long' }).format(new Date()),
      radicado: newRadicado || 'RAD-PENDIENTE-VERIFICACION',
      authority: newAuthority || 'Despacho Competente',
      notaryOrEntity: newAuthority || 'Notaría / Despacho Judicial',
      partiesInvolved: ['Liliana Gómez Pradilla', 'Cecilia Pradilla de Gómez (Causante)'],
      folioCount: Math.floor(Math.random() * 20) + 4,
      integrityHash: Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      summary: newSummary || 'Documento incorporado formalmente al expediente digital del caso.',
      strategicValue: newStrategicValue || 'Aporta certeza probatoria y soporte a las pretensiones de la Sra. Liliana Gómez.',
      legalImpact: {
        familia: 'Refuerza el acervo probatorio en la liquidación de la sociedad conyugal.',
        penal: 'Elemento material probatorio para corroborar la conducta denunciada.',
        societario: 'Soporte de trazabilidad para la fiscalización societaria.'
      },
      keyEvidence: [
        'Constancia de radicación e incorporación al expediente judicial',
        'Firma de recepción por la autoridad competente'
      ],
      fullText: newFullText || `EXPEDIENTE JUDICIAL ELECTRÓNICO\nCASO: LILIANA GÓMEZ PRADILLA\nDIRECCIÓN: DRA. LUZ KARIME BEETAR DE DEVIS\n\n${newTitle.toUpperCase()}\n\nAUTORIDAD: ${newAuthority}\nRADICADO: ${newRadicado}\n\nRESUMEN:\n${newSummary}\n\nCONTENIDO:\n${newFullText || 'El contenido de este documento ha sido aportado conforme a los principios de lealtad procesal y veracidad, con pleno valor probatorio en las actuaciones en curso.'}`,
      downloadFileName: `${code}_${newTitle.replace(/\s+/g, '_')}.txt`,
      status: 'aportado',
      signedBy: 'Dra. Luz Karime Beetar de Devis'
    };

    onAddDocument(newDoc);
    setIsAddModalOpen(false);
    setActivePreviewDoc(newDoc);
    // Reset form
    setNewTitle('');
    setNewSummary('');
    setNewStrategicValue('');
    setNewFullText('');
    // Open immediately
    onOpenDoc(newDoc);
  };

  const getBadgeStyle = (cat: string) => {
    switch (cat) {
      case 'civil_familia': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'penal': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'societario': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'civil_familia': return 'Civil Familia';
      case 'penal': return 'Derecho Penal';
      case 'societario': return 'Derecho Societario';
      default: return 'Auditoría Gerencial';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="expediente-digital-view">
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <FolderOpen size={16} className="text-blue-700" />
              <span>Repositorio Procesal Certificado • Vista de Expediente Digital</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Expediente Digital del Caso Liliana Gómez
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-sans">
              Consulte, previsualice al pasar el ratón y examine cada auto judicial, denuncia penal y dictamen pericial con renderizado de miniaturas oficiales en tiempo real.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Plus size={16} />
              <span>Incorporar Nuevo Archivo</span>
            </button>
          </div>
        </div>

        {/* Filter, Search & View Mode Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mt-5">
          {/* Search box */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por radicado, título, autoridad, despacho o término procesal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
                selectedCategory === 'todos' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos ({documents.length})
            </button>
            <button
              onClick={() => setSelectedCategory('civil_familia')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
                selectedCategory === 'civil_familia' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              Civil Familia
            </button>
            <button
              onClick={() => setSelectedCategory('penal')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
                selectedCategory === 'penal' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              Penal
            </button>
            <button
              onClick={() => setSelectedCategory('societario')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
                selectedCategory === 'societario' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Societario
            </button>
          </div>
        </div>

        {/* View Layout & Hover Preview Controls Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          {/* Hover Preview Toggle Switch */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHoverPreviewEnabled(!hoverPreviewEnabled)}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 transition cursor-pointer font-medium ${
                hoverPreviewEnabled
                  ? 'bg-blue-50 text-blue-900 border-blue-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
              title="Activar o pausar la previsualización al pasar el ratón"
            >
              <Sparkles size={14} className={hoverPreviewEnabled ? 'text-blue-600' : 'text-slate-400'} />
              <span>Previsualización rápida al pasar el ratón:</span>
              <span className={`font-bold ${hoverPreviewEnabled ? 'text-emerald-700' : 'text-slate-500'}`}>
                {hoverPreviewEnabled ? 'Activada' : 'Pausada'}
              </span>
            </button>
            <span className="text-slate-400 hidden lg:inline">
              (Pase el cursor sobre cualquier documento para inspeccionar su miniatura judicial)
            </span>
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Vista Dividida: Lista con panel de previsualización en vivo sincronizado con el cursor"
            >
              <Columns2 size={14} />
              <span className="hidden sm:inline">Previsualización Dividida</span>
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Vista de Lista compacta"
            >
              <List size={14} />
              <span className="hidden sm:inline">Lista</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Vista de Cuadrícula con miniaturas"
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">Cuadrícula</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area based on View Mode */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
          <FileText size={48} className="mx-auto text-slate-300 mb-3" />
          <h3 className="font-bold text-base text-slate-700">No se encontraron archivos en este criterio</h3>
          <p className="text-xs text-slate-500 mt-1">Pruebe ajustando el término de búsqueda o seleccionando otra categoría.</p>
        </div>
      ) : viewMode === 'split' ? (
        /* Split View: List on left + Instant Hover Preview Pane on right */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Documents Table/List (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="bg-slate-100 p-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 flex items-center justify-between border border-slate-200">
              <span>{filteredDocs.length} documentos listados (pase el cursor sobre una fila)</span>
              <span className="text-[11px] text-blue-800 font-mono">
                Activo: {activePreviewDoc?.code || 'Ninguno'}
              </span>
            </div>

            <div className="space-y-2.5">
              {filteredDocs.map((doc) => {
                const isSelected = activePreviewDoc?.id === doc.id;
                const signatures = getSignaturesForDocument(doc.id);

                return (
                  <div
                    key={doc.id}
                    onMouseEnter={() => handleRowMouseEnter(doc)}
                    onClick={() => setActivePreviewDoc(doc)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${getBadgeStyle(doc.category)}`}>
                            {getCategoryLabel(doc.category)}
                          </span>
                          <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {doc.code}
                          </span>
                          {signatures.length > 0 && (
                            <span className="inline-flex items-center gap-1 font-semibold text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              <CheckCircle2 size={11} /> {signatures.length} Firma(s)
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-slate-900 text-sm font-serif leading-snug hover:text-blue-900 transition">
                          {doc.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {doc.summary}
                        </p>
                      </div>

                      {/* Instant open button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDoc(doc);
                        }}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-blue-900 text-white rounded-lg text-xs font-semibold transition shrink-0 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                        title="Abrir en Visor Completo"
                      >
                        <Eye size={14} />
                        <span className="hidden sm:inline">Visualizar</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-slate-700 font-semibold truncate max-w-[190px]">
                          {doc.radicado}
                        </span>
                        <span>•</span>
                        <span className="truncate max-w-[180px]">{doc.authority}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{doc.date}</span>
                        <span>•</span>
                        <span>{doc.folioCount} folios</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Docked Hover Preview Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-4">
            {activePreviewDoc ? (
              <DocumentHoverPreviewCard
                document={activePreviewDoc}
                onOpenDoc={onOpenDoc}
                isFloating={false}
              />
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
                <FileText size={40} className="mx-auto text-slate-300 mb-2" />
                <p className="text-xs">Pase el cursor sobre un documento para previsualizarlo aquí.</p>
              </div>
            )}
          </div>
        </div>
      ) : viewMode === 'list' ? (
        /* Compact List View with hover preview panel */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3 pl-4">Código / Tipo</th>
                    <th className="p-3">Título & Despacho</th>
                    <th className="p-3">Radicado</th>
                    <th className="p-3">Fecha & Folios</th>
                    <th className="p-3 text-right pr-4">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDocs.map((doc) => {
                    const isSelected = activePreviewDoc?.id === doc.id;
                    const signatures = getSignaturesForDocument(doc.id);

                    return (
                      <tr
                        key={doc.id}
                        onMouseEnter={() => handleRowMouseEnter(doc)}
                        onClick={() => setActivePreviewDoc(doc)}
                        className={`transition cursor-pointer select-none ${
                          isSelected
                            ? 'bg-blue-50/80 font-medium'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="p-3 pl-4 align-top whitespace-nowrap">
                          <div className="font-mono font-bold text-slate-900">{doc.code}</div>
                          <span className={`inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] uppercase font-bold border ${getBadgeStyle(doc.category)}`}>
                            {getCategoryLabel(doc.category)}
                          </span>
                        </td>
                        <td className="p-3 align-top max-w-xs">
                          <div className="font-serif font-bold text-slate-900 text-xs line-clamp-1">{doc.title}</div>
                          <div className="text-[11px] text-slate-500 truncate">{doc.authority}</div>
                          {signatures.length > 0 && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 mt-1 font-semibold">
                              <CheckCircle2 size={11} /> {signatures.length} Firma(s)
                            </span>
                          )}
                        </td>
                        <td className="p-3 align-top font-mono text-[11px] text-slate-700 whitespace-nowrap">
                          {doc.radicado}
                        </td>
                        <td className="p-3 align-top text-slate-500 whitespace-nowrap text-[11px]">
                          <div>{doc.date}</div>
                          <div className="text-[10px] text-slate-400">{doc.folioCount} pags.</div>
                        </td>
                        <td className="p-3 pr-4 align-top text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenDoc(doc);
                            }}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-blue-900 text-white rounded text-[11px] font-semibold transition cursor-pointer inline-flex items-center gap-1"
                          >
                            <Eye size={12} />
                            <span>Abrir</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-4 sticky top-4">
            {activePreviewDoc && (
              <DocumentHoverPreviewCard
                document={activePreviewDoc}
                onOpenDoc={onOpenDoc}
                isFloating={false}
              />
            )}
          </div>
        </div>
      ) : (
        /* Grid View with Miniature Iframe Thumbnails & Hover Preview */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocs.map((doc) => {
            const signatures = getSignaturesForDocument(doc.id);

            return (
              <div
                key={doc.id}
                onMouseEnter={(e) => handleGridCardMouseEnter(e, doc)}
                onMouseLeave={handleGridCardMouseLeave}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between overflow-hidden group relative"
              >
                {/* Visual Thumbnail Header with Live Iframe Miniature */}
                <div className="h-32 bg-slate-100 border-b border-slate-200 relative overflow-hidden group-hover:border-blue-300 transition">
                  <div className="absolute inset-0 pointer-events-none transform scale-90 origin-top">
                    <DocumentPreviewIframe
                      document={doc}
                      height="180px"
                      showWatermark={false}
                      className="opacity-90 shadow-2xs"
                    />
                  </div>

                  {/* Gradient Overlay with Quick Preview Action */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end justify-between p-3 text-white">
                    <span className="font-mono text-[10px] bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-xs font-bold">
                      {doc.folioCount} folios
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenDoc(doc)}
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-[11px] font-semibold transition flex items-center gap-1 shadow-xs cursor-pointer opacity-90 group-hover:opacity-100"
                    >
                      <Eye size={12} />
                      <span>Previsualizar</span>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${getBadgeStyle(doc.category)}`}>
                      {getCategoryLabel(doc.category)}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {doc.code}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm font-serif leading-snug line-clamp-2 mb-1.5 group-hover:text-blue-900 transition">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                    {doc.summary}
                  </p>

                  <div className="space-y-1 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <div className="truncate">
                      <strong>Radicado:</strong> <span className="font-mono text-slate-700">{doc.radicado}</span>
                    </div>
                    <div className="truncate">
                      <strong>Despacho:</strong> <span>{doc.authority}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span><strong>Fecha:</strong> {doc.date}</span>
                      {signatures.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 size={11} /> {signatures.length} Firma(s)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenDoc(doc)}
                    className="flex-1 py-2 px-3 bg-slate-900 hover:bg-blue-900 text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>Visualizar Memorial</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Hover Preview Popover (when hovering in Grid view if desired) */}
      {floatingDoc && viewMode === 'grid' && (
        <div 
          className="fixed z-40 hidden xl:block w-96 shadow-2xl pointer-events-none transition-all duration-150 ease-out"
          style={{ 
            left: `${popoverCoords.x}px`, 
            top: `${popoverCoords.y}px` 
          }}
        >
          <div className="pointer-events-auto">
            <DocumentHoverPreviewCard
              document={floatingDoc}
              onOpenDoc={onOpenDoc}
              onClose={() => setFloatingDoc(null)}
              isFloating={true}
            />
          </div>
        </div>
      )}

      {/* Modal for Adding / Uploading New Document */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddModalOpen(false);
          }}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileUp className="text-blue-700" size={22} />
                <h3 className="font-bold text-lg text-slate-900 font-serif">
                  Incorporar Nuevo Archivo al Expediente
                </h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateDocument} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Título del Documento o Memorial *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Memorial de Aportación de Pruebas Periciales de Avalúo"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Frente Jurídico</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as LegalFront)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden bg-white"
                  >
                    <option value="civil_familia">Civil Familia (Divorcio / Cautelares)</option>
                    <option value="penal">Derecho Penal (Fiscalía / Alzamiento)</option>
                    <option value="societario">Derecho Societario (Cámara Comercio / S.A.S.)</option>
                    <option value="gerencial">Auditoría Gerencial & Pericial</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo de Actuación</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as DocumentType)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden bg-white"
                  >
                    <option value="memorial">Memorial Judicial</option>
                    <option value="medida_cautelar">Auto de Medidas Cautelares</option>
                    <option value="denuncia">Denuncia Penal</option>
                    <option value="dictamen">Dictamen Pericial</option>
                    <option value="certificado">Certificado Registral / Mercantil</option>
                    <option value="acta_asamblea">Acta Societaria</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Despacho o Autoridad</label>
                  <input
                    type="text"
                    value={newAuthority}
                    onChange={(e) => setNewAuthority(e.target.value)}
                    placeholder="Ej: Juzgado 4º de Familia de Barranquilla"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Número de Radicado</label>
                  <input
                    type="text"
                    value={newRadicado}
                    onChange={(e) => setNewRadicado(e.target.value)}
                    placeholder="Ej: 08001-31-10-004-2024-00382-00"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Resumen Ejecutivo del Documento
                </label>
                <textarea
                  rows={2}
                  placeholder="Síntesis de lo resuelto o solicitado en este memorial..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Texto Completo / Transcripción del Memorial o Resolución
                </label>
                <textarea
                  rows={4}
                  placeholder="Pegue o redacte el contenido completo del documento para visualización inmediata con membrete..."
                  value={newFullText}
                  onChange={(e) => setNewFullText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Check size={16} />
                  <span>Incorporar y Visualizar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
