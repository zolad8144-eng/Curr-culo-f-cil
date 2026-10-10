import React from 'react';
import {
  FileCheck2,
  Download,
  Share2,
  FileText,
  Lightbulb,
  Save,
  Trash2,
  Sparkles,
  Smartphone,
} from 'lucide-react';

interface Props {
  onLoadSample: () => void;
  onClear: () => void;
  onSave: () => void;
  onExportPdf: () => void;
  onExportWord: () => void;
  onShareWhatsApp: () => void;
  onOpenTips: () => void;
  onOpenShare: () => void;
  onOpenInstall: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isExportingPdf: boolean;
  lastSavedText: string;
  activeMobileTab: 'form' | 'preview';
  setActiveMobileTab: (tab: 'form' | 'preview') => void;
}

export const Navbar: React.FC<Props> = ({
  onLoadSample,
  onClear,
  onSave,
  onExportPdf,
  onExportWord,
  onShareWhatsApp,
  onOpenTips,
  onOpenShare,
  onOpenInstall,
  isInstallable,
  isInstalled,
  isExportingPdf,
  lastSavedText,
  activeMobileTab,
  setActiveMobileTab,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      <div className="max-w-[1700px] mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black text-lg sm:text-xl">
            <FileCheck2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-sm sm:text-lg tracking-tight text-white whitespace-nowrap">
                Currículo Fácil
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1">
                🇦🇴 Angola
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Gerador profissional de currículos adaptado ao mercado de Angola
            </p>
          </div>
        </div>

        {/* Center & Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Saved indicator */}
          <span className="hidden 2xl:inline-flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {lastSavedText}
          </span>

          {/* Share Button (Partilhar) */}
          <button
            type="button"
            onClick={onOpenShare}
            title="Partilhar aplicação ou currículo"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 active:bg-slate-800 rounded-xl border border-slate-700 transition shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="inline">Partilhar</span>
          </button>

          {/* Install Button (Instalar no Celular) */}
          {!isInstalled && (
            <button
              type="button"
              onClick={onOpenInstall}
              title="Instalar no celular / telemóvel"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-extrabold text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 active:bg-amber-950 rounded-xl border border-amber-500/50 shadow-sm transition animate-pulse"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Instalar</span>
            </button>
          )}

          {/* Tips button */}
          <button
            type="button"
            onClick={onOpenTips}
            title="Dicas de contratação para Angola"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            Dicas Angola
          </button>

          {/* Sample loader */}
          <button
            type="button"
            onClick={onLoadSample}
            title="Preencher com dados de exemplo de Angola"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Exemplo
          </button>

          {/* Clear button */}
          <button
            type="button"
            onClick={onClear}
            title="Começar um novo currículo do zero"
            className="hidden sm:inline-flex p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Manual Save button */}
          <button
            type="button"
            onClick={onSave}
            title="Salvar no navegador"
            className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
          >
            <Save className="w-3.5 h-3.5 text-emerald-400" />
            Salvar
          </button>

          {/* Word Download */}
          <button
            type="button"
            onClick={onExportWord}
            title="Baixar em formato Word (.doc)"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-400 bg-blue-950/70 hover:bg-blue-900/60 border border-blue-700/50 rounded-xl transition shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            DOCX
          </button>

          {/* Primary Action: Download PDF */}
          <button
            type="button"
            disabled={isExportingPdf}
            onClick={onExportPdf}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/30 transition shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingPdf ? 'Gerando...' : 'PDF'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden border-t border-slate-800 bg-slate-950/80 px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex bg-slate-800 p-1 rounded-xl w-full">
          <button
            type="button"
            onClick={() => setActiveMobileTab('form')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition text-center ${
              activeMobileTab === 'form'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Preencher Formulário
          </button>
          <button
            type="button"
            onClick={() => setActiveMobileTab('preview')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition text-center ${
              activeMobileTab === 'preview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ver Currículo (Preview)
          </button>
        </div>
      </div>
    </header>
  );
};
