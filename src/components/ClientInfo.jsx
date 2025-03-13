import React, { useState } from 'react';
import { useNote } from '../context/NoteContext.js';
import './ClientInfo.css';

const ClientInfo = ({ onNext }) => {
  const { clientInfo, updateClientInfo } = useNote();
  
  // Local state for form validation
  const [errors, setErrors] = useState({});
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateClientInfo({ [name]: value });
  };
  
  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!clientInfo.name.trim()) {
      newErrors.name = 'Client name is required';
    }
    
    if (!clientInfo.dateOfService.trim()) {
      newErrors.dateOfService = 'Date of service is required';
    }
    
    if (!clientInfo.timeOfService.trim()) {
      newErrors.timeOfService = 'Time of service is required';
    }
    
    if (!clientInfo.billingCode.trim()) {
      newErrors.billingCode = 'Billing code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext();
    }
  };
  
  return (
    <div className="client-info-container">
      <h2>Client Information</h2>
      <p className="privacy-note">
        <strong>Privacy Note:</strong> Only enter the minimum required information.
        No data is stored or transmitted beyond this session.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Client Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={clientInfo.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="pronouns">Pronouns (Optional)</label>
          <input
            type="text"
            id="pronouns"
            name="pronouns"
            value={clientInfo.pronouns}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateOfService">Date of Service</label>
            <input
              type="date"
              id="dateOfService"
              name="dateOfService"
              value={clientInfo.dateOfService}
              onChange={handleChange}
              className={errors.dateOfService ? 'error' : ''}
            />
            {errors.dateOfService && <span className="error-message">{errors.dateOfService}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="timeOfService">Time of Service</label>
            <input
              type="time"
              id="timeOfService"
              name="timeOfService"
              value={clientInfo.timeOfService}
              onChange={handleChange}
              className={errors.timeOfService ? 'error' : ''}
            />
            {errors.timeOfService && <span className="error-message">{errors.timeOfService}</span>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="billingCode">Medical Billing Code</label>
          <input
            type="text"
            id="billingCode"
            name="billingCode"
            value={clientInfo.billingCode}
            onChange={handleChange}
            className={errors.billingCode ? 'error' : ''}
          />
          {errors.billingCode && <span className="error-message">{errors.billingCode}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="insuranceId">Insurance ID (Optional)</label>
          <input
            type="text"
            id="insuranceId"
            name="insuranceId"
            value={clientInfo.insuranceId}
            onChange={handleChange}
          />
        </div>
        
        <div className="button-group2">
          <button type="submit" className="primary-button">Continue to Session Notes</button>
        </div>
      </form>
    </div>
  );
};

export default ClientInfo;