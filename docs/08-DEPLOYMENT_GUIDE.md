# DentMatch KE - Production Full-Stack Deployment Guide

This guide covers deploying DentMatch KE to production as a containerized full-stack application (Vite React frontend served via Express API).

---

## 1. Quick Deploy with Docker

DentMatch KE includes a production-ready, multi-stage `Dockerfile` based on `node:20-alpine`.

### Build & Run Locally
```bash
# 1. Build the container image
docker build -t dentmatch-ke:latest .

# 2. Run the container
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=production \
  dentmatch-ke:latest
```

Visit `http://localhost:3000` to access the application. Test `/api/health` for diagnostics.

---

## 2. Deploying to Google Cloud Run (Recommended for AI Studio / GCP)

Google Cloud Run automatically scales containers to zero when idle and handles SSL termination out of the box.

### Step-by-Step CLI Commands:
```bash
# 1. Authenticate with Google Cloud
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# 2. Build and submit image to Google Artifact Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/dentmatch-ke:latest

# 3. Deploy to Cloud Run
gcloud run deploy dentmatch-ke \
  --image gcr.io/YOUR_PROJECT_ID/dentmatch-ke:latest \
  --platform managed \
  --region europe-west2 \
  --allow-unauthenticated \
  --port 3000 \
  --memory 512Mi \
  --cpu 1 \
  --set-env-vars NODE_ENV=production,APP_URL=https://your-custom-domain.co.ke
```

---

## 3. Deploying to Render / Railway / Fly.io

### Render (Web Service)
1. Link your GitHub repository in the Render Dashboard.
2. Select **Web Service** with runtime **Node**.
3. Configuration:
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
4. Add environment variables from `.env.example`.

### Railway / Fly.io
Railway and Fly automatically detect the `Dockerfile` in the root:
```bash
# For Fly.io
fly launch
fly deploy
```

---

## 4. Environment Variables Checklist

| Variable | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `PORT` | Yes | HTTP port to bind | `3000` or `8080` |
| `NODE_ENV` | Yes | Node environment | `production` |
| `APP_URL` | Recommended | Canonical domain | `https://dentmatch.co.ke` |
| `SAFARICOM_PASSKEY` | Optional | M-Pesa Daraja Passkey | `bfb279f9aa...` |
| `SAFARICOM_SHORTCODE` | Optional | Lipa Na M-Pesa Shortcode | `174379` |
| `AFRICASTALKING_API_KEY` | Optional | SMS gateway credentials | `sandbox_key` |

*Note: In the absence of live Safaricom / Africa's Talking API keys, DentMatch KE automatically runs in verified simulation mode with test OTP (`7788`) and simulated Daraja STK Push.*

---

## 5. Production Health Check & Monitoring

The Express server includes an active diagnostics endpoint:

```bash
curl https://your-domain.co.ke/api/health
```

**Sample Response:**
```json
{
  "status": "ok",
  "service": "DentMatch KE API",
  "version": "2.0.0",
  "environment": "production",
  "uptimeSeconds": 8420,
  "system": {
    "nodeVersion": "v20.18.0",
    "platform": "linux",
    "memoryRssMb": 68,
    "memoryHeapUsedMb": 34
  },
  "database": {
    "status": "connected",
    "dentistsCount": 4,
    "offersCount": 2,
    "kmpdcRegistryCount": 5
  }
}
```

---

## 6. Build Artifacts Architecture
- `npm run build` runs:
  1. `vite build` &rarr; outputs optimized client bundles to `/dist` (HTML, JS, CSS, SVG favicon, manifest).
  2. `esbuild server.ts --bundle --platform=node --format=cjs --packages=external --outfile=dist/server.cjs` &rarr; bundles the production API server.
- `npm start` runs `node dist/server.cjs`.
- Server automatically mounts `/dist` static assets with 1-day cache headers, handles SPA routing fallbacks, and reserves all `/api/*` routes for structured JSON responses.
