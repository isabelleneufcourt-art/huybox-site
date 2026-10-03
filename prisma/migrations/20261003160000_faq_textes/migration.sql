-- FAQ : "centre" -> "bâtiment" / "Huybox", réservation et accès accompagné.
UPDATE "FaqItem"
SET "question" = 'Quels sont les horaires d''accès au bâtiment ?',
    "answer" = 'Le bâtiment est accessible 7j/7, de 6h à 23h.'
WHERE "question" ILIKE 'Quels sont les horaires d''accès au centre%';

UPDATE "FaqItem"
SET "answer" = 'Oui, vous pouvez venir accompagné.'
WHERE "question" ILIKE 'Puis-je venir accompagné%';

UPDATE "FaqItem"
SET "question" = 'À qui s''adresse Huybox ?',
    "answer" = 'Huybox s''adresse à toute personne ayant besoin d''espace supplémentaire : déménagement, rénovation, désencombrement, stockage saisonnier, etc.'
WHERE "question" ILIKE 'À qui s''adresse votre centre%';

UPDATE "FaqItem"
SET "answer" = 'La réservation se fait uniquement par téléphone : nous vérifions ensemble les disponibilités, puis, soit vous passez au bâtiment pour signer le contrat, soit nous vous envoyons un lien vers un formulaire à remplir. Nous préparons votre contrat, que vous nous renvoyez signé.'
WHERE "question" ILIKE 'Comment réserver un box%';
