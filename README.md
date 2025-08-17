# Romain FLG - Hub de Projets

Hub centralisé pour tous les projets Romain FLG avec système de crédits universel et programme d'affiliation.

## 🚀 Projets

- **Chess Value** - Évaluation en temps réel de la valeur des pièces d'échecs
- **Chess 13** - Plateau 13x13 avec stratégie attaquant/défenseur
- **Chess 100** - Course vers la 100e rangée sur plateau 100x8
- **Draft Chess** - Placement stratégique des pièces avant la partie

## 🛠️ Technologies

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Base de données**: Firebase Firestore
- **Authentification**: Firebase Auth
- **Déploiement**: GitHub Pages / Netlify

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/romain-flg-hub.git

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## 🔧 Configuration Firebase

1. Créer un projet Firebase
2. Activer Firestore et Authentication
3. Configurer les variables dans `src/lib/firebase.ts`

## 🌐 Déploiement

### GitHub Pages
1. Push sur la branche `main`
2. GitHub Actions se charge du déploiement automatique
3. Configurer le domaine personnalisé dans les settings du repo

### Netlify
1. Connecter le repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Configurer le domaine personnalisé

## 📱 Fonctionnalités

- ✅ Authentification utilisateur
- ✅ Système de crédits universel
- ✅ Programme d'affiliation
- ✅ FLG Pass (abonnement premium)
- ✅ Classement des affiliés
- ✅ Interface responsive
- ✅ Animations et micro-interactions

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est sous licence MIT.