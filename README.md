# Naman Portfolio

A single-page portfolio built with React, TypeScript, Vite, Sass CSS Modules, GSAP, Tailwind CSS, and React Three Fiber.

## Structure

```text
src/
  components/          Shared interactive components, including the 3D portrait
  features/            Navigation and page sections with colocated module styles
  pages/home/          Home page composition and page-level motion
  styles/global.css    Global tokens, resets, and shared design-system rules
  App.tsx              Application root
```

Each feature owns its TSX components and `.module.scss` files. Import module styles as `Styles` and use the generated class names (for example, `className={Styles.header}`). `src/styles/global.css` preserves the shared site-wide visual system while component-specific interactions and animations live with their features.

## Development

```sh
npm install
npm run dev
npm run build
```

The hero portrait model lives under `public/models/` and plays its embedded salute animation on arrival and when the portrait is approached.

## Portfolio content

- Update project descriptions, technology tags, status, and demo/source/case-study URLs in `src/features/work/data/projects.ts`. Cards without a URL show a labeled placeholder.
- Replace `public/resume.pdf` when you update your resume; it is linked from the navigation, hero, and About section.
- Career timeline entries and recognition are maintained in `src/features/experience/ExperienceSection.tsx` and `src/features/recognition/RecognitionSection.tsx`.

## GitHub Pages

The site is configured for the `This-is-NB/Portfolio` project repository.

1. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
2. Push to `main` or run the **Deploy to GitHub Pages** workflow from the Actions tab.
3. After the workflow succeeds, visit <https://this-is-nb.github.io/Portfolio/>.

The workflow builds the app and deploys the `dist/` output. Vite's `/Portfolio/` base path ensures assets, including the 3D model and favicon, load from the project-site URL.
