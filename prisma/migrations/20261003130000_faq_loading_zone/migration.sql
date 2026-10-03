-- Retire la mention "zone de chargement dédiée" de la FAQ.
UPDATE "FaqItem"
SET "answer" = 'Oui, vous pouvez venir accompagné pour déposer vos affaires.'
WHERE "answer" = 'Oui, vous pouvez venir accompagné et utiliser la zone de chargement dédiée à l''entrée du bâtiment.';
