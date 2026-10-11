import React from 'react';
import { ResumeData, ResumeConfig } from '../types';
import { MapPin, Phone, Send, Mail, Globe, Linkedin, CreditCard, Car } from 'lucide-react';

interface Props {
  data: ResumeData;
  config: ResumeConfig;
}

/**
 * Modelo 1: Fiel à Imagem 1 (Screenshot_20261009-135105.jpg)
 * Barra lateral em ardósia/petróleo com foto quadrada no topo esquerdo,
 * contactos com ícones elegantes, competências em tópicos e lado direito com títulos sublinhados por barra escura.
 */
export const TemplateModerno: React.FC<Props> = ({ data, config }) => {
  const { personalInfo, objective, experiences, education, skills, languages, certifications, references, additionalInfo } = data;

  const sidebarColor = config.primaryColor && config.primaryColor !== '#0f172a' ? config.primaryColor : '#3e5459';

  return (
    <div className="w-[210mm] bg-white text-slate-800 font-sans shadow-lg min-h-[297mm] flex flex-row print:shadow-none print:min-h-0 print:w-full">
      {/* Coluna Esquerda Fixa (34% de largura com Foto e Informações à esquerda) */}
      <div
        className="w-[34%] text-white p-6 flex flex-col justify-between shrink-0"
        style={{ backgroundColor: sidebarColor }}
      >
        <div className="space-y-6">
          {/* Foto Quadrada conforme imagem 1 */}
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <div className="w-full aspect-[1/1] overflow-hidden bg-slate-800 shadow-md">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover object-center"
                crossOrigin="anonymous"
              />
            </div>
          )}

          {/* CONTATO */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-white/30 pb-1.5 mb-3">
              CONTATO
            </h3>
            <div className="space-y-2.5 text-[11px] text-white/90">
              {personalInfo.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-white/80 shrink-0 mt-0.5" />
                  <span className="leading-tight">{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Send className="w-3.5 h-3.5 text-white/80 shrink-0 mt-0.5" />
                  <span className="break-all leading-tight">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.biNumber && (
                <div className="flex items-center gap-2 text-[10.5px]">
                  <CreditCard className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  <span>B.I.: {personalInfo.biNumber}</span>
                </div>
              )}
              {personalInfo.drivingLicense && (
                <div className="flex items-center gap-2 text-[10.5px]">
                  <Car className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  <span>Carta: {personalInfo.drivingLicense}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 text-[10.5px]">
                  <Linkedin className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  <span className="truncate">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* HABILIDADES E COMPETÊNCIAS */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-white/30 pb-1.5 mb-3">
                HABILIDADES E COMPETÊNCIAS
              </h3>
              <ul className="space-y-1.5 text-[11px] text-white/90">
                {skills.map((skill) => (
                  <li key={skill.id} className="flex items-start gap-1.5">
                    <span className="text-white/60 leading-tight">•</span>
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* INFORMAÇÕES ADICIONAIS / IDIOMAS */}
          {(languages.length > 0 || certifications.length > 0 || additionalInfo) && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-white/30 pb-1.5 mb-3">
                INFORMAÇÕES ADICIONAIS
              </h3>
              <div className="space-y-2 text-[11px] text-white/90">
                {languages.length > 0 && (
                  <div>
                    <span className="font-bold text-white/80 text-[10px] uppercase block mb-1">Idiomas:</span>
                    {languages.map((l) => (
                      <div key={l.id} className="flex justify-between text-[10.5px]">
                        <span>• {l.name}</span>
                        <span className="text-white/60">{l.level}</span>
                      </div>
                    ))}
                  </div>
                )}

                {certifications.length > 0 && (
                  <div className="pt-1">
                    {certifications.map((c, i) => (
                      <div key={i} className="leading-snug mb-1">• {c}</div>
                    ))}
                  </div>
                )}

                {additionalInfo && (
                  <p className="text-[10.5px] leading-relaxed text-white/80 pt-1">
                    {additionalInfo}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="text-[9px] text-white/40 pt-4 text-center">
          Currículo Profissional
        </div>
      </div>

      {/* Coluna Direita (66% de largura com Experiência, Resumo e Formação à direita) */}
      <div className="w-[66%] shrink-0 p-7 md:p-8 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Nome Completo com barra escura inferior */}
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              {personalInfo.fullName || 'Seu Nome Completo'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider mt-0.5">
                {personalInfo.jobTitle}
              </p>
            )}
            <div className="w-20 h-1 bg-slate-800 mt-2" />
          </div>

          {/* RESUMO */}
          {objective && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-2">
                RESUMO
              </h2>
              <p className="text-[11px] text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                {objective}
              </p>
            </div>
          )}

          {/* EXPERIÊNCIA PROFISSIONAL */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
                EXPERIÊNCIA PROFISSIONAL
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-slate-900">{exp.role}</span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {exp.startDate} – {exp.current ? 'atual' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-700">
                      <span>{exp.company}</span>
                      {exp.location ? <span className="text-slate-500 font-normal"> - {exp.location}</span> : ''}
                    </div>
                    {exp.description && (
                      <div className="text-[11px] text-slate-600 leading-relaxed pl-1 pt-0.5 whitespace-pre-line">
                        {exp.description.split('\n').map((line, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 mb-0.5">
                            <span className="text-slate-400">•</span>
                            <span>{line.replace(/^[•\-\*]\s*/, '')}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FORMAÇÃO ACADÊMICA */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
                FORMAÇÃO ACADÊMICA
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{edu.degree}</span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {edu.endYear || (edu.current ? 'Em curso' : edu.startYear)}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-700">
                      <span>{edu.institution}</span>
                      {edu.location ? <span className="text-slate-500"> - {edu.location}</span> : ''}
                    </div>
                    {edu.details && (
                      <p className="text-[10.5px] text-slate-500 mt-0.5">{edu.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REFERÊNCIAS */}
          {references.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-2">
                REFERÊNCIAS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                {references.map((ref) => (
                  <div key={ref.id} className="p-2 bg-slate-50 rounded border border-slate-200">
                    <div className="font-bold text-slate-900">{ref.name}</div>
                    <div className="text-slate-600 text-[10px]">{ref.role} - {ref.company}</div>
                    <div className="text-slate-700 text-[10px]">Tel: {ref.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
