-- =========================================================
-- MAXIBAZARD — Schéma complet de la base de données
-- =========================================================

CREATE DATABASE IF NOT EXISTS maxibazard
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE maxibazard;

-- =========================================================
-- TABLES EXISTANTES (inchangées)
-- =========================================================

CREATE TABLE IF NOT EXISTS objects (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nom       VARCHAR(255) NOT NULL,
  prix      DECIMAL(10,2) NOT NULL,
  reduction INT DEFAULT 0,
  genre     VARCHAR(100),
  Des       TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS couleur_objet (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  Id_Objets  INT NOT NULL,
  Name       VARCHAR(100) NOT NULL,
  FOREIGN KEY (Id_Objets) REFERENCES objects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS images_objet (
  ID           INT AUTO_INCREMENT PRIMARY KEY,
  Chemin_Img   VARCHAR(255) NOT NULL,
  Id_Couleurs  INT NOT NULL,
  Is_Main      TINYINT(1) DEFAULT 0,
  FOREIGN KEY (Id_Couleurs) REFERENCES couleur_objet(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS taille_objets (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  Id_Objets   INT NOT NULL,
  Id_Couleurs INT NOT NULL,
  Name        VARCHAR(100) NOT NULL,
  Quantity    INT DEFAULT 0,
  FOREIGN KEY (Id_Objets)   REFERENCES objects(id)       ON DELETE CASCADE,
  FOREIGN KEY (Id_Couleurs) REFERENCES couleur_objet(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- NOUVELLES TABLES (ajout pour l'API)
-- =========================================================

-- Panier (lié à un session_id anonyme)
CREATE TABLE IF NOT EXISTS panier (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  session_id  VARCHAR(100) NOT NULL,
  object_id   INT NOT NULL,
  couleur_id  INT NOT NULL,
  taille_id   INT NOT NULL,
  quantite    INT DEFAULT 1,
  added_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (object_id)  REFERENCES objects(id)        ON DELETE CASCADE,
  FOREIGN KEY (couleur_id) REFERENCES couleur_objet(id)  ON DELETE CASCADE,
  FOREIGN KEY (taille_id)  REFERENCES taille_objets(id)  ON DELETE CASCADE,
  UNIQUE KEY unique_cart_item (session_id, object_id, couleur_id, taille_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Favoris
CREATE TABLE IF NOT EXISTS favoris (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(100) NOT NULL,
  object_id  INT NOT NULL,
  added_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (object_id) REFERENCES objects(id) ON DELETE CASCADE,
  UNIQUE KEY unique_fav (session_id, object_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Adresses de livraison sauvegardées
CREATE TABLE IF NOT EXISTS adresses (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  session_id  VARCHAR(100) NOT NULL,
  full_name   VARCHAR(100) NOT NULL,
  street      VARCHAR(200) NOT NULL,
  complement  VARCHAR(100),
  city        VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20)  NOT NULL,
  country     VARCHAR(100) NOT NULL DEFAULT 'France',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Commandes
CREATE TABLE IF NOT EXISTS commandes (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  session_id  VARCHAR(100) NOT NULL,
  order_ref   VARCHAR(20)  NOT NULL UNIQUE,
  total       DECIMAL(10,2) NOT NULL,
  address_id  INT,
  full_name   VARCHAR(100) NOT NULL,
  street      VARCHAR(200) NOT NULL,
  complement  VARCHAR(100),
  city        VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20)  NOT NULL,
  country     VARCHAR(100) NOT NULL DEFAULT 'France',
  status      ENUM('pending','confirmed','shipped','delivered') DEFAULT 'confirmed',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (address_id) REFERENCES adresses(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Détail des commandes
CREATE TABLE IF NOT EXISTS commande_items (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  commande_id  INT NOT NULL,
  object_id    INT NOT NULL,
  couleur_id   INT NOT NULL,
  taille_id    INT NOT NULL,
  quantite     INT NOT NULL,
  prix_unitaire DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
  FOREIGN KEY (object_id)   REFERENCES objects(id),
  FOREIGN KEY (couleur_id)  REFERENCES couleur_objet(id),
  FOREIGN KEY (taille_id)   REFERENCES taille_objets(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
