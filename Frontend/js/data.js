// js/data.js

export const products = [
    {
        id: "REF-001",
        name: "Chemise en Lin Estivale",
        description: "Découvrez notre chemise en lin pour homme, la pièce maîtresse de votre garde-robe estivale. Conçue avec un tissu léger et respirant, elle vous offre un confort optimal même lors des journées les plus chaudes. Sa coupe ajustée met en valeur votre silhouette tout en garantissant une liberté de mouvement totale. Parfaite pour une sortie en ville ou une soirée au bord de la plage.",
        stock: 15,
        price: 49.99,
        discount: 20, // 20% de réduction
        currency: "€",
        images: [
            "assets/images/chemise-lin-1.jpg", // Image par défaut
            "assets/images/chemise-lin-2.jpg", // Image au survol
            "assets/images/chemise-lin-3.jpg"  // Image pour le carrousel
        ],
        characteristics: {
            gender: "Homme",
            type: "Chemise",
            colors: ["Blanc", "Bleu Ciel", "Beige"], // OBLIGATOIRE
            sizes: ["S", "M", "L", "XL"]
        }
    },
    {
        id: "REF-002",
        name: "Pantalon Chino Classique",
        description: "L'élégance rencontre le confort avec ce pantalon chino classique. Fabriqué à partir d'un mélange de coton de haute qualité, il offre une durabilité exceptionnelle et un toucher doux. Ses finitions soignées et sa coupe droite en font un vêtement polyvalent, idéal pour le bureau comme pour les week-ends décontractés. Un indispensable qui s'associe facilement avec toutes vos tenues.",
        stock: 32,
        price: 59.90,
        discount: 0, // Pas de promotion sur celui-ci
        currency: "€",
        images: [
            "assets/images/chino-1.jpg",
            "assets/images/chino-2.jpg"
        ],
        characteristics: {
            gender: "Homme",
            type: "Pantalon",
            colors: ["Marine", "Kaki", "Noir"],
            sizes: ["38", "40", "42", "44"]
        }
    },
    {
        id: "REF-003",
        name: "Robe d'Été Fluide à Motifs",
        description: "Laissez-vous séduire par cette magnifique robe d'été fluide. Dotée de motifs floraux délicats, elle apporte une touche de fraîcheur et de féminité à votre look. Le tissu vaporeux accompagne chacun de vos mouvements avec grâce. Elle dispose d'une taille cintrée élastique pour s'adapter à toutes les morphologies et d'un joli décolleté en V. Idéale pour les chaudes journées ensoleillées.",
        stock: 8,
        price: 35.00,
        discount: 10,
        currency: "€",
        images: [
            "assets/images/robe-1.jpg",
            "assets/images/robe-2.jpg"
        ],
        characteristics: {
            gender: "Femme",
            type: "Robe",
            colors: ["Rouge", "Jaune"],
            sizes: ["XS", "S", "M", "L"]
        }
    }
];