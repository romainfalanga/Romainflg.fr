import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  position: string;
  tiktokPlaceholder?: string;
}

const projects = [
  { id: 'chess-value', name: 'Chess Value', logo: '/logos/ChessValue.png' },
  { id: 'chess-13', name: 'Chess 13', logo: '/logos/Chess13.png' },
  { id: 'chess-100', name: 'Chess 100', logo: '/logos/Chess100.png' },
  { id: 'draft-chess', name: 'Draft Chess', logo: '/logos/DraftChess.png' }
];

export function ApplicationModal({ isOpen, onClose, projectName, position, tiktokPlaceholder = "@projet_pseudo" }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    telegramName: '',
    tiktokUsername: '',
    motivation: '',
    selectedProjects: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici on pourrait envoyer les données à un serveur
    console.log('Candidature soumise:', { projectName, position, ...formData });
    alert('Candidature envoyée avec succès !');
    onClose();
    setFormData({
      fullName: '',
      email: '',
      telegramName: '',
      tiktokUsername: '',
      motivation: '',
      selectedProjects: []
    });
  };

  const handleProjectToggle = (projectId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedProjects: prev.selectedProjects.includes(projectId)
        ? prev.selectedProjects.filter(id => id !== projectId)
        : [...prev.selectedProjects, projectId]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-secondary-50">
          <h2 className="text-2xl font-bold text-gray-900">
            {position === 'Affilié' ? 'Postuler pour Programme d\'Affiliation' : `Postuler pour ${projectName}`}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-xl transition-all duration-300 hover:scale-110"
          >
            <X size={24} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Position Info */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {position === 'Affilié' ? 'Programme d\'affiliation' : 'Poste : Community Manager (1€ par code utilisé)'}
                </h3>
                <p className="text-gray-600">
                  {position === 'Affilié' 
                    ? 'Rejoignez le programme d\'affiliation et gagnez de l\'argent en partageant mes projets. Obtenez votre code promo personnel et touchez une commission sur chaque abonnement.'
                    : 'Pour devenir un des CM du projet, vous devrez publier régulièrement sur TikTok à propos du projet. Vous pouvez même créer un compte TikTok dédié exclusivement au projet et vous démarquer par votre créativité.'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {position === 'Affilié' ? 'Comment maximiser vos gains' : 'Conseil pour maximiser vos chances'}
                </h3>
                <p className="text-gray-600">
                  {position === 'Affilié'
                    ? 'Rejoignez le Telegram du projet pour rester informé des nouveautés et obtenir des conseils pour optimiser vos partages. Plus vous êtes actif, plus vous pouvez générer de revenus !'
                    : 'Rejoignez le Telegram pour vous démarquer ! Partagez vos TikToks, proposez des idées innovantes et montrez votre valeur ajoutée. C\'est le meilleur moyen de prouver votre motivation et vos compétences.'
                  }
                </p>
                <div className="mt-4">
                  <a
                    href="https://t.me/RomainFLGpublic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                  >
                    <span className="text-lg">📱</span>
                    <span>Rejoindre le Telegram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Nom complet *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Votre nom complet"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Nom Telegram *
                </label>
                <input
                  type="text"
                  required
                  value={formData.telegramName}
                  onChange={(e) => setFormData({ ...formData, telegramName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="@votre_nom_telegram"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Nom d'utilisateur TikTok *
                </label>
                <input
                  type="text"
                  required
                  value={formData.tiktokUsername}
                  onChange={(e) => setFormData({ ...formData, tiktokUsername: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder={tiktokPlaceholder}
                />
              </div>
            </div>

            {position === 'Affilié' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Projets à promouvoir *
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  Sélectionnez les projets sur lesquels vous comptez faire la promotion :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projects.map((project) => (
                    <label
                      key={project.id}
                      className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        formData.selectedProjects.includes(project.id)
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedProjects.includes(project.id)}
                        onChange={() => handleProjectToggle(project.id)}
                        className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <img
                        src={project.logo}
                        alt={project.name}
                        className="w-8 h-8 object-contain"
                      />
                      <span className="font-medium text-gray-900">{project.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {position === 'Affilié' ? 'Pourquoi voulez-vous devenir affilié ? *' : 'Motivation *'}
              </label>
              <textarea
                required
                rows={4}
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all duration-300"
                placeholder={position === 'Affilié' 
                  ? 'Expliquez pourquoi vous souhaitez devenir affilié et comment vous comptez promouvoir le projet...'
                  : 'Pourquoi voulez-vous rejoindre ce projet ? Quelle valeur pouvez-vous apporter ?'
                }
              />
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                className="flex-1 btn-primary"
              >
                {position === 'Affilié' ? 'Rejoindre le programme' : 'Envoyer ma candidature'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}