# Portfolio Single-Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimalist, dark, mobile-first single-page portfolio for Gonzalo Fernández González using Astro components and Tailwind CSS v4, replacing the default Astro starter content.

**Architecture:** One `Layout.astro` wrapping seven section components (`Navbar`, `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Footer`) assembled in `src/pages/index.astro`. `Projects.astro` renders three reusable `ProjectCard.astro` instances with placeholder data. No client-side JS, no automated test framework — each task is verified with `npm run build` + `grep` against the generated output.

**Tech Stack:** Astro 7, Tailwind CSS v4 (`@tailwindcss/vite`), no other runtime dependencies.

## Global Constraints

- Node >=22.12.0 (per `package.json` engines field) — do not use syntax requiring a newer runtime.
- Tailwind CSS v4 via `@tailwindcss/vite` only — do not add `@astrojs/tailwind` or a `tailwind.config.js`.
- Utility classes only — no custom CSS beyond `src/styles/global.css`'s `@import "tailwindcss";` and the global `scroll-behavior: smooth`.
- Palette: any shade of Tailwind's `zinc` gray scale (`zinc-950` through `zinc-100`) for backgrounds, text, and borders, providing visual hierarchy (darker/dimmer for less prominent content), plus `emerald-400` as the single accent color. Do not introduce colors outside the `zinc` and `emerald` families.
- No external fonts — use Tailwind's default `font-sans`.
- All HTML markup must be semantic (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Copy for the "Sobre mí" and "Skills" sections must match the spec's text **verbatim**, character for character.
- GitHub link is always `https://github.com/gonfdezz`.
- Mobile-first responsive: base styles target mobile, `md:` breakpoint layers on desktop layout.
- `mi-foto.png` and `cv.pdf` are referenced but **not created** by this plan — the user adds them later. No `onerror` fallback or placeholder-image JS logic.

---

### Task 1: Tailwind v4 setup, Layout rewrite, and starter cleanup

**Files:**
- Modify: `package.json` (via `npm install`)
- Modify: `astro.config.mjs`
- Create: `src/styles/global.css`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`
- Delete: `src/components/Welcome.astro`
- Delete: `src/assets/astro.svg`
- Delete: `src/assets/background.svg`

**Interfaces:**
- Produces: `Layout.astro` accepts an optional `title?: string` prop (default `'Gonzalo Fernández González — Portfolio'`) and renders `<slot />` inside `<body class="bg-zinc-950 text-zinc-100 font-sans antialiased">`. Every later task places its component inside this slot via `index.astro`.

- [ ] **Step 1: Install Tailwind v4 and its Vite plugin**

Run:
```bash
npm install tailwindcss @tailwindcss/vite
```
Expected: `package.json` `dependencies` now includes `tailwindcss` and `@tailwindcss/vite`; command exits 0.

- [ ] **Step 2: Register the Tailwind Vite plugin in Astro config**

Replace the full contents of `astro.config.mjs`:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
});
```

- [ ] **Step 3: Create the global stylesheet**

Create `src/styles/global.css`:

```css
@import "tailwindcss";

html {
	scroll-behavior: smooth;
}
```

- [ ] **Step 4: Rewrite the Layout**

Replace the full contents of `src/layouts/Layout.astro`:

```astro
---
import '../styles/global.css';

interface Props {
	title?: string;
}

const { title = 'Gonzalo Fernández González — Portfolio' } = Astro.props;
---

<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<link rel="icon" href="/favicon.ico" />
		<meta name="generator" content={Astro.generator} />
		<title>{title}</title>
	</head>
	<body class="bg-zinc-950 text-zinc-100 font-sans antialiased">
		<slot />
	</body>
</html>
```

- [ ] **Step 5: Replace `index.astro` with a minimal placeholder**

Replace the full contents of `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout>
	<main class="p-8">
		<p>Placeholder</p>
	</main>
</Layout>
```

- [ ] **Step 6: Remove unused starter files**

Run:
```bash
rm src/components/Welcome.astro src/assets/astro.svg src/assets/background.svg
```
Expected: files removed, command exits 0.

- [ ] **Step 7: Build and verify Tailwind is active**

Run:
```bash
npm run build && grep -r "bg-zinc-950" dist/_astro/*.css && grep "Placeholder" dist/index.html
```
Expected: build succeeds with no errors; both `grep` calls print a matching line (first confirms Tailwind compiled the utility class into CSS, second confirms the page renders).

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs src/styles/global.css src/layouts/Layout.astro src/pages/index.astro src/components/Welcome.astro src/assets/astro.svg src/assets/background.svg
git commit -m "feat: set up Tailwind v4 and clear starter content"
```

---

### Task 2: Navbar component

**Files:**
- Create: `src/components/Navbar.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: none (static content).
- Produces: `Navbar.astro`, a no-props component rendering a `<header>` with sticky nav; placed first inside `<Layout>` by every subsequent task's `index.astro` edit.

- [ ] **Step 1: Create the Navbar component**

Create `src/components/Navbar.astro`:

```astro
<header class="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
	<nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
		<span class="text-sm font-semibold tracking-wide text-zinc-100">Gonzalo Fernández</span>
		<ul class="flex gap-6 text-sm text-zinc-400">
			<li><a href="#about" class="transition hover:text-emerald-400">Sobre mí</a></li>
			<li><a href="#skills" class="transition hover:text-emerald-400">Skills</a></li>
			<li><a href="#proyectos" class="transition hover:text-emerald-400">Proyectos</a></li>
			<li><a href="#experiencia" class="transition hover:text-emerald-400">Experiencia</a></li>
		</ul>
	</nav>
</header>
```

- [ ] **Step 2: Wire the Navbar into the page**

Replace the full contents of `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
---

<Layout>
	<Navbar />
	<main class="p-8">
		<p>Placeholder</p>
	</main>
</Layout>
```

- [ ] **Step 3: Build and verify the nav links are present**

Run:
```bash
npm run build && grep -o 'href="#proyectos"' dist/index.html && grep -o 'href="#experiencia"' dist/index.html
```
Expected: build succeeds; both `grep` calls print the matching `href` string.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.astro src/pages/index.astro
git commit -m "feat: add sticky navbar with smooth-scroll anchor links"
```

---

### Task 3: Hero component

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: none.
- Produces: `Hero.astro`, a no-props component rendering `<section id="inicio">`.

- [ ] **Step 1: Create the Hero component**

Create `src/components/Hero.astro`:

```astro
<section id="inicio" class="mx-auto flex max-w-5xl flex-col-reverse items-center gap-10 px-6 py-24 md:flex-row md:py-32">
	<div class="flex-1 text-center md:text-left">
		<h1 class="text-3xl font-bold text-zinc-100 md:text-4xl">
			Hola, soy Gonzalo Fernández González. Estudiante de Ingeniería del Software y Desarrollador.
		</h1>
		<a
			href="#proyectos"
			class="mt-8 inline-block rounded-full border border-emerald-400 px-6 py-3 text-sm font-medium text-emerald-400 transition hover:bg-emerald-400 hover:text-zinc-950"
		>
			Ver proyectos
		</a>
	</div>
	<div class="flex-1">
		<img
			src="/mi-foto.png"
			alt="Gonzalo Fernández González"
			class="mx-auto h-56 w-56 rounded-full object-cover md:h-72 md:w-72"
		/>
	</div>
</section>
```

- [ ] **Step 2: Wire the Hero into the page**

Replace the full contents of `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
---

<Layout>
	<Navbar />
	<main>
		<Hero />
	</main>
</Layout>
```

- [ ] **Step 3: Build and verify the Hero content**

Run:
```bash
npm run build && grep -o 'Estudiante de Ingeniería del Software y Desarrollador' dist/index.html && grep -o 'src="/mi-foto.png"' dist/index.html
```
Expected: build succeeds; both `grep` calls print a matching line.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add hero section"
```

---

### Task 4: About component

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: none.
- Produces: `About.astro`, a no-props component rendering `<section id="about">`.

- [ ] **Step 1: Create the About component**

Create `src/components/About.astro`:

```astro
<section id="about" class="mx-auto max-w-2xl px-6 py-20">
	<h2 class="text-2xl font-semibold text-zinc-100">Sobre mí</h2>
	<p class="mt-6 leading-relaxed text-zinc-400">
		¡Hola! Soy estudiante de tercer año de Ingeniería del Software. Desde que descubrí el
		potencial de la programación, he compaginado mi formación universitaria con el desarrollo
		de proyectos personales para llevar la teoría a la práctica. Me considero una persona
		curiosa, analítica y en constante aprendizaje, siempre buscando aplicar la lógica de la
		ingeniería para construir aplicaciones web eficientes, limpias y escalables que resuelvan
		problemas reales.
	</p>
</section>
```

- [ ] **Step 2: Wire About into the page**

Replace the full contents of `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
---

<Layout>
	<Navbar />
	<main>
		<Hero />
		<About />
	</main>
</Layout>
```

- [ ] **Step 3: Build and verify the About copy is exact**

Run:
```bash
npm run build && grep -o 'aplicar la lógica de la' dist/index.html
```
Expected: build succeeds; `grep` prints the matching fragment, confirming the verbatim copy rendered.

- [ ] **Step 4: Commit**

```bash
git add src/components/About.astro src/pages/index.astro
git commit -m "feat: add about section"
```

---

### Task 5: Skills component

**Files:**
- Create: `src/components/Skills.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: none.
- Produces: `Skills.astro`, a no-props component rendering `<section id="skills">`.

- [ ] **Step 1: Create the Skills component**

Create `src/components/Skills.astro`:

```astro
---
const skills = [
	'HTML',
	'Tailwind CSS',
	'JavaScript',
	'Astro',
	'Node.js',
	'Java',
	'Python',
	'SQL',
	'VS Code',
	'Eclipse',
	'Git',
	'GitHub',
];
---

<section id="skills" class="mx-auto max-w-3xl px-6 py-20">
	<h2 class="text-2xl font-semibold text-zinc-100">Skills</h2>
	<p class="mt-6 leading-relaxed text-zinc-400">
		Tengo una base sólida en el desarrollo de software y la creación de productos web,
		combinando la robustez de lenguajes de backend con la agilidad de tecnologías frontend
		modernas. Me entusiasma escribir código limpio, resolver problemas lógicos y diseñar
		soluciones eficientes. Gracias a mi formación y práctica constante, tengo una gran
		facilidad para adaptarme a diferentes entornos de desarrollo y aprender nuevas
		tecnologías con rapidez.
	</p>
	<p class="mt-4 leading-relaxed text-zinc-400">
		En mi día a día, construyo el frontend utilizando HTML, Tailwind CSS y JavaScript,
		apoyándome en Astro para crear sitios web rápidos y optimizados. En el lado del servidor
		y la lógica de datos, trabajo con Node.js, Java, Python y bases de datos SQL. Desarrollo
		principalmente en VS Code y Eclipse, y gestiono todo el ciclo de vida de mi código
		utilizando Git y GitHub para garantizar un control de versiones limpio y colaborativo.
	</p>
	<ul class="mt-8 flex flex-wrap gap-3">
		{
			skills.map((skill) => (
				<li class="rounded-full border border-zinc-800 px-4 py-1 text-sm text-zinc-300">
					{skill}
				</li>
			))
		}
	</ul>
</section>
```

- [ ] **Step 2: Wire Skills into the page**

Replace the full contents of `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Skills from '../components/Skills.astro';
---

<Layout>
	<Navbar />
	<main>
		<Hero />
		<About />
		<Skills />
	</main>
</Layout>
```

- [ ] **Step 3: Build and verify the Skills copy and tags**

Run:
```bash
npm run build && grep -o 'control de versiones limpio y colaborativo' dist/index.html && grep -o '>Tailwind CSS<' dist/index.html
```
Expected: build succeeds; both `grep` calls print a matching line.

- [ ] **Step 4: Commit**

```bash
git add src/components/Skills.astro src/pages/index.astro
git commit -m "feat: add skills section"
```

---

### Task 6: ProjectCard and Projects components

**Files:**
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/Projects.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: none.
- Produces: `ProjectCard.astro` accepts props `title: string`, `description: string`, `tags: string[]`, `demoUrl: string`, `githubUrl: string`. `Projects.astro` is a no-props component rendering `<section id="proyectos">` with three `<ProjectCard />` instances.

- [ ] **Step 1: Create the ProjectCard component**

Create `src/components/ProjectCard.astro`:

```astro
---
interface Props {
	title: string;
	description: string;
	tags: string[];
	demoUrl: string;
	githubUrl: string;
}

const { title, description, tags, demoUrl, githubUrl } = Astro.props;
---

<article class="flex flex-col justify-between rounded-2xl border border-zinc-800 p-6">
	<div>
		<h3 class="text-lg font-semibold text-zinc-100">{title}</h3>
		<p class="mt-3 text-sm leading-relaxed text-zinc-400">{description}</p>
		<ul class="mt-4 flex flex-wrap gap-2">
			{
				tags.map((tag) => (
					<li class="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
						{tag}
					</li>
				))
			}
		</ul>
	</div>
	<div class="mt-6 flex gap-4 text-sm">
		<a href={demoUrl} class="text-emerald-400 transition hover:underline">Ver Demo</a>
		<a href={githubUrl} class="text-zinc-400 transition hover:text-emerald-400">Código en GitHub</a>
	</div>
</article>
```

- [ ] **Step 2: Create the Projects section**

Create `src/components/Projects.astro`:

```astro
---
import ProjectCard from './ProjectCard.astro';

const projects = [
	{
		title: 'Proyecto Placeholder 1',
		description: 'Descripción corta de un proyecto de ejemplo pendiente de sustituir.',
		tags: ['Astro', 'Tailwind CSS'],
		demoUrl: '#',
		githubUrl: 'https://github.com/gonfdezz',
	},
	{
		title: 'Proyecto Placeholder 2',
		description: 'Descripción corta de un proyecto de ejemplo pendiente de sustituir.',
		tags: ['Node.js', 'SQL'],
		demoUrl: '#',
		githubUrl: 'https://github.com/gonfdezz',
	},
	{
		title: 'Proyecto Placeholder 3',
		description: 'Descripción corta de un proyecto de ejemplo pendiente de sustituir.',
		tags: ['Java', 'Python'],
		demoUrl: '#',
		githubUrl: 'https://github.com/gonfdezz',
	},
];
---

<section id="proyectos" class="mx-auto max-w-5xl px-6 py-20">
	<h2 class="text-2xl font-semibold text-zinc-100">Proyectos</h2>
	<div class="mt-8 grid gap-8 md:grid-cols-3">
		{projects.map((project) => <ProjectCard {...project} />)}
	</div>
</section>
```

- [ ] **Step 3: Wire Projects into the page**

Replace the full contents of `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Skills from '../components/Skills.astro';
import Projects from '../components/Projects.astro';
---

<Layout>
	<Navbar />
	<main>
		<Hero />
		<About />
		<Skills />
		<Projects />
	</main>
</Layout>
```

- [ ] **Step 4: Build and verify the project cards render**

Run:
```bash
npm run build && grep -c 'Ver Demo' dist/index.html && grep -c 'https://github.com/gonfdezz' dist/index.html
```
Expected: build succeeds; first `grep -c` prints `3`; second prints at least `3` (one per card; the navbar/footer may add more once those tasks land, but at this point exactly `3`).

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCard.astro src/components/Projects.astro src/pages/index.astro
git commit -m "feat: add projects grid with reusable ProjectCard"
```

---

### Task 7: Experience component

**Files:**
- Create: `src/components/Experience.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: none.
- Produces: `Experience.astro`, a no-props component rendering `<section id="experiencia">`.

- [ ] **Step 1: Create the Experience component**

Create `src/components/Experience.astro`:

```astro
<section id="experiencia" class="mx-auto max-w-2xl px-6 py-20">
	<h2 class="text-2xl font-semibold text-zinc-100">Experiencia / Educación</h2>
	<ol class="mt-8 space-y-8 border-l border-zinc-800 pl-6">
		<li class="relative">
			<span class="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-emerald-400"></span>
			<h3 class="font-medium text-zinc-100">Grado en Ingeniería del Software - Universidad de Oviedo</h3>
			<p class="mt-1 text-sm text-zinc-400">Cursando 3er año</p>
		</li>
		<li class="relative">
			<span class="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-zinc-700"></span>
			<!-- Plantilla: sustituir por una práctica o proyecto freelance real -->
			<h3 class="font-medium text-zinc-500">Prácticas / Proyecto freelance (plantilla)</h3>
			<p class="mt-1 text-sm text-zinc-600">Añade aquí tu experiencia real cuando la tengas.</p>
		</li>
	</ol>
</section>
```

- [ ] **Step 2: Wire Experience into the page**

Replace the full contents of `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Skills from '../components/Skills.astro';
import Projects from '../components/Projects.astro';
import Experience from '../components/Experience.astro';
---

<Layout>
	<Navbar />
	<main>
		<Hero />
		<About />
		<Skills />
		<Projects />
		<Experience />
	</main>
</Layout>
```

- [ ] **Step 3: Build and verify the Experience content**

Run:
```bash
npm run build && grep -o 'Universidad de Oviedo' dist/index.html && grep -o 'Cursando 3er año' dist/index.html
```
Expected: build succeeds; both `grep` calls print a matching line.

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience.astro src/pages/index.astro
git commit -m "feat: add experience/education timeline"
```

---

### Task 8: Footer component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: none.
- Produces: `Footer.astro`, a no-props component rendering `<footer>`, placed as the last child inside `<Layout>`.

- [ ] **Step 1: Create the Footer component**

Create `src/components/Footer.astro`:

```astro
<footer class="border-t border-zinc-800">
	<div class="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-sm text-zinc-500">
		<nav class="flex gap-6">
			<!-- TODO: reemplazar por la URL real de LinkedIn -->
			<a href="#" class="transition hover:text-emerald-400">LinkedIn</a>
			<a href="https://github.com/gonfdezz" class="transition hover:text-emerald-400">GitHub</a>
			<!-- TODO: reemplazar por el email real -->
			<a href="#" class="transition hover:text-emerald-400">Email</a>
		</nav>
		<a
			href="/cv.pdf"
			class="rounded-full border border-zinc-800 px-4 py-1.5 text-xs text-zinc-400 transition hover:border-emerald-400 hover:text-emerald-400"
		>
			Descargar CV
		</a>
		<p>&copy; {new Date().getFullYear()} Gonzalo Fernández González</p>
	</div>
</footer>
```

- [ ] **Step 2: Wire Footer into the page**

Replace the full contents of `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Skills from '../components/Skills.astro';
import Projects from '../components/Projects.astro';
import Experience from '../components/Experience.astro';
import Footer from '../components/Footer.astro';
---

<Layout>
	<Navbar />
	<main>
		<Hero />
		<About />
		<Skills />
		<Projects />
		<Experience />
	</main>
	<Footer />
</Layout>
```

- [ ] **Step 3: Build and verify the Footer content**

Run:
```bash
npm run build && grep -o 'Descargar CV' dist/index.html && grep -o 'href="/cv.pdf"' dist/index.html
```
Expected: build succeeds; both `grep` calls print a matching line.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add footer with social links and CV download button"
```

---

### Task 9: Final manual verification pass

**Files:** none (verification only).

**Interfaces:** none — this task exercises the fully assembled page from Task 8.

- [ ] **Step 1: Start the dev server in the background**

Run:
```bash
astro dev --background
```
Expected: command reports the server started and prints the local URL/port.

- [ ] **Step 2: Check server status and confirm all sections are served**

Run:
```bash
astro dev status
curl -s http://localhost:4321/ | grep -o 'id="inicio"\|id="about"\|id="skills"\|id="proyectos"\|id="experiencia"'
```
(Adjust the port if `astro dev status` reports a different one.)
Expected: `astro dev status` shows the server running; the `curl | grep` prints all five `id="..."` matches, confirming every section is present on the rendered page.

- [ ] **Step 3: Manually verify responsiveness in a browser**

Open the printed local URL in a browser, then:
- Resize to a mobile width (~375px) and confirm the Hero stacks image-above-text, the Navbar links stay on one row, and the Projects grid becomes a single column.
- Resize to desktop width (~1280px) and confirm the Hero is two columns and Projects is a three-column grid.
- Click each Navbar link and confirm smooth-scroll to the matching section.

Expected: no horizontal scrollbars at any width; layout matches the design spec's mobile-first/desktop descriptions.

- [ ] **Step 4: Stop the dev server**

Run:
```bash
astro dev stop
```
Expected: command reports the server stopped.

- [ ] **Step 5: Note remaining manual follow-ups for the user**

No commit in this task (verification only). Remind the user in your final summary that they still need to:
- Add `public/mi-foto.png` (their profile photo).
- Add `public/cv.pdf` (their CV).
- Replace the Footer's placeholder LinkedIn and Email `href="#"` links with real ones.

---

## Self-Review Notes

- **Spec coverage:** Navbar (Task 2), Hero (Task 3), About (Task 4), Skills (Task 5), Projects/ProjectCard (Task 6), Experience (Task 7), Footer (Task 8), Tailwind v4 setup + starter cleanup (Task 1), manual responsive/smooth-scroll check (Task 9) — every spec section has a task.
- **Placeholder scan:** no `TBD`/`TODO`-as-plan-content; the only `TODO` comments are intentional in-app markers for the user to fill in real LinkedIn/email links, called out explicitly in the spec's "Out of scope" section.
- **Type consistency:** `ProjectCard` props (`title`, `description`, `tags: string[]`, `demoUrl`, `githubUrl`) are defined once in Task 6 Step 1 and consumed identically via spread (`{...project}`) in Task 6 Step 2 — no naming drift.
