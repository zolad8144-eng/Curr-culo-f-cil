import { ResumeData } from '../types';

export function exportToWord(data: ResumeData) {
  const { personalInfo, objective, experiences, education, skills, languages, certifications, references, additionalInfo } = data;

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Currículo - ${personalInfo.fullName || 'Candidato'}</title>
      <style>
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          font-size: 11pt;
          line-height: 1.4;
          color: #1e293b;
          margin: 20mm;
        }
        h1 {
          font-size: 20pt;
          color: #0f172a;
          margin-bottom: 2pt;
          text-transform: uppercase;
          letter-spacing: 0.5pt;
        }
        h2 {
          font-size: 13pt;
          color: #2563eb;
          margin-top: 0;
          font-weight: 500;
        }
        h3 {
          font-size: 12pt;
          color: #0f172a;
          border-bottom: 1.5pt solid #2563eb;
          padding-bottom: 3pt;
          margin-top: 14pt;
          margin-bottom: 6pt;
          text-transform: uppercase;
          letter-spacing: 0.5pt;
        }
        .contact-info {
          font-size: 10pt;
          color: #475569;
          margin-bottom: 12pt;
          line-height: 1.5;
        }
        .item-title {
          font-weight: bold;
          font-size: 11pt;
          color: #0f172a;
        }
        .item-meta {
          font-size: 9.5pt;
          color: #64748b;
          margin-bottom: 4pt;
        }
        .desc {
          margin-bottom: 10pt;
          white-space: pre-line;
        }
        ul {
          margin-top: 4pt;
          margin-bottom: 8pt;
          padding-left: 18pt;
        }
        li {
          margin-bottom: 3pt;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
      </style>
    </head>
    <body>
      <h1>${personalInfo.fullName || 'Nome Completo'}</h1>
      ${personalInfo.jobTitle ? `<h2>${personalInfo.jobTitle}</h2>` : ''}

      <div class="contact-info">
        <strong>Telefone:</strong> ${personalInfo.phone || 'Não informado'} | 
        <strong>Email:</strong> ${personalInfo.email || 'Não informado'} | 
        <strong>Localização:</strong> ${personalInfo.address || 'Angola'}
        ${personalInfo.biNumber ? `<br><strong>B.I.:</strong> ${personalInfo.biNumber}` : ''}
        ${personalInfo.drivingLicense ? ` | <strong>Carta:</strong> ${personalInfo.drivingLicense}` : ''}
        ${personalInfo.linkedin ? ` | <strong>LinkedIn:</strong> ${personalInfo.linkedin}` : ''}
      </div>

      ${objective ? `
        <h3>Objetivo Profissional</h3>
        <p class="desc">${objective}</p>
      ` : ''}

      ${experiences.length > 0 ? `
        <h3>Experiência Profissional</h3>
        ${experiences.map(exp => `
          <div>
            <div class="item-title">${exp.role} - <span style="font-weight: normal; color: #2563eb;">${exp.company}</span></div>
            <div class="item-meta">${exp.location ? `${exp.location} | ` : ''}${exp.startDate} - ${exp.current ? 'Presente' : exp.endDate}</div>
            <div class="desc">${exp.description.replace(/\n/g, '<br>')}</div>
          </div>
        `).join('')}
      ` : ''}

      ${education.length > 0 ? `
        <h3>Formação Académica</h3>
        ${education.map(edu => `
          <div>
            <div class="item-title">${edu.degree}</div>
            <div class="item-meta">${edu.institution} ${edu.location ? `(${edu.location})` : ''} | ${edu.startYear} - ${edu.current ? 'Em curso' : edu.endYear}</div>
            ${edu.details ? `<div class="desc">${edu.details}</div>` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${skills.length > 0 ? `
        <h3>Habilidades & Competências</h3>
        <ul>
          ${skills.map(s => `<li><strong>${s.name}</strong> - Nível: ${s.level}</li>`).join('')}
        </ul>
      ` : ''}

      ${languages.length > 0 ? `
        <h3>Idiomas</h3>
        <ul>
          ${languages.map(l => `<li><strong>${l.name}</strong> (${l.level})</li>`).join('')}
        </ul>
      ` : ''}

      ${certifications.length > 0 ? `
        <h3>Cursos & Certificações</h3>
        <ul>
          ${certifications.map(c => `<li>${c}</li>`).join('')}
        </ul>
      ` : ''}

      ${references.length > 0 ? `
        <h3>Referências</h3>
        ${references.map(r => `
          <div style="margin-bottom: 6pt;">
            <strong>${r.name}</strong> - ${r.role} (${r.company})<br>
            <span>Contacto: ${r.phone} ${r.email ? `| ${r.email}` : ''}</span>
          </div>
        `).join('')}
      ` : ''}

      ${additionalInfo ? `
        <h3>Informações Adicionais</h3>
        <p class="desc">${additionalInfo}</p>
      ` : ''}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });

  const sanitizedName = (personalInfo.fullName || 'Curriculo')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_');

  const filename = `${sanitizedName}_Curriculo_Angola.doc`;

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
