import React, { useState } from 'react';
import './App.css';
import ClientInfo from './components/ClientInfo.jsx';
import SessionNotes from './components/SessionNotes.jsx';
import AIGenerated from './components/AIGenerated.jsx';
import DigitalSignature from './components/DigitalSignature.jsx';
import NotePreview from './components/NotePreview.jsx';
import { NoteProvider } from './context/NoteContext.js';

function App() {
  // Track the current step in the workflow
  const [currentStep, setCurrentStep] = useState(1);

  // Function to navigate between steps
  const navigateTo = (step) => {
    setCurrentStep(step);
  };

  // Render the appropriate component based on current step
  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <ClientInfo onNext={() => navigateTo(2)} />;
      case 2:
        return <SessionNotes onNext={() => navigateTo(3)} onBack={() => navigateTo(1)} />;
      case 3:
        return <AIGenerated onNext={() => navigateTo(4)} onBack={() => navigateTo(2)} />;
      case 4:
        return <DigitalSignature onNext={() => navigateTo(5)} onBack={() => navigateTo(3)} />;
      case 5:
        return <NotePreview onBack={() => navigateTo(4)} />;
      default:
        return <ClientInfo onNext={() => navigateTo(2)} />;
    }
  };

  return (
    <NoteProvider>
      <div className="App">
        <header className="App-header">
          <h1 className='app-title'>SimpleNotes</h1>
          <div className="progress-tracker">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>Client Info</div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>Session Notes</div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>AI Generated</div>
            <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>Signature</div>
            <div className={`step ${currentStep >= 5 ? 'active' : ''}`}>Preview & Download</div>
          </div>
        </header>
        <main className="App-main">
          {renderStep()}
        </main>
        <footer className="App-footer">
          <p>No client data is stored. All information is processed locally.</p>
        </footer>
      </div>
    </NoteProvider>
  );
}

export default App;
