import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ResumeData, ResumeConfig } from './types';
import { sampleAngolaResume, emptyResumeData } from './data/initialData';
import { Navbar } from './components/Navbar';
import { WizardSteps } from './components/WizardSteps';
import { ResumePreview } from './components/ResumePreview';
import { TipsModal } from './components/TipsModal';
import { exportToPdf } from './utils/pdfExport';
import { exportToWord } from './utils/docxExport';
import { shareViaWhatsApp } from './utils/whatsappShare';
import {
  FileDown,
  FileText,
  Share2,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Smartphone,
  Eye,
} from 'lucide-react';

const STORAGE_KEY = 'curriculo_facil_angola_data_v1';
const CONFIG_KEY = 'curriculo_facil_angola_config_v1';

export default function App() {
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
        isExportingPdf={isExportingPdf}
        lastSavedText={lastSavedText}
        activeMobileTab={activeMobileTab}
        setActiveMobileTab={setActiveMobileTab}
      />

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

      {/* Floating Action Button for Mobile when in Form tab */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        <button
          type="button"
          onClick={() =>
            setActiveMobileTab(activeMobileTab === 'form' ? 'preview' : 'form')
          }
          className="flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl font-bold text-xs border border-slate-700 active:scale-95 transition"
        >
          <Eye className="w-4 h-4 text-blue-400" />
          {activeMobileTab === 'form' ? 'Ver Pré-visualização' : 'Voltar ao Formulário'}
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
    </div>
  );
}
