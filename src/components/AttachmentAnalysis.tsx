import React, { useState } from 'react';
import { FileWarning, AlertTriangle, CheckCircle, Info, FileText, Scan, User } from 'lucide-react';

interface AttachmentAnalysisProps {
  onComplete: () => void;
}

const AttachmentAnalysis: React.FC<AttachmentAnalysisProps> = ({ onComplete }) => {
  const [identifiedFlags, setIdentifiedFlags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanComplete, setScanComplete] = useState<boolean>(false);
  
  const requiredFlags = ['extension', 'scan', 'metadata'];
  
  const handleFlagClick = (flag: string) => {
    if (!identifiedFlags.includes(flag)) {
      setIdentifiedFlags([...identifiedFlags, flag]);
    }
  };

  const allFlagsFound = requiredFlags.every(flag => 
    identifiedFlags.includes(flag)
  );

  const startScan = () => {
    setScanProgress(0);
    setScanComplete(false);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanComplete(true);
          handleFlagClick('scan');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-cyan-400">Etapa 4: Analizarea Atașamentului Suspect</h2>
      
      <div className="mb-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <p className="text-gray-300">
          <Info className="inline mr-2 text-cyan-400" size={20} />
          Examinează atașamentul suspect folosind instrumentele de analiză din sandbox. Identifică toți cei 3 indicatori de conținut malițios pentru a continua.
        </p>
      </div>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6 border border-gray-700">
        {/* File info header */}
        <div className="bg-gray-700 p-4 border-b border-gray-600 flex items-center">
          <FileWarning className="text-yellow-500 mr-3" size={24} />
          <div>
            <h3 className="font-medium text-white">Factura_5678.pdf.exe</h3>
            <p className="text-sm text-gray-300">Dimensiune: 2.4 MB | Tip: Aplicație</p>
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
              onClick={() => setActiveTab('scan')}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'scan' 
                  ? 'bg-gray-800 text-cyan-400 border-t-2 border-cyan-400' 
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
            >
              Scanare Virus
            </button>
            <button 
              onClick={() => setActiveTab('metadata')}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'metadata' 
                  ? 'bg-gray-800 text-cyan-400 border-t-2 border-cyan-400' 
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
            >
              Metadate
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="animate-fadeIn">
              <div className="flex items-start mb-6">
                <FileText className="text-cyan-500 mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Analiza Fișierului</h3>
                  <p className="mb-4">Acest fișier pare a fi deghizat ca un document PDF, dar este de fapt un fișier executabil.</p>
                  
                  <div 
                    className="bg-gray-700 p-4 rounded-lg mb-4 cursor-pointer hover:bg-gray-600"
                    onClick={() => handleFlagClick('extension')}
                  >
                    <h4 className="font-bold text-cyan-300 mb-2">Analiza Extensiei Fișierului:</h4>
                    <p className="mb-2">Nume fișier: <span className="font-mono">Factura_5678.pdf.exe</span></p>
                    <p className="mb-2">Afișat ca: <span className="font-mono">Factura_5678.pdf</span></p>
                    <p>Tip real: <span className="font-mono text-red-400">Executabil Windows (.exe)</span></p>
                    
                    {identifiedFlags.includes('extension') && (
                      <div className="mt-3 bg-green-900 bg-opacity-30 p-3 rounded-lg border border-green-700">
                        <p className="flex items-center text-green-400">
                          <CheckCircle className="mr-2" size={16} />
                          <span>Ai identificat trucul extensiei duble! Aceasta este o tehnică comună pentru a deghiza fișierele executabile ca documente inofensive.</span>
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
                    <p className="mt-2">Fișierele executabile trimise prin e-mail reprezintă un risc semnificativ de securitate, deoarece pot executa cod malițios când sunt deschise.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'scan' && (
            <div className="animate-fadeIn">
              <div className="flex items-start mb-6">
                <Scan className="text-cyan-500 mr-3 mt-1 flex-shrink-0" size={24} />
                <div className="w-full">
                  <h3 className="text-xl font-bold mb-2 text-white">Scanare Antivirus</h3>
                  <p className="mb-4">Rulează o scanare antivirus simulată pentru a verifica codul malițios din fișier.</p>
                  
                  {!scanComplete ? (
                    <div>
                      {scanProgress === 0 ? (
                        <button 
                          onClick={startScan}
                          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg mb-4"
                        >
                          Începe Scanarea
                        </button>
                      ) : (
                        <div className="mb-4">
                          <div className="flex justify-between mb-2">
                            <span>Scanare fișier...</span>
                            <span>{scanProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-cyan-600 h-2.5 rounded-full" 
                              style={{ width: `${scanProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div 
                      className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600"
                      onClick={() => handleFlagClick('scan')}
                    >
                      <h4 className="font-bold text-red-400 mb-2 flex items-center">
                        <AlertTriangle className="mr-2" size={18} />
                        Malware Detectat!
                      </h4>
                      <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li><span className="font-bold">Troian:</span> Win32.Fakeinvoice.Gen</li>
                        <li><span className="font-bold">Keylogger:</span> Credential.Stealer.B</li>
                        <li><span className="font-bold">Backdoor:</span> Remote.Access.Tool.45</li>
                      </ul>
                      
                      {identifiedFlags.includes('scan') && (
                        <div className="mt-3 bg-green-900 bg-opacity-30 p-3 rounded-lg border border-green-700">
                          <p className="flex items-center text-green-400">
                            <CheckCircle className="mr-2" size={16} />
                            <span>Ai identificat malware în atașament! Acest fișier conține multiple amenințări care ar putea compromite sistemul tău.</span>
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'metadata' && (
            <div className="animate-fadeIn">
              <div className="flex items-start mb-6">
                <User className="text-cyan-500 mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Metadatele Fișierului</h3>
                  <p className="mb-4">Examinează informațiile ascunse încorporate în fișier.</p>
                  
                  <div 
                    className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600"
                    onClick={() => handleFlagClick('metadata')}
                  >
                    <h4 className="font-bold text-cyan-300 mb-2">Metadate Extrase:</h4>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b border-gray-600">
                          <td className="py-2 font-bold">Nume Fișier:</td>
                          <td className="py-2">Factura_5678.pdf.exe</td>
                        </tr>
                        <tr className="border-b border-gray-600">
                          <td className="py-2 font-bold">Creat:</td>
                          <td className="py-2">2023-05-14 03:24:15</td>
                        </tr>
                        <tr className="border-b border-gray-600">
                          <td className="py-2 font-bold">Modificat:</td>
                          <td className="py-2">2023-05-14 03:45:22</td>
                        </tr>
                        <tr className="border-b border-gray-600">
                          <td className="py-2 font-bold">Autor:</td>
                          <td className="py-2 text-red-400">Hack3r.Cr3w@darkweb.ru</td>
                        </tr>
                        <tr className="border-b border-gray-600">
                          <td className="py-2 font-bold">Companie:</td>
                          <td className="py-2">Nespecificat</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-bold">Compilator:</td>
                          <td className="py-2">PyInstaller 3.6 (Windows 10)</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    {identifiedFlags.includes('metadata') && (
                      <div className="mt-3 bg-green-900 bg-opacity-30 p-3 rounded-lg border border-green-700">
                        <p className="flex items-center text-green-400">
                          <CheckCircle className="mr-2" size={16} />
                          <span>Ai identificat metadate suspecte! Adresa de email a autorului este în mod clar malițioasă, iar fișierul a fost compilat cu PyInstaller, un instrument adesea folosit pentru a împacheta malware Python.</span>
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
          <span className="font-bold text-cyan-400">{identifiedFlags.length}/3</span>
        </div>
        
        <button
          onClick={onComplete}
          disabled={!allFlagsFound}
          className={`px-6 py-3 font-bold rounded-lg transition-colors ${
            allFlagsFound 
              ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          {allFlagsFound ? 'Finalizează Investigația' : 'Găsește Toți Indicatorii'}
        </button>
      </div>
    </div>
  );
};

export default AttachmentAnalysis;
