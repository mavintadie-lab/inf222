# Blog API — TP Node.js/Express

API REST complète pour gérer les articles d'un blog, avec documentation Swagger.

## Stack technique
- **Serveur** : Node.js + Express
- **Base de données** : SQLite (fichier `blog.db` créé automatiquement)
- **Documentation** : Swagger UI (OpenAPI 3.0)

---

## Installation

```bash
# 1. Cloner / extraire le projet
cd blog-api

# 2. Installer les dépendances
npm install

# 3. Démarrer en développement (avec rechargement automatique)
npm run dev

# OU démarrer en production
npm start
```

Le serveur démarre sur **http://localhost:3000**

---

## Documentation Swagger

Accéder à l'interface interactive : **http://localhost:3000/api-docs**

---

## Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST`   | `/api/articles` | Créer un article |
| `GET`    | `/api/articles` | Lister tous les articles |
| `GET`    | `/api/articles?categorie=Tech` | Filtrer par catégorie |
| `GET`    | `/api/articles?auteur=Alice` | Filtrer par auteur |
| `GET`    | `/api/articles?date=2026-03-18` | Filtrer par date |
| `GET`    | `/api/articles/:id` | Récupérer un article |
| `PUT`    | `/api/articles/:id` | Modifier un article |
| `DELETE` | `/api/articles/:id` | Supprimer un article |
| `GET`    | `/api/articles/search?query=texte` | Rechercher dans titre/contenu |
| `GET`    | `/api/articles/filter?categorie=Tech&date=2026-03-18` | Filtre combiné |

---

## Exemples d'utilisation (curl)

### Créer un article
```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Introduction à Node.js",
    "contenu": "Node.js est un environnement d'\''exécution JavaScript côté serveur...",
    "auteur": "Alice Martin",
    "categorie": "Tech",
    "tags": ["nodejs", "javascript", "backend"]
  }'
```

### Lire tous les articles
```bash
curl http://localhost:3000/api/articles
```

### Filtrer par catégorie
```bash
curl http://localhost:3000/api/articles?categorie=Tech
```

### Récupérer un article par ID
```bash
curl http://localhost:3000/api/articles/1
```

### Modifier un article
```bash
curl -X PUT http://localhost:3000/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Titre modifié",
    "categorie": "DevOps"
  }'
```

### Supprimer un article
```bash
curl -X DELETE http://localhost:3000/api/articles/1
```

### Rechercher
```bash
curl "http://localhost:3000/api/articles/search?query=javascript"
```

### Filtre combiné (endpoint supplémentaire)
```bash
curl "http://localhost:3000/api/articles/filter?categorie=Tech&date=2026-03-18"
```

---

## Codes HTTP utilisés

| Code | Signification |
|------|---------------|
| `200` | Succès (OK) |
| `201` | Création réussie |
| `400` | Requête mal formée (Bad Request) |
| `404` | Ressource non trouvée (Not Found) |
| `500` | Erreur interne serveur |

---

## Structure du projet

```
blog-api/
├── src/
│   ├── app.js                    ← Point d'entrée, configuration Express
│   ├── config/
│   │   └── database.js           ← Connexion SQLite, création de la table
│   ├── models/
│   │   └── Article.js            ← Requêtes SQL (CRUD + recherche)
│   ├── controllers/
│   │   └── articleController.js  ← Logique métier, réponses HTTP
│   ├── routes/
│   │   └── articles.js           ← Définition des routes
│   └── middlewares/
│       └── validation.js         ← Validation des entrées utilisateur
├── swagger.yaml                  ← Documentation OpenAPI 3.0
├── package.json
└── README.md
```
