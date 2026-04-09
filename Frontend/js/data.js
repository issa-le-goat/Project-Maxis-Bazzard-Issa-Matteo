// =========================================================
// MAXIBAZARD — Catalogue des produits
// =========================================================

export const products = [
  // ── MINI ASPIRATEUR ──────────────────────────────────────
  {
    id: "REF-001",
    name: "Mini Aspirateur USB Blanc",
    description: "Révolutionnez votre bureau avec ce mini aspirateur USB compact et ultra-silencieux. Conçu pour aspirer miettes, poussières et débris entre les touches de votre clavier, il se branche directement sur un port USB. Léger (80g), il se range discrètement dans un tiroir. Inclut 2 embouts interchangeables. La solution propre pour un espace de travail impeccable.",
    stock: 42,
    price: 29.99,
    discount: 0,
    currency: "€",
    images: [
      "assets/images/MiniAspi/Aspi_1.jpg",
      "assets/images/MiniAspi/Aspi_2.jpg",
      "assets/images/MiniAspi/Aspi_3.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Aspirateur",
      colors: ["Blanc", "Gris"],
      sizes: ["Unique"],
      material: "Plastique ABS",
      dimensions: "15 × 5 × 5 cm"
    }
  },
  {
    id: "REF-002",
    name: "Mini Aspirateur USB Rose Pastel",
    description: "Même puissance d'aspiration que notre modèle standard, dans une teinte rose pastel qui illumine votre bureau. Ce mini aspirateur USB s'accompagne d'embouts colorés assortis et d'un câble tressé de 80 cm ultra-résistant. Garanti sans bruit parasite grâce à son moteur brushless. Un cadeau idéal pour ceux qui conjuguent esthétique et fonctionnalité au quotidien.",
    stock: 18,
    price: 29.99,
    discount: 15,
    currency: "€",
    images: [
      "assets/images/MiniAspi/Aspi_4.jpg",
      "assets/images/MiniAspi/Aspi_5.jpg",
      "assets/images/MiniAspi/Aspi_6.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Aspirateur",
      colors: ["Rose", "Lilas"],
      sizes: ["Unique"],
      material: "Plastique ABS",
      dimensions: "15 × 5 × 5 cm"
    }
  },
  {
    id: "REF-003",
    name: "Mini Aspirateur Édition Collector",
    description: "Notre aspirateur de bureau dans une finition collector bicolore premium. Équipé d'un filtre HEPA lavable et d'une aspiration renforcée 3x plus puissante que les modèles standard. Idéal pour les créatifs, les gamers et tous ceux qui méritent le meilleur. Livré dans son écrin rigide avec 3 embouts spéciaux (clavier, écran, mobilier). Satisfaction garantie ou remboursé.",
    stock: 9,
    price: 34.99,
    discount: 0,
    currency: "€",
    images: [
      "assets/images/MiniAspi/Aspi_7.jpg",
      "assets/images/MiniAspi/Aspi_1.jpg",
      "assets/images/MiniAspi/Aspi_4.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Aspirateur",
      colors: ["Bicolore", "Édition Limitée"],
      sizes: ["Unique"],
      material: "Plastique premium",
      dimensions: "15 × 5 × 5 cm"
    }
  },

  // ── PARAPLUIE-CHAUSSURE ──────────────────────────────────
  {
    id: "REF-004",
    name: "Parapluie-Chaussure™ Bleu Ciel",
    description: "L'invention révolutionnaire qui protège vos chaussures de la pluie sans vous mouiller les mains ! Le Parapluie-Chaussure™ se fixe en 3 secondes sur n'importe quelle semelle. Son tissu imperméable Teflon repousse 100% de l'eau. Compact plié (12 cm), il rentre dans votre sac. En coloris bleu ciel, il assortira parfaitement vos tenues printanières. Brevet déposé.",
    stock: 35,
    price: 24.99,
    discount: 20,
    currency: "€",
    images: [
      "assets/images/ParapluiChaussure/ParapluiChaussure_Bleu_1.jpg",
      "assets/images/ParapluiChaussure/ParapluiChaussure_Bleu_2.jpg",
      "assets/images/ParapluiChaussure/ParapluiChaussure_Bleu_3.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Accessoire",
      colors: ["Bleu", "Bleu Ciel"],
      sizes: ["S (38-40)", "M (41-43)", "L (44-46)"],
      material: "Nylon Teflon",
      dimensions: "Plié : 12 cm"
    }
  },
  {
    id: "REF-005",
    name: "Parapluie-Chaussure™ Jaune Soleil",
    description: "Le Parapluie-Chaussure™ version soleil qui égaie les jours de pluie ! Son coloris jaune vif illumine immédiatement n'importe quelle tenue grise de novembre. Tissu imperméable traité Teflon Pro, monture renforcée en aluminium anodisé résistant au vent jusqu'à 80 km/h. Système clip universel breveté, compatible toutes marques. Rendez la pluie amusante avec Maxibazard !",
    stock: 50,
    price: 24.99,
    discount: 0,
    currency: "€",
    images: [
      "assets/images/ParapluiChaussure/ParapluiChaussure_Jaune_1.jpg",
      "assets/images/ParapluiChaussure/ParapluiChaussure_Jaune_2.jpg",
      "assets/images/ParapluiChaussure/ParapluiChaussure_Jaune_3.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Accessoire",
      colors: ["Jaune", "Jaune Soleil"],
      sizes: ["S (38-40)", "M (41-43)", "L (44-46)"],
      material: "Nylon Teflon Pro",
      dimensions: "Plié : 12 cm"
    }
  },
  {
    id: "REF-006",
    name: "Parapluie-Chaussure™ Rouge Passion",
    description: "Affirmez votre style même sous la pluie avec le Parapluie-Chaussure™ en rouge passion. Cette édition est fabriquée dans un nylon haute densité imperméable et résistant aux UV pour conserver sa couleur vive saison après saison. Le clip renforcé titane supporte des chaussures jusqu'à 2 kg. Parfait pour talons aiguilles, rangers et sneakers premium. Élégance et protection absolues.",
    stock: 27,
    price: 24.99,
    discount: 10,
    currency: "€",
    images: [
      "assets/images/ParapluiChaussure/ParapluiChaussure_Rouge_1.jpg",
      "assets/images/ParapluiChaussure/ParapluiChaussure_Rouge_2.jpg",
      "assets/images/ParapluiChaussure/ParapluiChaussure_Rouge_3.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Accessoire",
      colors: ["Rouge", "Rouge Carmin"],
      sizes: ["S (38-40)", "M (41-43)", "L (44-46)"],
      material: "Nylon HD + Titane",
      dimensions: "Plié : 12 cm"
    }
  },

  // ── FOURCHETTE GÉANTE ─────────────────────────────────────
  {
    id: "REF-007",
    name: "Fourchette XL Déco Bleue",
    description: "Cette fourchette géante en résine colorée est l'accessoire déco absolu pour cuisine, salle à manger ou soirée à thème. Mesurant 45 cm de long, elle impressionne les convives et garantit des photos mémorables. Résine non toxique alimentaire, lavable à l'eau tiède. Peut servir de spatule XL pour barbecue ou de simple objet décoratif mural. 100% conversation starter garanti.",
    stock: 60,
    price: 12.99,
    discount: 0,
    currency: "€",
    images: [
      "assets/images/Fourchette/Fourchette_Bleu_1.jpg",
      "assets/images/Fourchette/Fourchette_Bleu_2.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Vaisselle",
      colors: ["Bleu", "Bleu Électrique"],
      sizes: ["45 cm", "60 cm"],
      material: "Résine alimentaire",
      dimensions: "45 × 7 cm"
    }
  },
  {
    id: "REF-008",
    name: "Fourchette XL Déco Verte",
    description: "Version verte de notre fourchette géante iconique, pour les amateurs de nature et d'excentricité végétale. La teinte vert forêt mat apporte une touche organique et chic à n'importe quel intérieur. Fabriquée en résine haute densité, elle est parfaitement lestée pour tenir debout ou s'accrocher au mur via son œillet discret. Le cadeau parfait pour le foodie qui a déjà tout, sauf ça.",
    stock: 45,
    price: 12.99,
    discount: 25,
    currency: "€",
    images: [
      "assets/images/Fourchette/Fourchette_verte_1.jpg",
      "assets/images/Fourchette/Fourchette_verte_2.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Vaisselle",
      colors: ["Vert", "Vert Forêt"],
      sizes: ["45 cm", "60 cm"],
      material: "Résine haute densité",
      dimensions: "45 × 7 cm"
    }
  },

  // ── COUSSIN ───────────────────────────────────────────────
  {
    id: "REF-009",
    name: "Coussin Barre de Gym",
    description: "Dormez comme un champion avec ce coussin en forme de barre d'haltérophilie. Rembourrage en mousse à mémoire de forme 100% polyuréthane pour un soutien cervical parfait. Housse en velours ultra-doux amovible et lavable à 30°C. Idéal pour motiver vos matins ou décorer la chambre d'un sportif. Ce coussin est l'union parfaite entre passion du sport et détente absolue du weekend.",
    stock: 25,
    price: 39.99,
    discount: 0,
    currency: "€",
    images: [
      "assets/images/Coussin/Coussin_Bar_1.jpg",
      "assets/images/Coussin/Coussin_Bar_2.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Décoration",
      colors: ["Gris", "Noir"],
      sizes: ["40 cm", "55 cm"],
      material: "Velours + Mousse mémoire",
      dimensions: "55 × 20 × 10 cm"
    }
  },
  {
    id: "REF-010",
    name: "Coussin Blob Relax XL",
    description: "Le coussin dont la forme est indéfinissable, et c'est précisément ce qui le rend irrésistible. Le Coussin Blob Relax adopte spontanément la forme idéale pour votre nuque, vos lombaires ou vos pieds. Rembourrage en billes de polystyrène recyclé haute densité. Housse zippée lavable. Ce coussin anti-conventionnel est le compagnon idéal des séances de lecture, gaming ou sieste philosophique.",
    stock: 30,
    price: 44.99,
    discount: 10,
    currency: "€",
    images: [
      "assets/images/Coussin/Coussin_Blob_1.jpg",
      "assets/images/Coussin/Coussin_Blob_2.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Décoration",
      colors: ["Beige", "Crème", "Taupe"],
      sizes: ["M (50 cm)", "XL (70 cm)"],
      material: "Micro-suède + Billes recyclées",
      dimensions: "50 × 50 × 15 cm"
    }
  },

  // ── BEURRE COLLÉ ─────────────────────────────────────────
  {
    id: "REF-011",
    name: "Beurre Collé Doux Premium",
    description: "Le Beurre Collé Doux Premium est une révolution dans la tartination. Sa formule exclusive adhère parfaitement à toutes les surfaces (pain, biscottes, crêpes) sans effort ni déchirement. Fabriqué à partir de lait de vache Normande élevée en plein air, il fond à 28°C pour une onctuosité maximale. Conditionné dans son pot rechargeable en verre. Tartinez comme jamais vous n'avez tartiné.",
    stock: 100,
    price: 8.99,
    discount: 0,
    currency: "€",
    images: [
      "assets/images/BeureCole/BeureColle_Doux_1.jpg",
      "assets/images/BeureCole/BeureColle_Doux_2.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Cuisine",
      colors: ["Naturel"],
      sizes: ["125g", "250g", "500g"],
      material: "Beurre 82% MG",
      dimensions: "Pot verre rechargeable"
    }
  },
  {
    id: "REF-012",
    name: "Beurre Collé Salé Gourmet",
    description: "Pour les inconditionnels du beurre salé, notre version Gourmet incorpore des cristaux de fleur de sel de Guérande récoltés à la main. Chaque prise offre une explosion saline parfaitement dosée sur fond crémeux. Formule Collé™ garantit un tartinage sans résistance sur tout support. En pot rechargeable en verre gravé au nom de la maison. Le luxe accessible de votre petit-déjeuner quotidien.",
    stock: 85,
    price: 8.99,
    discount: 15,
    currency: "€",
    images: [
      "assets/images/BeureCole/BeureColle_Sale_1.jpg",
      "assets/images/BeureCole/BeureColle_Sale_2.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Cuisine",
      colors: ["Naturel"],
      sizes: ["125g", "250g", "500g"],
      material: "Beurre + Fleur de sel Guérande",
      dimensions: "Pot verre gravé"
    }
  },

  // ── SURLIGNIEUR ───────────────────────────────────────────
  {
    id: "REF-013",
    name: "Surlignieur Bacon Édition",
    description: "Surlignez vos cours avec la saveur (visuelle) du bacon ! Ce surlignieur réaliste en forme de tranche de lard est bluffant de détails. Encre fluide longue durée jaune fluo compatible tous papiers, rechargeable. La pointe biseautée large permet de surligner jusqu'à 3 lignes simultanément. Un accessoire de bureau qui détend l'atmosphère, brise la glace et ne tache pas le nez. Presque comestible.",
    stock: 200,
    price: 6.99,
    discount: 0,
    currency: "€",
    images: [
      "assets/images/Surlignieur/Surlignieur_Bacon.jpg",
      "assets/images/Surlignieur/Surlignieur_Poulet.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Papeterie",
      colors: ["Jaune fluo", "Rose fluo"],
      sizes: ["Standard"],
      material: "Plastique + Encre à base d'eau",
      dimensions: "12 × 4 × 1.5 cm"
    }
  },
  {
    id: "REF-014",
    name: "Surlignieur Poisson Édition",
    description: "Votre bureau ne sentira pas le poisson, mais vos notes seront magnifiquement surlignées grâce à ce surlignieur réaliste en forme de poisson. Encre bleue fluo rechargeable longue durée. Le corps rigide ergonomique épouse parfaitement la main pour réduire la fatigue lors des longues sessions de révision. Un must-have du kit scolaire pour ceux qui assument leur originalité avec fierté et humour.",
    stock: 175,
    price: 6.99,
    discount: 20,
    currency: "€",
    images: [
      "assets/images/Surlignieur/Surlignieur_Poisson.jpg",
      "assets/images/Surlignieur/Surlignieur_Bacon.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Papeterie",
      colors: ["Bleu fluo", "Vert fluo"],
      sizes: ["Standard"],
      material: "Plastique + Encre à base d'eau",
      dimensions: "14 × 4 × 2 cm"
    }
  },
  {
    id: "REF-015",
    name: "Surlignieur Poulet Rôti Édition",
    description: "Le summum de la papeterie insolite : un surlignieur en forme de cuisse de poulet rôti d'un réalisme saisissant. Encre orange fluo lumineuse visible même sous faible éclairage. La pointe précise à 2 mm permet des soulignements chirurgicaux dans les marges les plus étroites. Anti-tache sur les mains, séchage instantané. Offrir ce surlignieur c'est offrir un sourire garanti à chaque utilisation.",
    stock: 150,
    price: 6.99,
    discount: 0,
    currency: "€",
    images: [
      "assets/images/Surlignieur/Surlignieur_Poulet.jpg",
      "assets/images/Surlignieur/Surlignieur_Poisson.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Papeterie",
      colors: ["Orange fluo", "Rose fluo"],
      sizes: ["Standard"],
      material: "Plastique + Encre permanente",
      dimensions: "11 × 5 × 3 cm"
    }
  },

  // ── PACKS & BUNDLES ───────────────────────────────────────
  {
    id: "REF-016",
    name: "Pack Trio Surlignieur Charcuterie",
    description: "Offrez-vous ou offrez l'intégrale de la collection charcutière : Bacon, Poisson et Poulet réunis dans un coffret cadeau Maxibazard. Chaque surlignieur a une couleur d'encre différente (jaune, bleu, orange fluo) pour coder vos prises de notes par thème. Le coffret est refermable et réutilisable comme trousse. Idéal pour les étudiants, les professeurs et tous ceux qui ont un sens de l'humour bien développé.",
    stock: 65,
    price: 17.99,
    discount: 10,
    currency: "€",
    images: [
      "assets/images/Surlignieur/Surlignieur_Bacon.jpg",
      "assets/images/Surlignieur/Surlignieur_Poisson.jpg",
      "assets/images/Surlignieur/Surlignieur_Poulet.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Papeterie",
      colors: ["Multicolore"],
      sizes: ["Coffret 3 pièces"],
      material: "Plastique + Coffret carton",
      dimensions: "Coffret : 20 × 8 × 4 cm"
    }
  },
  {
    id: "REF-017",
    name: "Pack Mini Aspi Duo Bureau",
    description: "Pour les bureaux partagés ou les bipolaires de la propreté, le Pack Duo offre deux mini aspirateurs USB assortis (un blanc, un rose) à prix imbattable. Chacun dispose de son propre câble USB et de ses embouts. Ils se branchent simultanément sur un hub USB. Un pour votre côté gauche, un pour votre côté droit. Ou un pour vous et un pour offrir. La propreté n'attendra plus jamais.",
    stock: 20,
    price: 49.99,
    discount: 20,
    currency: "€",
    images: [
      "assets/images/MiniAspi/Aspi_1.jpg",
      "assets/images/MiniAspi/Aspi_4.jpg",
      "assets/images/MiniAspi/Aspi_2.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Aspirateur",
      colors: ["Blanc + Rose"],
      sizes: ["Pack 2 unités"],
      material: "Plastique ABS",
      dimensions: "2 × 15 × 5 × 5 cm"
    }
  },
  {
    id: "REF-018",
    name: "Coussin Barre & Blob — Duo Confort",
    description: "Le meilleur des deux mondes dans un seul pack : la Barre de Gym pour le soutien cervical structuré et le Blob pour la détente totale. Alterner entre les deux selon votre humeur ou votre position est la clé d'une sédentarité enfin épanouissante. Coques lavables incluses. Ce duo complémentaire est conçu pour le canapé, le lit ou le bureau. Investissez dans votre confort de façon radicalement originale.",
    stock: 15,
    price: 74.99,
    discount: 0,
    currency: "€",
    images: [
      "assets/images/Coussin/Coussin_Bar_1.jpg",
      "assets/images/Coussin/Coussin_Blob_1.jpg",
      "assets/images/Coussin/Coussin_Bar_2.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Décoration",
      colors: ["Gris + Beige"],
      sizes: ["Pack 2 coussins"],
      material: "Velours + Micro-suède",
      dimensions: "2 coussins assortis"
    }
  },
  {
    id: "REF-019",
    name: "Kit Cuisine Fourchette + Beurre",
    description: "Le kit ultime pour les amateurs de tartinage élaboré : une Fourchette XL Bleue pour étaler avec panache et un pot de Beurre Collé Doux pour un résultat sans accroc. Ensemble, ils redéfinissent le rituel du petit-déjeuner. La fourchette géante impressionne, le beurre collé simplifie. Présenté dans un sac kraft Maxibazard, ce kit constitue un cadeau aussi bizarre qu'inoubliable pour toute occasion.",
    stock: 22,
    price: 19.99,
    discount: 15,
    currency: "€",
    images: [
      "assets/images/Fourchette/Fourchette_Bleu_1.jpg",
      "assets/images/BeureCole/BeureColle_Doux_1.jpg",
      "assets/images/Fourchette/Fourchette_verte_1.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Cuisine",
      colors: ["Bleu + Naturel"],
      sizes: ["Kit 2 produits"],
      material: "Résine + Beurre 82% MG",
      dimensions: "Sac kraft inclus"
    }
  },
  {
    id: "REF-020",
    name: "Parapluie-Chaussure™ Arc-en-Ciel Pack",
    description: "Ne choisissez plus votre couleur préférée : prenez-les toutes ! Le Pack Arc-en-Ciel contient les trois coloris emblématiques du Parapluie-Chaussure™ (Bleu, Jaune, Rouge) dans un coffret collector aux finitions premium. Alternez les couleurs selon votre tenue, vos chaussures ou votre humeur météo. Chaque parapluie-chaussure est livré dans sa pochette individuelle. L'accessoire pluie le plus stylé de la saison, garanti.",
    stock: 12,
    price: 59.99,
    discount: 0,
    currency: "€",
    images: [
      "assets/images/ParapluiChaussure/ParapluiChaussure_Rouge_1.jpg",
      "assets/images/ParapluiChaussure/ParapluiChaussure_Jaune_1.jpg",
      "assets/images/ParapluiChaussure/ParapluiChaussure_Bleu_1.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Accessoire",
      colors: ["Bleu + Jaune + Rouge"],
      sizes: ["S (38-40)", "M (41-43)", "L (44-46)"],
      material: "Nylon Teflon Pro",
      dimensions: "Coffret : 40 × 15 × 5 cm"
    }
  },
  {
    id: "REF-021",
    name: "Set Complet Papeterie Charcutière",
    description: "Pour le bureau ou l'école, le Set Complet Papeterie Charcutière regroupe l'intégralité des produits Surlignieur Maxibazard auxquels s'ajoute une gomme en forme de saucisse (offerte). Parfait pour le retour en classe ou pour dynamiser une salle de réunion trop sérieuse. Chaque pièce est emballée individuellement dans un film alimentaire faux en plastique recyclé, pour parfaire l'illusion comestible.",
    stock: 40,
    price: 22.99,
    discount: 30,
    currency: "€",
    images: [
      "assets/images/Surlignieur/Surlignieur_Poulet.jpg",
      "assets/images/Surlignieur/Surlignieur_Bacon.jpg",
      "assets/images/Surlignieur/Surlignieur_Poisson.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Papeterie",
      colors: ["Multicolore"],
      sizes: ["Set complet 4 pièces"],
      material: "Plastique + Caoutchouc",
      dimensions: "Pochette 22 × 10 cm"
    }
  },
  {
    id: "REF-022",
    name: "Fourchette XL Collector Pack Bicolore",
    description: "Possédez les deux couleurs de notre Fourchette XL dans un seul pack collector. La Bleue Électrique et la Verte Forêt se complètent à merveille pour une décoration de table bicolore ou une installation murale graphique. En résine haute densité, elles sont solides, lavables et parfaitement équilibrées. Un cadeau d'anniversaire mémorable, un accessoire photo virale ou une pièce déco hors du commun.",
    stock: 33,
    price: 21.99,
    discount: 0,
    currency: "€",
    images: [
      "assets/images/Fourchette/Fourchette_Bleu_1.jpg",
      "assets/images/Fourchette/Fourchette_verte_1.jpg",
      "assets/images/Fourchette/Fourchette_Bleu_2.jpg"
    ],
    characteristics: {
      gender: "Unisexe",
      type: "Vaisselle",
      colors: ["Bleu + Vert"],
      sizes: ["Pack 2 fourchettes"],
      material: "Résine haute densité",
      dimensions: "2 × 45 × 7 cm"
    }
  }
];
