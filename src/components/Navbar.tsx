import React from 'react';
import { Shield } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-cyan-500" />
          <span className="ml-2 text-xl font-bold text-white">PhishHunter Pro</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-sm text-gray-300">Laborator Interactiv de Phishing</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
