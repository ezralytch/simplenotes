import React, { useEffect, useRef, useState } from 'react';
import { useNote } from '../context/NoteContext.js';
// NotePreview.jsx
import { generatePdf } from '../services/pdfService.js';
import './NotePreview.css';

const NotePreview = ({ onBack }) => {
  const { 
    clientInfo,
    aiGeneratedContent,
    signature,
    clinicianInfo,
    compileCompletedNote,
    resetForm,
    isLoading,
    setIsLoading,
    error,
    setError
  } = useNote();
  
  // Local state to track if we've already compiled the note
  const [hasCompiled, setHasCompiled] = useState(false);
  
  // Reference for the preview container
  const previewContainerRef = useRef(null);
  
  // Compile the note only once when component mounts
  useEffect(() => {
    if (!hasCompiled) {
      compileCompletedNote();
      setHasCompiled(true);
    }
  }, [hasCompiled]);
  
  // Handle downloading the note as PDF
  const handleDownloadPdf = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const filename = `Clinical_Note_${clientInfo.name.replace(/\s+/g, '_')}_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
      
      // Use the enhanced PDF generation
      await generatePdf(previewContainerRef.current, filename);
    } catch (err) {
      setError('Failed to generate PDF. Please try again.');
      console.error('Error generating PDF:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle starting a new note
  // Update the handleNewNote function in your NotePreview.jsx file:

const handleNewNote = () => {
  if (window.confirm('Start a new clinical note? This will clear all current data.')) {
    // Reset the form
    resetForm();
    // Use history push instead of direct page change
    // This allows React to properly handle the state changes before navigating
    setTimeout(() => {
      window.location.href = '/';
    }, 100); // Small delay to allow state to update first
  }
};
  
  // Format the current date
  const formatDate = (dateString) => {
    if (!dateString) {
      return new Date().toLocaleDateString();
    }
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="note-preview-container">
      <h2>Review & Download Note</h2>
      <p className="preview-instruction">
        Review your completed clinical note below. Once you're satisfied, click "Download PDF" to save it.
      </p>
      
      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}
      
      <div className="preview-actions">
        <button 
          className="download-button"
          onClick={handleDownloadPdf}
          disabled={isLoading}
        >
          {isLoading ? 'Generating PDF...' : 'Download PDF'}
        </button>
        <button 
          className="new-note-button"
          onClick={handleNewNote}
        >
          Start New Note
        </button>
      </div>
      
      <div className="final-note-preview">
        <div 
          className="note-document" 
          ref={previewContainerRef}
        >
          <div className="note-header">
            <h2 className="note-title">Clinical Note</h2>
            <div className="note-metadata">
              <p><strong>Client:</strong> {clientInfo.name}</p>
              {clientInfo.pronouns && <p><strong>Pronouns:</strong> {clientInfo.pronouns}</p>}
              <p><strong>Date of Service:</strong> {formatDate(clientInfo.dateOfService)}</p>
              <p><strong>Time of Service:</strong> {clientInfo.timeOfService}</p>
              <p><strong>Billing Code:</strong> {clientInfo.billingCode}</p>
              {clientInfo.insuranceId && <p><strong>Insurance ID:</strong> {clientInfo.insuranceId}</p>}
            </div>
          </div>
          
          <div className="note-body">
            {/* For the preview, we still use HTML formatting */}
            <div dangerouslySetInnerHTML={{ 
              __html: aiGeneratedContent.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>') 
            }} />
          </div>
          
          <div className="note-footer">
            <div className="signature-section">
              <p><strong>Provider Signature:</strong></p>
              {signature && (
                <img 
                  src={signature} 
                  alt="Digital Signature" 
                  className="signature-image" 
                />
              )}
              <p className="signature-date">Date: {new Date().toLocaleDateString()}</p>
              {clinicianInfo && clinicianInfo.name && (
                <div className="clinician-info">
                  <p className="clinician-name">{clinicianInfo.name}{clinicianInfo.credentials ? `, ${clinicianInfo.credentials}` : ''}</p>
                  {clinicianInfo.title && <p className="clinician-title">{clinicianInfo.title}</p>}
                  {clinicianInfo.npi && <p className="clinician-npi">NPI#: {clinicianInfo.npi}</p>}
                  {clinicianInfo.additionalInfo && <p className="clinician-additional">{clinicianInfo.additionalInfo}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="button-group2">
        <button type="button" className="secondary-button" onClick={onBack}>
          Back to Signature
        </button>
      </div>
      
      <div className="privacy-reminder">
        <p>
          <strong>Privacy Reminder:</strong> This document contains sensitive client information. 
          Store it securely in accordance with HIPAA regulations and your organization's policies.
        </p>
      </div>
    </div>
  );
};

export default NotePreview;