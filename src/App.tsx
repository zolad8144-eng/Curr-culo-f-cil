import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ResumeData, ResumeConfig } from './types';
import { sampleAngolaResume, emptyResumeData } from './data/initialData';
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
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
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
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white px-3 sm:px-4 py-2 border-b border-blue-900/50 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="p-1 rounded-lg bg-blue-600/50 shrink-0">
              <Smartphone className="w-4 h-4 text-amber-300" />
            </span>
            <p className="truncate">
              <strong className="font-bold text-white">Instale no Telemóvel:</strong> Tenha o gerador sempre à mão no ecrã inicial!
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowInstallModal(true)}
              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-lg transition text-[11px] shadow"
            >
              Instalar App
            </button>
            <button
              type="button"
              onClick={() => setShowBanner(false)}
              className="p-1 text-slate-400 hover:text-white"
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

      {/* Floating Action Bar for Mobile */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40 flex items-center gap-2">
        {/* Share Quick Button */}
        <button
          type="button"
          onClick={() => setShowShareModal(true)}
          className="p-3 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-200 active:scale-95 transition"
          title="Partilhar"
        >
          <Share2 className="w-4 h-4 text-blue-600" />
        </button>

        {/* Install Quick Button if not installed */}
        {!isInstalled && (
          <button
            type="button"
            onClick={() => setShowInstallModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl shadow-xl font-bold text-xs active:scale-95 transition"
            title="Instalar no Telemóvel"
          >
            <Smartphone className="w-4 h-4" />
            <span>Instalar</span>
          </button>
        )}

        {/* Switch Form / Preview Button */}
        <button
          type="button"
          onClick={() =>
            setActiveMobileTab(activeMobileTab === 'form' ? 'preview' : 'form')
          }
          className="flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl font-bold text-xs border border-slate-700 active:scale-95 transition"
        >
          <Eye className="w-4 h-4 text-blue-400" />
          {activeMobileTab === 'form' ? 'Ver Pré-visualização' : 'Formulário'}
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold border border-slate-700 animate-slide-up">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
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
