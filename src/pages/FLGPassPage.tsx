import React, { useState } from 'react';
import { Crown, Star, Zap, Check, X, Sparkles, Gift } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCredits } from '../hooks/useCredits';

const passPlans = [
  {
    id: 'bronze',
    name: 'FLG Pass Bronze',
    price: 6,
    promoPrice: 5,
    credits: 50,
    popular: false,
    color: 'from-amber-600 to-orange-600'
  },
  {
    id: 'silver',
    name: 'FLG Pass Argent',
    price: 12,
    promoPrice: 10,
    credits: 100,
    popular: true,
    color: 'from-gray-400 to-gray-600'
  },
  {
    id: 'gold',
    name: 'FLG Pass Or',
    price: 24,
    promoPrice: 20,
    credits: 200,
    popular: false,
    color: 'from-yellow-500 to-yellow-600'
  }
];

export function FLGPassPage() {
  const { user, profile } = useAuth();
  const { credits } = useCredits();
  const [selectedPlan, setSelectedPlan] = useState<typeof passPlans[0] | null>(null);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (plan: typeof passPlans[0]) => {
    setSelectedPlan(plan);
    setShowSubscribe(true);
  };

  const confirmSubscription = async () => {
    if (!selectedPlan) return;

    setSubscribing(true);
    try {
      // Simulation d'abonnement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Abonnement ${selectedPlan.name} activé avec succès !`);
      setShowSubscribe(false);
      setSelectedPlan(null);
    } catch (error) {
      alert('Erreur lors de l\'abonnement');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl animate-glow">
              <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce-subtle" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            FLG Pass
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Choisissez votre formule FLG Pass et commencez à utiliser tous les projets Romain FLG
        </p>
        <div className="mt-6 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      {/* Current Status */}
      {user && (
        <div className="mb-8 sm:mb-12 animate-slide-up">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Statut actuel</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600 font-medium">Utilisateur gratuit</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Solde actuel : {credits?.balance || 0} crédits
                </p>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">0€</div>
                <div className="text-sm text-gray-500">par mois</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {passPlans.map((plan, index) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl shadow-lg border-2 p-6 sm:p-8 card-hover transition-all duration-300 animate-slide-up ${
              plan.popular 
                ? 'border-purple-500 ring-4 ring-purple-100 scale-105' 
                : 'border-gray-200 hover:border-purple-300'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-subtle flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>Le plus populaire</span>
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center space-x-2 mb-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}€</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium mt-1">
                    {plan.promoPrice}€ avec code promo
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                <Gift className="w-4 h-4" />
                <span>{plan.credits} crédits inclus</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-600 text-sm">
                Recevez {plan.credits} crédits chaque mois pour utiliser tous les projets Romain FLG
              </p>
            </div>

            <button
              onClick={() => handleSubscribe(plan)}
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl ${
                plan.popular
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              }`}
            >
              {user ? 'S\'abonner maintenant' : 'Se connecter pour s\'abonner'}
            </button>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Pourquoi choisir FLG Pass ?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Crédits universels</h3>
            <p className="text-gray-600 text-sm">
              Utilisez vos crédits sur tous les projets de l'écosystème Romain FLG
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Seul moyen d'obtenir des crédits</h3>
            <p className="text-gray-600 text-sm">
              Le FLG Pass est le seul moyen d'obtenir des crédits pour utiliser les projets
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Codes promo affiliés</h3>
            <p className="text-gray-600 text-sm">
              Économisez avec les codes promo des affiliés et soutenez la communauté
            </p>
          </div>
        </div>
      </div>


      {/* Subscription Modal */}
      {showSubscribe && selectedPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl animate-slide-up">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 bg-gradient-to-r ${selectedPlan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Confirmer l'achat
              </h3>
              <p className="text-gray-600">
                {selectedPlan.name}
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border border-purple-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">Pass:</span>
                <span className="font-bold">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">Prix:</span>
                <span className="font-bold">{selectedPlan.price}€</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">Prix avec code promo:</span>
                <span className="font-bold text-green-600">{selectedPlan.promoPrice}€</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">Crédits inclus:</span>
                <span className="font-bold text-purple-600">{selectedPlan.credits} crédits</span>
              </div>
              <hr className="my-3 border-gray-200" />
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span className="text-purple-600">{selectedPlan.price}€</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-sm text-green-600 font-medium">
                  ({selectedPlan.promoPrice}€ avec code promo affilié)
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={confirmSubscription}
                disabled={subscribing}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {subscribing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Traitement...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Confirmer
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowSubscribe(false);
                  setSelectedPlan(null);
                }}
                disabled={subscribing}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Annuler
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-6 text-center bg-gray-50 rounded-lg p-3">
              Ceci est une simulation. Aucun paiement réel ne sera effectué.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}