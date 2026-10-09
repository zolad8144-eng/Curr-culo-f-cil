import React, { useState } from 'react';
import {
  ResumeData,
  Experience,
  Education,
  Skill,
  Language,
  Reference,
} from '../types';
import { PhotoUploader } from './PhotoUploader';
import {
  objectiveSuggestionsAngola,
  commonSkillsAngola,
} from '../data/initialData';
import {
  User,
  Target,
  Briefcase,
  GraduationCap,
  Sparkles,
  FileText,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Sparkles as SparkleIcon,
  HelpCircle,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
} from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const WizardSteps: React.FC<Props> = ({
  data,
  onChange,
  currentStep,
  setCurrentStep,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Quick state update helper
  const updatePersonal = (field: string, value: any) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  // Experiences helpers
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      location: 'Luanda, Angola',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange({
      ...data,
      experiences: [newExp, ...data.experiences],
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter((exp) => exp.id !== id),
    });
  };

  // Education helpers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      location: 'Luanda',
      startYear: '',
      endYear: '',
      current: false,
      details: '',
    };
    onChange({
      ...data,
      education: [...data.education, newEdu],
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  // Skill helpers
  const addSkill = (name = '', level: Skill['level'] = 'Intermédio') => {
    const newSkill: Skill = {
      id: `sk-${Date.now()}-${Math.random()}`,
      name,
      level,
    };
    onChange({
      ...data,
      skills: [...data.skills, newSkill],
    });
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onChange({
      ...data,
      skills: data.skills.map((sk) =>
        sk.id === id ? { ...sk, [field]: value } : sk
      ),
    });
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((sk) => sk.id !== id),
    });
  };

  // Language helpers
  const addLanguage = () => {
    const newLang: Language = {
      id: `lang-${Date.now()}`,
      name: '',
      level: 'Intermédio',
    };
    onChange({
      ...data,
      languages: [...data.languages, newLang],
    });
  };

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    onChange({
      ...data,
      languages: data.languages.map((l) =>
        l.id === id ? { ...l, [field]: value } : l
      ),
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((l) => l.id !== id),
    });
  };

  // Reference helpers
  const addReference = () => {
    const newRef: Reference = {
      id: `ref-${Date.now()}`,
      name: '',
      company: '',
      role: '',
      phone: '+244 ',
      email: '',
    };
    onChange({
      ...data,
      references: [...data.references, newRef],
    });
  };

  const updateReference = (id: string, field: keyof Reference, value: any) => {
    onChange({
      ...data,
      references: data.references.map((r) =>
        r.id === id ? { ...r, [field]: value } : r
      ),
    });
  };

  const removeReference = (id: string) => {
    onChange({
      ...data,
      references: data.references.filter((r) => r.id !== id),
    });
  };

  // Certifications helpers
  const addCertification = (text: string) => {
    if (!text.trim()) return;
    onChange({
      ...data,
      certifications: [...data.certifications, text.trim()],
    });
  };

  const removeCertification = (index: number) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((_, i) => i !== index),
    });
  };

  const stepsList = [
    { number: 1, title: 'Dados Pessoais', icon: User, desc: 'Contactos e identificação' },
    { number: 2, title: 'Objetivo', icon: Target, desc: 'Resumo da carreira' },
    { number: 3, title: 'Experiência', icon: Briefcase, desc: 'Histórico de trabalho' },
    { number: 4, title: 'Formação', icon: GraduationCap, desc: 'Habilitações literárias' },
    { number: 5, title: 'Competências', icon: Sparkles, desc: 'Habilidades & níveis' },
    { number: 6, title: 'Mais Info', icon: FileText, desc: 'Idiomas, referências & cartas' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      {/* Wizard Step Tabs Header */}
      <div className="border-b border-slate-200 bg-slate-50/70 p-3 sm:p-4">
        <div className="flex items-center justify-between overflow-x-auto pb-1 sm:pb-0 gap-1 sm:gap-2 scrollbar-none">
          {stepsList.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setCurrentStep(step.number)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/20'
                    : isCompleted
                    ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? 'bg-white text-blue-600'
                      : isCompleted
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? '✓' : step.number}
                </div>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 rounded-full h-1 mt-3 overflow-hidden">
          <div
            className="bg-blue-600 h-1 transition-all duration-300"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="p-5 sm:p-7 flex-1 overflow-y-auto">
        {/* ================= ETAPA 1 ================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" /> Etapa 1: Dados Pessoais & Contactos
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Preencha os seus dados de contacto essenciais. Em Angola, números com prefixo +244 e a localização da província/município facilitam a convocatória para entrevistas.
              </p>
            </div>

            {/* Photo Uploader */}
            <PhotoUploader
              photoUrl={data.personalInfo.photoUrl}
              showPhoto={data.personalInfo.showPhoto}
              onPhotoChange={(url) => updatePersonal('photoUrl', url)}
              onToggleShow={(show) => updatePersonal('showPhoto', show)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Manuel Domingos António"
                  value={data.personalInfo.fullName}
                  onChange={(e) => updatePersonal('fullName', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cargo Desejado / Título Profissional
                </label>
                <input
                  type="text"
                  placeholder="Ex: Especialista em Gestão de Redes & Suporte TI"
                  value={data.personalInfo.jobTitle}
                  onChange={(e) => updatePersonal('jobTitle', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Telefone / WhatsApp (Angola) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    placeholder="+244 923 000 000"
                    value={data.personalInfo.phone}
                    onChange={(e) => updatePersonal('phone', e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <span className="text-[10px] text-slate-400">Unitel, Africell ou Movicel</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Correio Eletrónico (Email) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    placeholder="exemplo@gmail.com"
                    value={data.personalInfo.email}
                    onChange={(e) => updatePersonal('email', e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Endereço / Localização (Cidade e Província) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Ex: Luanda, Angola (Maianga / Talatona)"
                    value={data.personalInfo.address}
                    onChange={(e) => updatePersonal('address', e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Angolan Specific Information */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nº do Bilhete de Identidade (B.I.)
                </label>
                <input
                  type="text"
                  placeholder="000000000LA000"
                  value={data.personalInfo.biNumber || ''}
                  onChange={(e) => updatePersonal('biNumber', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <span className="text-[10px] text-slate-400">Muito requisitado em empresas angolanas</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nacionalidade
                </label>
                <input
                  type="text"
                  placeholder="Angolana"
                  value={data.personalInfo.nationality}
                  onChange={(e) => updatePersonal('nationality', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Carta de Condução
                </label>
                <input
                  type="text"
                  placeholder="Ex: Ligeiro Amador / Pesado Profissional"
                  value={data.personalInfo.drivingLicense || ''}
                  onChange={(e) => updatePersonal('drivingLicense', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn ou Portfólio (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="linkedin.com/in/seu-perfil"
                  value={data.personalInfo.linkedin || ''}
                  onChange={(e) => updatePersonal('linkedin', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= ETAPA 2 ================= */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-start">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" /> Etapa 2: Objetivo Profissional / Resumo
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Apresente em poucas linhas quem você é, as suas qualificações e como pode agregar valor à empresa contratante em Angola.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
              >
                <SparkleIcon className="w-3.5 h-3.5" />
                {showSuggestions ? 'Ocultar Exemplos' : 'Ver Exemplos Prontos'}
              </button>
            </div>

            {/* Suggestions Drawer */}
            {showSuggestions && (
              <div className="bg-slate-50 border border-blue-200 rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <SparkleIcon className="w-4 h-4 text-blue-600" /> Exemplos Adaptados ao Mercado Angolano (Clique para aplicar):
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {objectiveSuggestionsAngola.map((sug, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        onChange({ ...data, objective: sug.text });
                        setShowSuggestions(false);
                      }}
                      className="cursor-pointer bg-white p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-sm transition text-left"
                    >
                      <div className="text-xs font-bold text-blue-600 mb-1">{sug.category}</div>
                      <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">{sug.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Descrição do Perfil / Resumo Profissional
              </label>
              <textarea
                rows={6}
                placeholder="Ex: Profissional dinâmico com experiência na área de... Foco em alcance de objetivos, rigor nos processos e trabalho em equipa..."
                value={data.objective}
                onChange={(e) => onChange({ ...data, objective: e.target.value })}
                className="w-full p-3.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition leading-relaxed"
              />
              <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                <span>Dica: Mantenha entre 3 a 5 linhas para leitura rápida pelos recrutadores.</span>
                <span>{data.objective.length} caracteres</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= ETAPA 3 ================= */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex flex-wrap justify-between items-center gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" /> Etapa 3: Experiência Profissional
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Liste os seus empregos anteriores, estágios ou actividades profissionais, começando pelo mais recente.
                </p>
              </div>

              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
              >
                <Plus className="w-4 h-4" /> + Adicionar Mais Experiência
              </button>
            </div>

            {data.experiences.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl p-6">
                <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-slate-700">Sem experiências adicionadas</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Se está à procura do primeiro emprego, pode incluir estágios curriculares, trabalhos voluntários ou projetos académicos.
                </p>
                <button
                  type="button"
                  onClick={addExperience}
                  className="mt-4 px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
                >
                  Adicionar Experiência
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {data.experiences.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 transition space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                        Experiência #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Excluir
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Empresa / Organização *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Unitel S.A., Sonangol, Banco BAI"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Cargo / Função *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Técnico de Suporte TI, Contabilista"
                          value={exp.role}
                          onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Localização
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Luanda, Talatona, Benguela"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Data Início
                          </label>
                          <input
                            type="text"
                            placeholder="Mês/Ano ou Ano"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Data Fim
                          </label>
                          <input
                            type="text"
                            placeholder={exp.current ? 'Presente' : 'Mês/Ano ou Ano'}
                            disabled={exp.current}
                            value={exp.current ? 'Presente' : exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2 flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`current-${exp.id}`}
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`current-${exp.id}`} className="text-xs font-medium text-slate-700 cursor-pointer">
                          Trabalho atualmente nesta função
                        </label>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Principais Responsabilidades & Realizações
                        </label>
                        <textarea
                          rows={3}
                          placeholder="• Gestão de rede de computadores e servidores corporativos.&#10;• Atendimento a mais de 50 pedidos diários com excelência."
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= ETAPA 4 ================= */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex flex-wrap justify-between items-center gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" /> Etapa 4: Formação Acadêmica
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Registe as suas habilitações literárias (Ensino Médio, Licenciatura, Mestrado, Cursos Técnicos).
                </p>
              </div>

              <button
                type="button"
                onClick={addEducation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
              >
                <Plus className="w-4 h-4" /> + Adicionar Formação
              </button>
            </div>

            {data.education.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl p-6">
                <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-slate-700">Sem formações registadas</h3>
                <button
                  type="button"
                  onClick={addEducation}
                  className="mt-4 px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
                >
                  Adicionar Formação
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div
                    key={edu.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 transition space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                        Formação #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeEducation(edu.id)}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Excluir
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Instituição de Ensino *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: UAN, ISPTEC, Univ. Católica, IMEL, ITEL"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Curso / Grau Académico *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Licenciatura em Engenharia Informática, Técnico Médio de Contabilidade"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Localização
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Luanda, Talatona, Benguela"
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Ano Início
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: 2018"
                            value={edu.startYear}
                            onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Ano Conclusão
                          </label>
                          <input
                            type="text"
                            placeholder={edu.current ? 'Em curso' : 'Ex: 2022'}
                            disabled={edu.current}
                            value={edu.current ? 'Em curso' : edu.endYear}
                            onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`current-edu-${edu.id}`}
                          checked={edu.current}
                          onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`current-edu-${edu.id}`} className="text-xs font-medium text-slate-700 cursor-pointer">
                          Frequento atualmente (Em curso)
                        </label>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Detalhes ou Conquistas (Opcional)
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Média final de 16 valores. Participação em feira de inovação."
                          value={edu.details || ''}
                          onChange={(e) => updateEducation(edu.id, 'details', e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= ETAPA 5 ================= */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" /> Etapa 5: Habilidades & Competências
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Adicione as suas principais habilidades técnicas (softwares, ferramentas) e comportamentais. Indique o nível de proficiência.
              </p>
            </div>

            {/* Quick Angola Common Skills Chips */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Sugestões valorizadas no mercado angolano (+ Adicione com 1 clique):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {commonSkillsAngola.map((skillName) => {
                  const alreadyAdded = data.skills.some(
                    (s) => s.name.toLowerCase() === skillName.toLowerCase()
                  );
                  return (
                    <button
                      key={skillName}
                      type="button"
                      disabled={alreadyAdded}
                      onClick={() => addSkill(skillName, 'Avançado')}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                        alreadyAdded
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {alreadyAdded ? '✓ ' : '+ '}
                      {skillName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills List */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700">
                  As suas Competências ({data.skills.length})
                </span>
                <button
                  type="button"
                  onClick={() => addSkill('', 'Intermédio')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
                >
                  <Plus className="w-3.5 h-3.5" /> + Nova Competência
                </button>
              </div>

              {data.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition"
                >
                  <input
                    type="text"
                    placeholder="Nome da competência (ex: Primavera BSS)"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value as any)}
                    className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermédio">Intermédio</option>
                    <option value="Avançado">Avançado</option>
                    <option value="Especialista">Especialista</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => removeSkill(skill.id)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ETAPA 6 ================= */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" /> Etapa 6: Informações Adicionais
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Acrescente idiomas dominados, certificações profissionais, referências de antigos supervisores e notas finais.
              </p>
            </div>

            {/* Languages Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-800">
                  Domínio de Idiomas
                </label>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Idioma
                </button>
              </div>

              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Ex: Português, Inglês, Francês, Kimbundu"
                      value={lang.name}
                      onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={lang.level}
                      onChange={(e) => updateLanguage(lang.id, 'level', e.target.value as any)}
                      className="px-2.5 py-1.5 text-xs rounded-xl border border-slate-300 bg-slate-50"
                    >
                      <option value="Básico">Básico</option>
                      <option value="Intermédio">Intermédio</option>
                      <option value="Avançado">Avançado</option>
                      <option value="Fluente / Nativo">Fluente / Nativo</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeLanguage(lang.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 block">
                Cursos & Certificações
              </label>
              <div className="flex gap-2">
                <input
                  id="new-cert-input"
                  type="text"
                  placeholder="Ex: Primavera BSS Certificado, CCNA Cisco, Segurança HST"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      if (input.value) {
                        addCertification(input.value);
                        input.value = '';
                      }
                    }
                  }}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('new-cert-input') as HTMLInputElement;
                    if (input && input.value) {
                      addCertification(input.value);
                      input.value = '';
                    }
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition"
                >
                  Adicionar
                </button>
              </div>

              {data.certifications.length > 0 && (
                <ul className="space-y-1.5 text-xs">
                  {data.certifications.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200"
                    >
                      <span className="text-slate-700 font-medium">{c}</span>
                      <button
                        type="button"
                        onClick={() => removeCertification(i)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* References Section */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <label className="text-xs font-bold text-slate-800">
                    Referências Profissionais (Opcional)
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Contactos de antigos directores, chefes de equipa ou mentores.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addReference}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Referência
                </button>
              </div>

              <div className="space-y-3">
                {data.references.map((ref) => (
                  <div key={ref.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-slate-600">Contacto de Referência</span>
                      <button
                        type="button"
                        onClick={() => removeReference(ref.id)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Remover
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Nome do profissional"
                        value={ref.name}
                        onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                        className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                      <input
                        type="text"
                        placeholder="Empresa (Ex: Unitel)"
                        value={ref.company}
                        onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                        className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                      <input
                        type="text"
                        placeholder="Cargo (Ex: Director de TI)"
                        value={ref.role}
                        onChange={(e) => updateReference(ref.id, 'role', e.target.value)}
                        className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                      <input
                        type="text"
                        placeholder="Telefone (+244 9...)"
                        value={ref.phone}
                        onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                        className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional info / Availability textarea */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 block">
                Disponibilidade e Observações Finais
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Disponibilidade imediata para início de funções. Disponível para deslocações para as províncias..."
                value={data.additionalInfo}
                onChange={(e) => onChange({ ...data, additionalInfo: e.target.value })}
                className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Buttons */}
      <div className="border-t border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>

        <span className="text-xs text-slate-500 font-medium">
          Etapa {currentStep} de 6
        </span>

        {currentStep < 6 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-sm"
          >
            Próximo <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 rounded-xl transition"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Rever Dados
          </button>
        )}
      </div>
    </div>
  );
};
