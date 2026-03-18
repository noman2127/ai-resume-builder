interface DownloadOptions {
  filename?: string;
}

export const downloadResumeAsPDF = async (
  elementId: string, 
  options: DownloadOptions = {}
) => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error(`Element with id ${elementId} not found.`);
    return;
  }

  const { filename = "resume.pdf" } = options;

  // Configuration for a high-quality A4 PDF
  const opt = {
    margin: 0,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    // Dynamic import to avoid SSR issues with window/document
    const html2pdfModule = await import('html2pdf.js');
    const html2pdf = html2pdfModule.default || html2pdfModule;
    // @ts-expect-error - html2pdf has no perfect typings for this specific call pattern
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error("Failed to generate PDF:", error);
  }
};
