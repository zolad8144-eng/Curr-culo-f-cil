import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ResumeData, ResumeConfig } from './types';
import { sampleAngolaResume, emptyResumeData } from './data/initialData';
import { WelcomeSplash } from './components/WelcomeSplash';
import { Navbar } from './components/Navbar';
import { WizardSteps } from './components/WizardSteps';
import { ResumePreview } from './components/ResumePreview';
import { TipsModal } from './components/TipsModal';
import { InstallModal } from './components/InstallModal';
import { ShareModal } from './components/ShareModal';
import { exportToPdf } from './utils/pdfExport';
import { exportToWord } from './utils/docxExport';
import { shareViaWhatsApp } from './utils/whatsappShare';
import { usePWAInstall } from './hooks/usePWAInstall';
import {
  FileDown,
  FileText,
  Share2,
  CheckCircle,
  Sparkles,
  Smartphone,
  Eye,
  Download,
  X,
} from 'lucide-react';

const STORAGE_KEY = 'curriculo_facil_angola_data_v1';
const CONFIG_KEY = 'curriculo_facil_angola_config_v1';

export default function App() {
  // PWA Install hook
  const { isInstallable, isInstalled, isIOS, isMobile, install } = usePWAInstall();

  // Screen View State: starts with the requested Welcome screen
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  // Load saved state or default sample
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved resume from localStorage', e);
    }
    return sampleAngolaResume;
  });

  const [config, setConfig] = useState<ResumeConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved config from localStorage', e);
    }
    return {
      template: 'moderno',
      primaryColor: '#0f172a',
      spacing: 'normal',
      fontFamily: 'sans',
    };
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeMobileTab, setActiveMobileTab] = useState<'form' | 'preview'>('form');
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastSavedText, setLastSavedText] = useState<string>('Salvo automaticamente');

  // Trigger toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Auto-save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;
      setLastSavedText(`Salvo às ${timeStr}`);
    } catch (err) {
      console.error('Auto-save error', err);
    }
  }, [data, config]);

  // Load Angola sample
  const handleLoadSample = () => {
    if (
      window.confirm(
        'Deseja carregar os dados de exemplo pré-configurados de Angola? O seu texto atual será substituído.'
      )
    ) {
      setData(sampleAngolaResume);
      showToast('Dados de exemplo de Angola carregados com sucesso!');
    }
  };

  // Clear all
  const handleClear = () => {
    if (
      window.confirm(
        'Tem a certeza de que deseja limpar todos os campos e começar um novo currículo em branco?'
      )
    ) {
      setData(emptyResumeData);
      setCurrentStep(1);
      showToast('Formulário limpo com sucesso.');
    }
  };

  // Manual save
  const handleManualSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
      showToast('Currículo guardado no seu dispositivo!');
    } catch (e) {
      showToast('Erro ao guardar os dados.');
    }
  };

  // Export to PDF
  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    try {
      showToast('A preparar e gerar o PDF de alta resolução...');
      const success = await exportToPdf('cv-print-container', data.personalInfo.fullName);
      if (success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        showToast('PDF gerado com sucesso! Pronto para entregar.');
      }
    } catch (err) {
      console.error('PDF error', err);
      showToast('Erro ao gerar o PDF. Pode tentar imprimir pela janela do navegador.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Export to Word (.doc / .docx)
  const handleExportWord = () => {
    try {
      exportToWord(data);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
      showToast('Documento Word (.doc) descarregado com sucesso!');
    } catch (err) {
      console.error('Word export error', err);
      showToast('Erro ao descarregar documento Word.');
    }
  };

  // WhatsApp share
  const handleShareWhatsApp = () => {
    shareViaWhatsApp(data);
  };

  // Trigger Install
  const handleInstallClick = async (): Promise<boolean> => {
    if (isInstallable) {
      const res = await install();
      if (res) {
        showToast('Aplicação instalada com sucesso!');
        return true;
      }
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-[#990014] selection:text-white">
      {/* 1. INITIAL LANDING SCREEN (If on Welcome View) */}
      {showWelcome ? (
        <WelcomeSplash onStart={() => setShowWelcome(false)} />
      ) : (
        /* 2. FULL CV BUILDER DASHBOARD */
        <div className="min-h-screen flex flex-col bg-[#f8fafc]">
          {/* Top Navigation */}
          <Navbar
            onGoHome={() => setShowWelcome(true)}
            onLoadSample={handleLoadSample}
            onClear={handleClear}
            onSave={handleManualSave}
            onExportPdf={handleExportPdf}
            onExportWord={handleExportWord}
            onShareWhatsApp={handleShareWhatsApp}
            onOpenTips={() => setShowTipsModal(true)}
            onOpenShare={() => setShowShareModal(true)}
            onOpenInstall={() => setShowInstallModal(true)}
            isInstallable={isInstallable}
            isInstalled={isInstalled}
            isExportingPdf={isExportingPdf}
            lastSavedText={lastSavedText}
            activeMobileTab={activeMobileTab}
            setActiveMobileTab={setActiveMobileTab}
          />

          {/* Optional Top Mobile Install Banner */}
          {!isInstalled && showBanner && (
            <div className="bg-gradient-to-r from-[#4d000a] via-[#850012] to-[#260005] text-[#fef08a] px-3 sm:px-4 py-2 border-b border-[#d4af37]/40 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="p-1 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 shrink-0">
                  <Smartphone className="w-4 h-4 text-amber-300" />
                </span>
                <p className="truncate text-white">
                  <strong className="font-bold text-[#fef08a]">Instale no Telemóvel:</strong> Tenha o gerador sempre à mão no ecrã inicial!
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowInstallModal(true)}
                  className="px-2.5 py-1 btn-gold text-slate-950 font-black rounded-lg transition text-[11px] shadow cursor-pointer"
                >
                  Instalar
                </button>
                <button
                  type="button"
                  onClick={() => setShowBanner(false)}
                  className="p-1 text-slate-300 hover:text-white cursor-pointer"
                  title="Fechar aviso"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Main Container: Split screen on Desktop */}
          <main className="flex-1 max-w-[1700px] w-full mx-auto p-3 sm:p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column: 6-Step Wizard */}
            <div
              className={`lg:col-span-5 xl:col-span-5 h-[calc(100vh-8.5rem)] sticky top-20 ${
                activeMobileTab === 'form' ? 'block' : 'hidden lg:block'
              }`}
            >
              <WizardSteps
                data={data}
                onChange={setData}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </div>

            {/* Right Column: Real-time Live Preview */}
            <div
              className={`lg:col-span-7 xl:col-span-7 h-[calc(100vh-8.5rem)] sticky top-20 ${
                activeMobileTab === 'preview' ? 'block' : 'hidden lg:block'
              }`}
            >
              <ResumePreview
                data={data}
                config={config}
                onConfigChange={setConfig}
                onExportPdf={handleExportPdf}
                onExportWord={handleExportWord}
                onShareWhatsApp={handleShareWhatsApp}
                isExportingPdf={isExportingPdf}
              />
            </div>
          </main>

          {/* Floating Action Button for Mobile (Only switch Form/Preview) */}
          <div className="lg:hidden fixed bottom-4 right-4 z-40 flex items-center gap-2">
            {/* Switch Form / Preview Button */}
            <button
              type="button"
              onClick={() =>
                setActiveMobileTab(activeMobileTab === 'form' ? 'preview' : 'form')
              }
              className="flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl font-black text-xs btn-wine-gold btn-pulse-glow active:scale-95 transition cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#fef08a]" />
              <span className="text-[#fef08a]">
                {activeMobileTab === 'form' ? 'Ver Currículo' : 'Editar Form'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#09090b]/95 backdrop-blur-md text-[#fff4cc] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold border-2 border-[#d4af37] animate-slide-up">
          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Angolan Job Tips Modal */}
      <TipsModal
        isOpen={showTipsModal}
        onClose={() => setShowTipsModal(false)}
      />

      {/* Install Modal */}
      <InstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        isIOS={isIOS}
        onInstall={handleInstallClick}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        candidateName={data.personalInfo.fullName}
        onShareCvWhatsApp={handleShareWhatsApp}
      />
    </div>
  );
}
