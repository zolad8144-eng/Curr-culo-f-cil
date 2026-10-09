export type TemplateType = 'moderno' | 'classico' | 'criativo';

export type ColorTheme = {
  id: string;
  name: string;
  primary: string; // hex or tailwind class
  primaryDark: string;
  secondary: string;
  accent: string;
};

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startYear: string;
  endYear: string;
  current: boolean;
  details?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Iniciante' | 'Intermédio' | 'Avançado' | 'Especialista';
}

export interface Language {
  id: string;
  name: string;
  level: 'Básico' | 'Intermédio' | 'Avançado' | 'Fluente / Nativo';
}

export interface Reference {
  id: string;
  name: string;
  company: string;
  role: string;
  phone: string;
  email?: string;
}

export interface ResumeData {
  // Step 1: Personal Info
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string; // ex: Luanda, Angola
    biNumber?: string; // Bilhete de Identidade (comum em Angola)
    birthDate?: string;
    nationality: string;
    maritalStatus?: string;
    drivingLicense?: string; // Carta de Condução
    photoUrl?: string;
    showPhoto: boolean;
    linkedin?: string;
    website?: string;
  };

  // Step 2: Professional Objective / Summary
  objective: string;

  // Step 3: Work Experience
  experiences: Experience[];

  // Step 4: Education
  education: Education[];

  // Step 5: Skills
  skills: Skill[];

  // Step 6: Additional Information
  languages: Language[];
  certifications: string[];
  references: Reference[];
  additionalInfo: string;
}

export interface ResumeConfig {
  template: TemplateType;
  primaryColor: string;
  spacing: 'compact' | 'normal' | 'comfortable';
  fontFamily: 'sans' | 'serif' | 'display';
}
