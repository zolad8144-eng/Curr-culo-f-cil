import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  MessageCircle,
  ExternalLink,
  Smartphone,
  Sparkles,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  candidateName?: string;
  onShareCvWhatsApp: () => void;
}

export const ShareModal: React.FC<Props> = ({
  isOpen,
  onClose,
  candidateName,
  onShareCvWhatsApp,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const appUrl = window.location.href;
  const shareTitle = 'Currículo Fácil Angola';
  const shareText =
    'Crie o seu currículo profissional adaptado ao mercado de trabalho de Angola em minutos. Grátis e com download em PDF e Word:';

  // Native Web Share
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: appUrl,
        });
        onClose();
      } catch (err) {
        // User cancelled or not supported
      }
    }
  };

  // WhatsApp share of the App
  const handleWhatsAppAppShare = () => {
    const text = `🇦🇴 *Currículo Fácil Angola*\n\nRecomendo este gerador de currículos para o mercado angolano! Faz download em PDF profissional e Word:\n\n${appUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Copy Link
  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative border border-slate-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-r from-[#990014] via-[#73000f] to-[#4a0008] p-6 text-white text-center border-b border-[#d4af37]/40">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-[#d4af37]/60 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Share2 className="w-7 h-7 text-[#fef08a]" />
          </div>
          <h2 className="text-xl font-black tracking-tight text-[#fef08a]">
            Partilhar Aplicação
          </h2>
          <p className="text-xs text-amber-100/90 mt-1">
            Partilhe o Currículo Vitae Fácil com colegas, amigos e grupos de emprego em Angola
          </p>
        </div>

        <div className="p-6 space-y-4">
          {/* Native Web Share button (Available on Android / iOS) - Vinho e Dourado */}
          {hasNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 btn-wine-gold cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-[#fef08a]" />
              <span>Partilhar pelo Telemóvel (Apps / Redes)</span>
            </button>
          )}

          {/* WhatsApp share - Dourado */}
          <button
            type="button"
            onClick={handleWhatsAppAppShare}
            className="w-full py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 btn-gold cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#5e000d]" />
            <span>Recomendar Aplicação no WhatsApp</span>
          </button>

          {/* Option to share candidate CV directly via WhatsApp */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              Deseja partilhar o seu currículo?
            </div>
            <button
              type="button"
              onClick={() => {
                onShareCvWhatsApp();
                onClose();
              }}
              className="w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-between btn-black-gold cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-amber-400" />
                Enviar Resumo do meu CV no WhatsApp
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

          {/* Copy Link Input */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Copiar Link da Aplicação
            </label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5">
              <input
                type="text"
                readOnly
                value={appUrl}
                className="bg-transparent text-xs text-slate-700 font-medium flex-1 px-2 outline-none truncate"
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1 cursor-pointer ${
                  copied
                    ? 'btn-wine-gold'
                    : 'btn-black-gold'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#fef08a]" /> Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" /> Copiar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
