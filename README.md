# Kishorkumar K R: Portfolio

A one-page static site built with **Astro** and **GSAP**, designed like a newspaper front page so recruiters and HR know how to read it: headline first, then numbers, then the story.

## Sections
- **Nav:** "Open to new roles" status, the **Edition** switch (Plain English / Technical), live India time and Contact.
- **Front page:** the name as the nameplate, headline, summary, an "In this edition" index, an "Available for hire" stamp, four key numbers, and a live news ticker of things the code does.
- **02 Work history:** Daivtech, Adcanopus and Iamneo, with results in plain words.
- **03 Explainer:** "What happens when you tap Pay?" in six steps.
- **04 Classifieds:** 45 skills, each with a one-line explanation on tap, plus a "Wanted" ad.
- **05 Notices:** education and the privacy rules (GDPR, HIPAA, SOC 2).
- **06 Letters:** email (with a copy button), LinkedIn and GitHub.

## Edit content
All text is in `src/data/profile.ts`. Most sentences have a `plain` and a `tech` version.
To add a résumé button, put the PDF in `public/` and set `links.resume` (e.g. `'resume.pdf'`).

## Run locally
```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Deploy to GitHub Pages
1. Push to a GitHub repo on the `main` branch.
2. Go to **Settings → Pages → Source** and choose **GitHub Actions**.
3. `.github/workflows/deploy.yml` builds and publishes the site, and sets the base path automatically.
