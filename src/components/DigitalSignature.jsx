import React, { useRef, useState, useEffect } from 'react';
import { useNote } from '../context/NoteContext.js';
import './DigitalSignature.css';

const DigitalSignature = ({ onNext, onBack }) => {
  const { 
    signature, 
    updateSignature, 
    clinicianInfo, 
    updateClinicianInfo 
  } = useNote();
  
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  
  // Set up the canvas when component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Style the context
    context.lineWidth = 3; // Slightly thicker line for better signature
    context.lineCap = 'round';
    context.strokeStyle = '#000000';
    
    // If we have a saved signature, draw it
    if (signature) {
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0);
        setHasSignature(true);
      };
      img.src = signature;
    }
    
    // Handle window resize
    const handleResize = () => {
      // Save current drawing
      const currentDrawing = canvas.toDataURL();
      
      // Resize canvas
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Restore context settings
      context.lineWidth = 3;
      context.lineCap = 'round';
      context.strokeStyle = '#000000';
      
      // Restore drawing
      if (currentDrawing && currentDrawing !== 'data:,') {
        const img = new Image();
        img.onload = () => {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = currentDrawing;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [signature]);
  
  // Handle mouse/touch down
  const handleStartDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Get coordinates
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    // Start new path
    context.beginPath();
    context.moveTo(x, y);
    
    setIsDrawing(true);
    setHasSignature(true);
  };
  
  // Handle mouse/touch move
  const handleDraw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Get coordinates
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    // Draw line
    context.lineTo(x, y);
    context.stroke();
  };
  
  // Handle mouse/touch up
  const handleStopDrawing = () => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Complete the path
    context.closePath();
    setIsDrawing(false);
    
    // Save the signature
    const signatureData = canvas.toDataURL('image/png');
    updateSignature(signatureData);
  };
  
  // Clear the signature
  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    updateSignature(null);
  };

  // Handle clinician info changes
  const handleClinicianInfoChange = (e) => {
    const { name, value } = e.target;
    updateClinicianInfo({ ...clinicianInfo, [name]: value });
  };
  
  // Handle continue to next step
  const handleContinue = () => {
    if (!hasSignature) {
      alert('Please provide your signature before continuing.');
      return;
    }
    
    onNext();
  };

  // Prevent default behavior for touch events to prevent scrolling while signing
  const preventDefaultTouch = (e) => {
    e.preventDefault();
  };
  
  return (
    <div className="digital-signature-container">
      <h2>Digital Signature & Clinician Information</h2>
      <p className="signature-instruction">
        Please sign below to certify that this clinical note is accurate and complete.
      </p>
      
      <div className="clinician-info-container">
        <h3>Clinician Information (Optional)</h3>
        <div className="form-group">
          <label htmlFor="clinicianName">Name</label>
          <input
            type="text"
            id="clinicianName"
            name="name"
            value={clinicianInfo?.name || ''}
            onChange={handleClinicianInfoChange}
            placeholder="John Smith"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="clinicianCredentials">Credentials</label>
          <input
            type="text"
            id="clinicianCredentials"
            name="credentials"
            value={clinicianInfo?.credentials || ''}
            onChange={handleClinicianInfoChange}
            placeholder="MD, LCSW, PhD, etc."
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="clinicianTitle">Title</label>
          <input
            type="text"
            id="clinicianTitle"
            name="title"
            value={clinicianInfo?.title || ''}
            onChange={handleClinicianInfoChange}
            placeholder="Licensed Clinical Social Worker"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="clinicianNpi">NPI Number</label>
          <input
            type="text"
            id="clinicianNpi"
            name="npi"
            value={clinicianInfo?.npi || ''}
            onChange={handleClinicianInfoChange}
            placeholder="1234567890"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="clinicianAdditionalInfo">Additional Information</label>
          <input
            type="text"
            id="clinicianAdditionalInfo"
            name="additionalInfo"
            value={clinicianInfo?.additionalInfo || ''}
            onChange={handleClinicianInfoChange}
            placeholder="Practice name, phone number, etc."
          />
        </div>
      </div>

      <h3 className="signature-heading">Signature</h3>
      <div 
        className="signature-pad-container"
        onTouchStart={preventDefaultTouch}
        onTouchMove={preventDefaultTouch}
        onTouchEnd={preventDefaultTouch}
      >
        <canvas
          ref={canvasRef}
          className="signature-pad"
          onMouseDown={handleStartDrawing}
          onMouseMove={handleDraw}
          onMouseUp={handleStopDrawing}
          onMouseLeave={handleStopDrawing}
          onTouchStart={handleStartDrawing}
          onTouchMove={handleDraw}
          onTouchEnd={handleStopDrawing}
        />
        <div className="signature-line"></div>
        <p className="signature-label">Electronic Signature</p>
      </div>
      
      <div className="signature-actions">
        <button 
          type="button" 
          className="clear-button" 
          onClick={handleClear}
        >
          Clear Signature
        </button>
      </div>
      
      <div className="certification-text">
        <p>
          By signing above, I certify that I am the therapist who provided the service 
          described in this note, and that the information contained herein is accurate 
          and complete to the best of my knowledge.
        </p>
      </div>
      
      <div className="button-group">
        <button type="button" className="secondary-button" onClick={onBack}>
          Back
        </button>
        <button 
          type="button" 
          className="primary-button" 
          onClick={handleContinue}
          disabled={!hasSignature}
        >
          Continue to Preview
        </button>
      </div>
    </div>
  );
};

export default DigitalSignature;