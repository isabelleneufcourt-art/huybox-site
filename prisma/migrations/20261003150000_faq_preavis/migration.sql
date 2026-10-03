-- FAQ : préavis de résiliation (contrat plus forcément signé au bâtiment).
UPDATE "FaqItem"
SET "answer" = 'Le préavis est précisé dans votre contrat signé. Contactez-nous pour connaître les modalités exactes.'
WHERE "question" = 'Quel est le délai de préavis pour résilier ?';
