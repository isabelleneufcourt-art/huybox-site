// Contenu de la FAQ (figé depuis l'ancien back-office). Pour modifier un
// texte, éditer ce fichier puis pousser sur GitHub : le site se met à jour.
export interface FaqItemData {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQ_CONTENT: FaqItemData[] = [
  {
    "id": "faq-1",
    "category": "Accès & sécurité",
    "question": "Quels sont les horaires d'accès au bâtiment ?",
    "answer": "Le bâtiment est accessible 7j/7, de 7h à 22h."
  },
  {
    "id": "faq-2",
    "category": "Accès & sécurité",
    "question": "Comment fonctionne le contrôle d'accès ?",
    "answer": "L'accès se fait via un un badge magnétique attribué au moment de la signature du contrat."
  },
  {
    "id": "faq-3",
    "category": "Accès & sécurité",
    "question": "Les box sont-ils accessibles sans escaliers ?",
    "answer": "Oui, tous nos espaces sont accessibles de plain-pied."
  },
  {
    "id": "faq-4",
    "category": "Accès & sécurité",
    "question": "Le bâtiment est-il vidéosurveillé ?",
    "answer": "Oui, des caméras sont installées aux points d'accès et dans les couloirs communs."
  },
  {
    "id": "faq-5",
    "category": "Accès & sécurité",
    "question": "Y a-t-il une alarme incendie ?",
    "answer": "Oui, le bâtiment est équipé d'une détection incendie active 24h/24."
  },
  {
    "id": "faq-6",
    "category": "Accès & sécurité",
    "question": "Puis-je venir accompagné pour déposer mes affaires ?",
    "answer": "Oui, vous pouvez venir accompagné."
  },
  {
    "id": "faq-7",
    "category": "Assurance",
    "question": "Dois-je assurer les biens que je stocke ?",
    "answer": "Oui, l'assurance des biens stockés est obligatoire. Chaque client doit assurer ses propres biens auprès de son assureur."
  },
  {
    "id": "faq-8",
    "category": "Assurance",
    "question": "Proposez-vous une assurance via le site ?",
    "answer": "Non, nous ne proposons pas d'offre d'assurance. Vous devez souscrire une couverture par vos propres moyens (assurance habitation, extension \"biens en dépôt\", etc.)."
  },
  {
    "id": "faq-9",
    "category": "Assurance",
    "question": "Que se passe-t-il en cas de sinistre ?",
    "answer": "En cas de sinistre, contactez-nous immédiatement au 0475 89 07 88 ainsi que votre assureur pour déclarer le sinistre."
  },
  {
    "id": "faq-10",
    "category": "Déménagement / stockage",
    "question": "Quels objets ne puis-je pas stocker ?",
    "answer": "Les produits dangereux, inflammables, périssables ou illégaux sont interdits."
  },
  {
    "id": "faq-11",
    "category": "Déménagement / stockage",
    "question": "Comment savoir quelle taille de box me convient ?",
    "answer": "Utilisez notre simulateur de volume en ligne, ou appelez-nous : nous vous conseillerons selon vos besoins."
  },
  {
    "id": "faq-12",
    "category": "Déménagement / stockage",
    "question": "Puis-je stocker des meubles pendant un déménagement ?",
    "answer": "Oui, c'est l'un des usages les plus courants de nos box : stockage temporaire le temps de votre déménagement."
  },
  {
    "id": "faq-13",
    "category": "Déménagement / stockage",
    "question": "Puis-je stocker un véhicule ou une moto ?",
    "answer": "Contactez-nous par téléphone pour vérifier la faisabilité selon la taille de box disponible."
  },
  {
    "id": "faq-14",
    "category": "Général",
    "question": "Qu'est-ce que le self-stockage ?",
    "answer": "Le self-stockage consiste à louer un box privatif dans un bâtiment sécurisé pour y entreposer vos affaires aussi longtemps que vous le souhaitez, avec un accès autonome 7j/7."
  },
  {
    "id": "faq-15",
    "category": "Général",
    "question": "À qui s'adresse Huybox ?",
    "answer": "Huybox s'adresse à toute personne ayant besoin d'espace supplémentaire : déménagement, rénovation, désencombrement, stockage saisonnier, etc."
  },
  {
    "id": "faq-16",
    "category": "Général",
    "question": "Proposez-vous le stockage entre particuliers ?",
    "answer": "Non, nous ne proposons pas de mise en relation entre particuliers. Nos box sont loués directement par Huybox."
  },
  {
    "id": "faq-17",
    "category": "Général",
    "question": "Combien de temps puis-je louer un box ?",
    "answer": "Aussi longtemps que vous le souhaitez, sans engagement de durée minimale. Vous pouvez arrêter votre location à tout moment selon les conditions du contrat."
  },
  {
    "id": "faq-18",
    "category": "Général",
    "question": "Puis-je visiter le bâtiment avant de réserver ?",
    "answer": "Oui, vous pouvez découvrir notre bâtiment grâce à la visite virtuelle vidéo disponible sur la page \"Notre bâtiment\", et organiser une visite sur place en nous appelant."
  },
  {
    "id": "faq-19",
    "category": "Tarifs & contrats",
    "question": "Quel est le tarif d'un box ?",
    "answer": "Nos box sont proposés à 75 €/mois pour 8 m³, 90 €/mois pour 10 m³ et 125 €/mois pour 15 m³ (TVAC)."
  },
  {
    "id": "faq-20",
    "category": "Tarifs & contrats",
    "question": "Y a-t-il des frais de dossier ou des frais cachés ?",
    "answer": "Non, seul le loyer mensuel du box s'applique, au tarif de la taille de box choisie (TVAC)."
  },
  {
    "id": "faq-21",
    "category": "Tarifs & contrats",
    "question": "Comment réserver un box ?",
    "answer": "La réservation se fait uniquement par téléphone : nous vérifions ensemble les disponibilités, puis, soit vous passez au bâtiment pour signer le contrat, soit nous vous envoyons un lien vers un formulaire à remplir. Nous préparons votre contrat, que vous nous renvoyez signé."
  },
  {
    "id": "faq-22",
    "category": "Tarifs & contrats",
    "question": "Puis-je changer de taille de box en cours de contrat ?",
    "answer": "Oui, sous réserve de disponibilité. Contactez-nous par téléphone pour organiser le changement."
  },
  {
    "id": "faq-23",
    "category": "Tarifs & contrats",
    "question": "Quel est le délai de préavis pour résilier ?",
    "answer": "Le préavis est précisé dans votre contrat signé. Contactez-nous pour connaître les modalités exactes."
  },
  {
    "id": "faq-24",
    "category": "Tarifs & contrats",
    "question": "Quels moyens de paiement acceptez-vous ?",
    "answer": "Virement, domiciliation ou carte bancaire, à confirmer directement avec notre équipe."
  }
];
