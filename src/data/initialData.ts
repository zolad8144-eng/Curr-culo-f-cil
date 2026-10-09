import { ResumeData } from '../types';

export const sampleAngolaResume: ResumeData = {
  personalInfo: {
    fullName: 'Manuel Domingos António',
    jobTitle: 'Especialista em Gestão de Redes & Suporte TI',
    email: 'manuel.domingos.ti@gmail.com',
    phone: '+244 923 847 120',
    address: 'Luanda, Angola (Maianga)',
    biNumber: '005482910LA042',
    birthDate: '15/05/1996',
    nationality: 'Angolana',
    maritalStatus: 'Solteiro',
    drivingLicense: 'Ligeiro Amador',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    showPhoto: true,
    linkedin: 'linkedin.com/in/manueldomingos-ti',
    website: 'manueldomingos.ao',
  },
  objective:
    'Profissional dedicado de Tecnologias de Informação com mais de 5 anos de experiência comprovada na administração de redes, suporte técnico e segurança de dados. Focado em otimizar processos operacionais, garantir 99.9% de uptime de infraestrutura e contribuir para o crescimento e solidez tecnológica da empresa.',
  experiences: [
    {
      id: 'exp-1',
      company: 'Unitel T+ / Parceiro Corporativo',
      role: 'Técnico Sénior de Infraestrutura de Redes',
      location: 'Luanda, Angola',
      startDate: 'Março 2022',
      endDate: 'Presente',
      current: true,
      description:
        '• Manutenção e gestão de switches Cisco, routers e firewalls Fortinet em mais de 12 dependências.\n• Implementação de políticas de segurança e backups diários com 100% de integridade.\n• Atendimento e resolução de incidentes críticos de nível 2 e 3 em tempo recorde (<30 minutos).',
    },
    {
      id: 'exp-2',
      company: 'Soluções Integradas BAI S.A.',
      role: 'Assistente de Suporte Técnico & Sistemas',
      location: 'Talatona, Luanda',
      startDate: 'Fevereiro 2019',
      endDate: 'Janeiro 2022',
      current: false,
      description:
        '• Instalação, configuração e suporte a utilizadores em ambiente Windows Server e Linux.\n• Gestão de contas de correio eletrónico corporativo, Active Directory e antivírus centralizado.\n• Treinamento de mais de 80 colaboradores sobre boas práticas de cibersegurança.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'ISPTEC - Instituto Superior Politécnico de Tecnologias e Ciências',
      degree: 'Licenciatura em Engenharia Informática',
      location: 'Talatona, Luanda',
      startYear: '2016',
      endYear: '2021',
      current: false,
      details: 'Média final de 16 valores. Monografia sobre infraestruturas seguras em nuvem.',
    },
    {
      id: 'edu-2',
      institution: 'IMEL - Instituto Médio de Economia de Luanda',
      degree: 'Técnico Médio de Informática de Gestão',
      location: 'Luanda',
      startYear: '2012',
      endYear: '2015',
      current: false,
      details: 'Formação técnica abrangente em programação, base de dados e contabilidade básica.',
    },
  ],
  skills: [
    { id: 'sk-1', name: 'Administração de Redes (Cisco, Mikrotik)', level: 'Avançado' },
    { id: 'sk-2', name: 'Sistemas Windows Server & Active Directory', level: 'Especialista' },
    { id: 'sk-3', name: 'Segurança da Informação & Firewalls', level: 'Avançado' },
    { id: 'sk-4', name: 'Virtualização (VMware, Proxmox)', level: 'Intermédio' },
    { id: 'sk-5', name: 'Resolução de Problemas & Atendimento', level: 'Especialista' },
    { id: 'sk-6', name: 'Microsoft Office 365 & Excel Avançado', level: 'Avançado' },
  ],
  languages: [
    { id: 'lang-1', name: 'Português', level: 'Fluente / Nativo' },
    { id: 'lang-2', name: 'Inglês Técnico', level: 'Avançado' },
    { id: 'lang-3', name: 'Francês', level: 'Básico' },
  ],
  certifications: [
    'CCNA - Cisco Certified Network Associate (2022)',
    'Certificação em Gestão de Segurança da Informação (ISO 27001 Foundation)',
    'Curso de Primavera BSS ERP Suporte e parametrização',
  ],
  references: [
    {
      id: 'ref-1',
      name: 'Eng. Carlos Kituxi',
      company: 'Soluções Integradas BAI',
      role: 'Director de Tecnologias de Informação',
      phone: '+244 924 112 233',
      email: 'ckituxi@exemplo.ao',
    },
  ],
  additionalInfo:
    'Disponibilidade imediata para entrevistas e início de funções. Disponível para deslocações para as províncias (Benguela, Huambo, Cabinda, etc.) se necessário.',
};

