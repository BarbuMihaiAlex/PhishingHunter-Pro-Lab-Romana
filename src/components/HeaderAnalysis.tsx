import React, { useState } from 'react';
import { CheckCircle, Info } from 'lucide-react';

interface HeaderAnalysisProps {
  onComplete: () => void;
}

const HeaderAnalysis: React.FC<HeaderAnalysisProps> = ({ onComplete }) => {
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  
  const requiredElements = ['return-path', 'received-from', 'spf-fail'];
  
  const handleElementSelect = (element: string) => {
    if (!selectedElements.includes(element)) {
      setSelectedElements([...selectedElements, element]);
    }
    setShowExplanation(element);
  };

  const allElementsFound = requiredElements.every(element => 
    selectedElements.includes(element)
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-cyan-400">Etapa 2: Analizarea Antetelor E-mailului</h2>
      
      <div className="mb-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <p className="text-gray-300">
          <Info className="inline mr-2 text-cyan-400" size={20} />
          Antetele e-mailului conțin informații valoroase care pot ajuta la identificarea încercărilor de phishing. Dă click pe elementele suspecte din antet pentru a le analiza. Găsește toți cei 3 indicatori cheie pentru a continua.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 md:w-1/2 font-mono text-sm overflow-x-auto">
          <pre className="whitespace-pre-wrap">
            <code>
              <span className="text-gray-400">Delivered-To:</span> client.valoros@exemplu.com
              <br />
              <span 
                className={`cursor-pointer ${selectedElements.includes('return-path') ? 'bg-green-900 px-1 rounded' : 'hover:bg-gray-700'}`}
                onClick={() => handleElementSelect('return-path')}
              >
                <span className="text-gray-400">Return-Path:</span> &lt;security@mailservr192.phishingdomain.net&gt;
                {selectedElements.includes('return-path') && (
                  <CheckCircle className="inline ml-2 text-green-500" size={14} />
                )}
              </span>
              <br />
              <span className="text-gray-400">Message-ID:</span> &lt;CAE0jmZYLHW2Bz@mail.phishingdomain.net&gt;
              <br />
              <span className="text-gray-400">Date:</span> Lun, 15 Mai 2023 09:42:15 -0700
              <br />
              <span className="text-gray-400">From:</span> Securitate PayPal &lt;security@paypa1-support.com&gt;
              <br />
              <span className="text-gray-400">To:</span> client.valoros@exemplu.com
              <br />
              <span className="text-gray-400">Subject:</span> URGENT: Contul dvs. a fost suspendat!
              <br />
              <span 
                className={`cursor-pointer ${selectedElements.includes('received-from') ? 'bg-green-900 px-1 rounded' : 'hover:bg-gray-700'}`}
                onClick={() => handleElementSelect('received-from')}
              >
                <span className="text-gray-400">Received:</span> from unknown (HELO mailservr192.phishingdomain.net) (192.168.1.254) by mail.exemplu.com with SMTP; 15 Mai 2023 09:42:15 -0700
                {selectedElements.includes('received-from') && (
                  <CheckCircle className="inline ml-2 text-green-500" size={14} />
                )}
              </span>
              <br />
              <span className="text-gray-400">Content-Type:</span> multipart/mixed; boundary="b1_ZXhfaGVhZGVyX2V4YW1wbGU="
              <br />
              <span className="text-gray-400">MIME-Version:</span> 1.0
              <br />
              <span 
                className={`cursor-pointer ${selectedElements.includes('spf-fail') ? 'bg-green-900 px-1 rounded' : 'hover:bg-gray-700'}`}
                onClick={() => handleElementSelect('spf-fail')}
              >
                <span className="text-gray-400">Authentication-Results:</span> mx.exemplu.com; spf=fail (sender IP is 192.168.1.254) smtp.mailfrom=paypal.com; dkim=fail header.d=paypal.com; dmarc=fail action=quarantine header.from=paypal.com
                {selectedElements.includes('spf-fail') && (
                  <CheckCircle className="inline ml-2 text-green-500" size={14} />
                )}
              </span>
              <br />
              <span className="text-gray-400">X-Spam-Status:</span> High
              <br />
              <span className="text-gray-400">X-Mailer:</span> PHPMailer 6.0.2 (https://github.com/PHPMailer/PHPMailer)
            </code>
          </pre>
        </div>
        
        <div className="md:w-1/2">
          {showExplanation ? (
            <div className="bg-gray-800 p-4 rounded-lg border border-cyan-700 h-full animate-fadeIn">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">
                {showExplanation === 'return-path' && 'Nepotrivire în Return-Path'}
                {showExplanation === 'received-from' && 'Server de Origine Suspect'}
                {showExplanation === 'spf-fail' && 'Eșec de Autentificare'}
              </h3>
              
              {showExplanation === 'return-path' && (
                <div>
                  <p className="mb-4">Antetul <span className="font-mono bg-gray-700 px-2 py-1 rounded">Return-Path</span> arată unde vor fi trimise răspunsurile la e-mail.</p>
                  <p className="mb-4">În acest caz, deși e-mailul pretinde că este de la PayPal, calea de returnare indică <span className="font-mono bg-gray-700 px-2 py-1 rounded">mailservr192.phishingdomain.net</span>, care nu este un domeniu PayPal.</p>
                  <div className="bg-gray-700 p-4 rounded-lg mt-4">
                    <p className="font-semibold text-cyan-300 mb-2">De ce este suspect:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>E-mailurile legitime de la PayPal ar avea o cale de returnare în domeniul paypal.com</li>
                      <li>Nepotrivirea dintre adresa From și Return-Path indică falsificare</li>
                      <li>Numele de domeniu "phishingdomain.net" este în mod clar suspect</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {showExplanation === 'received-from' && (
                <div>
                  <p className="mb-4">Antetul <span className="font-mono bg-gray-700 px-2 py-1 rounded">Received</span> arată calea pe care a luat-o e-mailul pentru a ajunge la tine.</p>
                  <p className="mb-4">Acest e-mail pretinde că este de la PayPal, dar a fost trimis de la <span className="font-mono bg-gray-700 px-2 py-1 rounded">mailservr192.phishingdomain.net</span> cu adresa IP 192.168.1.254.</p>
                  <div className="bg-gray-700 p-4 rounded-lg mt-4">
                    <p className="font-semibold text-cyan-300 mb-2">De ce este suspect:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>E-mailurile de la PayPal ar proveni de la serverele de mail PayPal</li>
                      <li>Identificatorul "unknown" HELO sugerează că serverul nu este configurat corespunzător</li>
                      <li>192.168.1.254 este o adresă IP privată, care nu ar fi niciodată utilizată de serverele de e-mail corporative legitime</li>
                      <li>Domeniul "phishingdomain.net" este în mod evident suspect</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {showExplanation === 'spf-fail' && (
                <div>
                  <p className="mb-4">Antetul <span className="font-mono bg-gray-700 px-2 py-1 rounded">Authentication-Results</span> arată rezultatele verificărilor de autentificare a e-mailului.</p>
                  <p className="mb-4">Acest e-mail eșuează la mai multe verificări de autentificare:</p>
                  <ul className="list-disc pl-5 mb-4">
                    <li><span className="font-mono bg-gray-700 px-2 py-1 rounded">spf=fail</span> - Expeditorul nu este autorizat să trimită de la paypal.com</li>
                    <li><span className="font-mono bg-gray-700 px-2 py-1 rounded">dkim=fail</span> - Semnătura e-mailului este invalidă</li>
                    <li><span className="font-mono bg-gray-700 px-2 py-1 rounded">dmarc=fail</span> - E-mailul eșuează la autentificarea bazată pe domeniu</li>
                  </ul>
                  <div className="bg-gray-700 p-4 rounded-lg mt-4">
                    <p className="font-semibold text-cyan-300 mb-2">De ce este critic:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>SPF (Sender Policy Framework) verifică dacă serverul de expediere este autorizat să trimită e-mailuri pentru domeniu</li>
                      <li>DKIM (DomainKeys Identified Mail) oferă o semnătură digitală pentru a verifica că e-mailul nu a fost modificat</li>
                      <li>DMARC (Domain-based Message Authentication) este un cadru de politici care protejează domeniile de utilizarea neautorizată</li>
                      <li>Eșecul tuturor celor trei este o indicație clară a falsificării e-mailului</li>
                    </ul>
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => setShowExplanation(null)}
                className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
              >
                Închide Explicația
              </button>
            </div>
          ) : (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-full">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Analiza Antetului</h3>
              <p className="mb-4">Dă click pe elementele suspecte din antetul e-mailului pentru a le analiza.</p>
              <p className="mb-4">Caută:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Nepotriviri între expeditorul afișat și expeditorul real</li>
                <li>Servere sau domenii de origine suspecte</li>
                <li>Eșecuri de autentificare (SPF, DKIM, DMARC)</li>
                <li>Informații de rutare neobișnuite</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <span className="text-gray-400 mr-2">Identificate:</span>
          <span className="font-bold text-cyan-400">{selectedElements.length}/3</span>
        </div>
        
        <button
          onClick={onComplete}
          disabled={!allElementsFound}
          className={`px-6 py-3 font-bold rounded-lg transition-colors ${
            allElementsFound 
              ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          {allElementsFound ? 'Continuă la Investigarea Linkului' : 'Găsește Toți Indicatorii'}
        </button>
      </div>
    </div>
  );
};

export default HeaderAnalysis;
