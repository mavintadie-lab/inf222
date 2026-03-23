// src/controllers/articleController.js
const Article = require('../models/Article');

// POST /api/articles — Créer un article
async function createArticle(req, res) {
  try {
    const article = await Article.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Article créé avec succès',
      data: article
    });
  } catch (err) {
    console.error('createArticle:', err);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}

// GET /api/articles — Lire tous les articles (filtres optionnels)
async function getArticles(req, res) {
  try {
    const { categorie, auteur, date } = req.query;
    const articles = await Article.findAll({ categorie, auteur, date });
    return res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (err) {
    console.error('getArticles:', err);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}

// GET /api/articles/:id — Lire un article par ID
async function getArticleById(req, res) {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: `Aucun article trouvé avec l'ID ${req.params.id}`
      });
    }
    return res.status(200).json({ success: true, data: article });
  } catch (err) {
    console.error('getArticleById:', err);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}

// PUT /api/articles/:id — Modifier un article
async function updateArticle(req, res) {
  try {
    const updated = await Article.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Aucun article trouvé avec l'ID ${req.params.id}`
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Article mis à jour avec succès',
      data: updated
    });
  } catch (err) {
    console.error('updateArticle:', err);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}

// DELETE /api/articles/:id — Supprimer un article
async function deleteArticle(req, res) {
  try {
    const deleted = await Article.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Aucun article trouvé avec l'ID ${req.params.id}`
      });
    }
    return res.status(200).json({
      success: true,
      message: `Article ${req.params.id} supprimé avec succès`
    });
  } catch (err) {
    console.error('deleteArticle:', err);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}

// GET /api/articles/search?query= — Rechercher des articles
async function searchArticles(req, res) {
  try {
    const { query } = req.query;
    if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Le paramètre "query" est requis'
      });
    }
    const articles = await Article.search(query.trim());
    return res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (err) {
    console.error('searchArticles:', err);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}

// GET /api/articles/filter?categorie=&date= — Endpoint supplémentaire
async function filterByCategorieAndDate(req, res) {
  try {
    const { categorie, date } = req.query;
    if (!categorie || !date) {
      return res.status(400).json({
        success: false,
        message: 'Les paramètres "categorie" et "date" sont requis'
      });
    }
    const articles = await Article.findByCategorieAndDate(categorie, date);
    return res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (err) {
    console.error('filterByCategorieAndDate:', err);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  searchArticles,
  filterByCategorieAndDate
};
