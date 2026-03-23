// src/config/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '../../blog.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Erreur connexion base de données:', err.message);
  } else {
    console.log('✅ Connecté à la base de données SQLite');
  }
});

// Activation des clés étrangères
db.run('PRAGMA foreign_keys = ON');

// Création de la table articles
db.run(`
  CREATE TABLE IF NOT EXISTS articles (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    titre     TEXT    NOT NULL,
    contenu   TEXT    NOT NULL,
    auteur    TEXT    NOT NULL,
    categorie TEXT    NOT NULL,
    tags      TEXT    DEFAULT '[]',
    date      TEXT    DEFAULT (datetime('now')),
    createdAt TEXT    DEFAULT (datetime('now')),
    updatedAt TEXT    DEFAULT (datetime('now'))
  )
`, (err) => {
  if (err) {
    console.error('Erreur création table:', err.message);
  } else {
    console.log('✅ Table "articles" prête');
  }
});

module.exports = db;
