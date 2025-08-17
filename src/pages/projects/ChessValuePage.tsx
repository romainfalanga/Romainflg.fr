import React from 'react';
import { ArrowLeft, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ApplicationModal } from '../../components/ApplicationModal';

export function ChessValuePage() {
  const [showApplicationModal, setShowApplicationModal] = React.useState(false);
  const [selectedPosition, setSelectedPosition] = React.useState('');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApply = (position: string) => {
    setSelectedPosition(position);
    setShowApplicationModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-all duration-300 mb-6 sm:mb-8 group"
        >
          <ArrowLeft size={16} className="sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base font-medium">Retour à l'accueil</span>
        </Link>

        {/* Main Project Card */}
        <div className="glass-effect rounded-2xl shadow-lg border border-white/20 p-6 sm:p-8 mb-6 sm:mb-8 animate-fade-in">
          {/* Mobile: Logo en haut */}
          <div className="flex justify-center mb-6 lg:hidden">
            <img 
              src="/logos/ChessValue.png"
              alt="Chess Value"
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-lg"
            />
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-6 lg:space-y-0">
            <div className="flex-1 lg:pr-8 text-center lg:text-left">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">Projet 1</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Chess Value</h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Chess Value évalue en temps réel la valeur des pièces selon la position, pour analyser et améliorer vos stratégies aux échecs.
              </p>
              
              {/* Project Links */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <a 
                  href="https://chessvalue.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-xl font-medium transition-all duration-300 inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  <span className="text-lg">🌐</span>
                  <span>Accéder au site</span>
                </a>
              </div>
            </div>
            {/* Desktop: Logo à droite */}
            <div className="hidden lg:flex lg:justify-end lg:ml-8">
              <img 
                src="/logos/ChessValue.png"
                alt="Chess Value"
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="glass-effect rounded-2xl shadow-lg border border-white/20 p-6 sm:p-8 animate-slide-up">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-6 sm:p-8 border border-accent-200 mb-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-2xl sm:text-3xl">💰</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Programme d'affiliation</h3>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-base sm:text-lg">
                  Tu apprécies ce projet et tu as envie de le partager autour de toi ?
                </p>
                <p className="text-base sm:text-lg">
                  Rejoins le programme d'affiliation et obtiens ton code promo personnel.
                  Chaque fois qu'une personne achète des crédits en utilisant ton code, tu touches une commission en argent réel.
                </p>
                <div className="bg-white rounded-xl p-4 sm:p-6 border border-accent-300 shadow-sm">
                  <p className="text-base sm:text-lg font-medium text-accent-800">
                    👉 Plus tu fais découvrir le projet (TikTok, réseaux sociaux, bouche-à-oreille), plus tu peux générer de revenus grâce à ton code.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Application Button */}
            <div className="text-center">
              <button 
                onClick={() => handleApply('Affilié')}
                className="bg-gradient-to-r from-accent-600 to-primary-600 hover:from-accent-700 hover:to-primary-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <span className="text-lg">🚀</span>
                <span>Devenir affilié</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        projectName="Chess Value"
        position={selectedPosition}
        tiktokPlaceholder="@chessvalue_pseudo"
      />
    </div>
  );
}