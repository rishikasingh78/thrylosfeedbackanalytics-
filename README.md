# Thrylos Feedback Compass 📊
### Customer Feedback & Review Analytics Platform

**Thrylos Feedback Compass** is a web-based customer feedback and review analytics platform designed to help businesses collect customer reviews, understand customer sentiment, identify recurring concerns, and make data-driven decisions.

The platform combines a simple customer-facing feedback form with an interactive analytics dashboard, allowing the Thrylos team to turn raw customer feedback into meaningful business insights.

---

## 🚀 Key Features

### 1. Customer Feedback Portal
- Public feedback submission page.
- 1–5 star customer rating system.
- Feedback categories: Product, Service, Support, Website, and Other.
- Optional customer name and email.
- Written review and feedback submission.
- Form validation and submission confirmation.

### 2. Open Dashboard
- The dashboard opens without a password.
- The former access page redirects to the dashboard.
- Names and email addresses are not readable through the public data API.
- Easy navigation between feedback submission and dashboard.

### 3. Sentiment Analysis
- Classifies customer reviews into:
  - Positive
  - Negative
  - Neutral
- Helps identify customer satisfaction patterns.
- Converts unstructured customer reviews into useful insights.

### 4. Analytics Dashboard
- Total customer reviews.
- Average customer rating.
- Positive and negative feedback percentages.
- Sentiment distribution charts.
- Rating distribution analysis.
- Feedback trends over time.
- Recent customer reviews.
- Category, rating, date, and sentiment filters.

### 5. Data Management
- Supabase database integration.
- Centralized customer feedback storage.
- Analytics generated from collected feedback.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, TypeScript |
| Styling | Tailwind CSS |
| Routing | TanStack Router |
| Application Framework | TanStack Start |
| Build Tool | Vite |
| Database | Supabase |
| Data Fetching | TanStack Query |
| Charts & Visualization | Recharts |
| Backend | TanStack Start Server Functions |
| Development Tools | VS Code, Git, GitHub |
| Deployment | Lovable, Netlify, Vercel (Nitro adapters) |

---

## ⚙️ Application Workflow

1. Customers open the public Thrylos feedback portal.
2. Customers submit their ratings, categories, and written reviews.
3. Feedback is stored in the Supabase database.
4. The system performs sentiment classification.
5. The analytics dashboard retrieves the collected feedback.
6. The Thrylos team views customer satisfaction metrics, sentiment trends, and recurring concerns.

**Workflow:**

Customer → Feedback Form → Supabase Database → Sentiment Analysis → Analytics Dashboard

---

## 📁 Project Structure

```text
thrylos-feedback-compass/
│
├── public/
│   └── favicon.png
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── integrations/
│   │   └── supabase/
│   ├── lib/
│   ├── routes/
│   ├── test/
│   ├── router.tsx
│   └── styles.css
│
├── supabase/
├── drizzle/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 💻 Installation & Setup

### Prerequisites
- Node.js 22
- npm
- Git
- Your existing Lovable Cloud database; do not create or migrate to another database.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd thrylos-feedback-compass
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Copy `.env.example` to `.env.local`, then copy the **existing** public values from the downloaded project's `.env`. Do not use new credentials or change the database. The example intentionally contains no invented credentials.

```env
VITE_SUPABASE_URL=<copy the existing value>
VITE_SUPABASE_PUBLISHABLE_KEY=<copy the existing value>
```

These two public variables are the only database settings required. Set them before building: Vite embeds them in browser and server bundles. The dashboard prefers optional `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` runtime overrides when present; these must match the same database and publishable key. Neither is an admin credential.

Do **not** set a service-role key, `SITE_PASSWORD`, `SESSION_SECRET`, project ID, or Lovable API key. `LOVABLE_DB_MIGRATION_URL` is only for Lovable-managed schema tooling, not app startup or builds. Existing migrations are already applied: do not replay migrations on deployment.

**Important:** Never upload private credentials. `.env.local` is ignored by the existing project settings. The downloaded `.env` contains public configuration; check it locally and do not add server secrets there.

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Build for Production

```bash
npm run build
```

## Deploy the current export (not an older ZIP)

Download the latest code after these changes, or use the latest repository revision. Replace your previous checkout instead of deploying old generated `dist`, `.output`, `.vercel`, or `.netlify` output. Do not upload `node_modules`. Keep `.env.example`, `netlify.toml`, and `vercel.json`.

### Required hosting variables

| Variable | Netlify | Vercel |
|---|---|---|
| `VITE_SUPABASE_URL` | Existing public URL; available at build time | Same existing value; set for Production and Preview |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Existing publishable key; available at build time | Same existing value; set for Production and Preview |
| `NITRO_PRESET` | `netlify` (set in `netlify.toml`) | `vercel` (set in project Environment Variables) |

Optional runtime overrides: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`; normally leave both unset. No other app environment variables are required. Lovable preview flags, telemetry, cron secrets, and migration connection settings are not required on either host.

### Netlify

