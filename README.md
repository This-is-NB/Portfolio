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

Each feature owns its TSX components and `.module.scss` files. Import module styles as `Styles` and use the generated class names (for example, `className={Styles.header}`). `src/styles/global.scss` currently preserves the original site-wide visual system while component-specific interactions and animations live with their features.

## Development

```sh
npm install
npm run dev
npm run build
```

The hero portrait model lives under `public/models/` and plays its embedded salute animation on arrival and when the portrait is approached.
