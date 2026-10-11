import React, { useRef } from 'react';
import { Camera, Trash2, Eye, EyeOff, UploadCloud } from 'lucide-react';

interface Props {
  photoUrl?: string;
  showPhoto: boolean;
  onPhotoChange: (url: string) => void;
  onToggleShow: (show: boolean) => void;
}

export const PhotoUploader: React.FC<Props> = ({
  photoUrl,
  showPhoto,
  onPhotoChange,
  onToggleShow,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor seleccione um ficheiro de imagem válido (PNG, JPG ou WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onPhotoChange(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onPhotoChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Circle Crop Preview */}
      <div className="relative group shrink-0">
        <div className="w-20 h-20 rounded-full border-3 border-[#d4af37] overflow-hidden bg-slate-200 shadow-md flex items-center justify-center">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Foto do Perfil"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <Camera className="w-8 h-8 text-slate-400" />
          )}
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left space-y-2">
        <div>
          <div className="text-xs font-bold text-slate-900">
            Foto de Perfil (Opcional)
          </div>
          <p className="text-[11px] text-slate-500">
            Recorte circular automático. Recomendado formato quadrado e fundo neutro.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black rounded-xl btn-wine-gold cursor-pointer shadow-sm"
          >
            <UploadCloud className="w-3.5 h-3.5 text-[#fef08a]" />
            {photoUrl ? 'Trocar Foto' : 'Carregar Foto'}
          </button>

          {photoUrl && (
            <>
              <button
                type="button"
                onClick={() => onToggleShow(!showPhoto)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl btn-black-gold cursor-pointer"
              >
                {showPhoto ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                    Ocultar no CV
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    Exibir no CV
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remover
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
