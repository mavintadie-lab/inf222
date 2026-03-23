// src/routes/articles.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/articleController');
const { validateCreate, validateId } = require('../middlewares/validation');

// IMPORTANT : les routes statiques (/search, /filter) AVANT les routes dynamiques (/:id)
// sinon Express interpréterait "search" comme un ID

// GET  /api/articles/search?query=texte
router.get('/search', ctrl.searchArticles);

// GET  /api/articles/filter?categorie=Tech&date=2026-03-18
router.get('/filter', ctrl.filterByCategorieAndDate);

// POST /api/articles
router.post('/', validateCreate, ctrl.createArticle);

// GET  /api/articles?categorie=&auteur=&date=
router.get('/', ctrl.getArticles);

// GET  /api/articles/:id
router.get('/:id', validateId, ctrl.getArticleById);

// PUT  /api/articles/:id
router.put('/:id', validateId, ctrl.updateArticle);

// DELETE /api/articles/:id
router.delete('/:id', validateId, ctrl.deleteArticle);

module.exports = router;
