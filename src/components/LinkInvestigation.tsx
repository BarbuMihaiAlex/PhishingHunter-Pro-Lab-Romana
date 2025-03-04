import React, { useState } from 'react';
import { Link, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface LinkInvestigationProps {
  onComplete: () => void;
}

const LinkInvestigation: React.FC<LinkInvestigationProps> = ({ onComplete }) => {
  const [identifiedRisks, setIdentifiedRisks] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [urlCheckComplete, setUrlCheckComplete] = useState<boolean>(false);
  const [urlReputation, setUrlReputation] = useState<'safe' | 'warning' | 'danger' | null>(null);
  
  const requiredRisks = ['domain', 'https', 'redirects'];
  
  const handleRiskClick = (risk: string) => {
    if (!identifiedRisks.includes(risk)) {
      setIdentifiedRisks([...identifiedRisks, risk]);
    }
  };

  const allRisksFound = requiredRisks.every(risk => 
    identifiedRisks.includes(risk)
  );

  const checkURL = () => {
    setUrlCheckComplete(false);
    setUrlReputation(null);
    
    // Simulate URL checking with a timeout
    setTimeout(() => {
      setUrlCheckComplete(true);
      setUrlReputation('danger'); // Simulate a dangerous URL
      handleRiskClick('domain');
      handleRiskClick('https');
      handleRiskClick('redirects');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-cyan-400">Etapa 3: Investigarea Linkului Suspect</h2>
      
      <div className="mb-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <p className="text-gray-300">
          <Info className="inline mr-2 text-cyan-400" size={20} />
          Investighează linkul suspect folosind instrumentele de analiză. Identifică toți cei 3 indicatori de risc pentru a continua.
        </p>
      </div>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6 border border-gray-700">
        {/* URL info header */}
        <div className="bg-gray-700 p-4 border-b border-gray-600 flex items-center">
          <Link className="text-blue-500 mr-3" size={24} />
          <div>
            <h3 className="font-medium text-white">
              http://paypal-secure-account.phishingdomain.com/login.php
            </h3>
            <p className="text-sm text-gray-300">
              Verifică reputația URL-ului și analizează comportamentul acestuia.
            </p>
          </div>
        </div>
        
        {/* Analysis tabs */}
        <div className="bg-gray-700 border-b border-gray-600">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'overview' 
                  ? 'bg-gray-800 text-cyan-400 border-t-2 border-cyan-400' 
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
            >
              Prezentare Generală
            </button>
            <button 
              onClick={() => setActiveTab('reputation')}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'reputation' 
                  ? 'bg-gray-800 text-cyan-400 border-t-2 border-cyan-400' 
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
            >
              Reputație URL
            </button>
            <button 
              onClick={() => setActiveTab('analysis')}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'analysis' 
                  ? 'bg-gray-800 text-cyan-400 border-t-2 border-cyan-400' 
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
            >
              Analiză Comportamentală
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="animate-fadeIn">
              <div className="flex items-start mb-6">
                <Link className="text-cyan-500 mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Analiza URL</h3>
                  <p className="mb-4">Acest URL pretinde că este o pagină de autentificare securizată PayPal, dar are mai multe semne de alarmă.</p>
                  
                  <div 
                    className="bg-gray-700 p-4 rounded-lg mb-4 cursor-pointer hover:bg-gray-600"
                    onClick={() => handleRiskClick('domain')}
                  >
                    <h4 className="font-bold text-cyan-300 mb-2">Analiza Domeniului:</h4>
                    <p className="mb-2">Domeniu: <span className="font-mono">paypal-secure-account.phishingdomain.com</span></p>
                    <p>Acest domeniu nu este asociat cu PayPal. Utilizarea cuvântului "paypal" este o încercare de a păcăli utilizatorii să creadă că este legitim.</p>
                    
                    {identifiedRisks.includes('domain') && (
                      <div className="mt-3 bg-green-900 bg-opacity-30 p-3 rounded-lg border border-green-700">
                        <p className="flex items-center text-green-400">
                          <CheckCircle className="mr-2" size={16} />
                          <span>Ai identificat un domeniu malițios! Domeniile de phishing imită adesea mărci legitime pentru a înșela utilizatorii.</span>
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-bold text-cyan-300 mb-2">Evaluarea Riscului:</h4>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">Nivel de Amenințare:</span>
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">Critic</span>
                    </div>
                    <p className="mt-2">Acest URL prezintă un risc ridicat de phishing și ar trebui evitat. Introducerea credențialelor pe această pagină ar putea duce la furtul de identitate și pierderi financiare.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reputation' && (
            <div className="animate-fadeIn">
              <div className="flex items-start mb-6">
                <Link className="text-cyan-500 mr-3 mt-1 flex-shrink-0" size={24} />
                <div className="w-full">
                  <h3 className="text-xl font-bold mb-2 text-white">Verificare Reputație URL</h3>
                  <p className="mb-4">Verifică reputația URL-ului folosind un serviciu de informații despre amenințări.</p>
                  
                  {!urlCheckComplete ? (
                    <button 
                      onClick={checkURL}
                      className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg mb-4"
                    >
                      Verifică Reputația URL
                    </button>
                  ) : (
                    <div>
                      {urlReputation === 'safe' && (
                        <div className="bg-green-900 bg-opacity-30 p-3 rounded-lg border border-green-700">
                          <p className="flex items-center text-green-400">
                            <CheckCircle className="mr-2" size={16} />
                            <span>URL-ul este considerat sigur.</span>
                          </p>
                        </div>
                      )}
                      {urlReputation === 'warning' && (
                        <div className="bg-yellow-900 bg-opacity-30 p-3 rounded-lg border border-yellow-700">
                          <p className="flex items-center text-yellow-400">
                            <AlertTriangle className="mr-2" size={16} />
                            <span>URL-ul este potențial riscant.</span>
                          </p>
                        </div>
                      )}
                      {urlReputation === 'danger' && (
                        <div 
                          className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600"
                          onClick={() => handleRiskClick('https')}
                        >
                          <h4 className="font-bold text-red-400 mb-2 flex items-center">
                            <AlertTriangle className="mr-2" size={18} />
                            URL-ul este periculos!
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li><span className="font-bold">Lista Neagră:</span> Identificat ca phishing</li>
                            <li><span className="font-bold">Vârstă Domeniu:</span> Nou (Creat în urmă cu 2 săptămâni)</li>
                            <li><span className="font-bold">Certificat SSL:</span> Inexistent</li>
                          </ul>
                          
                          {identifiedRisks.includes('https') && (
                            <div className="mt-3 bg-green-900 bg-opacity-30 p-3 rounded-lg border border-green-700">
                              <p className="flex items-center text-green-400">
                                <CheckCircle className="mr-2" size={16} />
                                <span>Ai identificat lipsa HTTPS! Site-urile legitime care solicită informații sensibile folosesc întotdeauna HTTPS.</span>
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'analysis' && (
            <div className="animate-fadeIn">
              <div className="flex items-start mb-6">
                <Link className="text-cyan-500 mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Analiza Comportamentală</h3>
                  <p className="mb-4">Analizează comportamentul URL-ului pentru a detecta activități suspecte.</p>
                  
                  <div 
                    className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600"
                    onClick={() => handleRiskClick('redirects')}
                  >
                    <h4 className="font-bold text-cyan-300 mb-2">Comportament URL:</h4>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li><span className="font-bold">Redirecționări:</span> 3</li>
                      <li><span className="font-bold">Destinație Finală:</span> Pagina de autentificare falsă PayPal</li>
                      <li><span className="font-bold">Conținut:</span> Solicită credențiale de autentificare</li>
                    </ul>
                    <p>Acest URL redirecționează de mai multe ori înainte de a ajunge la o pagină de autentificare falsă PayPal. Acest comportament este tipic pentru atacurile de phishing.</p>
                    
                    {identifiedRisks.includes('redirects') && (
                      <div className="mt-3 bg-green-900 bg-opacity-30 p-3 rounded-lg border border-green-700">
                        <p className="flex items-center text-green-400">
                          <CheckCircle className="mr-2" size={16} />
                          <span>Ai identificat redirecționări suspecte! Atacatorii de phishing folosesc adesea redirecționări pentru a ascunde destinația finală a unui link.</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <span className="text-gray-400 mr-2">Identificate:</span>
          <span className="font-bold text-cyan-400">{identifiedRisks.length}/3</span>
        </div>
        
        <button
          onClick={onComplete}
          disabled={!allRisksFound}
          className={`px-6 py-3 font-bold rounded-lg transition-colors ${
            allRisksFound 
              ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          {allRisksFound ? 'Continuă la Analiza Atașamentului' : 'Găsește Toți Indicatorii'}
        </button>
      </div>
    </div>
  );
};

export default LinkInvestigation;
