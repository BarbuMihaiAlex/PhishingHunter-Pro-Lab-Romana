import React, { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface EmailInspectionProps {
  onComplete: () => void;
}

const EmailInspection: React.FC<EmailInspectionProps> = ({ onComplete }) => {
  const [identifiedIndicators, setIdentifiedIndicators] = useState<string[]>([]);
  const [showInfoPanel, setShowInfoPanel] = useState<string | null>(null);
  
  const requiredIndicators = ['sender', 'link', 'attachment'];
  
  const handleIndicatorClick = (indicator: string) => {
    if (!identifiedIndicators.includes(indicator)) {
      setIdentifiedIndicators([...identifiedIndicators, indicator]);
    }
    setShowInfoPanel(indicator);
  };

  const allIndicatorsFound = requiredIndicators.every(indicator => 
    identifiedIndicators.includes(indicator)
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-cyan-400">Etapa 1: Inspectarea E-mailului de Phishing</h2>
      
      <div className="mb-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <p className="text-gray-300">
          <Info className="inline mr-2 text-cyan-400" size={20} />
          Dă click pe elementele suspecte din e-mail pentru a identifica indicatorii de phishing. Trebuie să găsești toți cei 3 indicatori pentru a continua.
        </p>
      </div>
      
      <div className="bg-white text-gray-800 rounded-lg overflow-hidden shadow-lg mb-6">
        {/* Email header */}
        <div className="bg-gray-200 p-4 border-b border-gray-300">
          <div className="flex justify-between items-center">
            <div>
              <div 
                className="font-medium cursor-pointer hover:text-cyan-700 flex items-center"
                onClick={() => handleIndicatorClick('sender')}
              >
                De la: Securitate PayPal <span className="text-gray-500">&lt;security@paypa1-support.com&gt;</span>
                {identifiedIndicators.includes('sender') && (
                  <CheckCircle className="ml-2 text-green-600" size={16} />
                )}
              </div>
              <div>Către: client.valoros@exemplu.com</div>
            </div>
            <div className="text-right">
              <div>Data: {new Date().toLocaleDateString()}</div>
              <div className="font-medium">Subiect: URGENT: Contul dvs. a fost suspendat!</div>
            </div>
          </div>
        </div>
        
        {/* Email body */}
        <div className="p-6">
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Logo PayPal" 
              className="h-12 mb-4"
            />
            <p className="font-bold text-xl mb-2">Stimate Client,</p>
            <p className="mb-4">Am detectat activitate suspectă în contul dvs. PayPal. Pentru securitatea dvs., am suspendat temporar contul până când vă verificați informațiile.</p>
            <p className="mb-4">Vă rugăm să luați măsuri imediate pentru a restabili accesul la cont.</p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="font-bold mb-2">Acțiune Necesară:</p>
            <p className="mb-2">Faceți clic pe butonul de mai jos pentru a vă verifica informațiile contului și a restabili accesul:</p>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded cursor-pointer"
              onClick={() => handleIndicatorClick('link')}
            >
              Resetare Parolă
              {identifiedIndicators.includes('link') && (
                <CheckCircle className="ml-2 inline text-green-300" size={16} />
              )}
            </button>
          </div>
          
          <p className="mb-4">Pentru referință, am atașat o copie a ghidului nostru de securitate.</p>
          
          <div 
            className="flex items-center p-3 bg-gray-100 rounded-lg w-max cursor-pointer"
            onClick={() => handleIndicatorClick('attachment')}
          >
            <Mail className="mr-2 text-gray-600" size={20} />
            <span>Factura_5678.pdf.exe</span>
            {identifiedIndicators.includes('attachment') && (
              <CheckCircle className="ml-2 text-green-600" size={16} />
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p>Cu stimă,</p>
            <p className="font-bold">Echipa de Securitate PayPal</p>
          </div>
        </div>
      </div>
      
      {/* Information panel */}
      {showInfoPanel && (
        <div className="bg-gray-800 p-6 rounded-lg border border-cyan-700 mb-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-cyan-400">
              {showInfoPanel === 'sender' && 'Adresă de Expeditor Suspectă'}
              {showInfoPanel === 'link' && 'Link Înșelător'}
              {showInfoPanel === 'attachment' && 'Atașament Malițios'}
            </h3>
            <button 
              onClick={() => setShowInfoPanel(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          {showInfoPanel === 'sender' && (
            <div>
              <div className="flex items-start mb-4">
                <AlertTriangle className="text-yellow-500 mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="mb-2">Adresa de e-mail a expeditorului <span className="bg-gray-700 px-2 py-1 rounded">security@paypa1-support.com</span> este suspectă.</p>
                  <p>Observați numărul "1" în loc de litera "l" în "paypa1" - aceasta este o tactică comună folosită de atacatorii de phishing pentru a crea domenii care par legitime la prima vedere.</p>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg mt-4">
                <p className="font-semibold text-cyan-300 mb-2">Cum să verificați:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Verificați cu atenție domeniul pentru greșeli de ortografie sau substituiri de caractere</li>
                  <li>E-mailurile legitime PayPal provin de la @paypal.com, nu de la domenii terțe</li>
                  <li>Treceți cursorul peste numele expeditorului pentru a vedea adresa de e-mail reală</li>
                </ul>
              </div>
            </div>
          )}
          
          {showInfoPanel === 'link' && (
            <div>
              <div className="flex items-start mb-4">
                <AlertTriangle className="text-yellow-500 mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="mb-2">Butonul "Resetare Parolă" duce la un URL malițios:</p>
                  <p className="bg-gray-700 px-2 py-1 rounded mb-2 text-red-400">http://paypal-secure-account.phishingdomain.com/login.php</p>
                  <p>Acest URL nu duce la site-ul oficial PayPal. În schimb, duce la un site de phishing conceput pentru a vă fura credențialele.</p>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg mt-4">
                <p className="font-semibold text-cyan-300 mb-2">Cum să verificați linkurile:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Treceți cursorul peste linkuri înainte de a da click pentru a vedea URL-ul real de destinație</li>
                  <li>Verificați dacă domeniul este cel oficial (paypal.com)</li>
                  <li>Fiți suspicioși față de URL-uri lungi, complexe cu caractere aleatorii</li>
                  <li>Căutați HTTPS și un certificat valid pe site-urile financiare</li>
                </ul>
              </div>
            </div>
          )}
          
          {showInfoPanel === 'attachment' && (
            <div>
              <div className="flex items-start mb-4">
                <AlertTriangle className="text-yellow-500 mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="mb-2">Atașamentul <span className="bg-gray-700 px-2 py-1 rounded">Factura_5678.pdf.exe</span> este foarte suspect.</p>
                  <p>Observați extensia dublă: <span className="font-bold">.pdf.exe</span>. Aceasta este o tactică comună pentru a deghiza fișierele executabile ca documente inofensive. Fișierul este de fapt un fișier .exe (executabil), nu un document PDF.</p>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg mt-4">
                <p className="font-semibold text-cyan-300 mb-2">Semnale de alarmă pentru atașamente:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Extensii duble de fișiere (ex., .pdf.exe)</li>
                  <li>Tipuri de fișiere executabile (.exe, .bat, .cmd, .msi, .js)</li>
                  <li>Atașamente neașteptate care nu se potrivesc cu contextul e-mailului</li>
                  <li>Fișiere comprimate (.zip, .rar) care pot ascunde conținut malițios</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div>
          <span className="text-gray-400 mr-2">Identificați:</span>
          <span className="font-bold text-cyan-400">{identifiedIndicators.length}/3</span>
        </div>
        
        <button
          onClick={onComplete}
          disabled={!allIndicatorsFound}
          className={`px-6 py-3 font-bold rounded-lg transition-colors ${
            allIndicatorsFound 
              ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          {allIndicatorsFound ? 'Continuă la Analiza Antetului' : 'Găsește Toți Indicatorii'}
        </button>
      </div>
    </div>
  );
};

export default EmailInspection;
