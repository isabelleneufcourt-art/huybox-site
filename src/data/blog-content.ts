export interface BlogSeedPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  daysAgo: number;
}

export const BLOG_CATEGORIES = ["Déménagement", "Organisation", "Stockage", "Conseils pratiques"] as const;

export const BLOG_CONTENT: BlogSeedPost[] = [
  {
    slug: "bien-choisir-la-taille-de-son-box-de-stockage",
    title: "Bien choisir la taille de son box de stockage",
    excerpt:
      "8, 10 ou 15 m³ ? Voici comment estimer rapidement le volume dont vous avez besoin avant de réserver.",
    category: "Stockage",
    daysAgo: 5,
    content: `Choisir la bonne taille de box évite deux écueils : payer pour un espace trop grand, ou devoir louer un second box en urgence.

## Une méthode simple

Notre [simulateur de volume](/simulateur) estime votre besoin à partir de la surface de votre logement et de vos annexes (cave, garage, grenier). En quelques secondes, vous obtenez une taille de box recommandée et son tarif mensuel.

## Nos repères

- **8 m³** : idéal pour un studio ou T1, quelques cartons et un peu de mobilier.
- **10 m³** : convient à un T2, avec canapé, table et électroménager.
- **15 m³** : pensé pour un T3 ou une maison, meubles volumineux compris.

En cas de doute, appelez-nous : nous affinerons l'estimation ensemble et vérifierons les disponibilités.`,
  },
  {
    slug: "5-astuces-pour-organiser-son-box-de-stockage",
    title: "5 astuces pour organiser son box de stockage",
    excerpt: "Quelques conseils pratiques pour gagner de la place et retrouver vos affaires facilement.",
    category: "Organisation",
    daysAgo: 12,
    content: `Un box bien organisé, c'est un accès plus rapide à vos affaires et un gain de place non négligeable.

1. **Empilez du plus lourd au plus léger.**
2. **Laissez un couloir central** pour accéder au fond du box sans tout déplacer.
3. **Étiquetez vos cartons** par pièce ou par catégorie.
4. **Protégez les meubles** avec des housses ou couvertures.
5. **Utilisez la hauteur** avec des étagères plutôt que d'empiler au sol.

Nos équipes peuvent vous conseiller sur place lors du dépôt de vos affaires.`,
  },
  {
    slug: "demenagement-quand-et-comment-utiliser-un-box-de-stockage",
    title: "Déménagement : quand et comment utiliser un box de stockage",
    excerpt: "Le self-stockage peut simplifier un déménagement en plusieurs étapes. Explications.",
    category: "Déménagement",
    daysAgo: 20,
    content: `Entre deux logements, un box de stockage vous laisse le temps de déménager sereinement.

## Avant le déménagement

Stockez les affaires dont vous n'avez pas un besoin immédiat pour désencombrer votre logement actuel et faciliter les visites ou travaux.

## Pendant la transition

Si les dates de sortie et d'entrée ne coïncident pas, un box vous évite de louer un garde-meuble classique avec engagement de durée.

## Après le déménagement

Gardez le box le temps de finir vos travaux ou aménagements, sans stocker de meubles dans votre nouveau logement en cours de rénovation.`,
  },
  {
    slug: "que-peut-on-stocker-dans-un-box-ce-qui-est-interdit",
    title: "Que peut-on stocker dans un box ? Ce qui est interdit",
    excerpt: "Un point clair sur les objets autorisés et les objets interdits dans un box de self-stockage.",
    category: "Conseils pratiques",
    daysAgo: 30,
    content: `La grande majorité de vos biens personnels peuvent être stockés : meubles, cartons, électroménager, archives, matériel sportif...

## Objets interdits

- Produits inflammables, explosifs ou toxiques
- Denrées périssables ou produits dégageant une odeur forte
- Animaux vivants
- Biens illégaux ou volés

## Assurance

Rappel : l'assurance des biens stockés est obligatoire et reste à la charge du client. Consultez la page [Sécurité & garanties](/securite) pour plus de détails.`,
  },
];
