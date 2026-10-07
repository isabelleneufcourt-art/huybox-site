// Articles du blog (figés depuis l'ancien back-office). Pour modifier ou
// ajouter un article, éditer ce fichier puis pousser sur GitHub.
export interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown simple */
  content: string;
  category: string;
  coverImage: string | null;
  /** Date ISO (AAAA-MM-JJ…) */
  publishedAt: string;
  metaTitle: string | null;
  metaDescription: string | null;
}

export const BLOG_CONTENT: BlogPostData[] = [
  {
    "id": "bien-choisir-la-taille-de-son-box-de-stockage",
    "slug": "bien-choisir-la-taille-de-son-box-de-stockage",
    "title": "Bien choisir la taille de son box de stockage",
    "excerpt": "8, 10 ou 15 m³ ? Voici comment estimer rapidement le volume dont vous avez besoin avant de réserver.",
    "content": "Choisir la bonne taille de box évite deux écueils : payer pour un espace trop grand, ou devoir louer un second box en urgence.\n\n## Une méthode simple\n\nNotre [simulateur de volume](/simulateur) estime votre besoin à partir de la surface de votre logement et de vos annexes (cave, garage, grenier). En quelques secondes, vous obtenez une taille de box recommandée et son tarif mensuel.\n\n## Nos repères\n\n- **8 m³** : quelques cartons et un peu de mobilier.\n- **10 m³** : canapé, table et électroménager.\n- **15 m³** : meubles volumineux et contenu d'un logement complet.\n\nEn cas de doute, appelez-nous : nous affinerons l'estimation ensemble et vérifierons les disponibilités.",
    "category": "Stockage",
    "coverImage": null,
    "publishedAt": "2026-08-26T07:46:12.025Z",
    "metaTitle": null,
    "metaDescription": "8, 10 ou 15 m³ ? Voici comment estimer rapidement le volume dont vous avez besoin avant de réserver."
  },
  {
    "id": "5-astuces-pour-organiser-son-box-de-stockage",
    "slug": "5-astuces-pour-organiser-son-box-de-stockage",
    "title": "5 astuces pour organiser son box de stockage",
    "excerpt": "Quelques conseils pratiques pour gagner de la place et retrouver vos affaires facilement.",
    "content": "Un box bien organisé, c'est un accès plus rapide à vos affaires et un gain de place non négligeable.\n\n1. **Empilez du plus lourd au plus léger.**\n2. **Laissez un couloir central** pour accéder au fond du box sans tout déplacer.\n3. **Étiquetez vos cartons** par pièce ou par catégorie.\n4. **Protégez les meubles** avec des housses ou couvertures.\n5. **Utilisez la hauteur** avec des étagères plutôt que d'empiler au sol.\n\nNos équipes peuvent vous conseiller sur place lors du dépôt de vos affaires.",
    "category": "Organisation",
    "coverImage": null,
    "publishedAt": "2026-08-19T07:46:12.025Z",
    "metaTitle": null,
    "metaDescription": "Quelques conseils pratiques pour gagner de la place et retrouver vos affaires facilement."
  },
  {
    "id": "demenagement-quand-et-comment-utiliser-un-box-de-stockage",
    "slug": "demenagement-quand-et-comment-utiliser-un-box-de-stockage",
    "title": "Déménagement : quand et comment utiliser un box de stockage",
    "excerpt": "Le self-stockage peut simplifier un déménagement en plusieurs étapes. Explications.",
    "content": "Entre deux logements, un box de stockage vous laisse le temps de déménager sereinement.\n\n## Avant le déménagement\n\nStockez les affaires dont vous n'avez pas un besoin immédiat pour désencombrer votre logement actuel et faciliter les visites ou travaux.\n\n## Pendant la transition\n\nSi les dates de sortie et d'entrée ne coïncident pas, un box vous évite de louer un garde-meuble classique avec engagement de durée.\n\n## Après le déménagement\n\nGardez le box le temps de finir vos travaux ou aménagements, sans stocker de meubles dans votre nouveau logement en cours de rénovation.",
    "category": "Déménagement",
    "coverImage": null,
    "publishedAt": "2026-08-11T07:46:12.025Z",
    "metaTitle": null,
    "metaDescription": "Le self-stockage peut simplifier un déménagement en plusieurs étapes. Explications."
  },
  {
    "id": "que-peut-on-stocker-dans-un-box-ce-qui-est-interdit",
    "slug": "que-peut-on-stocker-dans-un-box-ce-qui-est-interdit",
    "title": "Que peut-on stocker dans un box ? Ce qui est interdit",
    "excerpt": "Un point clair sur les objets autorisés et les objets interdits dans un box de self-stockage.",
    "content": "La grande majorité de vos biens personnels peuvent être stockés : meubles, cartons, électroménager, archives, matériel sportif...\n\n## Objets interdits\n\n- Produits inflammables, explosifs ou toxiques\n- Denrées périssables ou produits dégageant une odeur forte\n- Animaux vivants\n- Biens illégaux ou volés\n\n## Assurance\n\nRappel : l'assurance des biens stockés est obligatoire et reste à la charge du client. Consultez la page [Sécurité & garanties](/securite) pour plus de détails.",
    "category": "Conseils pratiques",
    "coverImage": null,
    "publishedAt": "2026-08-01T07:46:12.025Z",
    "metaTitle": null,
    "metaDescription": "Un point clair sur les objets autorisés et les objets interdits dans un box de self-stockage."
  }
];
