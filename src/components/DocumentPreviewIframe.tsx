import React, { useMemo } from 'react';
import { CaseDocument } from '../types';
import { getSignaturesForDocument } from '../services/electronicSignatureService';

interface DocumentPreviewIframeProps {
  document: CaseDocument;
  height?: number | string;
  className?: string;
  showWatermark?: boolean;
}

export const DocumentPreviewIframe: React.FC<DocumentPreviewIframeProps> = ({
  document: doc,
  height = '100%',
  className = '',
  showWatermark = true
}) => {
  const signatures = useMemo(() => {
    return getSignaturesForDocument(doc.id);
  }, [doc.id]);

  const srcDocContent = useMemo(() => {
    const isPenal = doc.category === 'penal' || doc.radicado.includes('FGN') || doc.authority.toLowerCase().includes('fiscalía');
    const isJuzgado = doc.authority.toLowerCase().includes('juzgado');
    const isNotaria = doc.authority.toLowerCase().includes('notaría');
    const isCCB = doc.authority.toLowerCase().includes('cámara de comercio');

    let institutionHeader = "DESPACHO JURÍDICO ESPECIALIZADO • DEVIS & BEETAR ASOCIADOS";
    let subHeader = "DEFENSA TÉCNICA INTEGRAL • CASO SUCESORAL LILIANA GÓMEZ PRADILLA";

    if (isJuzgado) {
      institutionHeader = "RAMA JUDICIAL • CONSEJO SUPERIOR DE LA JUDICATURA";
      subHeader = `${doc.authority.toUpperCase()} • SISTEMA DE GESTIÓN JUDICIAL (SIGCMA)`;
    } else if (isPenal) {
      institutionHeader = "REPÚBLICA DE COLOMBIA • FISCALÍA GENERAL DE LA NACIÓN";
      subHeader = "DIRECCIÓN SECCIONAL ATLÁNTICO / CESAR • POLICÍA JUDICIAL CTI";
    } else if (isNotaria) {
      institutionHeader = "SUPERINTENDENCIA DE NOTARIADO Y REGISTRO";
      subHeader = `${doc.authority.toUpperCase()} • FE PÚBLICA NOTARIAL`;
    } else if (isCCB) {
      institutionHeader = "CONFECÁMARAS • CÁMARA DE COMERCIO DE BARRANQUILLA";
      subHeader = "REGISTRO ÚNICO EMPRESARIAL Y SOCIAL (RUES)";
    }

    // Escape HTML in fullText safely
    const safeText = (doc.fullText || doc.summary || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const signaturesHtml = signatures.length > 0
      ? `
        <div class="sig-block">
          <div class="sig-title">CERTIFICACIÓN DE FIRMA ELECTRÓNICA SIMPLIFICADA (LEY 527 DE 1999)</div>
          ${signatures.map(s => `
            <div class="sig-item">
              <strong>${s.signerName}</strong> (${s.signerRole})<br>
              Identificación: ${s.signerIdNumber} | Código: <span class="hash">${s.verificationCode.substring(0, 24)}...</span><br>
              Fecha/Hora: ${s.formattedDate} | Estado: <span style="color:#059669;font-weight:bold;">CERTIFICADO Y VÁLIDO</span>
            </div>
          `).join('')}
        </div>
      `
      : `
        <div class="sig-block">
          <div class="sig-item" style="color:#64748b;">
            Documento original incorporado a la cadena de custodia con hash SHA-256. Sin alteraciones registrales.
          </div>
        </div>
      `;

    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Previsualización - ${doc.code}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: 'Times New Roman', Times, Georgia, serif;
            background: #ffffff;
            color: #0f172a;
            margin: 0;
            padding: 24px;
            font-size: 11.5px;
            line-height: 1.5;
            -webkit-print-color-adjust: exact;
          }
          .page-border {
            border: 1px solid #cbd5e1;
            padding: 24px;
            background: #ffffff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.06);
            position: relative;
            min-height: 100%;
          }
          ${showWatermark ? `
          .watermark {
            position: fixed;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-32deg);
            font-family: Arial, Helvetica, sans-serif;
            font-size: 38px;
            font-weight: 900;
            color: rgba(148, 163, 184, 0.11);
            text-transform: uppercase;
            letter-spacing: 4px;
            pointer-events: none;
            white-space: nowrap;
            z-index: 10;
          }
          ` : ''}
          .header-box {
            text-align: center;
            border-bottom: 2px solid #1e3a8a;
            padding-bottom: 12px;
            margin-bottom: 14px;
          }
          .institution {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 1.2px;
            color: #1e3a8a;
            text-transform: uppercase;
          }
          .sub-institution {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 8.5px;
            color: #475569;
            margin-top: 2px;
            font-weight: 600;
          }
          .doc-title {
            font-size: 13.5px;
            font-weight: bold;
            color: #090d16;
            margin: 10px 0 6px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .meta-grid {
            display: table;
            width: 100%;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 9px;
            margin-bottom: 14px;
            border-radius: 4px;
          }
          .meta-row {
            display: table-row;
          }
          .meta-cell {
            display: table-cell;
            padding: 4px 8px;
            border-bottom: 1px solid #e2e8f0;
          }
          .meta-cell.label {
            font-weight: 700;
            color: #334155;
            width: 25%;
            background: #f1f5f9;
          }
          .meta-cell.value {
            color: #0f172a;
          }
          .content-text {
            white-space: pre-wrap;
            font-size: 11px;
            line-height: 1.55;
            color: #1e293b;
            text-align: justify;
            margin-bottom: 20px;
          }
          .stamp-badge {
            display: inline-block;
            border: 2px solid #047857;
            color: #047857;
            padding: 4px 8px;
            font-family: Arial, sans-serif;
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            transform: rotate(-3deg);
            margin-bottom: 14px;
          }
          .sig-block {
            margin-top: 20px;
            padding: 10px 12px;
            background: #f8fafc;
            border-left: 3px solid #1e3a8a;
            border-radius: 0 4px 4px 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 9px;
          }
          .sig-title {
            font-weight: 800;
            color: #1e3a8a;
            margin-bottom: 4px;
            font-size: 9.5px;
          }
          .sig-item {
            margin-bottom: 6px;
            color: #334155;
          }
          .hash {
            font-family: monospace;
            color: #2563eb;
            font-size: 8.5px;
          }
          .footer-bar {
            margin-top: 18px;
            padding-top: 8px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            font-family: monospace;
            font-size: 8px;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="page-border">
          ${showWatermark ? `<div class="watermark">COPIA PROCESAL • EXPEDIENTE DIGITAL</div>` : ''}

          <div class="header-box">
            <div class="institution">${institutionHeader}</div>
            <div class="sub-institution">${subHeader}</div>
            <div class="doc-title">${doc.title}</div>
            <div class="stamp-badge">PROBATORIO • AUTÉNTICO ART. 244 CGP</div>
          </div>

          <div class="meta-grid">
            <div class="meta-row">
              <div class="meta-cell label">CÓDIGO OFICIAL:</div>
              <div class="meta-cell value"><strong>${doc.code}</strong></div>
              <div class="meta-cell label">RADICADO JUDICIAL:</div>
              <div class="meta-cell value"><span class="hash">${doc.radicado}</span></div>
            </div>
            <div class="meta-row">
              <div class="meta-cell label">FECHA DE ACTO:</div>
              <div class="meta-cell value">${doc.date}</div>
              <div class="meta-cell label">FOLIOS:</div>
              <div class="meta-cell value">${doc.folioCount} páginas</div>
            </div>
            <div class="meta-row">
              <div class="meta-cell label">AUTORIDAD / NOTARÍA:</div>
              <div class="meta-cell value" colspan="3">${doc.authority} (${doc.notaryOrEntity})</div>
            </div>
            <div class="meta-row">
              <div class="meta-cell label">PARTES REGISTRADAS:</div>
              <div class="meta-cell value" colspan="3">${doc.partiesInvolved.join(' • ')}</div>
            </div>
          </div>

          <div class="content-text">${safeText}</div>

          ${signaturesHtml}

          <div class="footer-bar">
            <span>INTEGRIDAD SHA-256: ${doc.integrityHash.substring(0, 32)}...</span>
            <span>VERIFICACIÓN EN LÍNEA: DEVIS & BEETAR SIGCMA</span>
          </div>
        </div>
      </body>
      </html>
    `;
  }, [doc, signatures, showWatermark]);

  return (
    <iframe
      srcDoc={srcDocContent}
      title={`Previsualización Documental - ${doc.code}`}
      className={`w-full border-0 bg-white rounded-lg transition ${className}`}
      style={{ height }}
      sandbox="allow-same-origin"
      loading="eager"
    />
  );
};
