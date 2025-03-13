import React, { createContext, useState, useContext } from 'react';

// Create context
const NoteContext = createContext();

// Custom hook to use the note context
export const useNote = () => useContext(NoteContext);

// Provider component
export const NoteProvider = ({ children }) => {
  // State for client info
  const [clientInfo, setClientInfo] = useState({
    name: '',
    pronouns: '',
    dateOfService: '',
    timeOfService: '',
    billingCode: '',
    insuranceId: ''
  });
  
  // State for session notes
  const [sessionNotes, setSessionNotes] = useState('');
  
  // State for AI generated content
  const [aiGeneratedContent, setAiGeneratedContent] = useState('');
  
  // State for digital signature
  const [signature, setSignature] = useState(null);
  
  // State for clinician info
  const [clinicianInfo, setClinicianInfo] = useState({
    name: '',
    credentials: '',
    title: '',
    npi: '',
    additionalInfo: ''
  });
  
  // State for completed note
  const [completedNote, setCompletedNote] = useState(null);
  
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  
  // State for errors
  const [error, setError] = useState(null);

  // Function to update client info
  const updateClientInfo = (info) => {
    setClientInfo(prevInfo => ({ ...prevInfo, ...info }));
  };
  
  // Function to update session notes
  const updateSessionNotes = (notes) => {
    setSessionNotes(notes);
  };
  
  // Function to update AI generated content
  const updateAiGeneratedContent = (content) => {
    setAiGeneratedContent(content);
  };
  
  // Function to update digital signature
  const updateSignature = (sig) => {
    setSignature(sig);
  };
  
  // Function to update clinician info
  const updateClinicianInfo = (info) => {
    setClinicianInfo(prevInfo => ({ ...prevInfo, ...info }));
  };
  
  // Function to compile the completed note
  const compileCompletedNote = () => {
    // Create the completed note structure
    const note = {
      clientInfo,
      sessionNotes,
      aiGeneratedContent,
      signature,
      clinicianInfo,
      dateCreated: new Date().toISOString(),
    };
    
    setCompletedNote(note);
    return note;
  };
  // Reset all state (clear form)
  const resetForm = () => {
    setClientInfo({
      name: '',
      pronouns: '',
      dateOfService: '',
      timeOfService: '',
      billingCode: '',
      insuranceId: ''
    });
    setSessionNotes('');
    setAiGeneratedContent('');
    setSignature(null);
    setClinicianInfo({
      name: '',
      credentials: '',
      title: '',
      npi: '',
      additionalInfo: ''
    });
    setCompletedNote(null);
    setError(null);
  };

  // Define the value to be provided by the context
  const value = {
    clientInfo,
    sessionNotes,
    aiGeneratedContent,
    signature,
    clinicianInfo,
    completedNote,
    isLoading,
    error,
    updateClientInfo,
    updateSessionNotes,
    updateAiGeneratedContent,
    updateSignature,
    updateClinicianInfo,
    compileCompletedNote,
    setIsLoading,
    setError,
    resetForm
  };

return React.createElement(
  NoteContext.Provider,
  { value: value },
  children
);
};