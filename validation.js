// src/middlewares/validation.js

/**
 * Valide les champs obligatoires à la création d'un article
 */
function validateCreate(req, res, next) {
  const { titre, contenu, auteur, categorie } = req.body;
  const errors = [];

  if (!titre || titre.trim() === '')
    errors.push('Le champ "titre" est obligatoire');
  if (!contenu || contenu.trim() === '')
    errors.push('Le champ "contenu" est obligatoire');
  if (!auteur || auteur.trim() === '')
    errors.push('Le champ "auteur" est obligatoire');
  if (!categorie || categorie.trim() === '')
    errors.push('Le champ "categorie" est obligatoire');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors
    });
  }

  next();
}

/**
 * Valide l'ID numérique dans les paramètres de route
 */
function validateId(req, res, next) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: 'L\'ID doit être un nombre entier positif'
    });
  }
  req.params.id = id;
  next();
}

module.exports = { validateCreate, validateId };
