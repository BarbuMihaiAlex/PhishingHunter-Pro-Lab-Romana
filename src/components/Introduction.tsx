import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface IntroductionProps {
  onComplete: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({ onComplete }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      question: "Ce este phishing-ul?",
      options: [
        "Un tip de sport de pescuit",
        "Un atac cibernetic care folosește e-mailuri deghizate pentru a păcăli destinatarii",
        "O eroare de software",
        "Un tip de virus informatic"
      ],
      correctAnswer: 1
    },
    {
      question: "Care dintre acestea este un indicator comun al unui e-mail de phishing?",
      options: [
        "E-mailuri de la contacte cunoscute",
        "E-mailuri fără atașamente",
        "E-mailuri cu cereri urgente sau amenințări",
        "E-mailuri cu logo-ul companiei"
      ],
      correctAnswer: 2
    },
    {
      question: "Ce ar trebui să faci dacă suspectezi că un e-mail este o încercare de phishing?",
      options: [
        "Să răspunzi expeditorului pentru confirmare",
        "Să dai click pe linkuri pentru a verifica dacă sunt legitime",
        "Să îl trimiți tuturor colegilor tăi",
        "Să îl raportezi departamentului IT și să nu dai click pe niciun link"
      ],
      correctAnswer: 3
    }
  ];

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    
    // Check if all answers are correct
    const allCorrect = quizQuestions.every((q, index) => 
      quizAnswers[index] === q.correctAnswer
    );
    
    if (allCorrect) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  const isQuizComplete = quizAnswers.length === quizQuestions.length && 
    quizAnswers.every(answer => answer !== undefined);

  return (
    <div className="max-w-4xl mx-auto">
      {!showQuiz ? (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-center mb-8">
            <Shield className="h-16 w-16 text-cyan-500" />
            <h1 className="text-4xl font-bold ml-4 text-white">Bine ați venit la PhishHunter Pro</h1>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Înțelegerea Amenințărilor de Phishing</h2>
            <p className="mb-4">
              Phishing-ul este un tip de atac de inginerie socială folosit adesea pentru a fura date ale utilizatorilor, inclusiv credențiale de autentificare și numere de card de credit. Apare atunci când un atacator, deghizat ca o entitate de încredere, păcălește o victimă să deschidă un e-mail, un mesaj instant sau un mesaj text.
            </p>
            <p className="mb-4">
              Destinatarul este apoi păcălit să dea click pe un link malițios, care poate duce la instalarea de malware, înghețarea sistemului ca parte a unui atac de ransomware sau dezvăluirea de informații sensibile.
            </p>
            
            <div className="mt-6 bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-cyan-300">Tactici Comune de Phishing:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Crearea unui sentiment de urgență sau frică</li>
                <li>Impersonarea organizațiilor sau contactelor de încredere</li>
                <li>Utilizarea numelor de domenii și URL-urilor înșelătoare</li>
                <li>Includerea atașamentelor sau linkurilor malițioase</li>
                <li>Ortografie și gramatică defectuoase (deși atacurile sofisticate pot să nu aibă acestea)</li>
              </ul>
            </div>
            
            <div className="mt-6 bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-cyan-300">Impact în Lumea Reală:</h3>
              <p>În 2023, atacurile de phishing au reprezentat peste 80% din incidentele de securitate raportate. Organizațiile au pierdut în medie 4,2 milioane de dolari per breșă, cu 60% din breșe implicând credențiale compromise.</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowQuiz(true)}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition-colors flex items-center"
            >
              Continuă cu Testul
              <AlertTriangle className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">Test de Cunoștințe despre Phishing</h2>
          
          <div className="space-y-8">
            {quizQuestions.map((q, qIndex) => (
              <div key={qIndex} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">{q.question}</h3>
                <div className="space-y-3">
                  {q.options.map((option, oIndex) => (
                    <div 
                      key={oIndex}
                      onClick={() => !quizSubmitted && handleAnswerSelect(qIndex, oIndex)}
                      className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${
                        quizAnswers[qIndex] === oIndex 
                          ? 'bg-cyan-700 border border-cyan-500' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      } ${
                        quizSubmitted && oIndex === q.correctAnswer
                          ? 'bg-green-700 border border-green-500'
                          : quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex !== q.correctAnswer
                          ? 'bg-red-700 border border-red-500'
                          : ''
                      }`}
                    >
                      <span>{option}</span>
                      {quizSubmitted && oIndex === q.correctAnswer && (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      )}
                      {quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex !== q.correctAnswer && (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            {quizSubmitted ? (
              quizQuestions.every((q, index) => quizAnswers[index] === q.correctAnswer) ? (
                <div className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Foarte bine! Se trece la următoarea etapă...
                </div>
              ) : (
                <button
                  onClick={() => setQuizSubmitted(false)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors flex items-center"
                >
                  <XCircle className="mr-2 h-5 w-5" />
                  Încearcă din nou
                </button>
              )
            ) : (
              <button
                onClick={handleQuizSubmit}
                disabled={!isQuizComplete}
                className={`px-6 py-3 font-bold rounded-lg transition-colors flex items-center ${
                  isQuizComplete 
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Trimite Răspunsurile
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Introduction;
