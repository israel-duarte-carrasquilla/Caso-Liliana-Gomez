/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CASE_DOCUMENTS, CASE_METADATA } from './data/caseData';
import { CaseDocument } from './types';
import { FirmHeader } from './components/FirmHeader';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { LegalFrontExplainer } from './components/LegalFrontExplainer';
import { ExpedienteDigital } from './components/ExpedienteDigital';
import { ActionPlanManager } from './components/ActionPlanManager';
import { RiskMatrix } from './components/RiskMatrix';
import { AssetProtectionBoard } from './components/AssetProtectionBoard';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { ClientExecutiveReportModal } from './components/ClientExecutiveReportModal';
import { FirmLogo } from './components/FirmLogo';
import { ShieldCheck, Phone, Mail, MapPin, Scale, Lock } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('resumen');
  const [selectedDocument, setSelectedDocument] = useState<CaseDocument | null>(null);
  const [documents, setDocuments] = useState<CaseDocument[]>(() => {
    const saved = localStorage.getItem('luz_karime_case_docs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved docs', e);
      }
    }
    return CASE_DOCUMENTS;
  });
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('luz_karime_case_docs', JSON.stringify(documents));
  }, [documents]);

  const handleOpenDoc = (doc: CaseDocument) => {
    setSelectedDocument(doc);
  };

  const handleAddDocument = (newDoc: CaseDocument) => {
    setDocuments(prev => [newDoc, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col font-sans selection:bg-[#1E3A8A] selection:text-white" id="main-legal-case-app">
      {/* Top Professional Header */}
      <FirmHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        documentCount={documents.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'resumen' && (
          <ExecutiveSummary
            onOpenDoc={handleOpenDoc}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'frentes' && (
          <LegalFrontExplainer
            onOpenDoc={handleOpenDoc}
          />
        )}

        {activeTab === 'expediente' && (
          <ExpedienteDigital
            documents={documents}
            onOpenDoc={handleOpenDoc}
            onAddDocument={handleAddDocument}
          />
        )}

        {activeTab === 'acciones' && (
          <ActionPlanManager
            onOpenDoc={handleOpenDoc}
          />
        )}

        {activeTab === 'riesgos' && (
          <RiskMatrix
            onOpenDoc={handleOpenDoc}
          />
        )}

        {activeTab === 'patrimonio' && (
          <AssetProtectionBoard
            onOpenDoc={handleOpenDoc}
          />
        )}
      </main>

      {/* Document Viewer Modal - Opens IMMEDIATELY on any reference click */}
      {selectedDocument && (
        <DocumentViewerModal
          document={selectedDocument}
          allDocuments={documents}
          onClose={() => setSelectedDocument(null)}
          onSelectDocument={setSelectedDocument}
        />
      )}

      {/* Printable Executive Report Modal for Liliana Gómez */}
      {isReportModalOpen && (
        <ClientExecutiveReportModal
          onClose={() => setIsReportModalOpen(false)}
        />
      )}

      {/* Institutional Legal Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-12 py-10" id="institutional-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <FirmLogo size="sm" theme="dark" />

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-300">
              <span className="flex items-center gap-1.5">
                <Mail size={14} className="text-slate-400" />
                <a href={`mailto:${CASE_METADATA.counselEmail}`} className="hover:text-white transition">
                  {CASE_METADATA.counselEmail}
                </a>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-slate-400" />
                <a href="tel:+573157547997" className="hover:text-white transition">
                  {CASE_METADATA.counselPhone}
                </a>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400" />
                <span>{CASE_METADATA.counselLocation}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <Lock size={13} className="text-emerald-500" />
              <span>
                Documento de secreto profesional y reserva legal procesal (Art. 74 C.P. y Ley 1123 de 2007).
              </span>
            </div>
            <div>
              <span>Caso: <strong>Sra. Liliana Gómez</strong> • Apoderada: <strong>Dra. Luz Karime Beetar de Devis</strong> (T.P. 89.412 C.S.J.)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
