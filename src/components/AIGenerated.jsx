import React, { useState, useEffect } from 'react';
import { useNote } from '../context/NoteContext';
import { generateDapNote } from '../services/deepseekService';
import { DEEPSEEK_API_KEY } from '../config.js';
import './AIGenerated.css';

const AIGenerated = ({ onNext, onBack }) => {
  const { 
    clientInfo, 
    sessionNotes, 
    aiGeneratedContent, 
    updateAiGeneratedContent,
    isLoading,
    setIsLoading,
    error,
    setError
  } = useNote();

  const isMockData = !DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === '';
  
  // Local state for editable content
  const [editableContent, setEditableContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Effect to generate the note when the component mounts
  useEffect(() => {
    const generateNote = async () => {
      // If we already have AI content and are not editing, use it
      if (aiGeneratedContent && !isEditing) {
        setEditableContent(aiGeneratedContent);
        return;
      }
      
      // Otherwise, generate new content
      setIsLoading(true);
      setError(null);
      
      try {
        // Call the API service to generate the note (static approach)
        const generatedNote = await generateDapNote(
          clientInfo.name,
          clientInfo.pronouns,
          sessionNotes
        );
        
        // Update state with generated content
        updateAiGeneratedContent(generatedNote);
        setEditableContent(generatedNote);
      } catch (err) {
        setError('Failed to generate note. Please try again or proceed with manual editing.');
        console.error('Error generating note:', err);
        
        // Set some default content for editing in case of failure
        const defaultContent = 
          `Data:\n[AI generation failed. Please edit this section manually.]\n\n` +
          `Assessment:\n[AI generation failed. Please edit this section manually.]\n\n` +
          `Plan:\n[AI generation failed. Please edit this section manually.]`;
        
        setEditableContent(defaultContent);
      } finally {
        setIsLoading(false);
      }
    };
    
    generateNote();
  }, [
    clientInfo, 
    sessionNotes, 
    aiGeneratedContent, 
    updateAiGeneratedContent, 
    setIsLoading, 
    setError,
    isEditing
  ]);
  
  // Handle content editing
  const handleContentChange = (e) => {
    setEditableContent(e.target.value);
  };
  
  // Save edited content
  const handleSaveEdit = () => {
    updateAiGeneratedContent(editableContent);
    setIsEditing(false);
  };
  
  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  
  // Regenerate the note
  const handleRegenerate = async () => {
    setIsEditing(false);
    // Clear the existing content to force regeneration
    updateAiGeneratedContent('');
    // The useEffect will trigger regeneration
  };
  
  // Handle continuing to the next step
  const handleContinue = () => {
    // Save any pending edits
    if (isEditing) {
      handleSaveEdit();
    }
    
    onNext();
  };
  
  return (
    <div className="ai-generated-container">
      <h2>AI Generated Clinical Note</h2>
      <p className="generation-instruction">
        Review the AI-generated note below. You can edit it as needed before proceeding.
      </p>
      
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Generating clinical note...</p>
        </div>
      ) : (
        <>
          {error && (
            <div className="error-banner">
              <p>{error}</p>
              {isMockData && (
                <p><strong>Note:</strong> You're currently using mock data. To get real AI-generated notes, add your API key to the .env file.</p>
              )}
            </div>
          )}
          
          <div className="note-actions">
            <button 
              className={`edit-button ${isEditing ? 'active' : ''}`} 
              onClick={toggleEditMode}
            >
              {isEditing ? 'Cancel Edit' : 'Edit Note'}
            </button>
            
            {isEditing && (
              <button 
                className="save-button" 
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            )}
            
            <button 
              className="regenerate-button" 
              onClick={handleRegenerate}
            >
              Regenerate Note
            </button>
          </div>
          
          <div className="note-content-container">
            {isEditing ? (
              <textarea
                className="note-editor"
                value={editableContent}
                onChange={handleContentChange}
                rows={20}
              />
            ) : (
              <div className="note-preview">
                {/* Render content as HTML */}
                <div dangerouslySetInnerHTML={{ __html: editableContent.replace(/\n/g, '<br />') }} />
              </div>
            )}
          </div>
          
          <div className="button-group">
            <button type="button" className="secondary-button" onClick={onBack}>
              Back to Session Notes
            </button>
            <button type="button" className="primary-button" onClick={handleContinue}>
              Continue to Signature
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AIGenerated;