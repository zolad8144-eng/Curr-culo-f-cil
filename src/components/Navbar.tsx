import React from 'react';
import {
  Download,
  Share2,
  FileText,
  Lightbulb,
  Save,
  Trash2,
  Sparkles,
  Smartphone,
  Home,
} from 'lucide-react';

interface Props {
  onGoHome: () => void;
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
  onGoHome,
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
    <header className="bg-[#0a0a0c] text-white border-b border-[#d4af37]/40 sticky top-0 z-40 shadow-xl">
      <div className="max-w-[1700px] mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand with 3D "CVF" & Angola Badge */}
        <div
          onClick={onGoHome}
          className="flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer group"
          title="Voltar ao Ecrã Inicial"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#990014] to-[#4a0008] border-2 border-[#d4af37] flex items-center justify-center shadow-lg shadow-[#990014]/40 font-black text-xl text-[#fef08a] group-hover:scale-105 transition">
            CVF
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-black text-sm sm:text-lg tracking-tight text-white whitespace-nowrap group-hover:text-[#fef08a] transition">
                Currículo Vitae Fácil
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold bg-[#990014]/40 text-[#fef08a] border border-[#d4af37]/60 px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1">
                🇦🇴 Angola
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Gerador profissional adaptado ao mercado angolano
            </p>
          </div>
        </div>

        {/* Center & Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Home Button */}
          <button
            type="button"
            onClick={onGoHome}
            title="Voltar à tela inicial"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-xl btn-black-gold cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Início</span>
          </button>

          {/* Share Button (Partilhar) - Preto com bordas douradas */}
          <button
            type="button"
            onClick={onOpenShare}
            title="Partilhar aplicação ou currículo"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl btn-black-gold cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Partilhar</span>
          </button>

          {/* Install Button (Instalar no Celular) - Dourado */}
          {!isInstalled && (
            <button
              type="button"
              onClick={onOpenInstall}
              title="Instalar no celular / telemóvel"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-black rounded-xl btn-gold cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#5e000d]" />
              <span>Instalar</span>
            </button>
          )}

          {/* Tips button */}
          <button
            type="button"
            onClick={onOpenTips}
            title="Dicas de contratação para Angola"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl btn-black-gold cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            Dicas Angola
          </button>

          {/* Sample loader */}
          <button
            type="button"
            onClick={onLoadSample}
            title="Preencher com dados de exemplo de Angola"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl btn-black-gold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Exemplo
          </button>

          {/* Clear button */}
          <button
            type="button"
            onClick={onClear}
            title="Começar um novo currículo do zero"
            className="hidden sm:inline-flex p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Manual Save button */}
          <button
            type="button"
            onClick={onSave}
            title="Salvar no navegador"
            className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl btn-black-gold cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-amber-400" />
            Salvar
          </button>

          {/* Word Download - Preto com bordas douradas */}
          <button
            type="button"
            onClick={onExportWord}
            title="Baixar em formato Word (.doc)"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl btn-black-gold cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            DOCX
          </button>

          {/* Primary Action: Download PDF - VERMELHO VINHO E DOURADO COM LUZ PISCANTE */}
          <div className="relative shrink-0">
            <button
              type="button"
              disabled={isExportingPdf}
              onClick={onExportPdf}
              className="relative z-10 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-black rounded-xl btn-wine-gold btn-pulse-glow cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#fef08a]" />
              <span className="text-[#fef08a]">
                {isExportingPdf ? 'Gerando...' : 'Baixar PDF'}
              </span>
            </button>

            {/* Glowing beacon ring around the PDF button */}
            <div className="absolute -top-1 -right-1 pointer-events-none w-4 h-4 flex items-center justify-center">
              <span className="absolute w-4 h-4 rounded-full bg-amber-400 animate-ping opacity-75" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden border-t border-[#d4af37]/30 bg-[#121216] px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex bg-[#1f1f23] p-1 rounded-xl w-full border border-[#d4af37]/20">
          <button
            type="button"
            onClick={() => setActiveMobileTab('form')}
            className={`flex-1 py-1.5 text-xs font-black rounded-lg transition text-center cursor-pointer ${
              activeMobileTab === 'form'
                ? 'btn-wine-gold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Preencher Formulário
          </button>
          <button
            type="button"
            onClick={() => setActiveMobileTab('preview')}
            className={`flex-1 py-1.5 text-xs font-black rounded-lg transition text-center cursor-pointer ${
              activeMobileTab === 'preview'
                ? 'btn-wine-gold shadow-md'
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
