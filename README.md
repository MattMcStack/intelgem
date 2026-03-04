# IntelGem

**Competitive intelligence dashboard by Contentstack** — Executive Pulse, Kill Sheet, G2 Sentiment, and a Gemini-powered Intel Copilot.

![IntelGem](https://img.shields.io/badge/Contentstack-IntelGem-6e58f1)

## Features

- **Global Dashboard** — Market overview, Executive Pulse, and Kill Sheet
- **Competitor deep dives** — Contentstack, Adobe AEM, Sitecore, Contentful, Optimizely, Sanity
- **G2 Sentiment Index** — Bar chart and trend view
- **Intelligence Stream** — Filterable intel cards by competitor and impact
- **Gemini Intel Copilot** — Chat with AI for competitive strategy (requires API key)

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: add VITE_GEMINI_API_KEY for Copilot
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `build/`. Preview with `npm run preview`.

---

## Create the GitHub repo

1. **Create a new repository on GitHub**
   - Go to [github.com/new](https://github.com/new)
   - Name: `intelgem` (or your choice)
   - Description: `Competitive intelligence dashboard by Contentstack – IntelGem`
   - Choose **Public**, leave “Add a README” **unchecked**
   - Create repository

2. **Push this project**

   ```bash
   cd intelgem
   git init
   git add .
   git commit -m "Initial commit: IntelGem competitive intel dashboard"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/intelgem.git
   git push -u origin main
   ```

   Or with **GitHub CLI** (if installed):

   ```bash
   cd intelgem
   git init
   git add .
   git commit -m "Initial commit: IntelGem competitive intel dashboard"
   gh repo create intelgem --public --source=. --remote=origin --push
   ```

---

## Host on Contentstack Launch

Launch deploys from your GitHub repo. After the repo exists:

1. **Open Launch**  
   In Contentstack: **Developer Hub → Launch** (or your org’s Launch URL).

2. **Create project from GitHub**
   - **Create New Project** → **Import from a Git Repository** → **GitHub**
   - Sign in / authorize GitHub if prompted
   - Select the **intelgem** repository

3. **Build and output settings**
   - **Build command:** `npm run build`
   - **Output directory:** `build` (Vite is configured to output to `build` for Launch compatibility)
   - **Framework preset:** **CSR** (Client-Side Rendered)

4. **Environment variables (optional)**
   - For the Gemini Copilot chat, add:
     - **Name:** `VITE_GEMINI_API_KEY`
     - **Value:** your [Google AI Studio](https://aistudio.google.com/apikey) API key  
   - Leave blank if you only want the dashboard without live Copilot responses.

5. **Deploy**  
   Click **Deploy**. Launch will build and host the app; use the provided URL to open it.

- [Launch docs](https://www.contentstack.com/docs/developers/launch)
- [Quick start – React](https://www.contentstack.com/docs/developers/launch/quick-start-react)

**If you see "Incorrect output directory specified":** In the Launch project’s **Build and Output Settings**, set **Output directory** to exactly `build` (this repo’s Vite config outputs to `build` for Launch). Do not use `dist` or `./dist`.

---

## Tech stack

- **React 18** + **Vite**
- **Tailwind CSS**
- **Recharts** (charts)
- **Lucide React** (icons)
- **Google Gemini API** (optional, for Copilot)

## License

Private / internal use. Contentstack branding and positioning are for demo purposes.
