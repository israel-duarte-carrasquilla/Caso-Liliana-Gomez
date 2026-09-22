import React, { useState } from 'react';
import { 
  Scale, 
  AlertTriangle, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Gavel, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
import { CaseDocument, LegalFront } from '../types';
import { CASE_DOCUMENTS } from '../data/caseData';
import { DocReferencePill } from './DocReferencePill';

interface LegalFrontExplainerProps {
  onOpenDoc: (doc: CaseDocument) => void;
}

export const LegalFrontExplainer: React.FC<LegalFrontExplainerProps> = ({ onOpenDoc }) => {
  const [selectedFront, setSelectedFront] = useState<LegalFront | 'todos'>('todos');

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn" id="analisis-frentes-juridicos-view">
      {/* Header Explanatory */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <Gavel size={15} className="text-blue-700" />
              <span>Doctrina y Estrategia Procesal Sucesoral</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Análisis Tridimensional de Impacto y Acciones
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl font-sans">
              La protección de los derechos de la <strong className="text-slate-900">Sra. Liliana Gómez Pradilla</strong> como{' '}
              <strong className="text-slate-900">hija única y universal heredera</strong> de la causante{' '}
              <strong className="text-slate-900">Cecilia Pradilla de Gómez (Q.E.P.D.)</strong> se estructura a través de una ofensiva
              sincronizada en tres jurisdicciones, bajo la dirección jurídica de la <strong className="text-slate-900">Dra. Luz Karime Beetar de Devis</strong>.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start md:self-auto border border-slate-200">
            <button
              onClick={() => setSelectedFront('todos')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                selectedFront === 'todos' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedFront('civil_familia')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                selectedFront === 'civil_familia' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Civil Familia
            </button>
            <button
              onClick={() => setSelectedFront('penal')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                selectedFront === 'penal' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Penal
            </button>
            <button
              onClick={() => setSelectedFront('societario')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                selectedFront === 'societario' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Societario
            </button>
          </div>
        </div>
      </div>

      {/* 1. FRENTE CIVIL FAMILIA (SUCESIONES & NULIDADES) */}
      {(selectedFront === 'todos' || selectedFront === 'civil_familia') && (
        <div className="bg-white rounded-2xl border border-blue-200 shadow-2xs overflow-hidden transition" id="front-civil-familia">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-200 border border-blue-400/30">
                <Scale size={26} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-blue-300 font-semibold font-mono">
                  JURISDICCIÓN DE FAMILIA & PROCESOS SUCESORALES
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  Frente Civil Familia: Nulidad de Testamento, Fideicomiso & Sucesión
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30">
                Juez de Familia del Circuito de Barranquilla
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Ineficacia Radical del Desheredamiento y Fraude a la Legítima Rigorosa
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed text-justify">
                  El artículo 1266 del Código Civil colombiano exige de manera taxativa y rigurosa que para desheredar a un legitimario
                  forzoso debe haberse cometido una <em>ofensa directa y grave contra la persona, honor o bienes del testador</em>.
                  En la Escritura Pública 2.412, los hechos invocados como supuesto desheredamiento corresponden exclusivamente a
                  <strong> diferencias y actuaciones de gestión corporativa ordinaria</strong> en la sociedad <em>Montacargas Gómez Ltda.</em>
                  (solicitud de auditorías y discrepancias en actas de asamblea). La jurisprudencia consolidada de la Sala de Casación Civil de la
                  Corte Suprema de Justicia establece que los conflictos empresariales entre socios son <strong>atípicos e inidóneos</strong> para privar de su legítima a un hijo.
                </p>

                <p className="text-sm text-slate-700 leading-relaxed text-justify">
                  Asimismo, la Escritura Pública 2.411 de Fideicomiso Civil constituyó una enajenación simulada que despojó a la sucesión
                  del Apartamento 602 de El Encanto (Barranquilla) y la Oficina 408 de Chambacú (Cartagena), violando flagrantemente el límite de la
                  <strong> porción de libre disposición (Art. 1242 C.C. modificado por Ley 1934 de 2018)</strong>, pues Liliana Gómez es la única heredera
                  forzosa en primer orden (Art. 1045 C.C.).
                </p>

                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs space-y-2">
                  <div className="font-bold text-blue-900 uppercase tracking-wider text-[11px]">
                    Fundamentación Normativa Invocada por la Dra. Luz Karime Beetar:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    <li><strong>Artículo 1266 Código Civil:</strong> Taxatividad y atipicidad probatoria de las causales de desheredamiento.</li>
                    <li><strong>Artículo 1242 Código Civil (Ley 1934 de 2018):</strong> Garantía intangible del 50% de la masa a favor de los legitimarios forzosos.</li>
                    <li><strong>Artículo 1740 y 1746 Código Civil:</strong> Nulidad absoluta de los actos jurídicos por objeto y causa ilícita (fraude sucesoral).</li>
                    <li><strong>Artículo 476 C.G.P. (Guarda y Aposición de Sellos):</strong> Medida cautelar inmediata para asegurar el Edificio Girasol contra la intromisión de los albaceas.</li>
                  </ul>
                </div>
              </div>

              {/* Box of actions in this front */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
                    Acciones Procesales en Marcha
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Demanda de Nulidad de Testamento:</strong> Impugnación de la E.P. 2.412 y restitución forzosa.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Nulidad de Fideicomiso Civil:</strong> Impugnación de la E.P. 2.411 sobre El Encanto y Chambacú.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Aposición de Sellos:</strong> Bloqueo de acceso al albacea Daniel Conde Gómez en Edificio Girasol.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Apertura de Sucesión Intestada:</strong> Acumulación procesal ante el Juez de Familia competente.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <span className="text-[11px] text-slate-500 block mb-1.5 font-medium">Archivos procesales directos:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <DocReferencePill docId="DOC-ESC-2412" onOpenDoc={onOpenDoc} customLabel="E.P. 2.412 (Testamento)" />
                    <DocReferencePill docId="DOC-ESC-2411" onOpenDoc={onOpenDoc} customLabel="E.P. 2.411 (Fideicomiso)" />
                    <DocReferencePill docId="DOC-RC-30512033" onOpenDoc={onOpenDoc} customLabel="Registro Civil Liliana" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FRENTE SOCIETARIO (MONTACARGAS GÓMEZ LIMITADA) */}
      {(selectedFront === 'todos' || selectedFront === 'societario') && (
        <div className="bg-white rounded-2xl border border-emerald-200 shadow-2xs overflow-hidden transition" id="front-societario">
          <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                <Building2 size={26} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold font-mono">
                  DERECHO COMERCIAL & GOBIERNO CORPORATIVO
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  Frente Societario: Blindaje de Montacargas Gómez Ltda. y Bloqueo en CCB
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                Matrícula CCB: No. 8.721 | NIT: 890.105.966-0
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Continuidad Administrativa y Protección de Empresa en Marcha ($2.039M COP)
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed text-justify">
                  El certificado mercantil expedido el 22 de diciembre de 2025 demuestra que <em>Montacargas Gómez Limitada</em> cuenta
                  con un capital social de 180.000 cuotas: <strong>90.000 cuotas (50%) pertenecen a título privativo a Liliana Gómez Pradilla</strong>{' '}
                  y las restantes 90.000 cuotas correspondían a la causante Cecilia Pradilla. Es decir, Liliana Gómez ya es dueña legítima de la
                  mitad de la empresa y, a su vez, la única llamada a heredar el otro 50%.
                </p>

                <p className="text-sm text-slate-700 leading-relaxed text-justify">
                  Además, Liliana Gómez ostenta el nombramiento inscrito de <strong>Suplente del Gerente</strong> (Escritura 318 de 2001).
                  Ocurrida la muerte de la titular, Liliana Gómez asume de pleno derecho la representación legal para evitar la paralización
                  de los contratos con puertos, aduanas y los 42 trabajadores de la compañía. Se procedió a notificar a la Cámara de Comercio
                  de Barranquilla la prohibición de registrar cualquier adjudicación o cesión testamentaria de cuotas a favor de Ángel Conde, Daniel Conde o David Safi
                  en virtud del litigio de nulidad en curso.
                </p>

                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-xs space-y-2">
                  <div className="font-bold text-emerald-900 uppercase tracking-wider text-[11px]">
                    Marco Mercantil y Acciones de Control:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    <li><strong>Código de Comercio, Art. 440:</strong> Asunción automática de la administración por el Suplente inscrito ante falta definitiva del principal.</li>
                    <li><strong>Ley 222 de 1995, Art. 48:</strong> Ejercicio del derecho de inspección documental sobre la contabilidad de 2024 y 2025.</li>
                    <li><strong>Auditoría Contable Forense:</strong> Desvirtuación pericial de las supuestas 'malversaciones' fabricadas por el abogado Francisco Mesa Rivas.</li>
                  </ul>
                </div>
              </div>

              {/* Box of actions in this front */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
                    Acciones Tácticas Ejecutadas
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Ratificación de Representación Legal:</strong> Ejercicio de la gerencia por Liliana Gómez.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Bloqueo Registral en CCB:</strong> Oposición al registro de traspasos de cuotas testamentarias.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Salvaguarda Bancaria:</strong> Circularización a entidades financieras (Bancolombia, Banco de Bogotá).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Peritaje Contable Oficial:</strong> Determinación del valor real y descarte de deudas ficticias.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <span className="text-[11px] text-slate-500 block mb-1.5 font-medium">Documentos comerciales clave:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <DocReferencePill docId="DOC-CCB-8721" onOpenDoc={onOpenDoc} customLabel="Certificado CCB 8.721" />
                    <DocReferencePill docId="DOC-ESC-1912" onOpenDoc={onOpenDoc} customLabel="E.P. 1.912 (Sucesión 2000)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FRENTE PENAL (FRAUDE PROCESAL, FALSEDAD & TESTIGOS SOSPECHOSOS) */}
      {(selectedFront === 'todos' || selectedFront === 'penal') && (
        <div className="bg-white rounded-2xl border border-rose-200 shadow-2xs overflow-hidden transition" id="front-penal">
          <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-red-950 text-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-200 border border-rose-400/30">
                <AlertTriangle size={26} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-rose-300 font-semibold font-mono">
                  JUSTICIA PENAL ORDINARIA & FISCALÍA GENERAL DE LA NACIÓN
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  Frente Penal: Fraude Procesal, Testimonio Falso & Fallas Biométricas
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/30 text-rose-200 border border-rose-400/30">
                Noticia Criminal en Fiscalía Seccional Atlántico
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                  La Palanca Coercitiva: Desarticulación del Concierto para Desheredar
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed text-justify">
                  El frente penal constituye la palanca de presión más contundente del caso. La investigación de la Dra. Luz Karime Beetar
                  ha descubierto evidencias incontrovertibles de la orquestación delictiva:
                </p>

                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 bg-rose-50/40 p-3.5 rounded-xl border border-rose-100">
                  <li><strong>La Declaración Falsa de Valledupar:</strong> El abogado Francisco Omar Mesa Rivas viajó a 250 km de Barranquilla para rendir una declaración extrajuicio (No. 4912 en Notaría 2ª de Valledupar) el 23 de diciembre de 2025, prefabricando acusaciones mercantiles para sustentar el testamento que se otorgaría al día siguiente.</li>
                  <li><strong>El Correo de las 5:33 AM:</strong> El 24 de diciembre de 2025 a las 5:33 AM, el tramitador Jaime Zapata Quintana enviaba un correo al funcionario notarial diciendo: <em>"BUENIS DIAS SOLO ME FALTA ALLEGARTE LA CEDULA DE DON ALDEMAR DARIO DUQUE SALAZAR"</em>, demostrando el reclutamiento previo de testigos instrumentales.</li>
                  <li><strong>La Imposibilidad de Huellas:</strong> En las actas de cotejo biométrico NotariID (Actas 150777, 171043 y 171046) consta expresamente: <em>"Imposibilidad de captura de huellas"</em>, lo que pone en grave duda la presencia real y lucidez de la causante.</li>
                  <li><strong>Abuso de Adulto Mayor (Ley 1850 de 2017):</strong> Aprovechamiento de una anciana de 88 años con ateromatosis carotídea y leucoaraiosis cerebral diagnosticada en TAC para hacerla firmar actos descapitalizantes.</li>
                </ul>

                <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4 text-xs space-y-2">
                  <div className="font-bold text-rose-900 uppercase tracking-wider text-[11px]">
                    Tipos Penales y Consecuencias (6 a 12 Años de Prisión):
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    <li><strong>Fraude Procesal (Art. 453 C.P.):</strong> Inducir en error al Notario y a los jueces de la República mediante documentos falsos.</li>
                    <li><strong>Falsedad en Testimonio y Declaración Jurada (Art. 442 C.P.):</strong> Declarar bajo juramento hechos tergiversados en Valledupar.</li>
                    <li><strong>Alzamiento de Bienes / Defraudación de Derechos Sucesoriales (Art. 253 C.P.):</strong> Enajenación u ocultamiento de bienes en perjuicio del acreedor o legitimario.</li>
                  </ul>
                </div>
              </div>

              {/* Box of actions in this front */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
                    Pruebas Forenses Aportadas
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-rose-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Declaración No. 4912:</strong> Prueba del testimonio preconcebido en Valledupar.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-rose-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Cadena de Correos 5:33 AM:</strong> Evidencia digital del tramitador Jaime Zapata.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-rose-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Actas Biométricas Fallidas:</strong> Constancia de falta de huellas digitales.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-rose-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Historial Clínico Jade Salud:</strong> Evidencia de fragilidad y manipulación a los 88 años.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <span className="text-[11px] text-slate-500 block mb-1.5 font-medium">Ver pruebas penales inmediatas:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <DocReferencePill docId="DOC-DEC-4912" onOpenDoc={onOpenDoc} customLabel="Declaración Valledupar" />
                    <DocReferencePill docId="DOC-EML-533AM" onOpenDoc={onOpenDoc} customLabel="Correo 5:33 AM" />
                    <DocReferencePill docId="DOC-BIO-NOT7" onOpenDoc={onOpenDoc} customLabel="Falla Biometría Huellas" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
