# 🛍️ MAXIBAZARD — Guide de démarrage

## Structure du projet
```
Project/
├── Frontend/         ← HTML / CSS / JS (sans framework)
│   ├── index.html    → Catalogue
│   ├── product.html  → Fiche produit
│   ├── cart.html     → Panier
│   ├── favorites.html→ Favoris
│   ├── checkout.html → Commande
│   ├── css/          → Styles
│   ├── js/           → Logique (modules ES6)
│   │   ├── data.js         → Données locales (fallback)
│   │   ├── api.js          → Client API → Backend Express
│   │   ├── catalog.js      → Page catalogue
│   │   ├── product.js      → Page produit
│   │   ├── cartPage.js     → Page panier
│   │   ├── favoritesPage.js→ Page favoris
│   │   ├── checkoutPage.js → Page commande
│   │   └── utils/          → cart.js, favorites.js, helpers.js
│   └── assets/images/      → Images produits
└── Backend/
    ├── app.js              → Point d'entrée Express
    ├── .env                → Config BDD
    ├── schema.sql          → Schéma complet (avec nouvelles tables)
    ├── config/db.js        → Pool MySQL
    ├── controllers/
    │   ├── productsController.js
    │   ├── cartController.js
    │   ├── favoritesController.js
    │   └── ordersController.js
    └── routes/api.js       → Toutes les routes
```

---

## 1. Base de données MySQL

### Créer la base
```sql
-- Exécuter dans phpMyAdmin ou MySQL Workbench :
SOURCE schema.sql;

-- Puis insérer les données produits depuis le fichier SQL du projet
SOURCE données_produits.sql;
```

### Configurer `.env`
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root       ← adapter si besoin
DB_NAME=maxibazard
PORT=3000
```

---

## 2. Lancer le Backend

```bash
cd Backend
npm install
npm run dev      # avec nodemon (rechargement auto)
# ou
npm start        # prod
```

Le serveur démarre sur **http://localhost:3000**

---

## 3. Accès au Frontend

Le backend sert directement les fichiers statiques du Frontend :

👉 **http://localhost:3000** → page catalogue

Ou avec Live Server de VS Code (pour le dev frontend seul) :
👉 **http://localhost:5500** (le localStorage fonctionnera, mais pas l'API)

---

## 4. Routes API disponibles

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/products` | Tous les produits |
| GET | `/api/products?genre=Bureau&promo=true&sort=asc` | Filtrés / triés |
| GET | `/api/products/genres` | Liste des genres |
| GET | `/api/products/:id` | Produit détaillé |
| GET | `/api/products/:id/similar` | Produits similaires |
| PATCH | `/api/products/stock` | Déduire stock après commande |
| GET | `/api/cart` | Contenu du panier |
| POST | `/api/cart` | Ajouter au panier |
| PATCH | `/api/cart/:id` | Modifier quantité |
| DELETE | `/api/cart/:id` | Supprimer article |
| DELETE | `/api/cart` | Vider le panier |
| GET | `/api/favorites` | Favoris |
| POST | `/api/favorites` | Ajouter favori |
| DELETE | `/api/favorites/:productId` | Supprimer favori |
| POST | `/api/orders` | Passer commande |
| GET | `/api/orders` | Historique commandes |
| GET | `/api/addresses` | Adresses sauvegardées |
| POST | `/api/addresses` | Sauvegarder adresse |
| DELETE | `/api/addresses/:id` | Supprimer adresse |

### Header requis pour les routes personnalisées :
```
X-Session-ID: <votre-session-id>
```
*(généré automatiquement par `js/api.js`)*

---

## 5. Architecture des données (SQL → JS)

```
objects             → id, nom, prix, reduction, genre, Des
  └── couleur_objet → id, Id_Objets, Name
        ├── images_objet → ID, Chemin_Img, Id_Couleurs, Is_Main
        └── taille_objets → id, Id_Objets, Id_Couleurs, Name, Quantity
```

Le contrôleur `productsController.js` fait la jointure complète et renvoie :
```json
{
  "id": 5,
  "nom": "Fourchette Télescopique Anti-Vol",
  "prix": 12,
  "reduction": 15,
  "genre": "Cuisine",
  "couleurs": [
    {
      "id": 9,
      "nom": "Manche Bleu",
      "images": [
        { "chemin": "assets/images/Fourchette/Fourchette_Bleu_1.jpg", "isMain": true },
        { "chemin": "assets/images/Fourchette/Fourchette_Bleu_2.jpg", "isMain": false }
      ],
      "tailles": [
        { "id": 1, "nom": "Modèle Standard (65cm)", "stock": 20 },
        { "id": 2, "nom": "Modèle Long (1 mètre)", "stock": 10 }
      ]
    }
  ]
}
```
