import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, RefreshCw } from 'lucide-react';

interface CompletionProps {
  onRestart: () => void;
}

const Completion: React.FC<CompletionProps> = ({ onRestart }) => {
  const [showFlag, setShowFlag] = useState(false);
  const [confetti, setConfetti] = useState<{ x: number; y: number; size: number; color: string }[]>([]);
  
  useEffect(() => {
    // Show flag after a short delay
    const timer = setTimeout(() => {
      setShowFlag(true);
      createConfetti();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const createConfetti = () => {
    const colors = ['#FF5252', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#00BCD4'];
    const newConfetti = [];
    
    for (let i = 0; i < 100; i++) {
      newConfetti.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setConfetti(newConfetti);
  };

  return (
    <div className="max-w-4xl mx-auto text-center relative">
      {/* Confetti */}
      {confetti.map((c, i) => (
        <div 
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: `${c.size}px`,
            height: `${c.size}px`,
            backgroundColor: c.color,
            borderRadius: '50%',
            zIndex: 10
          }}
        />
      ))}
      
      <div className="relative z-20">
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-full">
            <Award className="h-20 w-20 text-white" />
          </div>
        </div>
        
        <h2 className="text-4xl font-bold mb-6 text-cyan-400">Felicitări!</h2>
        
        <div className="bg-gray-800 p-8 rounded-lg border border-cyan-700 mb-8">
          <p className="text-xl mb-6">Ai finalizat cu succes instruirea PhishHunter Pro!</p>
          
          <div className="flex items-center justify-center mb-6">
            <CheckCircle className="text-green-500 mr-3" size={24} />
            <span className="text-lg">Acum poți identifica și analiza încercările de phishing</span>
          </div>
          
          {showFlag && (
            <div className="animate-fadeIn">
              <p className="text-lg mb-4">Iată recompensa ta de tip capture the flag:</p>
              <div className="bg-gray-900 font-mono p-4 rounded-lg text-xl text-center mb-6">
                <span className="text-green-400">FLAG</span>
                <span className="text-white">{'{Ph1shing_D3t3ct3d_Succ3ssfully}'}</span>
              </div>
            </div>
          )}
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-cyan-300">Concluzii Principale:</h3>
            <ul className="text-left list-disc pl-5 space-y-2">
              <li>Verifică întotdeauna adresa de email a expeditorului și domeniul</li>
              <li>Verifică antetele e-mailului pentru eșecuri de autentificare</li>
              <li>Fii suspicios față de cereri urgente sau amenințări</li>
              <li>Verifică URL-urile înainte de a da click trecând cursorul peste linkuri</li>
              <li>Nu deschide niciodată atașamente cu extensii suspecte</li>
              <li>Caută HTTPS și certificate valide pe site-urile web</li>
              <li>Raportează phishing-ul suspectat departamentului IT</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={onRestart}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition-colors flex items-center"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Restart Instruire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Completion;
