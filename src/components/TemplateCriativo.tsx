import React from 'react';
import { ResumeData, ResumeConfig } from '../types';
import {
  MapPin,
  Phone,
  Send,
  CreditCard,
  Car,
  Linkedin,
  Sparkles,
  Languages as LanguagesIcon,
  Award,
  Users,
  Briefcase,
  GraduationCap,
  UserCheck
} from 'lucide-react';

interface Props {
  data: ResumeData;
  config: ResumeConfig;
}

/**
 * Modelo 3: Criativo & Elegante em Dois Lados (Formato 2 Colunas A4)
 * Lado Esquerdo: Fotografia em destaque com borda geométrica moderna, contatos em cartões/linhas limpas,
 * competências com marcadores de nível visual, idiomas e certificações.
 * Lado Direito: Nome em destaque com tipografia editorial arrojada, resumo/perfil, histórico de
 * experiências profissionais com cargos e descrições detalhadas, formação acadêmica e referências.
 */
export const TemplateCriativo: React.FC<Props> = ({ data, config }) => {
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

  // Cor de destaque criativa baseada na config ou no azul profissional
  const accentColor = config.primaryColor && config.primaryColor !== '#0f172a' ? config.primaryColor : '#2563eb';

  return (
    <div className="w-[210mm] bg-white text-slate-900 font-sans shadow-lg min-h-[297mm] flex flex-row print:shadow-none print:min-h-0 print:w-full">
      {/* ================= LADO ESQUERDO: FOTO & INFORMAÇÕES PESSOAIS (34% da folha) ================= */}
      <div className="w-[34%] bg-[#f8fafc] border-r-2 border-slate-200 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Fotografia no Topo Esquerdo com Moldura Estilizada */}
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <div className="flex justify-center">
              <div
                className="w-32 h-36 rounded-2xl overflow-hidden shadow-md bg-slate-200 border-2"
                style={{ borderColor: accentColor }}
              >
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover object-center"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          )}

          {/* DADOS PESSOAIS & CONTATO */}
          <div>
            <h3
              className="text-xs font-black uppercase tracking-wider pb-1.5 mb-3 border-b-2 flex items-center gap-1.5"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>DADOS & CONTATO</span>
            </h3>
            <div className="space-y-2.5 text-[11px] text-slate-700">
              {personalInfo.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-800" />
                  <span className="leading-tight">{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-slate-800" />
                  <span className="font-medium text-slate-900">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Send className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-800" />
                  <span className="break-all leading-tight">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.biNumber && (
                <div className="flex items-center gap-2 text-[10.5px]">
                  <CreditCard className="w-3.5 h-3.5 shrink-0 text-slate-800" />
                  <span>B.I.: {personalInfo.biNumber}</span>
                </div>
              )}
              {personalInfo.drivingLicense && (
                <div className="flex items-center gap-2 text-[10.5px]">
                  <Car className="w-3.5 h-3.5 shrink-0 text-slate-800" />
                  <span>Carta: {personalInfo.drivingLicense}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 text-[10.5px]">
                  <Linkedin className="w-3.5 h-3.5 shrink-0 text-slate-800" />
                  <span className="truncate">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* HABILIDADES & COMPETÊNCIAS */}
          {skills.length > 0 && (
            <div>
              <h3
                className="text-xs font-black uppercase tracking-wider pb-1.5 mb-3 border-b-2 flex items-center gap-1.5"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>HABILIDADES</span>
              </h3>
              <div className="space-y-2 text-[11px]">
                {skills.map((skill) => (
                  <div key={skill.id} className="space-y-0.5">
                    <div className="flex justify-between items-center text-slate-800">
                      <span className="font-semibold">• {skill.name}</span>
                      {skill.level && (
                        <span className="text-[10px] text-slate-500 font-medium">{skill.level}</span>
                      )}
                    </div>
                    {/* Barra de Progresso Sutil */}
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: accentColor,
                          width:
                            skill.level === 'Especialista' || skill.level === 'Avançado'
                              ? '95%'
                              : skill.level === 'Intermédio'
                              ? '75%'
                              : '55%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IDIOMAS */}
          {languages.length > 0 && (
            <div>
              <h3
                className="text-xs font-black uppercase tracking-wider pb-1.5 mb-2.5 border-b-2 flex items-center gap-1.5"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                <LanguagesIcon className="w-3.5 h-3.5" />
                <span>IDIOMAS</span>
              </h3>
              <div className="space-y-1.5 text-[11px]">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between items-center bg-white p-1.5 rounded-lg border border-slate-200 shadow-2xs">
                    <span className="font-bold text-slate-900">{l.name}</span>
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICAÇÕES */}
          {certifications.length > 0 && (
            <div>
              <h3
                className="text-xs font-black uppercase tracking-wider pb-1.5 mb-2.5 border-b-2 flex items-center gap-1.5"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                <Award className="w-3.5 h-3.5" />
                <span>CERTIFICAÇÕES</span>
              </h3>
              <div className="space-y-1 text-[10.5px] text-slate-700">
                {certifications.map((c, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTA ADICIONAL */}
          {additionalInfo && (
            <div className="pt-1 text-[10px] text-slate-600 leading-relaxed border-t border-slate-200 pt-2">
              <span className="font-bold block uppercase text-[9px] text-slate-800 mb-0.5">Informações Adicionais:</span>
              <p>{additionalInfo}</p>
            </div>
          )}
        </div>

        <div className="text-[10px] text-slate-400 pt-4 text-center font-medium">
          Currículo Profissional • Angola
        </div>
      </div>

      {/* ================= LADO DIREITO: CORPO PRINCIPAL DO CV (66% da folha) ================= */}
      <div className="w-[66%] shrink-0 p-7 md:p-8 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Topo do Lado Direito: Nome Completo & Cargo */}
          <div className="pb-3 border-b-2 border-slate-900">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              {personalInfo.fullName || 'Seu Nome Completo'}
            </h1>
            {personalInfo.jobTitle && (
              <p
                className="text-xs font-bold uppercase tracking-widest mt-1"
                style={{ color: accentColor }}
              >
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {/* PERFIL & OBJETIVO PROFISSIONAL */}
          {objective && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
                <span>PERFIL PROFISSIONAL</span>
              </h2>
              <p className="text-[11px] text-slate-700 leading-relaxed text-justify whitespace-pre-line pl-4 border-l-2 border-slate-200">
                {objective}
              </p>
            </div>
          )}

          {/* EXPERIÊNCIA PROFISSIONAL */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-800" />
                <span>EXPERIÊNCIA PROFISSIONAL</span>
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-slate-900 text-[12.5px]">{exp.role}</span>
                      <span className="text-[10.5px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {exp.startDate} – {exp.current ? 'atual' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-700">
                      <span>{exp.company}</span>
                      {exp.location ? <span className="text-slate-500 font-normal"> • {exp.location}</span> : ''}
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

          {/* FORMAÇÃO ACADÊMICA */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-800" />
                <span>FORMAÇÃO ACADÊMICA</span>
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{edu.degree}</span>
                      <span className="text-[10.5px] text-slate-500 font-semibold">
                        {edu.endYear || (edu.current ? 'Em curso' : edu.startYear)}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-700">
                      <span>{edu.institution}</span>
                      {edu.location ? <span className="text-slate-500"> • {edu.location}</span> : ''}
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
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-800" />
                <span>REFERÊNCIAS</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                {references.map((ref) => (
                  <div key={ref.id} className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-900">{ref.name}</div>
                    <div className="text-slate-600 text-[10px]">{ref.role} - {ref.company}</div>
                    <div className="text-slate-700 text-[10px] font-medium">Tel: {ref.phone}</div>
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
