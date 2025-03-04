import React, { useState } from 'react';
import { Shield, Mail, FileWarning, Link, Award, ArrowRight, Home } from 'lucide-react';
import Introduction from './components/Introduction';
import EmailInspection from './components/EmailInspection';
import HeaderAnalysis from './components/HeaderAnalysis';
import LinkInvestigation from './components/LinkInvestigation';
import AttachmentAnalysis from './components/AttachmentAnalysis';
import Completion from './components/Completion';
import Navbar from './components/Navbar';

function App() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<boolean[]>([false, false, false, false, false, false]);

  const phases = [
    { id: 0, name: "Introducere", icon: <Home size={24} /> },
    { id: 1, name: "Inspecția E-mailului", icon: <Mail size={24} /> },
    { id: 2, name: "Analiza Antetului", icon: <Shield size={24} /> },
    { id: 3, name: "Investigarea Linkului", icon: <Link size={24} /> },
    { id: 4, name: "Analiza Atașamentului", icon: <FileWarning size={24} /> },
    { id: 5, name: "Finalizare", icon: <Award size={24} /> }
  ];

  const completePhase = (phaseId: number) => {
    const newCompletedPhases = [...completedPhases];
    newCompletedPhases[phaseId] = true;
    setCompletedPhases(newCompletedPhases);
    
    // Calculate progress percentage
    const completedCount = newCompletedPhases.filter(phase => phase).length;
    setProgress((completedCount / (phases.length - 1)) * 100); // Exclude completion phase from calculation
    
    // Move to next phase
    setCurrentPhase(phaseId + 1);
  };

  const renderPhaseContent = () => {
    switch (currentPhase) {
      case 0:
        return <Introduction onComplete={() => completePhase(0)} />;
      case 1:
        return <EmailInspection onComplete={() => completePhase(1)} />;
      case 2:
        return <HeaderAnalysis onComplete={() => completePhase(2)} />;
      case 3:
        return <LinkInvestigation onComplete={() => completePhase(3)} />;
      case 4:
        return <AttachmentAnalysis onComplete={() => completePhase(4)} />;
      case 5:
        return <Completion onRestart={() => {
          setCurrentPhase(0);
          setCompletedPhases([false, false, false, false, false, false]);
          setProgress(0);
        }} />;
      default:
        return <Introduction onComplete={() => completePhase(0)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Navbar />
      
      {/* Progress bar */}
      <div className="w-full bg-gray-800 h-2">
        <div 
          className="bg-cyan-500 h-2 transition-all duration-500 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1">
        {/* Side navigation */}
        <div className="w-64 bg-gray-800 p-4 hidden md:block">
          <h2 className="text-xl font-bold mb-6 text-cyan-400">Etapele Instruirii</h2>
          <ul className="space-y-2">
            {phases.map((phase) => (
              <li key={phase.id}>
                <button
                  onClick={() => {
                    // Only allow navigation to completed phases or the current phase
                    if (completedPhases[phase.id] || phase.id === currentPhase) {
                      setCurrentPhase(phase.id);
                    }
                  }}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    currentPhase === phase.id
                      ? 'bg-cyan-700 text-white'
                      : completedPhases[phase.id]
                      ? 'bg-gray-700 text-cyan-400 hover:bg-gray-600'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className="mr-3">{phase.icon}</span>
                  <span>{phase.name}</span>
                  {completedPhases[phase.id] && (
                    <span className="ml-auto text-green-400">✓</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Phase content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {renderPhaseContent()}
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden bg-gray-800 p-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPhase(Math.max(0, currentPhase - 1))}
          disabled={currentPhase === 0}
          className={`p-2 rounded ${
            currentPhase === 0 ? 'text-gray-500' : 'text-cyan-400'
          }`}
        >
          Anterior
        </button>
        <span className="text-sm">
          Etapa {currentPhase + 1} din {phases.length}
        </span>
        <button
          onClick={() => {
            if (completedPhases[currentPhase]) {
              setCurrentPhase(Math.min(phases.length - 1, currentPhase + 1));
            }
          }}
          disabled={!completedPhases[currentPhase]}
          className={`p-2 rounded flex items-center ${
            !completedPhases[currentPhase] ? 'text-gray-500' : 'text-cyan-400'
          }`}
        >
          Următor <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
}

export default App;
