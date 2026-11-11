<p align="center">
  <img src="public/logo-512.png" width="96" alt="AH. monogram" />
</p>

# Ahsan Habib — Portfolio

**Live site: https://ahsanauddry027.github.io/AhsanHabib_portfolio_2026/**

A one-page portfolio for backend job hunting, built with **React 19 + TypeScript + Vite** and Motion for animation. It includes an interactive "API lab" that re-creates the business rules of Kaaj (my Spring Boot + PostgreSQL project) in the browser.

## Run it

```bash
npm install        # once
npm run dev        # http://localhost:5173 with live reload
npm run build      # type-checks, then builds the site into dist/
npm run preview    # serves dist/ at http://localhost:4173
```

In Windows PowerShell, use `npm.cmd` instead of `npm` if you see "running scripts is disabled".

## Change the content

**All text lives in [`src/data/profile.ts`](src/data/profile.ts):** contact details, stats, projects, experience, education, research, principles and the tech stack. Edit it and the page updates; no component needs to change.

Every claim on the site comes from my CV or from a repo README on GitHub. Keep it that way: don't add numbers or skills that those sources don't back.

| To change | Edit |
|---|---|
| A project's case study | `projects` in `src/data/profile.ts` |
| The endpoint list / diagram on a project card | that project's `visual` |
| The "API lab" rules (Kaaj simulator) | `src/components/KaajLab.tsx` |
| The API console responses | `routes` in `src/components/ApiConsole.tsx` |
| Colours, fonts, spacing | the tokens at the top of `src/styles.css` |
| The logo | `public/logo.svg` and `src/components/Logo.tsx`, then `npm run images` |
| The CV that "Download CV" serves | edit the LaTeX in [AhsanHabib_CV](https://github.com/ahsanauddry027/AhsanHabib_CV) (its Action builds the PDF), then copy that `Ahsan_Habib_CV.pdf` over `public/Ahsan_Habib_CV.pdf` |
| Photos and the social share image | `npm run images` (needs the original `IMG_2772.JPG`, which is not in the repo) |

## Deploy

Every push to `main` builds the site and publishes `dist/` to the **`gh-pages`** branch ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)), which GitHub Pages serves. Nothing to set up: GitHub enabled Pages from `gh-pages` automatically. The site updates about a minute after each push.

The build uses a relative base path, so the same `dist/` also works on Vercel, Netlify or any static host. If the address changes, update `og:url`, `og:image` and the canonical link in `index.html`.

## Structure

```
src/
  data/profile.ts        all content
  components/            Header, Logo, Hero (+ marquee), About (+ ApiConsole), Work, KaajLab,
                         Experience, Research, Sections (principles, stack, contact, footer)
  hooks/                 active-section tracking, typing and count-up effects
  lib/                   JSON highlighting for the terminals, asset paths
  styles.css             design tokens and all styles
public/                  CV PDF, photos, logo, favicons, social image
scripts/images.mjs       builds the web images and icons
.github/workflows/       GitHub Pages deployment
```
