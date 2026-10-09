import { ResumeData } from '../types';

export function shareViaWhatsApp(data: ResumeData) {
  const { personalInfo, objective, experiences, education, skills } = data;

  let message = `*CURRÍCULO VITAE - ${personalInfo.fullName.toUpperCase()}*\n`;
  if (personalInfo.jobTitle) {
    message += `🎯 *Cargo/Área:* ${personalInfo.jobTitle}\n`;
  }
  message += `📍 *Localização:* ${personalInfo.address || 'Angola'}\n`;
  message += `📞 *Contacto:* ${personalInfo.phone || 'N/A'}\n`;
  if (personalInfo.email) {
    message += `✉️ *Email:* ${personalInfo.email}\n`;
  }

  if (objective) {
    message += `\n*RESUMO PROFISSIONAL:*\n${objective.slice(0, 200)}${objective.length > 200 ? '...' : ''}\n`;
  }

  if (experiences.length > 0) {
    message += `\n*ÚLTIMA EXPERIÊNCIA:*\n`;
    const lastExp = experiences[0];
    message += `• ${lastExp.role} na ${lastExp.company} (${lastExp.startDate} - ${lastExp.current ? 'Presente' : lastExp.endDate})\n`;
  }

  if (education.length > 0) {
    message += `\n*FORMAÇÃO:*\n`;
    const lastEdu = education[0];
    message += `• ${lastEdu.degree} - ${lastEdu.institution}\n`;
  }

  if (skills.length > 0) {
    const topSkills = skills.slice(0, 5).map(s => s.name).join(', ');
    message += `\n*PRINCIPAIS COMPETÊNCIAS:*\n${topSkills}\n`;
  }

  message += `\n_Currículo gerado via Currículo Fácil Angola_`;

  const encoded = encodeURIComponent(message);
  window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
}
