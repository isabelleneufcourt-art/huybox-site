# HUYBOX — site vitrine (statique)

Site de self-stockage HUYBOX (Huy, Belgique). Next.js 14, exporté en fichiers
statiques (`next build` → dossier `out/`) : aucun serveur ni base de données.

## Modifier le contenu

Tout le contenu est dans le code, puis le site se redéploie à chaque push sur GitHub :

| Quoi | Fichier |
| --- | --- |
| Téléphone, adresse, horaires, titre d'accueil, vidéo | `src/data/site-settings.ts` |
| Prix et tailles des box | `src/lib/boxes.ts` |
| Questions fréquentes | `src/data/faq-content.ts` |
| Articles du blog | `src/data/blog-content.ts` |
| Prix dans le simulateur | `src/components/simulateur/simulateur-huybox-init.js` (`BOX_PRICES`) |

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # génère le dossier out/
```

Copier `.env.example` en `.env` pour définir `NEXT_PUBLIC_WEB3FORMS_KEY`
(formulaire de contact → email) et `NEXT_PUBLIC_SITE_URL`.

## Déploiement (Cloudflare Pages)

- Build command : `npm run build`
- Build output directory : `out`
- Variables : `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WEB3FORMS_KEY`

Le dossier `out/` peut aussi être déposé tel quel sur un hébergement de fichiers (FTP).