1. Import the latest repository, or use the Netlify CLI with the latest downloaded folder.
2. Use Node.js 22; `netlify.toml` sets the build command to `npm run build`, publish directory to `dist`, and Nitro preset to `netlify`.
3. Add the two `VITE_` values above to the site's environment settings for the build.
4. Deploy. Nitro generates the server function in `.netlify/functions-internal` and routing rules in `dist`; deploy both through Netlify's build/CLI, not by dragging only `dist` into a static upload.
5. For local CLI deployment: run `npm install`, then `NITRO_PRESET=netlify npm run build`, then `npx netlify deploy --build --prod`. Authenticate/link the intended site when the CLI asks. Windows PowerShell: `$env:NITRO_PRESET="netlify"; npm run build`.
6. Open `/`, refresh it, then open `/feedback` directly. Check charts, rows, and submission confirmation.

### Vercel

1. Import the latest repository, or run `npx vercel` from the latest downloaded folder and link the intended project.
2. Choose **Other** for the framework and Node.js 22. `vercel.json` specifies `npm install` and `npm run build`; leave the dashboard Output Directory override unset.
3. Add the two `VITE_` values plus `NITRO_PRESET=vercel` for Production and Preview environments.
4. Deploy. Nitro generates Vercel's Build Output API in `.vercel/output`, including server functions and static assets; do not deploy this as a static SPA.
5. For CLI production deployment after linking/configuring the variables, run `npx vercel --prod`. For a local adapter build, run `NITRO_PRESET=vercel npm run build`. Windows PowerShell: `$env:NITRO_PRESET="vercel"; npm run build`.
6. Open `/`, refresh it, then open `/feedback` directly. Changing `VITE_` values requires another build/deployment.

### Database access and privacy

The existing `feedback` table and all 21 records are retained (12 demo rows, 9 real rows at verification). The dashboard deliberately displays only real rows when any exist. RLS remains enabled. The SELECT policy allows the intentionally open dashboard, but column grants allow only `id`, `rating`, `category`, `review_text`, `sentiment`, `is_demo`, and `created_at`. Public requests for `customer_name`, `email`, or `select=*` are rejected by database permissions, not merely hidden by the UI. Review text remains visible as requested; do not enter private contact details in review text.

Public INSERT still requires `is_demo = false`. There are no public UPDATE or DELETE policies. No new database or admin operations were introduced.

### Service-key audit and export troubleshooting

- `src/lib/dashboard.functions.ts` is the only application server function. It constructs a session-free publishable client inside its handler and selects the seven permitted fields; it never imports the admin module.
- `src/integrations/supabase/client.ts` is the generated browser client, using the existing `VITE_` variables. `auth-middleware.ts` uses publishable settings for authenticated functions but is unused by current features. `auth-attacher.ts` is not registered because the current server functions are public. `cron-auth.ts` is unused; its cron secrets are not app requirements.
- `src/integrations/supabase/client.server.ts` is an unused, generated admin-client template. It still contains service-key references but is not imported by the application or executed at startup. It is integration-managed and intentionally left untouched. There are no genuine admin operations to provision.
- The logo now uses the existing bundled public image rather than Lovable's preview asset proxy. Optional error-reporting hooks are safe no-ops outside the editor.
- If the old service-key error appears, the running artifact is not the current application: replace the old export and rebuild without cached build output. Search import call sites, not just the unused generated template. Never add a dummy key.

### Verification

Run `npm test` for the feedback rules, safe field projection, opaque-key headers, and exported VITE-only dashboard configuration. The Lovable build checker validates its own production target automatically. Netlify/Vercel production adapter builds and hosted deployments must also be checked using the commands above; passing the Lovable build alone does not verify those external targets.

---

## 🎯 Problem Statement

Businesses receive customer feedback through different channels, making it difficult to manually analyze large amounts of reviews and identify recurring customer concerns.

Without an organized analytics system, companies may struggle to understand customer satisfaction, recognize service issues, and make informed improvements.

Thrylos Feedback Compass addresses this challenge by providing a centralized platform for collecting customer feedback and transforming it into actionable insights through sentiment analysis and data visualization.

---

## 💡 Project Objectives

- Simplify customer feedback collection.
- Automate basic sentiment classification.
- Understand customer satisfaction levels.
- Identify recurring customer complaints.
- Monitor feedback trends over time.
- Support data-driven business decisions.
- Improve customer experience and service quality.

---

## 🌍 Sustainable Development Goals (SDGs)

This project aligns with the following United Nations Sustainable Development Goals:

**SDG 8 – Decent Work and Economic Growth**

Supports business growth and operational improvement by helping organizations understand customer needs and improve service quality.

**SDG 9 – Industry, Innovation and Infrastructure**

Promotes digital innovation by combining web technologies, data analytics, and NLP-based sentiment analysis to improve business processes.

---

## 🔮 Future Enhancements

- Advanced NLP-based sentiment analysis.
- Automatic identification of recurring feedback themes.
- Multilingual customer feedback analysis.
- AI-generated business insights.
- Advanced customer satisfaction reports.
- More detailed trend analysis.

---

## 🏢 Developed For

**Thrylos**

Customer Feedback & Review Analytics Tool

---

## 👩‍💻 Project Information

**Project Name:** Thrylos Feedback Compass  
**Project Type:** Web Application / Business Analytics  
**Domain:** AI, NLP, Web Development & Data Analytics  
**Primary Purpose:** Customer Feedback Collection and Sentiment Analytics

---

*Turning customer feedback into meaningful business insights.*
#   t h r y l o s f e e d b a c k a n a l y t i c s -  
 