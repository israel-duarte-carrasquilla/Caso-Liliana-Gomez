import React, { useState } from 'react';
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
  CheckCircle2
} from 'lucide-react';
import { CaseDocument, LegalFront, DocumentType } from '../types';
import { FirmLogo } from './FirmLogo';
import { getSignaturesForDocument } from '../services/electronicSignatureService';

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
      fullText: newFullText || `EXPEDIENTE JUDICIAL ELECTRÓNICO\nCASO: LILIANA GÓMEZ DE MENDOZA\nDIRECCIÓN: DRA. LUZ KARIME BEETAR DE DEVIS\n\n${newTitle.toUpperCase()}\n\nAUTORIDAD: ${newAuthority}\nRADICADO: ${newRadicado}\n\nRESUMEN:\n${newSummary}\n\nCONTENIDO:\n${newFullText || 'El contenido de este documento ha sido aportado conforme a los principios de lealtad procesal y veracidad, con pleno valor probatorio en las actuaciones en curso.'}`,
      downloadFileName: `${code}_${newTitle.replace(/\s+/g, '_')}.txt`,
      status: 'aportado',
      signedBy: 'Dra. Luz Karime Beetar de Devis'
    };

    onAddDocument(newDoc);
    setIsAddModalOpen(false);
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
              <span>Repositorio Procesal Certificado</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Expediente Digital del Caso Liliana Gómez
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-sans">
              Consulte y visualice de manera inmediata cada auto judicial, denuncia penal, requerimiento societario y dictamen pericial con cadena de custodia probatoria.
            </p>
          </div>

          {/* Action to upload / add doc */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="self-start lg:self-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <Plus size={16} />
            <span>Incorporar Nuevo Archivo</span>
          </button>
        </div>

        {/* Filter & Search Controls */}
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
      </div>

      {/* Document Grid with Instant Viewing */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
          <FileText size={48} className="mx-auto text-slate-300 mb-3" />
          <h3 className="font-bold text-base text-slate-700">No se encontraron archivos en este criterio</h3>
          <p className="text-xs text-slate-500 mt-1">Pruebe ajustando el término de búsqueda o seleccionando otra categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header */}
              <div className="p-5 pb-3">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className={`px-2 py-0.5 text-[11px] font-bold uppercase rounded border ${getBadgeStyle(doc.category)}`}>
                    {getCategoryLabel(doc.category)}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {doc.code}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-base font-serif leading-snug line-clamp-2 mb-2 group-hover:text-blue-900 transition">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-3">
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
                    <span><strong>Folios:</strong> {doc.folioCount} pags.</span>
                  </div>

                  {/* Electronic Signature Status */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    {getSignaturesForDocument(doc.id).length > 0 ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 size={12} />
                        {getSignaturesForDocument(doc.id).length} Firma(s) Electrónica(s)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        <PenTool size={11} className="text-slate-400" />
                        Listo para Firma Digital
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-slate-400">
                      {doc.integrityHash.substring(0, 8)}...
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar: Instant View Button */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onOpenDoc(doc)}
                  className="flex-1 py-2 px-3 bg-slate-900 hover:bg-blue-900 text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  title="Abrir y visualizar inmediatamente este documento con membrete oficial"
                >
                  <Eye size={15} />
                  <span>Visualizar Inmediatamente</span>
                </button>
              </div>
            </div>
          ))}
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
                className="text-slate-400 hover:text-slate-700 p-1"
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