export const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '+244 ',
    address: 'Luanda, Angola',
    biNumber: '',
    birthDate: '',
    nationality: 'Angolana',
    maritalStatus: 'Solteiro(a)',
    drivingLicense: '',
    photoUrl: '',
    showPhoto: true,
    linkedin: '',
    website: '',
  },
  objective: '',
  experiences: [],
  education: [],
  skills: [],
  languages: [
    { id: 'l-1', name: 'Português', level: 'Fluente / Nativo' },
    { id: 'l-2', name: 'Inglês', level: 'Intermédio' },
  ],
  certifications: [],
  references: [],
  additionalInfo: 'Disponibilidade imediata para início de funções.',
};

export const objectiveSuggestionsAngola = [
  {
    category: 'Jovem Recém-Formado / Primeiro Emprego',
    text: 'Recém-licenciado motivado e focado, com sólidos conhecimentos teóricos e vontade de aprender. Procuro uma primeira oportunidade no mercado de trabalho para aplicar os conhecimentos adquiridos na universidade e agregar valor imediato à equipa.',
  },
  {
    category: 'Contabilidade & Finanças',
    text: 'Profissional de contabilidade e finanças com experiência em reconciliação bancária, fecho de contas, reporte fiscal e domínio do software Primavera BSS. Foco em rigor analítico, redução de discrepâncias e conformidade com a legislação angolana.',
  },
  {
    category: 'Tecnologia & Suporte TI',
    text: 'Técnico de TI especializado em administração de redes, suporte de infraestrutura e atendimento ao utilizador. Comprometido com a alta disponibilidade de sistemas, segurança de dados e rápida resolução de incidentes tecnológicos.',
  },
  {
    category: 'Vendas & Atendimento ao Cliente',
    text: 'Profissional dinâmico de atendimento e vendas comerciais com forte aptidão para comunicação interpessoal, prospeção de clientes e alcance de metas comerciais. Foco na excelência de serviço e fidelização de clientes em Angola.',
  },
  {
    category: 'Administração & Recursos Humanos',
    text: 'Assistente administrativo organizado com experiência em gestão documental, arquivo, gestão de pessoal e atendimento corporativo. Facilidade de relacionamento interpessoal e domínio de ferramentas informáticas de escritório.',
  },
  {
    category: 'Logística & Motorista',
    text: 'Motorista profissional responsável e pontual, portador de carta de condução válida e profundo conhecimento das vias de Luanda e províncias. Foco absoluto em segurança rodoviária, manutenção preventiva de veículos e eficiência nas entregas.',
  },
];

export const commonSkillsAngola = [
  'Primavera BSS',
  'Excel Avançado',
  'Atendimento ao Cliente',
  'Gestão de Stocks',
  'Contabilidade Geral',
  'Cisco & Redes TI',
  'Marketing Digital',
  'Gestão de Equipa',
  'Comunicação Assertiva',
  'Inglês Comercial',
  'Resolução de Conflitos',
  'Organização & Arquivo',
  'Segurança no Trabalho (HST)',
  'Vendas Corporativas',
];
