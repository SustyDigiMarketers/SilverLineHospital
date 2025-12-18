# SilverLine Hospital - Deployment Guide

## 🚨 URGENT: 404 Error Fix Instructions 🚨

The error `Failed to create deployment (status: 404)` confirms that **GitHub Pages is currently disabled** in your repository settings.

**You must enable it manually on GitHub.com:**

1.  Navigate to **Settings** (Top tab).
2.  Select **Pages** (Left sidebar menu, under "Code and automation").
3.  Look for **"Build and deployment"**.
4.  Under **"Source"**, change the dropdown from "Deploy from a branch" (or None) to **"GitHub Actions"**.
5.  **Stop here. Do not select a branch.** Just selecting "GitHub Actions" is enough.
6.  Go to the **Actions** tab in the repository.
7.  Click the failed "Deploy to GitHub Pages" run.
8.  Click the **"Re-run jobs"** button (top right of the workflow view).

---

### Application Details
- **Tech Stack:** React, Vite, TypeScript, Tailwind CSS.
- **Data:** Uses Supabase for content management and analytics (configured).
- **Deployment:** GitHub Pages via GitHub Actions.

### Local Development
To run the app locally:
```bash
npm install
npm run dev
```