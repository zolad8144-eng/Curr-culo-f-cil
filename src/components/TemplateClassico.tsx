import React from 'react';
import { ResumeData, ResumeConfig } from '../types';
import {
  MapPin,
  Phone,
  Send,
  Settings,
  Briefcase,
  GraduationCap,
  Sparkles,
  FileText,
  CreditCard,
  Car,
  Linkedin,
  Languages as LanguagesIcon,
  Award,
  Users
} from 'lucide-react';

interface Props {
  data: ResumeData;
  config: ResumeConfig;
}

/**
 * Modelo 2: Fiel ao Modelo Clássico com Linha do Tempo (Dois Lados)
 * Lado Esquerdo: Barra lateral em tom suave (#c7c4be ou cinza executivo) com foto circular,
 * contatos completos, habilidades/competências, idiomas e certificações.
 * Lado Direito: Nome em destaque e Linha do Tempo Vertical tracejada (timeline) com ícones pretos
 * para Resumo, Experiência Profissional, Formação Acadêmica e Referências.
 */
export const TemplateClassico: React.FC<Props> = ({ data, config }) => {
  const {
    personalInfo,
    objective,
    experiences,
    education,
    skills,
    languages,
    certifications,
    references,
    additionalInfo,
  } = data;

  // Cor suave da coluna esquerda clássica
  const sidebarBg = '#c7c4be';

  return (
    <div className="w-[210mm] bg-white text-slate-800 font-sans shadow-lg min-h-[297mm] flex flex-row print:shadow-none print:min-h-0 print:w-full">
      {/* ================= LADO ESQUERDO: FOTO & INFORMAÇÕES PESSOAIS (33% fixa) ================= */}
      <div
        className="w-[33%] p-6 flex flex-col justify-between shrink-0 text-slate-900 border-r border-slate-300"
        style={{ backgroundColor: sidebarBg }}
      >
        <div className="space-y-6">
          {/* Foto Circular com aro escuro */}
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800 shadow-md bg-slate-300">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover object-center"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          )}

          {/* Linha Tracejada Divisória */}
          <div className="border-b-2 border-dashed border-slate-700/80" />

          {/* DADOS DE CONTATO & DOCUMENTAÇÃO */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <span>CONTATO</span>
            </h3>
            <div className="space-y-2.5 text-[11px] text-slate-900 font-medium">
              {personalInfo.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                  <span className="leading-tight">{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Send className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                  <span className="break-all leading-tight">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.biNumber && (
                <div className="flex items-center gap-2 text-[10.5px]">
                  <CreditCard className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                  <span>B.I.: {personalInfo.biNumber}</span>
                </div>
              )}
              {personalInfo.drivingLicense && (
                <div className="flex items-center gap-2 text-[10.5px]">
                  <Car className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                  <span>Carta: {personalInfo.drivingLicense}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 text-[10.5px]">
                  <Linkedin className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                  <span className="truncate">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* HABILIDADES & COMPETÊNCIAS NO LADO ESQUERDO */}
          {skills.length > 0 && (
            <div className="pt-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-700/40 pb-1 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-slate-900" />
                <span>HABILIDADES</span>
              </h3>
              <div className="space-y-1.5 text-[11px] text-slate-900">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-start gap-2">
                    <span className="text-slate-800 font-bold">•</span>
                    <span className="leading-snug">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IDIOMAS NO LADO ESQUERDO */}
          {languages.length > 0 && (
            <div className="pt-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-700/40 pb-1 mb-2.5 flex items-center gap-1.5">
                <LanguagesIcon className="w-3 h-3 text-slate-900" />
                <span>IDIOMAS</span>
              </h3>
              <div className="space-y-1.5 text-[11px] text-slate-900">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between items-baseline text-[10.5px]">
                    <span className="font-semibold">• {l.name}</span>
                    <span className="text-slate-700 text-[10px] italic">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICAÇÕES / CURSOS NO LADO ESQUERDO */}
          {certifications.length > 0 && (
            <div className="pt-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-700/40 pb-1 mb-2 flex items-center gap-1.5">
                <Award className="w-3 h-3 text-slate-900" />
                <span>CERTIFICAÇÕES</span>
              </h3>
              <div className="space-y-1 text-[10.5px] text-slate-900">
                {certifications.map((c, i) => (
                  <div key={i} className="leading-tight">• {c}</div>
                ))}
              </div>
            </div>
          )}

          {/* INFORMAÇÕES COMPLEMENTARES NO LADO ESQUERDO */}
          {additionalInfo && (
            <div className="pt-1 text-[10px] text-slate-800 leading-relaxed border-t border-slate-700/30 pt-2">
              <span className="font-bold block uppercase text-[9.5px] text-slate-900 mb-1">Nota adicional:</span>
              <p>{additionalInfo}</p>
            </div>
          )}
        </div>

        <div className="text-[10px] text-slate-700 pt-6 font-semibold">
          Currículo Profissional • Angola
        </div>
      </div>

      {/* ================= LADO DIREITO: LINHA DO TEMPO VERTICAL (67% fixa) ================= */}
      <div className="w-[67%] shrink-0 p-7 md:p-9 flex flex-col justify-between">
        <div>
          {/* Nome Completo & Cargo no Topo do Lado Direito */}
          <div className="mb-7">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              {personalInfo.fullName || 'Seu Nome Completo'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-xs font-bold uppercase text-slate-600 tracking-wider mt-1">
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {/* Linha do Tempo Vertical com Ícones Circulares Pretos */}
          <div className="relative pl-7 border-l-2 border-dashed border-slate-700/80 space-y-6">
            {/* Seção 1: RESUMO / PERFIL PROFISSIONAL */}
            {objective && (
              <div className="relative">
                {/* Ícone Circular Preto na Linha */}
                <div className="absolute -left-[39px] top-0 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow">
                  <Settings className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1.5">
                  RESUMO PROFISSIONAL
                </h2>
                <p className="text-[11px] text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                  {objective}
                </p>
              </div>
            )}

            {/* Seção 2: EXPERIÊNCIA PROFISSIONAL */}
            {experiences.length > 0 && (
              <div className="relative">
                <div className="absolute -left-[39px] top-0 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow">
                  <Briefcase className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">
                  EXPERIÊNCIA PROFISSIONAL
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="text-[10.5px] text-slate-500 font-semibold">
                        {exp.startDate} – {exp.current ? 'atual' : exp.endDate}
                      </div>
                      <div className="text-xs font-bold text-slate-900">
                        {exp.role}, <span className="font-semibold text-slate-700">{exp.company}</span>
                        {exp.location ? <span className="text-slate-500 font-normal"> ({exp.location})</span> : ''}
                      </div>
                      {exp.description && (
                        <div className="text-[11px] text-slate-600 leading-relaxed pl-1 pt-0.5">
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

            {/* Seção 3: FORMAÇÃO ACADÊMICA */}
            {education.length > 0 && (
              <div className="relative">
                <div className="absolute -left-[39px] top-0 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow">
                  <GraduationCap className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
                  FORMAÇÃO ACADÊMICA
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="text-[10.5px] text-slate-500 font-medium">
                        {edu.endYear || (edu.current ? 'Em curso' : edu.startYear)}
                      </div>
                      <div className="font-bold text-slate-900">
                        {edu.degree}
                      </div>
                      <div className="text-[11px] text-slate-700">
                        {edu.institution} {edu.location ? ` - ${edu.location}` : ''}
                      </div>
                      {edu.details && (
                        <p className="text-[10.5px] text-slate-500 mt-0.5">{edu.details}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seção 4: REFERÊNCIAS PROFISSIONAIS */}
            {references.length > 0 && (
              <div className="relative">
                <div className="absolute -left-[39px] top-0 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow">
                  <Users className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
                  REFERÊNCIAS PROFISSIONAIS
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
    </div>
  );
};
