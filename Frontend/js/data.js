// =========================================================
// MAXIBAZARD — Données produits (structure conforme à la BDD)
// Schéma : objects → couleur_objet → images_objet + taille_objets
// =========================================================

export const products = [

  // ── ID 1 : Beurre en Stick ────────────────────────────────
  {
    id: 1,
    nom: "Beurre en Stick Original",
    prix: 9,
    reduction: 15,
    genre: "Cuisine",
    description: "Découvrez la révolution du petit-déjeuner avec le Beurre en Stick Original. Conçu pour ceux qui détestent les miettes dans le beurrier et les couteaux sales, ce stick ergonomique vous permet de tartiner vos toasts, biscottes ou épis de maïs avec une facilité déconcertante. Son format compact et protecteur préserve toute la fraîcheur et l'onctuosité du beurre. Que vous soyez pressé le matin ou adepte du camping, c'est l'accessoire culinaire indispensable pour un dosage précis et sans gâchis.",
    couleurs: [
      {
        id: 1,
        nom: "Beurre Doux",
        images: [
          { chemin: "assets/images/BeureCole/BeureColle_Doux_1.jpg", isMain: true },
          { chemin: "assets/images/BeureCole/BeureColle_Doux_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Format Voyage 20g",    stock: 50  },
          { nom: "Format Standard 40g",  stock: 100 },
          { nom: "Format Familial 100g", stock: 30  }
        ]
      },
      {
        id: 2,
        nom: "Beurre Salé",
        images: [
          { chemin: "assets/images/BeureCole/BeureColle_Sale_1.jpg", isMain: true },
          { chemin: "assets/images/BeureCole/BeureColle_Sale_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Format Voyage 20g",    stock: 45 },
          { nom: "Format Standard 40g",  stock: 80 },
          { nom: "Format Familial 100g", stock: 25 }
        ]
      }
    ]
  },

  // ── ID 2 : Bougie Parfumée ────────────────────────────────
  {
    id: 2,
    nom: "Bougie Parfumée Gastronomique",
    prix: 11,
    reduction: 20,
    genre: "Maison",
    description: "Plongez votre intérieur dans une ambiance insolite avec notre collection de bougies gastronomiques. Conçues pour les amateurs de sensations olfactives audacieuses, ces bougies capturent l'essence même de vos plats préférés. Que vous optiez pour l'odeur d'un burger juteux ou d'une pizza sortant du four, chaque bougie est coulée à la main avec une cire végétale de qualité supérieure. Elles offrent une combustion propre et une diffusion puissante pour transformer votre salon en véritable temple de la gourmandise.",
    couleurs: [
      {
        id: 3,
        nom: "Senteur Burger",
        images: [
          { chemin: "assets/images/Bougies/Bougie_Burger_1.jpg", isMain: true },
          { chemin: "assets/images/Bougies/Bougie_Burger_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Petit Modèle (20h)", stock: 40 },
          { nom: "Grand Modèle (50h)", stock: 15 }
        ]
      },
      {
        id: 4,
        nom: "Senteur Pizza",
        images: [
          { chemin: "assets/images/Bougies/Bougie_Pizza_1.jpg", isMain: true },
          { chemin: "assets/images/Bougies/Bougie_Pizza_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Petit Modèle (20h)", stock: 35 },
          { nom: "Grand Modèle (50h)", stock: 20 }
        ]
      }
    ]
  },

  // ── ID 3 : Chaussettes Volaille ───────────────────────────
  {
    id: 3,
    nom: "Chaussettes Hautes Volaille",
    prix: 10,
    reduction: 30,
    genre: "Mode",
    description: "Affichez un style absolument unique et décalé jusqu'au bout des griffes avec nos célèbres Chaussettes Hautes Volaille. Conçues pour transformer vos jambes en pattes de canard ou de poulet, ces chaussettes sont fabriquées dans un coton peigné de haute qualité pour un confort thermique optimal. Que ce soit pour offrir un cadeau mémorable, pour briller lors d'une soirée déguisée ou simplement pour ajouter une dose d'humour à votre tenue de sport quotidienne, ces chaussettes ne passeront jamais inaperçues.",
    couleurs: [
      {
        id: 5,
        nom: "Modèle Canard",
        images: [
          { chemin: "assets/images/chaussette/chaussette_canard_1.jpg", isMain: true },
          { chemin: "assets/images/chaussette/chaussette_canard_2.jpg", isMain: false },
          { chemin: "assets/images/chaussette/chaussette_canard_3.jpg", isMain: false }
        ],
        tailles: [
          { nom: "35-39 (S/M)",  stock: 60 },
          { nom: "40-45 (L/XL)", stock: 40 }
        ]
      },
      {
        id: 6,
        nom: "Modèle Poulet",
        images: [
          { chemin: "assets/images/chaussette/chaussette_poulet_1.jpg", isMain: true },
          { chemin: "assets/images/chaussette/chaussette_poulet_2.jpg", isMain: false },
          { chemin: "assets/images/chaussette/chaussette_poulet_3.jpg", isMain: false }
        ],
        tailles: [
          { nom: "35-39 (S/M)",  stock: 55 },
          { nom: "40-45 (L/XL)", stock: 45 }
        ]
      }
    ]
  },

  // ── ID 4 : Coussins Poissons ──────────────────────────────
  {
    id: 4,
    nom: "Coussins Poissons Aquatiques",
    prix: 18,
    reduction: 10,
    genre: "Maison",
    description: "Apportez une touche d'originalité marine à votre décoration intérieure avec notre collection de coussins poissons. Que vous soyez fan du célèbre Blobfish au regard mélancolique ou de l'élégance argentée du Bar, ces coussins imprimés en haute définition offrent un réalisme saisissant. Conçus dans une matière douce et résistante, ils sont parfaits pour agrémenter un canapé ou une chambre d'enfant avec humour et confort. Un cadeau idéal pour les passionnés de nature et de design décalé !",
    couleurs: [
      {
        id: 7,
        nom: "Modèle Bar",
        images: [
          { chemin: "assets/images/Coussin/Coussin_Bar_1.jpg", isMain: true },
          { chemin: "assets/images/Coussin/Coussin_Bar_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Taille Unique", stock: 0 }
        ]
      },
      {
        id: 8,
        nom: "Modèle Blobfish",
        images: [
          { chemin: "assets/images/Coussin/Coussin_Blob_1.jpg", isMain: true },
          { chemin: "assets/images/Coussin/Coussin_Blob_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Taille Unique", stock: 42 }
        ]
      }
    ]
  },

  // ── ID 5 : Fourchette Télescopique ────────────────────────
  {
    id: 5,
    nom: "Fourchette Télescopique Anti-Vol",
    prix: 12,
    reduction: 15,
    genre: "Cuisine",
    description: "Ne laissez plus jamais personne piquer dans votre assiette ! Grâce à notre Fourchette Télescopique extensible jusqu'à un mètre, reprenez le contrôle de la table et allez vous servir directement dans l'assiette de vos voisins sans même vous lever. Fabriquée en acier inoxydable de haute qualité avec un manche ergonomique coloré, elle est l'outil indispensable pour les buffets, les fondues ou simplement pour les gourmands qui n'ont pas de limites. Un accessoire de cuisine aussi pratique que rigolo qui garantit des fous rires à chaque repas.",
    couleurs: [
      {
        id: 9,
        nom: "Manche Bleu",
        images: [
          { chemin: "assets/images/Fourchette/Fourchette_Bleu_1.jpg", isMain: true },
          { chemin: "assets/images/Fourchette/Fourchette_Bleu_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Modèle Standard (65cm)", stock: 20 },
          { nom: "Modèle Long (1 mètre)",  stock: 10 }
        ]
      },
      {
        id: 10,
        nom: "Manche Vert",
        images: [
          { chemin: "assets/images/Fourchette/Fourchette_verte_1.jpg", isMain: true },
          { chemin: "assets/images/Fourchette/Fourchette_verte_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Modèle Standard (65cm)", stock: 25 },
          { nom: "Modèle Long (1 mètre)",  stock: 5  }
        ]
      }
    ]
  },

  // ── ID 6 : Gant de Toilettage ─────────────────────────────
  {
    id: 6,
    nom: "Gant de Toilettage Professionnel",
    prix: 8,
    reduction: 20,
    genre: "Animaux",
    description: "Prenez soin de votre animal de compagnie avec notre gant de toilettage haute performance. Grâce à ses picots en silicone souple, il permet de retirer les poils morts tout en offrant un massage relaxant qui stimule la peau. Ce gant est l'accessoire idéal pour les périodes de mue, évitant ainsi que les poils ne s'accumulent sur vos meubles et vêtements. Sa conception ergonomique avec sangle ajustable assure une prise en main parfaite pour toutes les morphologies. Disponible en plusieurs coloris et tailles pour s'adapter à chaque propriétaire.",
    couleurs: [
      {
        id: 11,
        nom: "Blanc",
        images: [{ chemin: "assets/images/Gants/Gants_Blanc_1.jpg", isMain: true }],
        tailles: [
          { nom: "Taille S", stock: 15 },
          { nom: "Taille M", stock: 20 },
          { nom: "Taille L", stock: 10 }
        ]
      },
      {
        id: 12,
        nom: "Multis",
        images: [{ chemin: "assets/images/Gants/Gants_Multis_1.jpg", isMain: true }],
        tailles: [
          { nom: "Taille S", stock: 5  },
          { nom: "Taille M", stock: 12 },
          { nom: "Taille L", stock: 8  }
        ]
      },
      {
        id: 13,
        nom: "Noir",
        images: [{ chemin: "assets/images/Gants/Gants_Noir_1.jpg", isMain: true }],
        tailles: [
          { nom: "Taille S", stock: 10 },
          { nom: "Taille M", stock: 15 },
          { nom: "Taille L", stock: 1  }
        ]
      }
    ]
  },

  // ── ID 7 : Masque Animal Latex ────────────────────────────
  {
    id: 7,
    nom: "Masque d'Animal Réaliste en Latex",
    prix: 15,
    reduction: 20,
    genre: "Fête",
    description: "Devenez l'âme de la soirée avec nos masques d'animaux ultra-réalistes en latex de haute qualité. Que vous choisissiez la majesté du Cheval ou le regard fixe et hilarant du Pigeon, ces masques couvrent l'intégralité de la tête pour une transformation totale. Idéal pour les vidéos décalées, les carnavals ou pour surprendre vos amis, chaque masque dispose d'ouvertures discrètes pour une vision et une respiration optimales. Un accessoire indispensable pour ceux qui ne craignent pas le ridicule et cherchent un effet garanti à chaque apparition !",
    couleurs: [
      {
        id: 14,
        nom: "Modèle Cheval",
        images: [
          { chemin: "assets/images/Masques/Masque_Cheval_1.jpg", isMain: true },
          { chemin: "assets/images/Masques/Masque_Cheval_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Taille Enfant", stock: 10 },
          { nom: "Taille Adulte", stock: 25 }
        ]
      },
      {
        id: 15,
        nom: "Modèle Pigeon",
        images: [
          { chemin: "assets/images/Masques/Masque_Pigeon_1.jpg", isMain: true },
          { chemin: "assets/images/Masques/Masque_Pigeon_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Taille Enfant", stock: 8  },
          { nom: "Taille Adulte", stock: 30 }
        ]
      }
    ]
  },

  // ── ID 8 : Mini Aspirateur Gacha ──────────────────────────
  {
    id: 8,
    nom: "Mini Aspirateur de Bureau Gacha",
    prix: 14,
    reduction: 10,
    genre: "Bureau",
    description: "Dites adieu aux miettes de pain, à la poussière de gomme et aux petits débris qui envahissent votre espace de travail. Ce mini aspirateur de bureau, compact et puissant, est l'outil de nettoyage ultime pour les maniaques de la propreté. Son design ergonomique permet une prise en main facile et un passage rapide entre les touches de votre clavier ou sur vos documents. Fonctionnant sur piles ou via USB, il est aussi discret qu'efficace. Attention : la couleur est expédiée de manière aléatoire, ajoutant une petite touche de surprise à votre commande !",
    couleurs: [
      {
        id: 16,
        nom: "Couleur Aléatoire (Surprise)",
        images: [
          { chemin: "assets/images/MiniAspi/Aspi_1.jpg", isMain: true },
          { chemin: "assets/images/MiniAspi/Aspi_2.jpg", isMain: false },
          { chemin: "assets/images/MiniAspi/Aspi_3.jpg", isMain: false },
          { chemin: "assets/images/MiniAspi/Aspi_4.jpg", isMain: false },
          { chemin: "assets/images/MiniAspi/Aspi_5.jpg", isMain: false },
          { chemin: "assets/images/MiniAspi/Aspi_6.jpg", isMain: false },
          { chemin: "assets/images/MiniAspi/Aspi_7.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Puissance Éco (2000 Pa)",      stock: 50 },
          { nom: "Puissance Standard (4000 Pa)", stock: 35 },
          { nom: "Puissance Turbo (6000 Pa)",    stock: 15 }
        ]
      }
    ]
  },

  // ── ID 10 : Pentalon Oversize ─────────────────────────────
  {
    id: 10,
    nom: "Pentalon Oversize Relax",
    prix: 35,
    reduction: 20,
    genre: "Mode",
    description: "Adoptez un style décontracté et ultra-confortable avec notre Pentalon Oversize Relax. Conçu dans une matière fluide et respirante, ce pantalon est idéal pour vos journées de détente à la maison ou pour un look urbain audacieux. Sa coupe large permet une liberté de mouvement totale, tandis que sa taille élastique s'adapte à toutes les morphologies. Que vous choisissiez le jaune éclatant pour illuminer votre tenue ou le noir classique pour une élégance discrète, ce pentalon deviendra rapidement la pièce maîtresse de votre garde-robe estivale.",
    couleurs: [
      {
        id: 20,
        nom: "Jaune Éclatant",
        images: [
          { chemin: "assets/images/Pentalon/Pentalon_jaune_1.jpg", isMain: true },
          { chemin: "assets/images/Pentalon/Pentalon_jaune_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "S", stock: 15 }, { nom: "M", stock: 25 },
          { nom: "L", stock: 10 }, { nom: "XL", stock: 5 }
        ]
      },
      {
        id: 21,
        nom: "Noir Intense",
        images: [
          { chemin: "assets/images/Pentalon/Pentalon_noire_1.jpg", isMain: true },
          { chemin: "assets/images/Pentalon/Pentalon_noire_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "S", stock: 20 }, { nom: "M", stock: 30 },
          { nom: "L", stock: 15 }, { nom: "XL", stock: 8 }
        ]
      }
    ]
  },

  // ── ID 11 : Perruque Animaux ──────────────────────────────
  {
    id: 11,
    nom: "Perruque de Luxe pour Animaux",
    prix: 19,
    reduction: 15,
    genre: "Animaux",
    description: "Offrez à votre fidèle compagnon un relooking mémorable avec notre collection de perruques de luxe pour chiens et chats. Que ce soit pour une séance photo hilarante, une fête déguisée ou simplement pour transformer votre animal en star d'Instagram, ces perruques sont conçues pour un confort optimal. Elles disposent d'une sangle élastique ajustable pour rester bien en place sans gêner l'animal. Disponibles en plusieurs couleurs vibrantes, ces chevelures synthétiques de haute qualité garantissent un effet waouh et des fous rires à chaque utilisation !",
    couleurs: [
      {
        id: 22,
        nom: "Rose Poudré",
        images: [
          { chemin: "assets/images/Perruque/perruque_Rose_1.jpg", isMain: true },
          { chemin: "assets/images/Perruque/perruque_Rose_2.jpg", isMain: false },
          { chemin: "assets/images/Perruque/perruque_Rose_3.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Petit Chien / Chat", stock: 12 },
          { nom: "Grand Chien",        stock: 8  }
        ]
      },
      {
        id: 23,
        nom: "Vert Flashy",
        images: [
          { chemin: "assets/images/Perruque/perruque_vert_1.jpg", isMain: true },
          { chemin: "assets/images/Perruque/perruque_vert_2.jpg", isMain: false },
          { chemin: "assets/images/Perruque/perruque_vert_3.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Petit Chien / Chat", stock: 15 },
          { nom: "Grand Chien",        stock: 10 }
        ]
      },
      {
        id: 24,
        nom: "Violet Royal",
        images: [
          { chemin: "assets/images/Perruque/perruque_violet_1.jpg", isMain: true },
          { chemin: "assets/images/Perruque/perruque_violet_2.jpg", isMain: false },
          { chemin: "assets/images/Perruque/perruque_violet_3.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Petit Chien / Chat", stock: 20 },
          { nom: "Grand Chien",        stock: 5  }
        ]
      }
    ]
  },

  // ── ID 12 : Pet Rock / Stick ──────────────────────────────
  {
    id: 12,
    nom: "Compagnon de Vie Inerte (Pet Rock / Stick)",
    prix: 10,
    reduction: 5,
    genre: "Cadeau",
    description: "Marre des contraintes liées aux animaux classiques ? Découvrez nos nouveaux compagnons de vie garantis sans frais de vétérinaire, sans odeurs et sans poils sur le canapé ! Que vous choisissiez le Pet Rock pour sa stabilité légendaire ou le Pet Stick pour son dynamisme naturel, votre nouveau meilleur ami sera toujours là pour vous écouter sans jamais vous contredire. Livré dans son emballage écologique avec son certificat d'adoption officiel, c'est le cadeau idéal pour ceux qui ont déjà tout.",
    couleurs: [
      {
        id: 25,
        nom: "Pet Rock (Caillou)",
        images: [
          { chemin: "assets/images/Pet/Pet_Rock_1.jpg", isMain: true },
          { chemin: "assets/images/Pet/Pet_Rock_2.jpg", isMain: false },
          { chemin: "assets/images/Pet/Pet_Rock_3.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Format Poche",    stock: 40 },
          { nom: "Format Standard", stock: 25 }
        ]
      },
      {
        id: 26,
        nom: "Pet Stick (Bâton)",
        images: [
          { chemin: "assets/images/Pet/Pet_Stick_1.jpg", isMain: true },
          { chemin: "assets/images/Pet/Pet_Stick_2.jpg", isMain: false },
          { chemin: "assets/images/Pet/Pet_Stick_3.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Taille Brindille", stock: 30 },
          { nom: "Taille Branche",   stock: 15 }
        ]
      }
    ]
  },

  // ── ID 13 : Pistolet à Sauces ─────────────────────────────
  {
    id: 13,
    nom: "Pistolet à Sauces Rétro-Futuriste",
    prix: 15,
    reduction: 20,
    genre: "Cuisine",
    description: "Dégainez vos sauces plus vite que votre ombre avec le Pistolet à Condiments ultime ! Que vous soyez fan de Ketchup, de Mayonnaise ou de Moutarde, ce gadget transforme chaque barbecue en duel de saveurs. Son mécanisme de gâchette précis permet de doser parfaitement vos sauces sur vos hot-dogs, burgers ou frites sans aucune bavure. Fabriqué en plastique alimentaire robuste et facile à nettoyer, il est livré avec ses cartouches rechargeables. Un accessoire de cuisine indispensable pour ceux qui veulent mettre du fun dans leurs repas.",
    couleurs: [
      {
        id: 27,
        nom: "Édition Ketchup",
        images: [
          { chemin: "assets/images/Pistolet/Pistolet_Ketchup_1.jpg", isMain: true },
          { chemin: "assets/images/Pistolet/Pistolet_Ketchup_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Réservoir 100ml",    stock: 25 },
          { nom: "Réservoir XL 250ml", stock: 10 }
        ]
      },
      {
        id: 28,
        nom: "Édition Mayo",
        images: [
          { chemin: "assets/images/Pistolet/Pistolet_Mayo_1.jpg", isMain: true },
          { chemin: "assets/images/Pistolet/Pistolet_Mayo_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Réservoir 100ml",    stock: 15 },
          { nom: "Réservoir XL 250ml", stock: 5  }
        ]
      },
      {
        id: 29,
        nom: "Édition Moutarde",
        images: [
          { chemin: "assets/images/Pistolet/Pistolet_Moutarde_1.jpg", isMain: true },
          { chemin: "assets/images/Pistolet/Pistolet_Moutarde_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Réservoir 100ml",    stock: 20 },
          { nom: "Réservoir XL 250ml", stock: 12 }
        ]
      }
    ]
  },

  // ── ID 14 : Surligneurs Gastronomiques ────────────────────
  {
    id: 14,
    nom: "Surligneurs aux Senteurs Gastronomiques",
    prix: 5,
    reduction: 10,
    genre: "Bureau",
    description: "Rendez vos prises de notes inoubliables avec nos surligneurs aux parfums totalement improbables. Fini l'odeur classique du feutre, place aux arômes de Bacon grillé, de Poisson frais ou de Poulet rôti ! Chaque surligneur diffuse une fragrance intense dès que vous soulignez vos passages importants. Parfait pour s'ouvrir l'appétit en plein examen ou pour faire une blague originale à vos collègues de bureau. Une expérience olfactive unique qui donne enfin du goût à vos documents administratifs.",
    couleurs: [
      {
        id: 30,
        nom: "Parfum Bacon",
        images: [{ chemin: "assets/images/Surlignieur/Surlignieur_Bacon.jpg", isMain: true }],
        tailles: [
          { nom: "Pointe Fine (1mm)",  stock: 50 },
          { nom: "Pointe Large (4mm)", stock: 30 }
        ]
      },
      {
        id: 31,
        nom: "Parfum Poisson",
        images: [{ chemin: "assets/images/Surlignieur/Surlignieur_Poisson.jpg", isMain: true }],
        tailles: [
          { nom: "Pointe Fine (1mm)",  stock: 40 },
          { nom: "Pointe Large (4mm)", stock: 25 }
        ]
      },
      {
        id: 32,
        nom: "Parfum Poulet",
        images: [{ chemin: "assets/images/Surlignieur/Surlignieur_Poulet.jpg", isMain: true }],
        tailles: [
          { nom: "Pointe Fine (1mm)",  stock: 45 },
          { nom: "Pointe Large (4mm)", stock: 35 }
        ]
      }
    ]
  },

  // ── ID 15 : T-shirt Compression ──────────────────────────
  {
    id: 15,
    nom: "T-shirt de Compression Ultra-Performance",
    prix: 29,
    reduction: 15,
    genre: "Sport",
    description: "Repoussez vos limites avec notre gamme de T-shirts de compression V-T-shirt, conçus pour les athlètes exigeants. Grâce à leur technologie de compression ciblée, ces hauts favorisent la circulation sanguine et réduisent la fatigue musculaire pendant vos séances les plus intenses. Le tissu respirant évacue la transpiration pour vous garder au sec, tandis que les designs exclusifs vous offrent un look unique et motivant. Que vous soyez en plein squat ou sur un ring, ce t-shirt devient votre seconde peau pour une performance maximale.",
    couleurs: [
      {
        id: 33,
        nom: "Design Lightning",
        images: [{ chemin: "assets/images/V_T-shirt/V_T-shirt_Lightning.jpg", isMain: true }],
        tailles: [
          { nom: "S", stock: 10 }, { nom: "M", stock: 20 },
          { nom: "L", stock: 15 }, { nom: "XL", stock: 5 }
        ]
      },
      {
        id: 34,
        nom: "Design Majin",
        images: [{ chemin: "assets/images/V_T-shirt/V_T-shirt_Majin.jpg", isMain: true }],
        tailles: [
          { nom: "S", stock: 8  }, { nom: "M", stock: 25 },
          { nom: "L", stock: 12 }, { nom: "XL", stock: 10 }
        ]
      },
      {
        id: 35,
        nom: "Édition White",
        images: [{ chemin: "assets/images/V_T-shirt/V_T-shirt_White.jpg", isMain: true }],
        tailles: [
          { nom: "S", stock: 15 }, { nom: "M", stock: 30 },
          { nom: "L", stock: 20 }, { nom: "XL", stock: 7 }
        ]
      }
    ]
  },

  // ── ID 18 : Lisseur Papier Toilette ──────────────────────
  {
    id: 18,
    nom: "Lisseur Thermique SilkTouch pour Papier Toilette",
    prix: 45,
    reduction: 10,
    genre: "Maison",
    description: "Le luxe ultime s'invite dans votre salle de bain avec le SilkTouch. Ce défroisseur miniature USB permet de lisser chaque feuille de papier toilette pour une douceur et une planéité digne des plus grands palaces. Pourquoi accepter un papier froissé quand on peut avoir une texture parfaite ? Son design ergonomique et sa montée en température rapide transforment votre routine quotidienne en un moment de pur raffinement technologique. Livré avec son socle de charge élégant.",
    couleurs: [
      {
        id: 40,
        nom: "Bleu Saphir",
        images: [
          { chemin: "assets/images/Iron/Iron_bleu_1.jpg", isMain: true },
          { chemin: "assets/images/Iron/Iron_bleu_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Température Douce (40°C)", stock: 12 },
          { nom: "Mode Express (60°C)",      stock: 5  }
        ]
      },
      {
        id: 41,
        nom: "Rose Gold Édition",
        images: [
          { chemin: "assets/images/Iron/Iron_Rose_1.jpg", isMain: true },
          { chemin: "assets/images/Iron/Iron_Rose_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Température Douce (40°C)", stock: 10 },
          { nom: "Mode Express (60°C)",      stock: 8  }
        ]
      }
    ]
  },

  // ── ID 19 : Lunettes Trompe-l'œil ────────────────────────
  {
    id: 19,
    nom: "Lunettes Trompe-l'œil Vigilance",
    prix: 8,
    reduction: 0,
    genre: "Bureau",
    description: "Dormez partout, tout le temps, sans aucune conséquence sociale ! Ces lunettes révolutionnaires affichent des yeux peints d'un réalisme saisissant, donnant l'illusion que vous fixez votre interlocuteur avec une attention passionnée. Idéales pour les conférences, les cours magistraux ou les longs trajets, elles vous permettent de récupérer vos heures de sommeil tout en conservant une image professionnelle irréprochable. Ne pas utiliser en conduisant, évidemment.",
    couleurs: [
      {
        id: 42,
        nom: "Regard Bleu Alerte",
        images: [
          { chemin: "assets/images/lunettes/Lunette_Bleu_1.jpg", isMain: true },
          { chemin: "assets/images/lunettes/Lunette_Bleu_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Standard (Adulte)",     stock: 40 },
          { nom: "Taille Enfant (École)", stock: 15 }
        ]
      },
      {
        id: 43,
        nom: "Regard Vert Éveillé",
        images: [
          { chemin: "assets/images/lunettes/Lunette_Vert_1.jpg", isMain: true },
          { chemin: "assets/images/lunettes/Lunette_Vert_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Standard (Adulte)",     stock: 35 },
          { nom: "Taille Enfant (École)", stock: 20 }
        ]
      }
    ]
  },

  // ── ID 20 : Voiture Capsule Corp ──────────────────────────
  {
    id: 20,
    nom: "Voiture de Sport Rétractable (Capsule Corp)",
    prix: 1500,
    reduction: 10,
    genre: "Tech",
    description: "La révolution des transports est enfin là ! Ne perdez plus jamais de temps à chercher une place de parking. D'une simple pression sur le bouton d'activation, cette voiture de sport décapotable se rétracte instantanément dans une capsule de la taille d'un pamplemousse. Dotée d'une accélération fulgurante et d'un design rétro-futuriste iconique, elle allie la technologie Capsule Corp au luxe absolu. Livrée avec son étui de transport et un système de lancement sécurisé. Attention : ne pas activer à l'intérieur d'un petit appartement.",
    couleurs: [
      {
        id: 44,
        nom: "Bleu Cyan Classique",
        images: [
          { chemin: "assets/images/Voiture/Voiture_Bleu_1.jpg", isMain: true },
          { chemin: "assets/images/Voiture/Voiture_Bleu_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Moteur Standard",       stock: 3 },
          { nom: "Édition Super-Chargée", stock: 1 }
        ]
      },
      {
        id: 45,
        nom: "Orange Sport",
        images: [
          { chemin: "assets/images/Voiture/Voiture_Orange_1.jpg", isMain: true },
          { chemin: "assets/images/Voiture/Voiture_Orange_2.jpg", isMain: false }
        ],
        tailles: [
          { nom: "Moteur Standard",       stock: 2 },
          { nom: "Édition Super-Chargée", stock: 2 }
        ]
      }
    ]
  }

];

// ── Helpers ─────────────────────────────────────────────────

/** Image principale d'une couleur */
export function getMainImage(couleur) {
  return (couleur.images.find(i => i.isMain) || couleur.images[0])?.chemin || '';
}

/** 2e image d'une couleur (hover) */
export function getHoverImage(couleur) {
  const others = couleur.images.filter(i => !i.isMain);
  return others[0]?.chemin || getMainImage(couleur);
}

/** Image principale du produit (1re couleur) */
export function getProductMainImage(p) { return getMainImage(p.couleurs[0]); }

/** Image hover du produit (1re couleur) */
export function getProductHoverImage(p) { return getHoverImage(p.couleurs[0]); }

/** Prix final */
export function getPrixFinal(p) { return p.prix * (1 - p.reduction / 100); }

/** Stock total d'une couleur */
export function getColorStock(couleur) {
  return couleur.tailles.reduce((s, t) => s + t.stock, 0);
}

/** Stock total du produit */
export function getTotalStock(p) {
  return p.couleurs.reduce((sum, c) => sum + getColorStock(c), 0);
}
