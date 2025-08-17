import React, { useState, useEffect } from 'react';
import { Trophy, Users, TrendingUp, Award, Crown, Star, Copy, Check } from 'lucide-react';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ApplicationModal } from '../components/ApplicationModal';

interface Affiliate {
  id: string;
  user_id: string;
  username: string;
  promo_code: string;
  total_uses: number;
  total_commission: number;
  created_at: string;
  avatar_url?: string;
}

export function AffiliationProgramPage() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  useEffect(() => {
    fetchAffiliates();
  }, []);

  const fetchAffiliates = async () => {
    try {
      setLoading(true);
      
      // Requête pour récupérer les affiliés triés par nombre d'utilisations
      const affiliatesQuery = query(
        collection(db, 'affiliates'),
        orderBy('total_uses', 'desc')
      );
      
      const querySnapshot = await getDocs(affiliatesQuery);
      const affiliatesData: Affiliate[] = [];

      querySnapshot.forEach((doc) => {
        affiliatesData.push({ id: doc.id, ...doc.data() } as Affiliate);
      });

      setAffiliates(affiliatesData);
    } catch (error) {
      console.error('❌ Erreur récupération affiliés:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyPromoCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.error('Erreur copie:', error);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Award className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Star className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-6 h-6 text-gray-300" />;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center shadow-2xl animate-glow">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Trophy className="w-8 h-8 text-yellow-400 animate-bounce-subtle" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">
            Programme d'Affiliation
          </span>
        </h1>
        <div className="mt-6 w-24 h-1 bg-gradient-to-r from-accent-500 to-primary-500 mx-auto rounded-full"></div>
      </div>

      {/* Call to Action Section */}
      <div className="mb-8 sm:mb-12 bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-8 text-center border border-accent-200 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Vous voulez devenir affilié ?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Rejoignez notre programme d'affiliation et commencez à gagner de l'argent en partageant nos projets !
        </p>
        <button 
          onClick={() => setShowApplicationModal(true)}
          className="bg-gradient-to-r from-accent-600 to-primary-600 hover:from-accent-700 hover:to-primary-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
        >
          <span className="text-lg">🚀</span>
          <span>Devenir affilié</span>
        </button>
      </div>

      {/* Affiliates Leaderboard */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center mb-6 sm:mb-8">
          <Trophy className="w-6 h-6 text-accent-500 mr-3" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Classement des Affiliés</h2>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 border-b-2 border-accent-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-base sm:text-lg">Chargement des affiliés...</p>
          </div>
        ) : affiliates.length > 0 ? (
          <div className="space-y-4">
            {affiliates.map((affiliate, index) => {
              const rank = index + 1;
              return (
                <div
                  key={affiliate.id}
                  className={`bg-white rounded-2xl border-2 p-6 shadow-lg card-hover transition-all duration-300 ${
                    rank <= 3 ? 'border-accent-200 ring-2 ring-accent-100' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${getRankBadge(rank)}`}>
                        {rank <= 3 ? getRankIcon(rank) : `#${rank}`}
                      </div>

                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-gray-200">
                        {affiliate.avatar_url ? (
                          <img
                            src={affiliate.avatar_url}
                            alt={affiliate.username}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-accent-400 to-primary-400 flex items-center justify-center">
                            <Users className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {affiliate.username}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{affiliate.total_uses} utilisations</span>
                          <span>•</span>
                          <span>{affiliate.total_commission.toFixed(2)}€ gagnés</span>
                        </div>
                      </div>
                    </div>

                    {/* Promo Code */}
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-2">Code promo</div>
                      <button
                        onClick={() => copyPromoCode(affiliate.promo_code)}
                        className="bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 text-white px-4 py-2 rounded-xl font-mono font-bold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <span>{affiliate.promo_code}</span>
                        {copiedCode === affiliate.promo_code ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-r from-accent-100 to-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-accent-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun affilié pour le moment</h3>
            <p className="text-gray-600 text-lg px-4 mb-8">
              Soyez parmi les premiers à rejoindre notre programme d'affiliation !
            </p>
            <div className="space-y-4">
              <p className="text-gray-500 text-sm">
                Les affiliés apparaîtront ici une fois qu'ils auront rejoint le programme
              </p>
            </div>
          </div>
        )}
      </div>

      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        projectName="Programme d'Affiliation"
        position="Affilié"
        tiktokPlaceholder="@votre_pseudo"
      />
    </div>
  );
}