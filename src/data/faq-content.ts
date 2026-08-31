// Contenu FAQ par défaut — utilisé comme fallback avant seed, et comme
// source pour prisma/seed.ts. Éditable ensuite depuis /admin/faq.
export interface FaqSeedItem {
  category: string;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES = [
  "Général",
  "Tarifs & contrats",
  "Accès & sécurité",
  "Assurance",
  "Déménagement / stockage",
] as const;

export const FAQ_CONTENT: FaqSeedItem[] = [
  // Général
  {
    category: "Général",
    question: "Qu'est-ce que le self-stockage ?",
    answer:
      "Le self-stockage consiste à louer un box privatif dans un bâtiment sécurisé pour y entreposer vos affaires aussi longtemps que vous le souhaitez, avec un accès autonome 7j/7.",
  },
  {
    category: "Général",
    question: "À qui s'adresse votre bâtiment ?",
    answer:
      "Notre bâtiment s'adresse à toute personne ayant besoin d'espace supplémentaire : déménagement, rénovation, désencombrement, stockage saisonnier, etc.",
  },
  {
    category: "Général",
    question: "Proposez-vous le stockage entre particuliers ?",
    answer:
      "Non, nous ne proposons pas de mise en relation entre particuliers. Nos box sont loués directement par notre bâtiment.",
  },
  {
    category: "Général",
    question: "Combien de temps puis-je louer un box ?",
    answer:
      "Aussi longtemps que vous le souhaitez, sans engagement de durée minimale. Vous pouvez arrêter votre location à tout moment selon les conditions du contrat.",
  },
  {
    category: "Général",
    question: "Puis-je visiter le bâtiment avant de réserver ?",
    answer:
      "Oui, vous pouvez découvrir notre bâtiment grâce à la visite virtuelle vidéo disponible sur la page \"Notre bâtiment\", et organiser une visite sur place en nous appelant.",
  },
  // Tarifs & contrats
  {
    category: "Tarifs & contrats",
    question: "Quel est le tarif d'un box ?",
    answer:
      "Le tarif est unique : 8 €/m³/mois TVAC, quelle que soit la taille du box choisie (8, 10 ou 15 m³).",
  },
  {
    category: "Tarifs & contrats",
    question: "Y a-t-il des frais de dossier ou des frais cachés ?",
    answer: "Non, seul le loyer mensuel du box s'applique, au tarif de 8 €/m³/mois TVAC.",
  },
  {
    category: "Tarifs & contrats",
    question: "Comment réserver un box ?",
    answer:
      "La réservation se fait uniquement par téléphone : nous vérifions ensemble les disponibilités, puis vous passez au bâtiment pour signer le contrat.",
  },
  {
    category: "Tarifs & contrats",
    question: "Puis-je changer de taille de box en cours de contrat ?",
    answer:
      "Oui, sous réserve de disponibilité. Contactez-nous par téléphone pour organiser le changement.",
  },
  {
    category: "Tarifs & contrats",
    question: "Quel est le délai de préavis pour résilier ?",
    answer:
      "Le préavis est précisé dans votre contrat signé au bâtiment. Contactez-nous pour connaître les modalités exactes.",
  },
  {
    category: "Tarifs & contrats",
    question: "Quels moyens de paiement acceptez-vous ?",
    answer: "Virement, domiciliation ou carte bancaire, à confirmer directement avec notre équipe au bâtiment.",
  },
  // Accès & sécurité
  {
    category: "Accès & sécurité",
    question: "Quels sont les horaires d'accès au bâtiment ?",
    answer: "Le bâtiment est accessible 7j/7, de 6h à 23h.",
  },
  {
    category: "Accès & sécurité",
    question: "Comment fonctionne le contrôle d'accès ?",
    answer:
      "L'accès se fait via un code personnel, un badge ou un interphone selon les zones du bâtiment, attribué au moment de la signature du contrat.",
  },
  {
    category: "Accès & sécurité",
    question: "Le bâtiment est-il vidéosurveillé ?",
    answer: "Oui, des caméras sont installées aux points d'accès et dans les couloirs communs.",
  },
  {
    category: "Accès & sécurité",
    question: "Y a-t-il une alarme incendie ?",
    answer: "Oui, le bâtiment est équipé d'une détection incendie active 24h/24.",
  },
  {
    category: "Accès & sécurité",
    question: "Les box sont-ils accessibles sans escaliers ?",
    answer: "Oui, tous nos espaces sont accessibles de plain-pied ou par ascenseur/monte-charge.",
  },
  {
    category: "Accès & sécurité",
    question: "Puis-je venir accompagné pour déposer mes affaires ?",
    answer: "Oui, vous pouvez venir accompagné et utiliser la zone de chargement dédiée à l'entrée du bâtiment.",
  },
  // Assurance
  {
    category: "Assurance",
    question: "Dois-je assurer les biens que je stocke ?",
    answer:
      "Oui, l'assurance des biens stockés est obligatoire. Chaque client doit assurer ses propres biens auprès de son assureur.",
  },
  {
    category: "Assurance",
    question: "Proposez-vous une assurance via le site ?",
    answer:
      "Non, nous ne proposons pas d'offre d'assurance. Vous devez souscrire une couverture par vos propres moyens (assurance habitation, extension \"biens en dépôt\", etc.).",
  },
  {
    category: "Assurance",
    question: "Que se passe-t-il en cas de sinistre ?",
    answer:
      "En cas de sinistre, contactez immédiatement notre équipe au bâtiment ainsi que votre assureur pour déclarer le sinistre.",
  },
  // Déménagement / stockage
  {
    category: "Déménagement / stockage",
    question: "Puis-je stocker des meubles pendant un déménagement ?",
    answer:
      "Oui, c'est l'un des usages les plus courants de nos box : stockage temporaire le temps de votre déménagement.",
  },
  {
    category: "Déménagement / stockage",
    question: "Quels objets ne puis-je pas stocker ?",
    answer:
      "Les produits dangereux, inflammables, périssables ou illégaux sont interdits. La liste complète vous sera communiquée au moment de la signature du contrat.",
  },
  {
    category: "Déménagement / stockage",
    question: "Comment savoir quelle taille de box me convient ?",
    answer:
      "Utilisez notre simulateur de volume en ligne, ou appelez-nous : notre équipe vous conseillera selon vos besoins.",
  },
  {
    category: "Déménagement / stockage",
    question: "Puis-je stocker un véhicule ou une moto ?",
    answer: "Contactez-nous par téléphone pour vérifier la faisabilité selon la taille de box disponible.",
  },
];
