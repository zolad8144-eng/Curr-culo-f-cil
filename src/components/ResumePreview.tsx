import React, { useState } from 'react';
import { ResumeData, ResumeConfig, TemplateType } from '../types';
import { TemplateModerno } from './TemplateModerno';
import { TemplateClassico } from './TemplateClassico';
import { TemplateCriativo } from './TemplateCriativo';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileDown,
  FileText,
  Share2,
  Palette,
  Layout,
  Printer,
  Sparkles,
  Check,
} from 'lucide-react';

interface Props {
  data: ResumeData;
  config: ResumeConfig;
  onConfigChange: (config: ResumeConfig) => void;
  onExportPdf: () => void;
  onExportWord: () => void;
  onShareWhatsApp: () => void;
  isExportingPdf: boolean;
}

const colorPresets = [
  { id: 'navy', name: 'Azul Escuro (Padrão)', hex: '#0f172a' },
  { id: 'blue', name: 'Azul Real', hex: '#2563eb' },
  { id: 'emerald', name: 'Verde Esmeralda', hex: '#059669' },
  { id: 'burgundy', name: 'Borgonha Elegante', hex: '#881337' },
  { id: 'slate', name: 'Grafite Corporativo', hex: '#334155' },
];

export const ResumePreview: React.FC<Props> = ({
  data,
  config,
  onConfigChange,
  onExportPdf,
  onExportWord,
  onShareWhatsApp,
  isExportingPdf,
}) => {
  const [zoom, setZoom] = useState<number>(0.85); // good default for split view
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const setTemplate = (tpl: TemplateType) => {
    onConfigChange({ ...config, template: tpl });
  };

  const setColor = (hex: string) => {
    onConfigChange({ ...config, primaryColor: hex });
  };

  const setSpacing = (spacing: 'compact' | 'normal' | 'comfortable') => {
    onConfigChange({ ...config, spacing });
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-inner">
      {/* Top Preview Toolbar */}
      <div className="p-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
        {/* Template Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setTemplate('moderno')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              config.template === 'moderno'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Moderno
          </button>
          <button
            type="button"
            onClick={() => setTemplate('classico')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              config.template === 'classico'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Clássico
          </button>
          <button
            type="button"
            onClick={() => setTemplate('criativo')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              config.template === 'criativo'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Criativo
          </button>
        </div>

        {/* Color Palette Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-1 rounded-xl">
          <Palette className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex items-center gap-1">
            {colorPresets.map((c) => (
              <button
                key={c.id}
                type="button"
                title={c.name}
                onClick={() => setColor(c.hex)}
                className={`w-5 h-5 rounded-full transition relative flex items-center justify-center ${
                  config.primaryColor === c.hex
                    ? 'ring-2 ring-offset-1 ring-blue-500 scale-110'
                    : 'opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {config.primaryColor === c.hex && (
                  <Check className="w-2.5 h-2.5 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-slate-600">
          <button
            type="button"
            title="Reduzir Zoom"
            onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)))}
            className="p-1 hover:bg-white rounded transition text-slate-700"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1 font-semibold">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            title="Aumentar Zoom"
            onClick={() => setZoom((z) => Math.min(1.3, +(z + 0.1).toFixed(2)))}
            className="p-1 hover:bg-white rounded transition text-slate-700"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Ajustar ao ecrã"
            onClick={() => setZoom(0.85)}
            className="px-1.5 py-0.5 text-[10px] font-medium hover:bg-white rounded transition"
          >
            100%
          </button>
        </div>
      </div>

      {/* Main Preview Canvas */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="w-[210mm] min-h-[297mm] shadow-2xl bg-white rounded-sm transition-all"
        >
          {/* Printable Element with ID */}
          <div id="cv-print-container" className="print-area">
            {config.template === 'moderno' && (
              <TemplateModerno data={data} config={config} />
            )}
            {config.template === 'classico' && (
              <TemplateClassico data={data} config={config} />
            )}
            {config.template === 'criativo' && (
              <TemplateCriativo data={data} config={config} />
            )}
          </div>
        </div>
      </div>

      {/* Quick Action Bottom Bar in Preview */}
      <div className="p-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Pré-visualização A4 em tempo real</span>
        </div>

        <div className="flex items-center gap-2">
          {/* WhatsApp share */}
          <button
            type="button"
            onClick={onShareWhatsApp}
            title="Compartilhar no WhatsApp"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            WhatsApp
          </button>

          {/* Download Word */}
          <button
            type="button"
            onClick={onExportWord}
            title="Baixar em Microsoft Word (.doc)"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            Baixar DOCX
          </button>

          {/* Download PDF */}
          <button
            type="button"
            disabled={isExportingPdf}
            onClick={onExportPdf}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-xl transition shadow-sm"
          >
            <FileDown className="w-3.5 h-3.5" />
            {isExportingPdf ? 'Gerando...' : 'Gerar PDF'}
          </button>
        </div>
      </div>
    </div>
  );
};
