# HUYBOX — Site web self-stockage

Site vitrine + back-office pour un centre unique de self-stockage (3 tailles
de box, réservation par téléphone uniquement, pas d'assurance via le site).
Construit à partir du cahier des charges fourni par le client.

## Stack technique

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** pour le style, palette extraite du logo client (HUYBOX,
  bleu marine + rouge)
- **Prisma ORM** + **PostgreSQL** (ex. Neon, Vercel Postgres — nécessaire
  pour un hébergement serverless comme Vercel/Cloudflare, qui ne conservent
  pas de fichier SQLite entre les requêtes)
- **Server Actions** pour le back-office (pas d'API REST séparée pour le CMS)
- Session admin maison : cookie signé HMAC-SHA256 (Web Crypto), mot de passe
  hashé en bcrypt — pas de dépendance d'authentification externe

## Architecture du projet

```
src/
  app/
    layout.tsx              # layout racine (polices, <html>/<body>)
    globals.css              # variables de couleurs (charte graphique)
    (site)/                  # groupe de routes : site public
      layout.tsx              # Header + Footer + barre d'appel mobile + cookies
      page.tsx                 # Accueil
      notre-centre/
      box-tarifs/
      simulateur/
      securite/
      faq/
      blog/ + blog/[slug]/
      contact/
      mentions-legales/ cgv/ politique-de-confidentialite/ cookies/
    admin/
      login/                   # page de connexion (hors zone protégée)
      (protected)/             # tout le reste du back-office (auth requise)
        page.tsx                 # tableau de bord
        box/                     # CRUD box & tarifs
        leads/                   # messages de contact (statuts, notes, export CSV)
        faq/                     # CRUD FAQ
        blog/                    # CRUD articles
        parametres/              # téléphone, adresse, vidéo, hero, analytics
    api/
      contact/route.ts         # POST formulaire de contact → table Lead
      admin/leads/export/       # export CSV des leads (protégé)
    sitemap.ts / robots.ts
  components/                 # UI (Header, Footer, boutons, cartes...),
                                # composants publics (home/, boxes/, faq/...),
                                # composants admin (admin/)
  lib/                        # accès données (prisma, boxes, faq, blog...),
                                # simulateur, schema.org, auth admin, utils
  data/                       # contenu par défaut (FAQ, articles de blog)
                                # utilisé en fallback ET par le seed Prisma
  middleware.ts                # protège /admin/* (redirige vers /admin/login)
prisma/
  schema.prisma                # BoxType, Lead, LeadNote, FaqItem, BlogPost,
                                # SiteSettings, StorageOption, SeoMeta
  seed.ts                      # jeu de données de démonstration
scripts/
  extract-logo-colors.ts       # extrait la palette dominante d'un logo (PNG/JPG)
```

### Pourquoi ce découpage ?

- **Fallbacks partout** : chaque page publique (box, FAQ, blog, réglages)
  lit d'abord la base de données ; si elle est vide ou pas encore migrée,
  le site retombe sur un contenu par défaut cohérent avec le cahier des
  charges (3 box à 8 €/m³, ~24 questions FAQ, 4 articles de blog). Le site
  ne "casse" donc jamais avant le premier `db:seed`.
- **Server Actions plutôt qu'une API REST pour le CMS** : formulaires HTML
  natifs (fonctionnent même sans JS), moins de code, pas de couche fetch
  côté client à maintenir.
- **Pas de module d'assurance**, conformément au cahier des charges — la
  page Sécurité rappelle que l'assurance est obligatoire et à charge du
  client.

## Démarrage en local

Nécessite une base PostgreSQL accessible (ex. un projet gratuit sur
[neon.tech](https://neon.tech), ou Postgres local) — copie sa "Connection
string" dans `DATABASE_URL`.

```bash
cp .env.example .env
# Complète au minimum : DATABASE_URL, ADMIN_SESSION_SECRET, ADMIN_EMAIL,
# ADMIN_PASSWORD_HASH (voir "Créer un administrateur" ci-dessous) et les
# coordonnées du centre.

npm install              # génère aussi le client Prisma (postinstall)
npm run db:migrate        # crée la migration initiale et l'applique
npm run db:seed           # box, FAQ, blog, réglages par défaut
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000). Le back-office est sur
[http://localhost:3000/admin](http://localhost:3000/admin/login).

### Créer un administrateur

Un seul compte admin, défini par variables d'environnement (pas de table
"utilisateurs" à gérer pour un site mono-centre) :

```bash
node -e "console.log(require('bcryptjs').hashSync('MonMotDePasse', 10))"
```

Colle le résultat dans `ADMIN_PASSWORD_HASH` de `.env`.

> ⚠️ **Piège classique** : Next.js *expanse* les `$` dans les fichiers
> `.env` (dotenv-expand). Un hash bcrypt contient plusieurs `$` — il faut
> les échapper en `\$`, sinon la connexion échoue silencieusement.
> Exemple : `$2b$10$abc...` → `ADMIN_PASSWORD_HASH="\$2b\$10\$abc..."`.

### Scripts utiles

| Commande                  | Description                                       |
| -------------------------- | -------------------------------------------------- |
| `npm run dev`               | Serveur de développement                           |
| `npm run build` / `start`   | Build de production / lancement                    |
| `npm run db:migrate`        | Crée/applique les migrations Prisma                |
| `npm run db:seed`           | Insère le contenu de démonstration                 |
| `npm run db:studio`         | Interface Prisma Studio pour explorer la base      |
| `npm run extract-colors -- logo.png` | Analyse les couleurs dominantes d'un logo |
| `npm run lint`               | ESLint                                             |

## Charte graphique

Le logo fourni par le client (**HUYBOX**, cube bleu marine / rouge) a été
analysé visuellement pour extraire deux couleurs de marque, définies comme
variables CSS dans `src/app/globals.css` :

```css
--color-primary: 219 40% 17%;   /* bleu marine — titres, boutons, liens */
--color-secondary: 356 70% 46%; /* rouge — CTA "Appeler maintenant", accents */
```

Le composant `src/components/layout/Logo.tsx` reconstitue le logo en SVG
inline (cube isométrique + wordmark) avec ces couleurs, en attendant le
fichier logo définitif (SVG/PNG haute résolution) du client — il suffira
alors de remplacer le contenu de `Logo.tsx` par un `<img>`/`next/image`
pointant vers le fichier fourni.

Si un logo plus précis est fourni par la suite, régénère la palette avec :

```bash
npm run extract-colors -- chemin/vers/logo.png
```

puis ajuste les valeurs HSL dans `globals.css`.

## Déploiement — démo rapide sur Vercel

Pour obtenir un lien de démonstration fonctionnel (formulaire de contact +
back-office inclus) sans nom de domaine ni configuration serveur :

1. **Base de données** : crée un projet gratuit sur [neon.tech](https://neon.tech),
   copie la "Connection string" Postgres.
2. **Vercel** : sur [vercel.com](https://vercel.com), connecte-toi avec
   GitHub → "Add New Project" → importe ce dépôt (`huybox-site`).
3. Avant de cliquer "Deploy", ouvre la section **Environment Variables** et
   colle-y toutes les variables de `.env.example` avec de vraies valeurs :
   - `DATABASE_URL` → la connection string Neon
   - `ADMIN_SESSION_SECRET` → une valeur aléatoire longue
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH` → voir "Créer un administrateur"
   - `NEXT_PUBLIC_SITE_URL` → l'URL Vercel donnée après le premier déploiement
     (ex. `https://huybox-site.vercel.app`) — à mettre à jour et redéployer
     une fois connue
   - Coordonnées du centre (téléphone, adresse...) — au moins des valeurs
     provisoires pour la démo
4. Clique **Deploy**. Une fois en ligne, connecte-toi une seule fois en
   local avec `DATABASE_URL` pointé vers Neon pour lancer
   `npm run db:migrate && npm run db:seed` (initialise les tables et le
   contenu de démonstration sur la base de production).
5. Le lien Vercel (`https://....vercel.app`) est prêt à montrer — formulaire
   de contact et `/admin` fonctionnent réellement.

### Passage en production définitive (une fois le client convaincu)

- **Nom de domaine** : le gérant doit d'abord récupérer l'accès à son
  registrar (ou en acheter un nouveau) — ce n'est pas un problème technique
  côté site, à traiter séparément.
- **Hébergement durable** : Vercel gratuit est prévu pour un usage
  personnel/non commercial — pour un site d'entreprise sur la durée,
  basculer sur un plan payant Vercel, ou reconstruire le déploiement sur
  Cloudflare Pages (intégration Git, pas de glisser-déposer) + Cloudflare
  D1 ou Neon comme base.
- **Variables obligatoires** : `DATABASE_URL`, `ADMIN_SESSION_SECRET`
  (valeur forte et unique), `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`,
  `NEXT_PUBLIC_SITE_URL` (domaine réel, sert au sitemap et aux métadonnées
  SEO).
- **DNS/HTTPS** : géré automatiquement par Vercel/Cloudflare une fois le
  domaine pointé vers eux (HTTPS obligatoire, cf. RGPD).

## Guide rapide d'administration (`/admin`)

- **Tableau de bord** : vue d'ensemble (nouveaux messages, box actifs,
  FAQ, articles). Les statistiques de trafic et de clics téléphone
  restent mesurées via Google Analytics 4 (lien direct depuis le
  dashboard) — configurable dans **Paramètres**.
- **Box & tarifs** : créer/modifier/désactiver les tailles de box, leur
  volume, dimensions, équivalence indicative et prix au m³ (le prix
  mensuel affiché sur le site est recalculé automatiquement).
- **Contacts (leads)** : liste des messages du formulaire, filtrage par
  statut, fiche détail avec changement de statut, notes internes, et
  export CSV.
- **FAQ** : questions/réponses groupées par catégorie, publier/masquer.
- **Blog** : articles en Markdown simple (titres `##`, listes `-`,
  **gras**, liens `[texte](url)`), catégories, brouillon/publié, SEO
  (meta title/description) par article.
- **Paramètres** : numéro de téléphone, adresse, horaires, carte Google
  Maps, textes de la page d'accueil, vidéo de visite virtuelle, IDs
  Google Analytics 4 / Tag Manager.

Le formulaire de contact du site (`/contact`) alimente directement la
table **Leads** consultée dans `/admin/leads` — aucune configuration
supplémentaire nécessaire pour recevoir les demandes.

## Ce qui reste à brancher côté client

- **Logo définitif** (fichier haute résolution) → remplacer
  `src/components/layout/Logo.tsx`.
- **Vraies photos du centre** → remplacer la galerie placeholder
  (`src/components/media/PhotoGallery.tsx`) par de vrais fichiers, une fois
  un stockage média choisi (ex. Cloudinary, S3, ou upload local `/public`).
- **Vidéo de visite virtuelle définitive** → coller son URL d'intégration
  (YouTube "non répertorié" ou Vimeo) dans `/admin/parametres`.
- **Textes légaux** (mentions légales, CGV) → à faire valider par un
  juriste avant mise en ligne, les pages actuelles sont des trames.
- **Widget Google Reviews / Trustpilot** (optionnel) → remplacer
  `src/components/home/Testimonials.tsx`, actuellement des témoignages
  statiques d'exemple.
