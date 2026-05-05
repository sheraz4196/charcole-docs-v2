# Project Context

## What this project is

- This repository is the **documentation website for Charcole**, a Node.js backend starter / scaffolding CLI.
- It is built with **Nuxt 4** and **Docus** to serve static documentation pages and a marketing-style landing experience.
- The site documents Charcole features such as project structure, authentication, JWT setup, repositories, and Swagger integration.
- The documentation is meant to describe how to use Charcole, how to configure it, and how to extend it.

## Root project files

- `package.json`
  - Contains `dev` and `build` scripts:
    - `npm run dev` → `nuxt dev --extends docus`
    - `npm run build` → `nuxt build --extends docus`
  - Declares dependencies: `nuxt`, `docus`, `@nuxtjs/sitemap`, `@nuxtjs/robots`, `better-sqlite3`.
- `nuxt.config.ts`
  - Configures site metadata: name, URL, description.
  - Adds global CSS from `~/assets/css/main.css`.
  - Registers modules: `@nuxt/ui`, `@nuxtjs/sitemap`, `@nuxtjs/robots`.
  - Configures sitemap URLs manually for the documented pages.
  - Configures robots policy and canonical site settings.
  - Declares LLM metadata for the site.
- `.gitignore`
  - Excludes Nuxt build outputs, Node modules, logs, local env files, and editor-specific junk.
- `.prettierignore`
  - Exists in the repo but is not heavily used in the visible content.

## App configuration and layout

- `app/app.config.ts`
  - Sets default SEO metadata: site title, title template, description.
  - Declares UI theme colors and default button styling.
  - Configures `docus` title and description.
- `app/assets/css/main.css`
  - Contains global styling rules for the site.
- `app/components/AppHeaderLogo.vue`
  - Contains the logo component used by the site header.
- `app/plugins/seo.ts`
  - Adds canonical URL output to every route using `useHead`.

## Content and documentation structure

- All documentation pages live under the `content/` directory.
- The project uses folder-based organization:
  - `content/index.md` → home page with `u-page-hero` and feature sections.
  - `content/1.getting-started/` → Getting Started section.
  - `content/2. guides/` → Guides section.
- Numeric prefixes in filenames ensure ordering in navigation.
- Each markdown page uses **YAML frontmatter** for:
  - `title`
  - `description`
  - `navigation.icon`
  - `seo` metadata
- Example content pages:
  - `content/1.getting-started/2.introduction.md`
  - `content/1.getting-started/3.installation.md`
  - `content/1.getting-started/4.project-structure.md`
  - `content/2. guides/3. respositories.md`
  - `content/2. guides/4. authentication/5. setup.md`
  - `content/2. guides/4. authentication/6. jwt-configuration.md`
  - `content/2. guides/5. swagger/6. introduction.md`
  - `content/2. guides/5. swagger/7. swagger-migration.md`
  - `content/2. guides/5. swagger/8. non-charcole-users.md`
  - `content/2. guides/5. swagger/9. swagger-examples.md`
- Navigation files exist in each section to help Docus build sidebar menus:
  - `content/1.getting-started/.navigation.yml`
  - `content/2. guides/.navigation.yml`
  - `content/2. guides/4. authentication/.navigation.yml`
  - `content/2. guides/5. swagger/.navigation.yml`

## Writing structure and style

- The documentation is written in a **clear, concise, and practical style**.
- It follows a **problem-solution structure**:
  - first explain why a feature exists,
  - then show how to use it,
  - and include examples.
- Content is aimed at users who want fast onboarding and implementation guidance.
- The guide pages include:
  - short introductions,
  - step-by-step instructions,
  - code examples,
  - explicit configuration details,
  - quick tests and endpoint examples.
- Pages are designed to be **read independently** while still fitting into the overall path.

## Project purpose and documentation goal

- The repo exists to document the **Charcole CLI and its generated Node.js backend starter**.
- It is not the backend library code itself; instead, it is the **documentation site** for Charcole.
- The goal is to provide:
  - onboarding for new Charcole users,
  - architecture explanation,
  - authentication setup instructions,
  - Swagger documentation guidance,
  - and migration/help content for both existing and non-Charcole users.
- The landing page and SEO settings are configured to make this documentation discoverable.

## How the site is documented

- The site is documented in **Markdown with Docus components**.
- Each major topic is a separate markdown file grouped by purpose.
- The project uses **Docus navigation files** to structure sidebars and help readers find content.
- The site builds using Nuxt and Docus, with SEO and sitemap support configured in `nuxt.config.ts`.
- The homepage is custom-built using Docus UI blocks, while section pages use standard markdown headings and content.

## Summary of all major directories

- `app/` → Nuxt/Docus app configuration, global CSS, plugin, and header logo.
- `content/` → Documentation source content and navigation structure.
- `public/` → Static assets such as icons and images.
- `.gitignore` / `.prettierignore` → repo cleanliness and formatting exclusions.
- `nuxt.config.ts` → core site config, SEO, sitemap, robots.
- `package.json` → scripts and dependencies.

## Notes on current content focus

- The documentation is centered on **Charcole features**:
  - project scaffolding,
  - backend starter architecture,
  - optional JWT authentication,
  - repository patterns,
  - Swagger integration and migration.
- The writing is oriented to make Charcole easy to understand and quick to adopt.
- There is a strong emphasis on **simple setup, modular features, and real examples**.
