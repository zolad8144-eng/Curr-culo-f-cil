import React from 'react';
import {
  X,
  Smartphone,
  Download,
  Share,
  PlusSquare,
  MoreVertical,
  CheckCircle2,
  Sparkles,
  Zap,
  WifiOff,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  onInstall: () => Promise<boolean>;
}

export const InstallModal: React.FC<Props> = ({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  isIOS,
  onInstall,
}) => {
  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await onInstall();
      if (success) {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative border border-slate-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Card */}
        <div className="bg-gradient-to-br from-[#990014] via-[#66000c] to-[#0a0a0c] p-6 text-white text-center relative overflow-hidden border-b border-[#d4af37]/50">
          <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-black/40 border-2 border-[#d4af37] p-1 shadow-2xl flex items-center justify-center overflow-hidden">
            <img
              src="/icon.svg"
              alt="Currículo Vitae Fácil Angola"
              className="w-full h-full object-contain"
            />
          </div>

          <h2 className="text-xl font-black tracking-tight text-[#fef08a]">
            Instalar no Telemóvel
          </h2>
          <p className="text-xs text-amber-100/90 mt-1 max-w-xs mx-auto">
            Adicione o <strong className="text-white">Currículo Vitae Fácil</strong> ao ecrã inicial do seu telemóvel como uma aplicação nativa.
          </p>

          <div className="flex justify-center gap-4 mt-4 text-[11px] text-amber-200">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Super Rápido
            </span>
            <span className="flex items-center gap-1">
              <WifiOff className="w-3.5 h-3.5 text-emerald-400" /> Salvo no Telemóvel
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#fef08a]" /> Sem Anúncios
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 text-slate-700">
          {isInstalled ? (
            <div className="text-center py-4 space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Aplicação Já Instalada!</h3>
              <p className="text-xs text-slate-500">
                O aplicativo já está no seu dispositivo. Pode aceder diretamente pelo ecrã inicial.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full py-2.5 px-4 rounded-xl font-black text-xs btn-wine-gold cursor-pointer"
              >
                Concluir
              </button>
            </div>
          ) : isInstallable ? (
            /* One click native install button */
            <div className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs space-y-1.5 text-amber-950">
                <p className="font-bold text-[#800010]">Instalação direta disponível:</p>
                <p className="text-slate-600">
                  Clique no botão abaixo para fixar o aplicativo diretamente no ecrã de aplicações do seu dispositivo Android ou computador.
                </p>
              </div>

              <button
                type="button"
                onClick={handleInstallClick}
                className="w-full py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 btn-wine-gold btn-pulse-glow cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#fef08a]" />
                <span className="text-[#fef08a]">Instalar Aplicativo Agora</span>
              </button>
            </div>
          ) : isIOS ? (
            /* iOS Safari Instructions */
            <div className="space-y-3.5">
              <div className="text-xs font-bold text-slate-900">
                Como instalar no iPhone / iPad (Safari):
              </div>
              <ol className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    No Safari, toque no botão <strong>Partilhar</strong>{' '}
                    <Share className="w-4 h-4 inline text-blue-600 mx-1" /> na barra inferior.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    Role as opções e toque em{' '}
                    <strong>"Ecrã Principal"</strong> (ou <em>"Adicionar ao Ecrã Principal"</em>){' '}
                    <PlusSquare className="w-4 h-4 inline text-blue-600 mx-1" />.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    Toque em <strong>"Adicionar"</strong> no canto superior direito. Pronto!
                  </div>
                </li>
              </ol>
            </div>
          ) : (
            /* Android / Chrome Manual Instructions */
            <div className="space-y-3.5">
              <div className="text-xs font-bold text-slate-900">
                Como instalar no seu navegador:
              </div>
              <ol className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    Toque no menu do navegador{' '}
                    <MoreVertical className="w-4 h-4 inline text-slate-700 mx-0.5" /> (três pontinhos no canto superior).
                  </div>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    Selecione <strong>"Instalar aplicação"</strong> ou{' '}
                    <strong>"Adicionar ao ecrã inicial"</strong>.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    Confirme em <strong>"Instalar"</strong>. O ícone aparecerá no seu ecrã!
                  </div>
                </li>
              </ol>
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition text-center"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
