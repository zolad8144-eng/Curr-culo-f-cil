import React from 'react';
import { ResumeData, ResumeConfig } from '../types';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Globe2,
  Award,
  Users2,
  Car,
  CreditCard
} from 'lucide-react';

interface Props {
  data: ResumeData;
  config: ResumeConfig;
}

export const TemplateCriativo: React.FC<Props> = ({ data, config }) => {
  const { personalInfo, objective, experiences, education, skills, languages, certifications, references, additionalInfo } = data;

  const primaryColor = config.primaryColor || '#2563eb';

  return (
    <div className="w-full bg-white text-slate-800 font-sans shadow-lg min-h-[297mm] overflow-hidden print:shadow-none">
      {/* Top Banner */}
      <div
        className="p-8 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, #0f172a 100%)`,
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Photo */}
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl bg-slate-800 shrink-0">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover object-center"
                crossOrigin="anonymous"
              />
            </div>
          )}

          <div className="flex-1 text-center md:text-left">
            <span className="inline-block text-[11px] font-bold tracking-widest uppercase bg-white/20 px-2.5 py-0.5 rounded-full mb-2 text-white">
              Curriculum Vitae
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {personalInfo.fullName || 'Seu Nome Completo'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-lg font-medium text-blue-200 mt-1">
                {personalInfo.jobTitle}
              </p>
            )}

            {/* Contact Pills */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2.5 text-xs text-white/90 mt-4">
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  <Phone className="w-3.5 h-3.5 text-blue-300" /> {personalInfo.phone}
                </span>
              )}
              {personalInfo.email && (
                <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  <Mail className="w-3.5 h-3.5 text-blue-300" /> {personalInfo.email}
                </span>
              )}
              {personalInfo.address && (
                <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  <MapPin className="w-3.5 h-3.5 text-blue-300" /> {personalInfo.address}
                </span>
              )}
              {personalInfo.biNumber && (
                <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  <CreditCard className="w-3.5 h-3.5 text-blue-300" /> B.I.: {personalInfo.biNumber}
                </span>
              )}
              {personalInfo.drivingLicense && (
                <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  <Car className="w-3.5 h-3.5 text-blue-300" /> Carta: {personalInfo.drivingLicense}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  <Linkedin className="w-3.5 h-3.5 text-blue-300" /> {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  <Globe className="w-3.5 h-3.5 text-blue-300" /> {personalInfo.website}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-7">
        {/* Left Column (Experiences & Education) */}
        <div className="md:col-span-8 space-y-6">
          {/* Objective */}
          {objective && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" /> Sobre Mim
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line text-justify">
                {objective}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {experiences.length > 0 && (
            <div>
              <h2
                className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 pb-2 mb-3 border-b-2"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                <Briefcase className="w-4 h-4" /> Experiência Profissional
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="group relative pl-4 border-l-2 border-blue-500">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="text-xs font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-slate-600 mb-1">
                      <span className="font-semibold text-slate-800">{exp.company}</span>
                      {exp.location ? ` | ${exp.location}` : ''}
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
              <h2
                className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 pb-2 mb-3 border-b-2"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                <GraduationCap className="w-4 h-4" /> Formação Académica
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="pl-4 border-l-2 border-slate-300">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                      <span className="text-[11px] font-medium text-slate-500">
                        {edu.startYear} - {edu.current ? 'Em curso' : edu.endYear}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-blue-600">
                      {edu.institution} {edu.location ? `(${edu.location})` : ''}
                    </div>
                    {edu.details && (
                      <p className="text-xs text-slate-500 mt-1">{edu.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Skills, Languages, Certifications, References) */}
        <div className="md:col-span-4 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Competências
              </h2>
              <div className="space-y-2">
                {skills.map((s) => (
                  <div key={s.id} className="text-xs">
                    <div className="flex justify-between font-medium text-slate-800 mb-0.5">
                      <span>{s.name}</span>
                      <span className="text-[10px] text-blue-600 font-semibold">{s.level}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          backgroundColor: primaryColor,
                          width:
                            s.level === 'Especialista'
                              ? '100%'
                              : s.level === 'Avançado'
                              ? '80%'
                              : s.level === 'Intermédio'
                              ? '60%'
                              : '40%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 mb-2.5">
                <Globe2 className="w-3.5 h-3.5 text-blue-600" /> Idiomas
              </h2>
              <div className="space-y-1.5 text-xs">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between items-center text-slate-700">
                    <span className="font-medium">{l.name}</span>
                    <span className="text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 mb-2">
                <Award className="w-3.5 h-3.5 text-blue-600" /> Certificações
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {certifications.map((c, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* References */}
          {references.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 mb-2">
                <Users2 className="w-3.5 h-3.5 text-blue-600" /> Referências
              </h2>
              <div className="space-y-2 text-xs">
                {references.map((r) => (
                  <div key={r.id} className="text-slate-700">
                    <div className="font-semibold text-slate-800">{r.name}</div>
                    <div className="text-[11px] text-slate-500">{r.role} - {r.company}</div>
                    <div className="text-[11px] text-blue-600">{r.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extra Notes */}
          {additionalInfo && (
            <div className="p-3 text-xs text-slate-600 border border-dashed border-slate-300 rounded-lg">
              {additionalInfo}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
