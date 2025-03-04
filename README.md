# MyHospital

## Description
MyHospital est une plateforme permettant aux utilisateurs de localiser facilement les hôpitaux les plus proches et d'accéder aux informations sur leurs services. L'application repose sur un frontend en React et un backend en Symfony pour offrir une expérience fluide et efficace.

## Technologies utilisées

### Frontend :
- React.js
- Tailwind CSS (ou autre framework CSS utilisé)
- Axios (pour les requêtes API)

### Backend :
- Symfony
- API Platform (si utilisé pour exposer l'API REST/GraphQL)
- Doctrine (ORM pour la gestion de la base de données)
- MySQL (ou PostgreSQL, SQLite selon le choix de la base de données)

## Installation

### Prérequis
- PHP >= 8.1
- Composer
- Symfony CLI
- Node.js et npm
- MySQL ou autre base de données compatible

### Installation du backend (Symfony)
```bash
# Cloner le projet
git clone https://github.com/ton_profil/MyHospital.git
cd MyHospital/backend

# Installer les dépendances
composer install

# Configurer la base de données
cp .env .env.local
# Modifier DATABASE_URL dans .env.local selon la configuration
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate

# Lancer le serveur Symfony
symfony server:start
```

### Installation du frontend (React)
```bash
cd ../frontend
npm install
npm start
```

## Fonctionnalités principales
- Recherche des hôpitaux par localisation
- Affichage des services proposés par chaque hôpital
- Géolocalisation et affichage sur carte
- Authentification et gestion des utilisateurs (si implémenté)

## API
L'API backend fournit des endpoints RESTful permettant de récupérer les informations sur les hôpitaux et leurs services. Exemple d'endpoint :
```bash
GET /api/hospitals
```

## Contribuer
Les contributions sont les bienvenues ! Pour contribuer :
1. Fork le projet
2. Crée une branche (`feature/ma-feature`)
3. Commit tes modifications (`git commit -m 'Ajout de ma feature'`)
4. Push sur GitHub (`git push origin feature/ma-feature`)
5. Ouvre une Pull Request

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.
