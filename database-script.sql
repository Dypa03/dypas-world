DROP SCHEMA IF EXISTS dypas_world;
CREATE SCHEMA dypas_world;
USE dypas_world;

-- Creazione tabella utenti
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(2000) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Creazione tabella media entries
CREATE TABLE media_entries (
  media_entry_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL, -- es: 'movie', 'book', 'anime', ecc.
  img_url VARCHAR(255),
  rating INTEGER CHECK (rating BETWEEN 0 AND 10),
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
