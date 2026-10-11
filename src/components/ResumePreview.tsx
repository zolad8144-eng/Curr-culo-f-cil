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
  const getOptimalZoom = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return Math.max(0.42, Math.min(0.50, (window.innerWidth - 32) / 794));
    }
    return 0.85;
  };

  const [zoom, setZoom] = useState<number>(getOptimalZoom);
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
        {/* Template Switcher para os 3 Modelos */}
        <div className="flex items-center gap-1.5 bg-[#0a0a0c] p-1 rounded-xl border border-[#d4af37]/40 shadow-sm">
          <button
            type="button"
            onClick={() => setTemplate('moderno')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
              config.template === 'moderno'
                ? 'btn-wine-gold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Modelo 1 (Lateral)
          </button>
          <button
            type="button"
            onClick={() => setTemplate('classico')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
              config.template === 'classico'
                ? 'btn-wine-gold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Modelo 2 (Linha do Tempo)
          </button>
          <button
            type="button"
            onClick={() => setTemplate('criativo')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
              config.template === 'criativo'
                ? 'btn-wine-gold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Modelo 3 (Elegante)
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
            onClick={() => setZoom((z) => Math.max(0.35, +(z - 0.05).toFixed(2)))}
            className="p-1 hover:bg-white rounded transition text-slate-700 cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1 font-semibold">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            title="Aumentar Zoom"
            onClick={() => setZoom((z) => Math.min(1.4, +(z + 0.05).toFixed(2)))}
            className="p-1 hover:bg-white rounded transition text-slate-700 cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Ajustar ao ecrã"
            onClick={() => setZoom(getOptimalZoom())}
            className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 rounded transition cursor-pointer"
          >
            Ajustar
          </button>
          <button
            type="button"
            title="Tamanho real 100%"
            onClick={() => setZoom(1)}
            className="px-1.5 py-0.5 text-[10px] font-medium hover:bg-white rounded transition cursor-pointer"
          >
            100%
          </button>
        </div>
      </div>

      {/* Main Preview Canvas com suporte a escala perfeita em qualquer ecrã */}
      <div className="flex-1 overflow-auto p-2 sm:p-6 flex justify-center items-start">
        <div
          style={{
            width: `${210 * zoom}mm`,
            height: `${297 * zoom}mm`,
            position: 'relative',
          }}
          className="transition-all shrink-0"
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              width: '210mm',
              minHeight: '297mm',
            }}
            className="shadow-2xl bg-white rounded-sm"
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
      </div>

      {/* Quick Action Bottom Bar in Preview */}
      <div className="p-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Pré-visualização A4 em tempo real</span>
        </div>

        <div className="flex items-center gap-2">
          {/* WhatsApp share - Dourado */}
          <button
            type="button"
            onClick={onShareWhatsApp}
            title="Compartilhar no WhatsApp"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-black rounded-xl btn-gold cursor-pointer shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-[#5e000d]" />
            <span>WhatsApp</span>
          </button>

          {/* Download Word - Preto com borda dourada */}
          <button
            type="button"
            onClick={onExportWord}
            title="Baixar em Microsoft Word (.doc)"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl btn-black-gold cursor-pointer shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Baixar DOCX</span>
          </button>

          {/* Download PDF - Vermelho Vinho e Dourado com luz piscando */}
          <div className="relative">
            <button
              type="button"
              disabled={isExportingPdf}
              onClick={onExportPdf}
              className="relative z-10 inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-black rounded-xl btn-wine-gold btn-pulse-glow cursor-pointer shadow-md"
            >
              <FileDown className="w-4 h-4 text-[#fef08a]" />
              <span className="text-[#fef08a]">{isExportingPdf ? 'Gerando...' : 'Baixar PDF'}</span>
            </button>

            {/* Glowing radar beacon indicator on the PDF button */}
            <div className="absolute -top-1 -right-1 pointer-events-none w-4 h-4 flex items-center justify-center">
              <span className="absolute w-4 h-4 rounded-full bg-amber-400 animate-ping opacity-75" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
