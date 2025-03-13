// pdfService.js
import html2pdf from 'html2pdf.js';

/**
 * Generates a PDF from an HTML element and downloads it
 * @param {HTMLElement} element - The HTML element to convert
 * @param {string} filename - Name of the file to download
 * @returns {Promise<boolean>} - Promise that resolves when PDF is generated
 */
export const generatePdf = async (element, filename) => {
  if (!element) {
    throw new Error('Element not found');
  }
  
  // Create a clone of the element to avoid modifying the original
  const clone = element.cloneNode(true);
  const tempContainer = document.createElement('div');
  tempContainer.appendChild(clone);
  document.body.appendChild(tempContainer);
  
  try {
    // Set options for PDF generation
    const options = {
      margin: [10, 10, 10, 10], // [top, right, bottom, left] in mm
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        allowTaint: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'
      }
    };
    
    // Generate the PDF
    await html2pdf().set(options).from(clone).save();
    document.body.removeChild(tempContainer);
    return true;
  } catch (error) {
    document.body.removeChild(tempContainer);
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Keep these methods for backward compatibility
export const generateSimplePdf = generatePdf;
export const generateDirectPdf = generatePdf;
export const generateTextPdf = generatePdf;