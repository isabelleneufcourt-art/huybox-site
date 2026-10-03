-- Prix mensuel fixe par box (75 / 90 / 125 €) au lieu d'un tarif unique au m³.
ALTER TABLE "BoxType" ADD COLUMN "monthlyPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;

UPDATE "BoxType" SET "monthlyPrice" = CASE
  WHEN "volumeM3" = 8 THEN 75
  WHEN "volumeM3" = 10 THEN 90
  WHEN "volumeM3" = 15 THEN 125
  ELSE ROUND("volumeM3" * "pricePerM3")
END;

-- Plus de dimensions indicatives ni d'équivalences "T1 / T2 / T3" (français).
UPDATE "BoxType" SET "dimensions" = NULL, "equivalence" = NULL;

ALTER TABLE "BoxType" DROP COLUMN "pricePerM3";

-- Textes de la FAQ mentionnant l'ancien tarif unique.
UPDATE "FaqItem"
SET "answer" = 'Nos box sont proposés à 75 €/mois pour 8 m³, 90 €/mois pour 10 m³ et 125 €/mois pour 15 m³ (TVAC).'
WHERE "answer" = 'Le tarif est unique : 8 €/m³/mois TVAC, quelle que soit la taille du box choisie (8, 10 ou 15 m³).';

UPDATE "FaqItem"
SET "answer" = 'Non, seul le loyer mensuel du box s''applique, au tarif de la taille de box choisie (TVAC).'
WHERE "answer" = 'Non, seul le loyer mensuel du box s''applique, au tarif de 8 €/m³/mois TVAC.';

-- Article de blog mentionnant T1 / T2 / T3.
UPDATE "BlogPost"
SET "content" = REPLACE(REPLACE(REPLACE("content",
  '- **8 m³** : idéal pour un studio ou T1, quelques cartons et un peu de mobilier.', '- **8 m³** : quelques cartons et un peu de mobilier.'),
  '- **10 m³** : convient à un T2, avec canapé, table et électroménager.', '- **10 m³** : canapé, table et électroménager.'),
  '- **15 m³** : pensé pour un T3 ou une maison, meubles volumineux compris.', '- **15 m³** : meubles volumineux et contenu d''un logement complet.');

-- Contrôle d'accès : badge uniquement.
UPDATE "FaqItem"
SET "answer" = 'L''accès au bâtiment se fait par badge, remis au moment de la signature du contrat.'
WHERE "answer" = 'L''accès se fait via un code personnel, un badge ou un interphone selon les zones du bâtiment, attribué au moment de la signature du contrat.';

-- Sinistre : numéro de téléphone direct.
UPDATE "FaqItem"
SET "answer" = 'En cas de sinistre, contactez-nous immédiatement au 0475 89 07 88 ainsi que votre assureur pour déclarer le sinistre.'
WHERE "question" = 'Que se passe-t-il en cas de sinistre ?';

-- Retire la mention "zone de chargement dédiée".
UPDATE "FaqItem"
SET "answer" = 'Oui, vous pouvez venir accompagné pour déposer vos affaires.'
WHERE "answer" = 'Oui, vous pouvez venir accompagné et utiliser la zone de chargement dédiée à l''entrée du bâtiment.';
