// PDF Generation utility using html2pdf.js with fallback to native print

declare global {
  interface Window {
    html2pdf?: () => {
      from: (element: HTMLElement) => {
        set: (options: Record<string, unknown>) => {
          save: () => Promise<void>;
        };
      };
    };
  }
}

export async function exportToPdf(elementId: string, candidateName: string): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  const sanitizedName = (candidateName || 'Curriculo')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_');

  const filename = `${sanitizedName}_Curriculo_Angola.pdf`;

  if (typeof window.html2pdf === 'function') {
    try {
      const opt = {
        margin: [6, 6, 6, 6], // mm
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          scrollY: 0,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      await window.html2pdf().from(element).set(opt).save();
      return true;
    } catch (err) {
      console.warn('html2pdf failed, falling back to print dialog:', err);
    }
  }

  // Fallback: browser print dialog
  window.print();
  return true;
}
