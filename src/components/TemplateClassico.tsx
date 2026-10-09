import React from 'react';
import { ResumeData, ResumeConfig } from '../types';
import { Mail, Phone, MapPin, Globe, Linkedin, CreditCard, Car } from 'lucide-react';

interface Props {
  data: ResumeData;
  config: ResumeConfig;
}

export const TemplateClassico: React.FC<Props> = ({ data, config }) => {
  const { personalInfo, objective, experiences, education, skills, languages, certifications, references, additionalInfo } = data;

  const accentColor = config.primaryColor || '#0f172a';

  return (
    <div className="w-full bg-white text-slate-800 font-serif shadow-lg min-h-[297mm] p-8 md:p-12 print:shadow-none print:p-6">
      {/* Header with optional photo and centered or traditional layout */}
      <div className="border-b-2 pb-5 mb-5 flex flex-col md:flex-row items-center gap-6" style={{ borderColor: accentColor }}>
        {personalInfo.showPhoto && personalInfo.photoUrl && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-300 shadow shrink-0">
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-full h-full object-cover object-center"
              crossOrigin="anonymous"
            />
          </div>
        )}

        <div className="flex-1 text-center md:text-left">
          <h1
            className="text-2xl md:text-3xl font-bold tracking-tight uppercase"
            style={{ color: accentColor }}
          >
            {personalInfo.fullName || 'Seu Nome Completo'}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-base font-medium italic text-slate-600 mt-1">
              {personalInfo.jobTitle}
            </p>
          )}

          {/* Contact Bar */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-3 font-sans">
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" /> {personalInfo.email}
              </span>
            )}
            {personalInfo.address && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" /> {personalInfo.address}
              </span>
            )}
            {personalInfo.biNumber && (
              <span className="flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-slate-400" /> B.I.: {personalInfo.biNumber}
              </span>
            )}
            {personalInfo.drivingLicense && (
              <span className="flex items-center gap-1">
                <Car className="w-3 h-3 text-slate-400" /> Carta: {personalInfo.drivingLicense}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-slate-400" /> {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-400" /> {personalInfo.website}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-5 text-sm">
        {/* Objective */}
        {objective && (
          <div>
            <h2
              className="text-xs uppercase tracking-widest font-bold pb-1 mb-2 border-b border-slate-300 font-sans"
              style={{ color: accentColor }}
            >
              Objetivo & Resumo Profissional
            </h2>
            <p className="text-xs leading-relaxed text-slate-700 text-justify">
              {objective}
            </p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div>
            <h2
              className="text-xs uppercase tracking-widest font-bold pb-1 mb-3 border-b border-slate-300 font-sans"
              style={{ color: accentColor }}
            >
              Experiência Profissional
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs">
                      {exp.role} <span className="font-normal italic text-slate-700">— {exp.company}</span>
                    </span>
                    <span className="text-[11px] font-sans font-medium text-slate-500">
                      {exp.startDate} – {exp.current ? 'Presente' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <div className="text-[11px] text-slate-500 italic mb-1 font-sans">{exp.location}</div>
                  )}
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line font-sans">
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
            <h2
              className="text-xs uppercase tracking-widest font-bold pb-1 mb-3 border-b border-slate-300 font-sans"
              style={{ color: accentColor }}
            >
              Habilitações Literárias & Formação
            </h2>
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs">
                      {edu.degree} <span className="font-normal italic text-slate-700">— {edu.institution}</span>
                    </span>
                    <span className="text-[11px] font-sans text-slate-500">
                      {edu.startYear} – {edu.current ? 'Em curso' : edu.endYear}
                    </span>
                  </div>
                  {edu.details && (
                    <p className="text-xs text-slate-600 mt-0.5 font-sans">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two-column layout for Skills, Languages & Additional */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2
                className="text-xs uppercase tracking-widest font-bold pb-1 mb-2 border-b border-slate-300 font-sans"
                style={{ color: accentColor }}
              >
                Competências
              </h2>
              <ul className="text-xs space-y-1 font-sans">
                {skills.map((s) => (
                  <li key={s.id} className="flex justify-between text-slate-700">
                    <span className="font-medium">• {s.name}</span>
                    <span className="text-slate-500 text-[11px] italic">({s.level})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages & Certifications */}
          <div>
            {languages.length > 0 && (
              <div className="mb-4">
                <h2
                  className="text-xs uppercase tracking-widest font-bold pb-1 mb-2 border-b border-slate-300 font-sans"
                  style={{ color: accentColor }}
                >
                  Domínio de Idiomas
                </h2>
                <ul className="text-xs space-y-1 font-sans">
                  {languages.map((l) => (
                    <li key={l.id} className="flex justify-between text-slate-700">
                      <span>• {l.name}</span>
                      <span className="text-slate-500 text-[11px]">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h2
                  className="text-xs uppercase tracking-widest font-bold pb-1 mb-2 border-b border-slate-300 font-sans"
                  style={{ color: accentColor }}
                >
                  Cursos Complementares
                </h2>
                <ul className="text-xs space-y-1 text-slate-700 font-sans">
                  {certifications.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* References & Info */}
        {(references.length > 0 || additionalInfo) && (
          <div className="pt-2 border-t border-slate-200">
            {references.length > 0 && (
              <div className="mb-3">
                <h2
                  className="text-xs uppercase tracking-widest font-bold pb-1 mb-2 font-sans"
                  style={{ color: accentColor }}
                >
                  Referências
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
                  {references.map((ref) => (
                    <div key={ref.id} className="text-slate-700">
                      <span className="font-semibold">{ref.name}</span> ({ref.company} - {ref.role})
                      <br />
                      <span className="text-slate-500">Tel: {ref.phone}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {additionalInfo && (
              <div className="text-xs font-sans text-slate-600 italic">
                {additionalInfo}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
