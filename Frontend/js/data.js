// =========================================================
// MAXIBAZARD — Données produits
// Les images sont servies par Express via /assets/images/...
// Dossier assets/ est au même niveau que Frontend/ et Backend/
// =========================================================

const IMG = '/assets/images'; // Servi par app.use('/assets', express.static(...))

export const products = [

  // ── 1. Beurre en Stick ────────────────────────────────────
  {
    id: 1, nom: "Beurre en Stick Original", prix: 9, reduction: 15,
    genre: "Cuisine",
    description: "Découvrez la révolution du petit-déjeuner avec le Beurre en Stick Original. Conçu pour ceux qui détestent les miettes dans le beurrier et les couteaux sales, ce stick ergonomique vous permet de tartiner vos toasts, biscottes ou épis de maïs avec une facilité déconcertante. Son format compact et protecteur préserve toute la fraîcheur et l'onctuosité du beurre. Idéal au camping ou le matin pressé, pour un dosage précis et sans gâchis.",
    couleurs: [
      {
        id: 1, nom: "Beurre Doux",
        images: [
          { chemin: `${IMG}/BeureCole/BeureColle_Doux_1.jpg`, isMain: true },
          { chemin: `${IMG}/BeureCole/BeureColle_Doux_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Format Voyage 20g",    stock: 50  },
          { nom: "Format Standard 40g",  stock: 100 },
          { nom: "Format Familial 100g", stock: 30  }
        ]
      },
      {
        id: 2, nom: "Beurre Salé",
        images: [
          { chemin: `${IMG}/BeureCole/BeureColle_Sale_1.jpg`, isMain: true },
          { chemin: `${IMG}/BeureCole/BeureColle_Sale_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Format Voyage 20g",    stock: 45 },
          { nom: "Format Standard 40g",  stock: 80 },
          { nom: "Format Familial 100g", stock: 25 }
        ]
      }
    ]
  },

  // ── 2. Bougie Gastronomique ──────────────────────────────
  {
    id: 2, nom: "Bougie Parfumée Gastronomique", prix: 11, reduction: 20,
    genre: "Maison",
    description: "Plongez votre intérieur dans une ambiance insolite avec notre collection de bougies gastronomiques. Conçues pour les amateurs de sensations olfactives audacieuses, ces bougies capturent l'essence même de vos plats préférés. Que vous optiez pour l'odeur d'un burger juteux ou d'une pizza sortant du four, chaque bougie est coulée à la main avec une cire végétale de qualité supérieure pour une diffusion puissante.",
    couleurs: [
      {
        id: 3, nom: "Senteur Burger",
        images: [
          { chemin: `${IMG}/Bougies/Bougie_Burger_1.jpg`, isMain: true },
          { chemin: `${IMG}/Bougies/Bougie_Burger_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Petit Modèle (20h)", stock: 40 },
          { nom: "Grand Modèle (50h)", stock: 15 }
        ]
      },
      {
        id: 4, nom: "Senteur Pizza",
        images: [
          { chemin: `${IMG}/Bougies/Bougie_Pizza_1.jpg`, isMain: true },
          { chemin: `${IMG}/Bougies/Bougie_Pizza_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Petit Modèle (20h)", stock: 35 },
          { nom: "Grand Modèle (50h)", stock: 20 }
        ]
      }
    ]
  },

  // ── 3. Chaussettes Volaille ──────────────────────────────
  {
    id: 3, nom: "Chaussettes Hautes Volaille", prix: 10, reduction: 30,
    genre: "Mode",
    description: "Affichez un style absolument unique et décalé jusqu'au bout des griffes avec nos célèbres Chaussettes Hautes Volaille. Conçues pour transformer vos jambes en pattes de canard ou de poulet, elles sont fabriquées dans un coton peigné de haute qualité pour un confort thermique optimal. Que ce soit pour un cadeau mémorable, une soirée déguisée ou simplement pour ajouter une dose d'humour à votre quotidien, ces chaussettes ne passent jamais inaperçues.",
    couleurs: [
      {
        id: 5, nom: "Modèle Canard",
        images: [
          { chemin: `${IMG}/chaussette/chaussette_canard_1.jpg`, isMain: true },
          { chemin: `${IMG}/chaussette/chaussette_canard_2.jpg`, isMain: false },
          { chemin: `${IMG}/chaussette/chaussette_canard_3.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "35-39 (S/M)",  stock: 60 },
          { nom: "40-45 (L/XL)", stock: 40 }
        ]
      },
      {
        id: 6, nom: "Modèle Poulet",
        images: [
          { chemin: `${IMG}/chaussette/chaussette_poulet_1.jpg`, isMain: true },
          { chemin: `${IMG}/chaussette/chaussette_poulet_2.jpg`, isMain: false },
          { chemin: `${IMG}/chaussette/chaussette_poulet_3.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "35-39 (S/M)",  stock: 55 },
          { nom: "40-45 (L/XL)", stock: 45 }
        ]
      }
    ]
  },

  // ── 4. Coussins Poissons ─────────────────────────────────
  {
    id: 4, nom: "Coussins Poissons Aquatiques", prix: 18, reduction: 10,
    genre: "Maison",
    description: "Apportez une touche d'originalité marine à votre décoration intérieure avec notre collection de coussins poissons. Que vous soyez fan du Blobfish au regard mélancolique ou de l'élégance argentée du Bar, ces coussins imprimés en haute définition offrent un réalisme saisissant. Conçus dans une matière douce et résistante, parfaits pour agrémenter un canapé avec humour et confort. Le Modèle Bar est en rupture de stock !",
    couleurs: [
      {
        id: 7, nom: "Modèle Bar",
        images: [
          { chemin: `${IMG}/Coussin/Coussin_Bar_1.jpg`, isMain: true },
          { chemin: `${IMG}/Coussin/Coussin_Bar_2.jpg`, isMain: false }
        ],
        tailles: [{ nom: "Taille Unique", stock: 0 }]
      },
      {
        id: 8, nom: "Modèle Blobfish",
        images: [
          { chemin: `${IMG}/Coussin/Coussin_Blob_1.jpg`, isMain: true },
          { chemin: `${IMG}/Coussin/Coussin_Blob_2.jpg`, isMain: false }
        ],
        tailles: [{ nom: "Taille Unique", stock: 42 }]
      }
    ]
  },

  // ── 5. Fourchette Télescopique ───────────────────────────
  {
    id: 5, nom: "Fourchette Télescopique Anti-Vol", prix: 12, reduction: 15,
    genre: "Cuisine",
    description: "Ne laissez plus jamais personne piquer dans votre assiette ! Grâce à notre Fourchette Télescopique extensible jusqu'à un mètre, reprenez le contrôle de la table et allez vous servir directement dans l'assiette de vos voisins sans même vous lever. Fabriquée en acier inoxydable de haute qualité avec un manche ergonomique coloré, l'outil indispensable pour les buffets et les fondues.",
    couleurs: [
      {
        id: 9, nom: "Manche Bleu",
        images: [
          { chemin: `${IMG}/Fourchette/Fourchette_Bleu_1.jpg`, isMain: true },
          { chemin: `${IMG}/Fourchette/Fourchette_Bleu_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Modèle Standard (65cm)", stock: 20 },
          { nom: "Modèle Long (1 mètre)",  stock: 10 }
        ]
      },
      {
        id: 10, nom: "Manche Vert",
        images: [
          { chemin: `${IMG}/Fourchette/Fourchette_verte_1.jpg`, isMain: true },
          { chemin: `${IMG}/Fourchette/Fourchette_verte_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Modèle Standard (65cm)", stock: 25 },
          { nom: "Modèle Long (1 mètre)",  stock: 5  }
        ]
      }
    ]
  },

  // ── 6. Gant de Toilettage ────────────────────────────────
  {
    id: 6, nom: "Gant de Toilettage Professionnel", prix: 8, reduction: 20,
    genre: "Animaux",
    description: "Prenez soin de votre animal de compagnie avec notre gant de toilettage haute performance. Grâce à ses picots en silicone souple, il retire les poils morts tout en offrant un massage relaxant qui stimule la peau. Idéal pour les périodes de mue, il évite que les poils s'accumulent sur vos meubles et vêtements. Sa conception ergonomique avec sangle ajustable assure une prise en main parfaite pour toutes les morphologies.",
    couleurs: [
      {
        id: 11, nom: "Blanc",
        images: [
          { chemin: `${IMG}/gants/Gants_Blanc_1.jpg`, isMain: true },
          { chemin: `${IMG}/gants/Gants_Blanc_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Taille S", stock: 15 },
          { nom: "Taille M", stock: 20 },
          { nom: "Taille L", stock: 10 }
        ]
      },
      {
        id: 12, nom: "Multis",
        images: [
          { chemin: `${IMG}/gants/Gants_Multis_1.jpg`, isMain: true },
          { chemin: `${IMG}/gants/Gants_Multis_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Taille S", stock: 5  },
          { nom: "Taille M", stock: 12 },
          { nom: "Taille L", stock: 8  }
        ]
      },
      {
        id: 13, nom: "Noir",
        images: [
          { chemin: `${IMG}/gants/Gants_Noir_1.jpg`, isMain: true },
          { chemin: `${IMG}/gants/Gants_Noir_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Taille S", stock: 10 },
          { nom: "Taille M", stock: 15 },
          { nom: "Taille L", stock: 1  }
        ]
      }
    ]
  },

  // ── 7. Masque Animal Latex ───────────────────────────────
  {
    id: 7, nom: "Masque d'Animal Réaliste en Latex", prix: 15, reduction: 20,
    genre: "Fête",
    description: "Devenez l'âme de la soirée avec nos masques d'animaux ultra-réalistes en latex de haute qualité. Que vous choisissiez la majesté du Cheval ou le regard fixe et hilarant du Pigeon, ces masques couvrent l'intégralité de la tête pour une transformation totale. Idéal pour les carnavals, les vidéos décalées ou pour surprendre vos amis, avec ouvertures discrètes pour vision et respiration optimales.",
    couleurs: [
      {
        id: 14, nom: "Modèle Cheval",
        images: [
          { chemin: `${IMG}/Masques/Masque_Cheval_1.jpg`, isMain: true },
          { chemin: `${IMG}/Masques/Masque_Cheval_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Taille Enfant", stock: 10 },
          { nom: "Taille Adulte", stock: 25 }
        ]
      },
      {
        id: 15, nom: "Modèle Pigeon",
        images: [
          { chemin: `${IMG}/Masques/Masque_Pigeon_1.jpg`, isMain: true },
          { chemin: `${IMG}/Masques/Masque_Pigeon_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Taille Enfant", stock: 8  },
          { nom: "Taille Adulte", stock: 30 }
        ]
      }
    ]
  },

  // ── 8. Mini Aspirateur Gacha ─────────────────────────────
  {
    id: 8, nom: "Mini Aspirateur de Bureau Gacha", prix: 14, reduction: 10,
    genre: "Bureau",
    description: "Dites adieu aux miettes de pain, à la poussière de gomme et aux petits débris qui envahissent votre espace de travail. Ce mini aspirateur de bureau, compact et puissant, est l'outil de nettoyage ultime pour les maniaques de la propreté. Son design ergonomique permet une prise en main facile et un passage rapide entre les touches de votre clavier. La couleur est expédiée de manière aléatoire selon les stocks — surprise garantie !",
    couleurs: [
      {
        id: 16, nom: "Couleur Aléatoire (Surprise)",
        images: [
          { chemin: `${IMG}/MiniAspi/Aspi_1.jpg`, isMain: true  },
          { chemin: `${IMG}/MiniAspi/Aspi_2.jpg`, isMain: false },
          { chemin: `${IMG}/MiniAspi/Aspi_3.jpg`, isMain: false },
          { chemin: `${IMG}/MiniAspi/Aspi_4.jpg`, isMain: false },
          { chemin: `${IMG}/MiniAspi/Aspi_5.jpg`, isMain: false },
          { chemin: `${IMG}/MiniAspi/Aspi_6.jpg`, isMain: false },
          { chemin: `${IMG}/MiniAspi/Aspi_7.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Puissance Éco (2000 Pa)",      stock: 50 },
          { nom: "Puissance Standard (4000 Pa)", stock: 35 },
          { nom: "Puissance Turbo (6000 Pa)",    stock: 15 }
        ]
      }
    ]
  },

  // ── 10. Pentalon Oversize ────────────────────────────────
  {
    id: 10, nom: "Pentalon Oversize Relax", prix: 35, reduction: 20,
    genre: "Mode",
    description: "Adoptez un style décontracté et ultra-confortable avec notre Pentalon Oversize Relax. Conçu dans une matière fluide et respirante, ce pantalon est idéal pour vos journées de détente ou pour un look urbain audacieux. Sa coupe large permet une liberté de mouvement totale, tandis que la taille élastique s'adapte à toutes les morphologies. Disponible en jaune éclatant ou noir intense, il devient rapidement la pièce maîtresse de votre garde-robe.",
    couleurs: [
      {
        id: 20, nom: "Jaune Éclatant",
        images: [
          { chemin: `${IMG}/Pentalon/Pentalon_jaune_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Pentalon/Pentalon_jaune_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "S", stock: 15 }, { nom: "M", stock: 25 },
          { nom: "L", stock: 10 }, { nom: "XL", stock: 5 }
        ]
      },
      {
        id: 21, nom: "Noir Intense",
        images: [
          { chemin: `${IMG}/Pentalon/Pentalon_noire_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Pentalon/Pentalon_noire_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "S", stock: 20 }, { nom: "M", stock: 30 },
          { nom: "L", stock: 15 }, { nom: "XL", stock: 8 }
        ]
      }
    ]
  },

  // ── 11. Perruque Animaux ─────────────────────────────────
  {
    id: 11, nom: "Perruque de Luxe pour Animaux", prix: 19, reduction: 15,
    genre: "Animaux",
    description: "Offrez à votre fidèle compagnon un relooking mémorable avec notre collection de perruques de luxe pour chiens et chats. Que ce soit pour une séance photo hilarante ou une fête déguisée, ces perruques sont conçues pour un confort optimal grâce à leur sangle élastique ajustable. Disponibles en Rose Poudré, Vert Flashy et Violet Royal, ces chevelures synthétiques de haute qualité garantissent un effet waouh à chaque utilisation.",
    couleurs: [
      {
        id: 22, nom: "Rose Poudré",
        images: [
          { chemin: `${IMG}/Perruque/perruque_Rose_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Perruque/perruque_Rose_2.jpg`, isMain: false },
          { chemin: `${IMG}/Perruque/perruque_Rose_3.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Petit Chien / Chat", stock: 12 },
          { nom: "Grand Chien",        stock: 8  }
        ]
      },
      {
        id: 23, nom: "Vert Flashy",
        images: [
          { chemin: `${IMG}/Perruque/perruque_vert_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Perruque/perruque_vert_2.jpg`, isMain: false },
          { chemin: `${IMG}/Perruque/perruque_vert_3.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Petit Chien / Chat", stock: 15 },
          { nom: "Grand Chien",        stock: 10 }
        ]
      },
      {
        id: 24, nom: "Violet Royal",
        images: [
          { chemin: `${IMG}/Perruque/perruque_violet_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Perruque/perruque_violet_2.jpg`, isMain: false },
          { chemin: `${IMG}/Perruque/perruque_violet_3.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Petit Chien / Chat", stock: 20 },
          { nom: "Grand Chien",        stock: 5  }
        ]
      }
    ]
  },

  // ── 12. Pet Rock / Stick ─────────────────────────────────
  {
    id: 12, nom: "Compagnon de Vie Inerte (Pet Rock / Stick)", prix: 10, reduction: 5,
    genre: "Cadeau",
    description: "Marre des contraintes liées aux animaux classiques ? Découvrez nos compagnons de vie garantis sans frais de vétérinaire, sans odeurs et sans poils sur le canapé ! Que vous choisissiez le Pet Rock pour sa stabilité légendaire ou le Pet Stick pour son dynamisme naturel, votre nouveau meilleur ami sera toujours là pour vous écouter. Livré dans son emballage écologique avec son certificat d'adoption officiel.",
    couleurs: [
      {
        id: 25, nom: "Pet Rock (Caillou)",
        images: [
          { chemin: `${IMG}/Pet/Pet_Rock_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Pet/Pet_Rock_2.jpg`, isMain: false },
          { chemin: `${IMG}/Pet/Pet_Rock_3.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Format Poche",    stock: 40 },
          { nom: "Format Standard", stock: 25 }
        ]
      },
      {
        id: 26, nom: "Pet Stick (Bâton)",
        images: [
          { chemin: `${IMG}/Pet/Pet_Stick_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Pet/Pet_Stick_2.jpg`, isMain: false },
          { chemin: `${IMG}/Pet/Pet_Stick_3.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Taille Brindille", stock: 30 },
          { nom: "Taille Branche",   stock: 15 }
        ]
      }
    ]
  },

  // ── 13. Pistolet à Sauces ────────────────────────────────
  {
    id: 13, nom: "Pistolet à Sauces Rétro-Futuriste", prix: 15, reduction: 20,
    genre: "Cuisine",
    description: "Dégainez vos sauces plus vite que votre ombre avec le Pistolet à Condiments ultime ! Que vous soyez fan de Ketchup, de Mayonnaise ou de Moutarde, ce gadget transforme chaque barbecue en duel de saveurs. Son mécanisme de gâchette précis dose parfaitement vos sauces sur vos hot-dogs, burgers ou frites sans aucune bavure. Fabriqué en plastique alimentaire robuste et facile à nettoyer.",
    couleurs: [
      {
        id: 27, nom: "Édition Ketchup",
        images: [
          { chemin: `${IMG}/Pistolet/Pistolet_Ketchup_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Pistolet/Pistolet_Ketchup_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Réservoir 100ml",    stock: 25 },
          { nom: "Réservoir XL 250ml", stock: 10 }
        ]
      },
      {
        id: 28, nom: "Édition Mayo",
        images: [
          { chemin: `${IMG}/Pistolet/Pistolet_Mayo_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Pistolet/Pistolet_Mayo_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Réservoir 100ml",    stock: 15 },
          { nom: "Réservoir XL 250ml", stock: 5  }
        ]
      },
      {
        id: 29, nom: "Édition Moutarde",
        images: [
          { chemin: `${IMG}/Pistolet/Pistolet_Moutarde_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Pistolet/Pistolet_Moutarde_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Réservoir 100ml",    stock: 20 },
          { nom: "Réservoir XL 250ml", stock: 12 }
        ]
      }
    ]
  },

  // ── 14. Surligneurs Gastronomiques ───────────────────────
  {
    id: 14, nom: "Surligneurs aux Senteurs Gastronomiques", prix: 5, reduction: 10,
    genre: "Bureau",
    description: "Rendez vos prises de notes inoubliables avec nos surligneurs aux parfums totalement improbables. Fini l'odeur classique du feutre, place aux arômes de Bacon grillé, de Poisson frais ou de Poulet rôti ! Chaque surligneur diffuse une fragrance intense dès que vous soulignez vos passages importants. Une expérience olfactive unique qui donne enfin du goût à vos documents administratifs.",
    couleurs: [
      {
        id: 30, nom: "Parfum Bacon",
        images: [{ chemin: `${IMG}/Surlignieur/Surlignieur_Bacon.jpg`, isMain: true }],
        tailles: [
          { nom: "Pointe Fine (1mm)",  stock: 50 },
          { nom: "Pointe Large (4mm)", stock: 30 }
        ]
      },
      {
        id: 31, nom: "Parfum Poisson",
        images: [{ chemin: `${IMG}/Surlignieur/Surlignieur_Poisson.jpg`, isMain: true }],
        tailles: [
          { nom: "Pointe Fine (1mm)",  stock: 40 },
          { nom: "Pointe Large (4mm)", stock: 25 }
        ]
      },
      {
        id: 32, nom: "Parfum Poulet",
        images: [{ chemin: `${IMG}/Surlignieur/Surlignieur_Poulet.jpg`, isMain: true }],
        tailles: [
          { nom: "Pointe Fine (1mm)",  stock: 45 },
          { nom: "Pointe Large (4mm)", stock: 35 }
        ]
      }
    ]
  },

  // ── 15. T-shirt Compression ──────────────────────────────
  {
    id: 15, nom: "T-shirt de Compression Ultra-Performance", prix: 29, reduction: 15,
    genre: "Sport",
    description: "Repoussez vos limites avec notre gamme de T-shirts de compression V-T-shirt, conçus pour les athlètes exigeants. Leur technologie de compression ciblée favorise la circulation sanguine et réduit la fatigue musculaire pendant vos séances les plus intenses. Le tissu respirant évacue la transpiration pour vous garder au sec, tandis que les designs exclusifs vous offrent un look unique.",
    couleurs: [
      {
        id: 33, nom: "Design Lightning",
        images: [{ chemin: `${IMG}/V_T-shirt/V_T-shirt_Lightning.jpg`, isMain: true }],
        tailles: [
          { nom: "S", stock: 10 }, { nom: "M", stock: 20 },
          { nom: "L", stock: 15 }, { nom: "XL", stock: 5 }
        ]
      },
      {
        id: 34, nom: "Design Majin",
        images: [{ chemin: `${IMG}/V_T-shirt/V_T-shirt_Majin.jpg`, isMain: true }],
        tailles: [
          { nom: "S", stock: 8  }, { nom: "M", stock: 25 },
          { nom: "L", stock: 12 }, { nom: "XL", stock: 10 }
        ]
      },
      {
        id: 35, nom: "Édition White",
        images: [{ chemin: `${IMG}/V_T-shirt/V_T-shirt_White.jpg`, isMain: true }],
        tailles: [
          { nom: "S", stock: 15 }, { nom: "M", stock: 30 },
          { nom: "L", stock: 20 }, { nom: "XL", stock: 7 }
        ]
      }
    ]
  },

  // ── 18. Lisseur Papier Toilette ──────────────────────────
  {
    id: 18, nom: "Lisseur Thermique SilkTouch pour Papier Toilette", prix: 45, reduction: 10,
    genre: "Maison",
    description: "Le luxe ultime s'invite dans votre salle de bain avec le SilkTouch. Ce défroisseur miniature USB permet de lisser chaque feuille de papier toilette pour une douceur et une planéité digne des plus grands palaces. Son design ergonomique et sa montée en température rapide transforment votre routine quotidienne en moment de pur raffinement technologique. Livré avec son socle de charge élégant.",
    couleurs: [
      {
        id: 40, nom: "Bleu Saphir",
        images: [
          { chemin: `${IMG}/Iron/Iron_bleu_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Iron/Iron_bleu_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Température Douce (40°C)", stock: 12 },
          { nom: "Mode Express (60°C)",      stock: 5  }
        ]
      },
      {
        id: 41, nom: "Rose Gold Édition",
        images: [
          { chemin: `${IMG}/Iron/Iron_Rose_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Iron/Iron_Rose_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Température Douce (40°C)", stock: 10 },
          { nom: "Mode Express (60°C)",      stock: 8  }
        ]
      }
    ]
  },

  // ── 19. Lunettes Trompe-l'œil ────────────────────────────
  {
    id: 19, nom: "Lunettes Trompe-l'œil Vigilance", prix: 8, reduction: 0,
    genre: "Bureau",
    description: "Dormez partout, tout le temps, sans aucune conséquence sociale ! Ces lunettes révolutionnaires affichent des yeux peints d'un réalisme saisissant, donnant l'illusion que vous fixez votre interlocuteur avec une attention passionnée. Idéales pour les conférences, les cours magistraux ou les longs trajets, elles vous permettent de récupérer vos heures de sommeil tout en conservant une image professionnelle. Ne pas utiliser en conduisant.",
    couleurs: [
      {
        id: 42, nom: "Regard Bleu Alerte",
        images: [
          { chemin: `${IMG}/lunettes/Lunette_Bleu_1.jpg`, isMain: true  },
          { chemin: `${IMG}/lunettes/Lunette_Bleu_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Standard (Adulte)",     stock: 40 },
          { nom: "Taille Enfant (École)", stock: 15 }
        ]
      },
      {
        id: 43, nom: "Regard Vert Éveillé",
        images: [
          { chemin: `${IMG}/lunettes/Lunette_Vert_1.jpg`, isMain: true  },
          { chemin: `${IMG}/lunettes/Lunette_Vert_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Standard (Adulte)",     stock: 35 },
          { nom: "Taille Enfant (École)", stock: 20 }
        ]
      }
    ]
  },

  // ── 20. Voiture Capsule Corp ─────────────────────────────
  {
    id: 20, nom: "Voiture de Sport Rétractable (Capsule Corp)", prix: 1500, reduction: 10,
    genre: "Tech",
    description: "La révolution des transports est enfin là ! Ne perdez plus jamais de temps à chercher une place de parking. D'une simple pression sur le bouton d'activation, cette voiture de sport décapotable se rétracte instantanément dans une capsule de la taille d'un pamplemousse. Dotée d'une accélération fulgurante et d'un design rétro-futuriste iconique, elle allie la technologie Capsule Corp au luxe absolu.",
    couleurs: [
      {
        id: 44, nom: "Bleu Cyan Classique",
        images: [
          { chemin: `${IMG}/Voiture/Voiture_Bleu_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Voiture/Voiture_Bleu_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Moteur Standard",       stock: 3 },
          { nom: "Édition Super-Chargée", stock: 1 }
        ]
      },
      {
        id: 45, nom: "Orange Sport",
        images: [
          { chemin: `${IMG}/Voiture/Voiture_Orange_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Voiture/Voiture_Orange_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Moteur Standard",       stock: 2 },
          { nom: "Édition Super-Chargée", stock: 2 }
        ]
      }
    ]
  },

  // ── 21. Cravate Originale ────────────────────────────────
  {
    id: 21, nom: "Cravate Originale Tendance", prix: 22, reduction: 0,
    genre: "Mode",
    description: "Révolutionnez votre look professionnel avec notre Cravate Originale Tendance. Tissée dans un polyester satiné de haute qualité avec une doublure renforcée, elle offre un tombé parfait et une tenue irréprochable toute la journée. Sa largeur contemporaine de 7,5 cm s'adapte à tous les styles de cols. Disponible en Bleu Pétrole élégant et Vert Forêt audacieux, elle assortit aussi bien un costume classique qu'une chemise décontractée.",
    couleurs: [
      {
        id: 46, nom: "Bleu Pétrole",
        images: [
          { chemin: `${IMG}/Cravate/Cravate_Bleu_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Cravate/Cravate_Bleu_2.jpg`, isMain: false },
          { chemin: `${IMG}/Cravate/Cravate_Bleu_3.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Longueur Standard (150cm)", stock: 30 },
          { nom: "Longueur Tall (160cm)",     stock: 15 }
        ]
      },
      {
        id: 47, nom: "Vert Forêt",
        images: [
          { chemin: `${IMG}/Cravate/Cravate_Verte_1.jpg`, isMain: true  },
          { chemin: `${IMG}/Cravate/Cravate_Verte_2.jpg`, isMain: false },
          { chemin: `${IMG}/Cravate/Cravate_Verte_3.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "Longueur Standard (150cm)", stock: 25 },
          { nom: "Longueur Tall (160cm)",     stock: 10 }
        ]
      }
    ]
  },

  // ── 22. Grille-Pain Artistique ───────────────────────────
  {
    id: 22, nom: "Grille-Pain Artistique Design", prix: 55, reduction: 25,
    genre: "Cuisine",
    description: "Transformez votre petit-déjeuner en œuvre d'art avec notre Grille-Pain Artistique Design. Doté d'une plaque gravée laser qui imprime un motif original sur chaque tranche, il redéfinit le concept du toast quotidien. Sa résistance en quartz garantit une chauffe ultra-rapide et homogène en 45 secondes. Le plateau ramasse-miettes coulissant facilite l'entretien. Compatible pains artisanaux jusqu'à 3,5 cm d'épaisseur.",
    couleurs: [
      {
        id: 48, nom: "Gris Anthracite",
        images: [
          { chemin: `${IMG}/GrillePain/Grille_Gris_1.jpg`, isMain: true  },
          { chemin: `${IMG}/GrillePain/Grille_Gris_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "2 Fentes", stock: 18 },
          { nom: "4 Fentes", stock: 8  }
        ]
      },
      {
        id: 49, nom: "Rouge Passion",
        images: [
          { chemin: `${IMG}/GrillePain/Grille_Rouge_1.jpg`, isMain: true  },
          { chemin: `${IMG}/GrillePain/Grille_Rouge_2.jpg`, isMain: false }
        ],
        tailles: [
          { nom: "2 Fentes", stock: 22 },
          { nom: "4 Fentes", stock: 12 }
        ]
      }
    ]
  },

  // ── 23. Traducteur Animal ────────────────────────────────
  {
    id: 23, nom: "Traducteur Universel Animal-Humain", prix: 39, reduction: 0,
    genre: "Animaux",
    description: "Enfin comprendre ce que votre animal essaie de vous dire ! Le Traducteur Universel Animal-Humain analyse les fréquences vocales et comportements de votre chat ou chien via son microphone ultra-sensible et son capteur de mouvement 3D. L'application gratuite décode en temps réel jusqu'à 200 expressions émotionnelles. Résultats garantis à 97% de précision — ou remboursé. Compatible iOS et Android.",
    couleurs: [
      {
        id: 50, nom: "Édition Chat",
        images: [{ chemin: `${IMG}/Traducteur/Traducteur_Chat.jpg`, isMain: true }],
        tailles: [
          { nom: "Modèle Standard",   stock: 28 },
          { nom: "Modèle Pro (BT5.0)", stock: 12 }
        ]
      },
      {
        id: 51, nom: "Édition Chien",
        images: [{ chemin: `${IMG}/Traducteur/Traducteur_Dog.jpg`, isMain: true }],
        tailles: [
          { nom: "Modèle Standard",   stock: 33 },
          { nom: "Modèle Pro (BT5.0)", stock: 9  }
        ]
      }
    ]
  }

];

// ── Helpers ───────────────────────────────────────────────

export function getMainImage(couleur) {
  return (couleur.images.find(i => i.isMain) || couleur.images[0])?.chemin || '';
}
export function getHoverImage(couleur) {
  const others = couleur.images.filter(i => !i.isMain);
  return others[0]?.chemin || getMainImage(couleur);
}
export function getProductMainImage(p)  { return getMainImage(p.couleurs[0]); }
export function getProductHoverImage(p) { return getHoverImage(p.couleurs[0]); }
export function getPrixFinal(p)         { return p.prix * (1 - p.reduction / 100); }
export function getColorStock(c)        { return c.tailles.reduce((s, t) => s + t.stock, 0); }
export function getTotalStock(p)        { return p.couleurs.reduce((s, c) => s + getColorStock(c), 0); }
