import React from 'react';
import { ResumeData, ResumeConfig } from '../types';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Award,
  BookOpen,
  Briefcase,
  User,
  CheckCircle2,
  Calendar,
  CreditCard,
  Car
} from 'lucide-react';

interface Props {
  data: ResumeData;
  config: ResumeConfig;
}

export const TemplateModerno: React.FC<Props> = ({ data, config }) => {
  const { personalInfo, objective, experiences, education, skills, languages, certifications, references, additionalInfo } = data;

  const spacingClass =
    config.spacing === 'compact' ? 'space-y-3' : config.spacing === 'comfortable' ? 'space-y-6' : 'space-y-4';

  return (
    <div className="w-full bg-white text-slate-800 font-sans shadow-lg min-h-[297mm] flex flex-col md:flex-row print:shadow-none print:min-h-0">
      {/* Left Sidebar (Navy/Dark slate #0f172a) */}
      <div
        className="w-full md:w-[36%] text-slate-100 p-6 flex flex-col justify-between shrink-0"
        style={{ backgroundColor: config.primaryColor || '#0f172a' }}
      >
        <div>
          {/* Photo */}
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <div className="flex justify-center mb-5">
              <div className="w-28 h-28 rounded-full border-4 border-white/20 overflow-hidden shadow-md bg-slate-800">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover object-center"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-2.5 text-xs text-slate-200 border-b border-white/10 pb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">
              Contactos
            </h3>
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{personalInfo.address}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>

          {/* Personal Info Extra (BI, Carta, Nacionalidade) */}
          {(personalInfo.biNumber || personalInfo.drivingLicense || personalInfo.birthDate || personalInfo.maritalStatus) && (
            <div className="pt-4 border-b border-white/10 pb-4 text-xs space-y-1.5 text-slate-300">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">
                Dados Pessoais
              </h3>
              {personalInfo.biNumber && (
                <div className="flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>B.I.: {personalInfo.biNumber}</span>
                </div>
              )}
              {personalInfo.nationality && (
                <div>Nacionalidade: {personalInfo.nationality}</div>
              )}
              {personalInfo.maritalStatus && (
                <div>Estado Civil: {personalInfo.maritalStatus}</div>
              )}
              {personalInfo.birthDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Nascimento: {personalInfo.birthDate}</span>
                </div>
              )}
              {personalInfo.drivingLicense && (
                <div className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Carta: {personalInfo.drivingLicense}</span>
                </div>
              )}
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="pt-4 border-b border-white/10 pb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-3">
                Competências
              </h3>
              <div className="space-y-2">
                {skills.map((skill) => {
                  const width =
                    skill.level === 'Especialista'
                      ? '100%'
                      : skill.level === 'Avançado'
                      ? '80%'
                      : skill.level === 'Intermédio'
                      ? '60%'
                      : '40%';
                  return (
                    <div key={skill.id} className="text-xs">
                      <div className="flex justify-between text-slate-200 mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-[10px] text-blue-300">{skill.level}</span>
                      </div>
                      <div className="w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-400 h-1.5 rounded-full"
                          style={{ width }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="pt-4 border-b border-white/10 pb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">
                Idiomas
              </h3>
              <div className="space-y-1.5 text-xs text-slate-200">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-slate-400 text-[11px]">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="pt-4 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-400" /> Cursos & Certificações
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {certifications.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-blue-400 text-xs leading-tight">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-4 text-[10px] text-slate-400 text-center border-t border-white/10 mt-6">
          Angola • CV Profissional
        </div>
      </div>

      {/* Main Content Area (White background) */}
      <div className="flex-1 p-7 flex flex-col justify-between">
        <div className={spacingClass}>
          {/* Header */}
          <div className="border-b-2 border-slate-200 pb-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
              {personalInfo.fullName || 'Seu Nome Completo'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-base md:text-lg font-semibold text-blue-600 mt-0.5">
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {/* Objective */}
          {objective && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-slate-900">
                <User className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Perfil Profissional
                </h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line text-justify">
                {objective}
              </p>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-slate-900 border-b border-slate-100 pb-1">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Experiência Profissional
                </h2>
              </div>
              <div className="space-y-3.5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-3.5 border-l-2 border-blue-200">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="text-xs font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-[11px] font-semibold text-blue-600">
                        {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-slate-600 mb-1">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-slate-900 border-b border-slate-100 pb-1">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Formação Académica
                </h2>
              </div>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-3.5 border-l-2 border-slate-200">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {edu.startYear} - {edu.current ? 'Em curso' : edu.endYear}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-blue-600 mb-0.5">
                      {edu.institution} {edu.location ? `(${edu.location})` : ''}
                    </div>
                    {edu.details && (
                      <p className="text-xs text-slate-500 leading-relaxed">{edu.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {references.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-slate-900 border-b border-slate-100 pb-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Referências
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {references.map((ref) => (
                  <div key={ref.id} className="p-2.5 rounded bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-800">{ref.name}</div>
                    <div className="text-[11px] text-slate-600">
                      {ref.role} - <span className="font-medium">{ref.company}</span>
                    </div>
                    <div className="text-[11px] text-blue-600 font-medium mt-0.5">
                      Tel: {ref.phone}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          {additionalInfo && (
            <div className="pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Informações Adicionais
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {additionalInfo}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
