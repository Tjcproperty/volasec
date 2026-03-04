# Magnum: Volasec Marketing Platform

Magnum is the high-performance, conversion-optimised marketing and consulting platform for Volasec. Built with modern web technologies, it provides an enterprise-grade digital presence that showcases security services, industry expertise, and provides integrated scheduling and newsletter capabilities.

## Overview

From a business perspective, Magnum is designed to:
- **Project Authority:** Deliver a professional, secure, and high-calibre aesthetic suitable for a cyber security firm.
- **Optimise Conversion:** Integrate seamlessly with Cal.com for direct consultation bookings and Resend for newsletter engagement.
- **Ensure Performance:** Utilise Vite and Cloudflare for ultra-fast load times and global availability.
- **Maintain Reliability:** Use a containerised development environment to ensure consistency across all developer machines and production.

## Technology Stack

- **Frontend:** React 18 (Functional components, Hooks)
- **Build System:** Vite 7
- **Styling:** Tailwind CSS with shadcn/ui primitives
- **Animations:** Framer Motion
- **Serverless Logic:** Cloudflare Workers (stored in `functions/api/`)
- **Containerisation:** Docker & Docker Compose
- **Orchestration:** Custom `magnum` CLI wrapper

## Getting Started

### Prerequisites

To run Magnum locally, you only need:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

No local installation of Node.js or npm is required on your host machine, as all processes run within a containerised environment.

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd magnum
   ```

2. **Start the development stack:**
   ```bash
   ./bin/magnum start
   ```
   This command builds the development image, installs dependencies (if needed), and starts the Vite development server.

3. **Access the application:**
   Open your browser and navigate to [http://localhost:3001](http://localhost:3001).

4. **Stop the stack:**
   ```bash
   ./bin/magnum stop
   ```

## CLI Reference

All project operations must be performed via the `./bin/magnum` CLI wrapper to ensure consistency.

| Command | Description |
| :--- | :--- |
| `./bin/magnum start` | Build and start the frontend container in development mode. |
| `./bin/magnum stop` | Stop all containers and the development stack. |
| `./bin/magnum restart` | Stop, rebuild, and restart the stack. |
| `./bin/magnum logs [-f]` | View or tail logs from the frontend container. |
| `./bin/magnum exec [cmd]` | Execute a shell or a specific command inside the container. |
| `./bin/magnum lint` | Run ESLint inside the container to check code quality. |
| `./bin/magnum build` | Perform a production build and package it into an Nginx runtime image. |
| `./bin/magnum help` | Show the full list of available commands. |

## Project Architecture

- **`bin/magnum`**: The primary entry point for all developer operations.
- **`src/pages/`**: Route-level components (e.g., Home, Contact, Services).
- **`src/components/`**: Reusable UI components.
  - **`src/components/ui/`**: Low-level primitives based on shadcn/ui.
  - **`src/components/shared/`**: Common patterns like `PageHero` or `ContactSection`.
- **`src/layout/`**: Global structural components (Header, Footer, PageLayout).
- **`src/lib/`**: Shared utility functions and library configurations.
- **`functions/api/`**: Serverless functions deployed to Cloudflare Workers for contact forms and newsletter management.
- **`public/`**: Static assets such as images, fonts, and videos.

## Development Standards

### British English Requirement
Magnum enforces **British English** spelling for all code, comments, documentation, and user-facing text. 
- Use `-ise` instead of `-ize` (e.g., `optimise`, `prioritise`).
- Use `-our` instead of `-or` (e.g., `colour`, `behaviour`).
- Use `-re` instead of `-er` (e.g., `centre`).
- Refer to `CLAUDE.md` for a comprehensive list of spelling rules.

### Component Guidelines
- **Functional Components:** Always use functional components with Hooks.
- **File Naming:** Use PascalCase for component files (`Hero.jsx`) and camelCase for utilities (`utils.js`).
- **Styling:** Use Tailwind CSS utility classes. Avoid custom CSS unless absolutely necessary.
- **Performance:** Minimise component nesting (max 2 levels) and use guard clauses for early returns.

## Production and Deployment

### Building for Production
To generate a production-ready Docker image:
```bash
./bin/magnum build
```
This produces a multi-stage build that compiles the assets and serves them via a hardened Nginx alpine image.

### Deployment
The platform is designed to be deployed to **Cloudflare Pages**.
- **Frontend:** Deployed via Cloudflare Pages integration (connects to Git).
- **Functions:** The `functions/` directory is automatically picked up by Cloudflare Pages to create serverless routes.

---
*Last updated: March 2026*
