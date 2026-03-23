// src/app.js
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Initialisation de la base de données au démarrage
require('./config/database');

const articlesRouter = require('./routes/articles');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares globaux ──────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Documentation Swagger ────────────────────────────────────────────────────
const swaggerDoc = YAML.load(path.join(__dirname, '../swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, {
  customSiteTitle: 'Blog API - Documentation',
  swaggerOptions: { defaultModelsExpandDepth: -1 }
}));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/articles', articlesRouter);

// Route racine — guide de démarrage rapide
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Blog API opérationnelle',
    version: '1.0.0',
    endpoints: {
      documentation: 'GET  /api-docs',
      articles: {
        creer:     'POST   /api/articles',
        lister:    'GET    /api/articles?categorie=&auteur=&date=',
        lireUn:    'GET    /api/articles/:id',
        modifier:  'PUT    /api/articles/:id',
        supprimer: 'DELETE /api/articles/:id',
        recherche: 'GET    /api/articles/search?query=',
        filtre:    'GET    /api/articles/filter?categorie=&date='
      }
    }
  });
});

// ─── Gestion des routes inexistantes ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} introuvable`
  });
});

// ─── Gestionnaire d'erreurs global ───────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('Erreur non gérée:', err);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur'
  });
});

// ─── Démarrage ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📖 Documentation Swagger : http://localhost:${PORT}/api-docs\n`);
});

module.exports = app;
