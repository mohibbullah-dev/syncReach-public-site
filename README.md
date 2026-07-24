# SyncReach Public Site

Standalone marketing website — deploy this repo alone on **Render** or **Vercel**.

## Setup

```bash
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm run dev            # http://localhost:8080
```

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
- Import this repo → Root `.`
- Env: `VITE_API_URL`
- If SSR issues, prefer Render Web Service (Nitro node-server).
