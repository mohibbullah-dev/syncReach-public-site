# SyncReach Public Site

Standalone marketing website — deploy this repo alone on **Render** or **Vercel**.

## Setup

```bash
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
# VITE_ADMIN_URL=https://sync-reach-portal-two.vercel.app
npm run dev            # http://localhost:8080
```

Live: [public site](https://sync-reach-public-site.vercel.app/) · [portal](https://sync-reach-portal-two.vercel.app/)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Run built server |

## Deploy

### Render
- Root: `.`
- Build: `npm install && npm run build`
- Start: `npm start`
- Env: `VITE_API_URL=https://YOUR-API.onrender.com/api`

### Vercel
1. Import repo → Framework **TanStack Start**
2. Leave Output Directory empty (not `dist`)
3. Env:
   - `VITE_API_URL` = `https://YOUR-API.onrender.com/api`
   - `VITE_ADMIN_URL` = `https://sync-reach-portal-two.vercel.app`
4. Push latest (`vercel.json` + vite vercel preset) then Redeploy
