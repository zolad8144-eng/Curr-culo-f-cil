import React from 'react';
import { X, CheckCircle, AlertTriangle, Lightbulb, Briefcase, Award } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TipsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4 text-blue-600">
          <div className="p-2 bg-blue-100 rounded-xl">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Dicas de Sucesso para o Mercado de Angola
            </h2>
            <p className="text-xs text-slate-500">
              Como fazer o seu currículo destacar-se nas empresas angolanas
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1.5">
            <h3 className="font-bold text-blue-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-blue-600" /> 1. Contactos Sempre Atualizados (+244)
            </h3>
            <p className="text-slate-600">
              Verifique sempre o número de telemóvel e WhatsApp. Os departamentos de RH em Luanda e províncias preferem contactar diretamente por ligação telefónica ou mensagem no WhatsApp.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> 2. Bilhete de Identidade (B.I.) & Carta
            </h3>
            <p className="text-slate-600">
              Em Angola, muitas vagas administrativas, de logística e comerciais exigem a indicação do número do B.I. e posse de Carta de Condução (Ligeiro ou Pesado). Preencher esses campos poupa tempo ao recrutador.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> 3. Ferramentas Locais Valorizadas
            </h3>
            <p className="text-slate-600">
              O domínio do software <strong>Primavera BSS</strong>, <strong>Excel Avançado</strong> e boa oratória em <strong>Português e Inglês</strong> estão entre as exigências mais comuns em empresas nacionais e multinacionais (Sonangol, BAI, BFA, Unitel, etc.).
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> 4. Extensão Ideal: 1 a 2 Páginas
            </h3>
            <p className="text-slate-600">
              Mantenha o currículo objetivo. Destaque os resultados alcançados em experiências anteriores em vez de apenas listar tarefas rotineiras.
            </p>
          </div>

          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5">
            <h3 className="font-bold text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Foto: Quando Usar?
            </h3>
            <p className="text-amber-800">
              Use foto profissional, de rosto claro e sorriso discreto. Se a vaga for para funções onde a imagem não é critério, você pode desativar a foto a qualquer momento clicando em "Ocultar no CV".
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
          >
            Entendido, Continuar a Editar
          </button>
        </div>
      </div>
    </div>
  );
};
