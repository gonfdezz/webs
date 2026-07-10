# Portfolio Single-Page — Design

## Goal
Replace the default Astro starter content with a single-page personal portfolio
for Gonzalo Fernández González: minimalist, dark, mobile-first, built with
Astro components and Tailwind CSS utility classes only.

## Stack & setup
- Tailwind CSS v4 via `@tailwindcss/vite` (current official Astro integration
  path; `@astrojs/tailwind` is legacy/deprecated and not used).
  - `npm install tailwindcss @tailwindcss/vite`
  - Add the `@tailwindcss/vite` plugin to `vite.plugins` in `astro.config.mjs`.
  - `src/styles/global.css` contains `@import "tailwindcss";` and is imported
    once from `Layout.astro`.
- No external fonts. Uses Tailwind's default `font-sans` (system font stack)
  to keep the site dependency-free and fast.
- Palette: background `zinc-950`/`zinc-900`, text `zinc-100`/`zinc-400`,
  accent `emerald-400` (links, buttons, highlights).
- `html { scroll-behavior: smooth }` set globally for the nav's anchor links.

## File structure
```
src/
  layouts/
    Layout.astro        # <head>, meta tags, imports global.css, <slot />
  components/
    Navbar.astro         # sticky nav, smooth-scroll anchor links
    Hero.astro            # profile image + intro text + CTA button
    About.astro            # "Sobre mí" section, exact copy provided by user
    Skills.astro             # intro copy + tag grid of technologies
    Projects.astro            # grid of 3 <ProjectCard />
    ProjectCard.astro          # props: title, description, tags, demoUrl, githubUrl
    Experience.astro            # timeline: Universidad de Oviedo + placeholder block
    Footer.astro                 # social links, copyright, "Descargar CV" button
  pages/
    index.astro                  # assembles Layout + all components in order
  styles/
    global.css                    # @import "tailwindcss";
public/
  mi-foto.png                      # NOT created by this work — user adds it later
  cv.pdf                            # NOT created by this work — user adds it later
```

`Welcome.astro` and the current placeholder contents of `Layout.astro` and
`index.astro` (from the Astro starter template) are removed/replaced.

`ProjectCard.astro` is the only component that takes props (`title: string`,
`description: string`, `tags: string[]`, `demoUrl: string`, `githubUrl: string`).
Every other component embeds its own content directly — no prop drilling for
static copy.

## Section behavior

### Navbar
- `position: sticky; top: 0`, translucent dark background
  (`bg-zinc-950/80 backdrop-blur`), thin bottom border.
- Links are `<a href="#about">`, `#skills`, `#proyectos`, `#experiencia`
  anchors matching each section's `id`.
- Single-row layout on both mobile and desktop (few links; no hamburger menu
  needed for a minimalist single-page site).

### Hero
- Two-column grid on `md:` breakpoint and above (text one side, image other);
  single column (image on top, text below) on mobile.
- `<img src="/mi-foto.png" alt="Gonzalo Fernández González" class="rounded-full ...">`.
- Copy: "Hola, soy Gonzalo Fernández González. Estudiante de Ingeniería del
  Software y Desarrollador."
- CTA button: `<a href="#proyectos">` styled as a solid/outlined emerald button.

### About
- Exact copy as provided by the user, in a `max-w-2xl mx-auto` centered block
  for readability, generous vertical padding.

### Skills
- Exact intro copy as provided by the user.
- Technologies presented as a grid/wrap of pill-style tags
  (`border border-zinc-800 rounded-full px-4 py-1 text-sm`), no icons.

### Projects
- `grid md:grid-cols-3 gap-8` of 3 `ProjectCard` components with clearly
  fictitious placeholder data (e.g. title "Proyecto Placeholder 1", tags like
  `["Astro", "Tailwind"]`).
- Each card: title, short description, tech tags, two buttons — "Ver Demo"
  (`demoUrl`, placeholder `#`) and "Código en GitHub" (`githubUrl`, all cards
  point to `https://github.com/gonfdezz` since there are no real per-project
  repos yet).

### Experience / Educación
- Vertical timeline style (left border line + dot markers).
- One real entry: "Grado en Ingeniería del Software - Universidad de Oviedo"
  (Cursando 3er año).
- One placeholder entry, clearly marked as a template block for the user to
  fill in with freelance/internship experience later.

### Footer
- LinkedIn and Email links are placeholders (`href="#"`), marked with a
  `<!-- TODO: reemplazar -->` comment for the user to fill in with real URLs.
- GitHub link is real: `https://github.com/gonfdezz`.
- "Descargar CV" button links to `/cv.pdf` (file not created by this work;
  user adds it to `public/`).
- Discreet copyright line.

## Error handling / missing assets
This is a static site with no client-side logic. `mi-foto.png` and `cv.pdf`
are referenced but not created as part of this work — if missing, the browser
shows a broken-image icon or a 404 on click. No `onerror` fallback or JS
placeholder logic is added; that complexity isn't justified for a personal
static site, and the user will add the real files before shipping.

## Testing / verification
No automated tests — this is static markup/content with no logic to unit
test. Verification is manual: run `astro dev --background`, and visually
check layout, smooth-scroll navigation, and responsiveness (mobile and
desktop breakpoints) in a browser.

## Out of scope
- Real LinkedIn URL, email address, and CV file — user provides these later.
- Real project data/screenshots — placeholders only, per user's explicit
  request for a template.
- Any animation/JS interactivity beyond CSS smooth-scroll.
- Dark/light theme toggle — single dark theme only, per user's spec.
