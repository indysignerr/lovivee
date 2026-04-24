# Decap CMS — GitHub OAuth proxy (Cloudflare Worker)

Permet à Decap CMS de s'authentifier sur GitHub sans Netlify.

## 1. Créer l'OAuth App GitHub

1. Aller sur https://github.com/settings/developers → **New OAuth App**
2. Renseigner :
   - **Application name** : `L'Ovive — Decap CMS`
   - **Homepage URL** : `https://lovive.fr`
   - **Authorization callback URL** : `https://decap-oauth.<votre>.workers.dev/callback`
3. Noter le `Client ID` et générer un `Client Secret`

## 2. Déployer le Worker

```bash
cd cloudflare-oauth-worker
npm install
npx wrangler login
npx wrangler secret put OAUTH_CLIENT_ID      # collez le Client ID
npx wrangler secret put OAUTH_CLIENT_SECRET  # collez le Client Secret
npm run deploy
```

Le Worker est désormais accessible sur `https://decap-oauth.<votre>.workers.dev`.

## 3. Mettre à jour `public/admin/config.yml`

```yaml
backend:
  name: github
  repo: indysignerr/lovivee
  branch: main
  base_url: https://decap-oauth.<votre>.workers.dev
  auth_endpoint: auth
```

Et mettre à jour la callback URL de l'OAuth App GitHub avec l'URL définitive du Worker.

## 4. Domaine Cloudflare

Optionnel : assigner un sous-domaine custom à votre Worker (ex. `cms-auth.lovive.fr`) via le dashboard Cloudflare → Workers → Triggers → Custom Domains.

Pensez alors à mettre à jour `base_url` dans `config.yml` ET `Authorization callback URL` dans GitHub.

## 5. Donner l'accès au gérant

Le gérant doit avoir un compte GitHub et être **collaborateur** sur le repo `indysignerr/lovivee` (write access). Il pourra alors se connecter à `lovive.fr/admin` via le bouton « Login with GitHub ».
