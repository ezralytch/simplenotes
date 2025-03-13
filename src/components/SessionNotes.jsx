import React, { useState } from 'react';
import { useNote } from '../context/NoteContext.js';
import './SessionNotes.css';

const SessionNotes = ({ onNext, onBack }) => {
  const { sessionNotes, updateSessionNotes } = useNote();
  
  // Local state for template selection
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  
  // Define note templates
  const templates = {
    default: '',
    initialAssessment: `Client Background:\nPresenting Issues:\nMental Status:\nTreatment Goals:`,
    followUp: `Progress since last session:\nCurrent challenges:\nIntervention strategies:\nPlan for next session:`,
    crisisIntervention: `Nature of crisis:\nRisk assessment:\nInterventions applied:\nSafety plan:`,
    discharge: `Treatment summary:\nGoals achieved:\nRecommendations:\nFollow-up plan:`
  };
  
  // Handle template selection
  const handleTemplateChange = (e) => {
    const template = e.target.value;
    setSelectedTemplate(template);
    
    // Only populate with template if the current notes are empty
    // or if it's already a template (to avoid overwriting user content)
    if (!sessionNotes.trim() || Object.values(templates).includes(sessionNotes)) {
      updateSessionNotes(templates[template]);
    }
  };
  
  // Handle notes changes
  const handleNotesChange = (e) => {
    updateSessionNotes(e.target.value);
  };
  
  // Form validation
  const validateForm = () => {
    return sessionNotes.trim().length > 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext();
    } else {
      alert('Please enter session notes before continuing.');
    }
  };
  
  return (
    <div className="session-notes-container">
      <h2>Session Notes</h2>
      <p className="notes-instruction">
        Enter your shorthand session notes below. The AI will transform these into a professional DAP format note.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group template-selector">
          <label htmlFor="template">Select Template (Optional)</label>
          <select
            id="template"
            value={selectedTemplate}
            onChange={handleTemplateChange}
          >
            <option value="default">No Template</option>
            <option value="initialAssessment">Initial Assessment</option>
            <option value="followUp">Follow-up Session</option>
            <option value="crisisIntervention">Crisis Intervention</option>
            <option value="discharge">Discharge Summary</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="sessionNotes">Session Notes</label>
          <textarea
            id="sessionNotes"
            value={sessionNotes}
            onChange={handleNotesChange}
            rows={15}
            placeholder="Enter your session notes here..."
          />
          
          <div className="notes-helper">
            <h4>DAP Format Reminder:</h4>
            <ul>
              <li><strong>Data:</strong> Objective observations, client statements, presenting problems</li>
              <li><strong>Assessment:</strong> Therapist's analysis, impressions, interpretation of the data</li>
              <li><strong>Plan:</strong> Treatment plans, interventions, homework, next steps</li>
            </ul>
          </div>
        </div>
        
        <div className="button-group">
          <button type="button" className="secondary-button" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="primary-button">
            Generate Clinical Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionNotes;