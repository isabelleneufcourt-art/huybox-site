-- FAQ : "centre" -> "bâtiment" dans la question sur la visite.
UPDATE "FaqItem"
SET "question" = 'Puis-je visiter le bâtiment avant de réserver ?',
    "answer" = 'Oui, vous pouvez découvrir notre bâtiment grâce à la visite virtuelle vidéo disponible sur la page "Notre bâtiment", et organiser une visite sur place en nous appelant.'
WHERE "question" ILIKE 'Puis-je visiter le centre%';
