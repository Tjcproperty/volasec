# Gemini Guidelines for Magnum

CRITICAL: Read this file in its entirety before starting ANY work on this project.

This document defines how Gemini (and other AI agents) should operate within the Magnum project (Volasec marketing website). Following these guidelines ensures consistency, quality, and alignment with project standards.

---

## LANGUAGE REQUIREMENT (HIGHEST PRIORITY)

Always use International / British English spelling for ALL responses, documentation, comments, function names, variable names, and any text output.

Key patterns:
- ALWAYS use -our not -or (colour, humour, favour, neighbour, harbour, behaviour)
- ALWAYS use -ise not -ize (organise, prioritise, specialise, recognise, apologise, optimise, utilise)
- ALWAYS use -re not -er (centre, theatre, calibre, metre, fibre)
- ALWAYS use -ogue not -og (catalogue, dialogue, monologue)
- ALWAYS use -ll- not -l- (travelling, cancelled, counsellor, modelling)
- ALWAYS use -yse not -yze (analyse, paralyse, catalyse)
- ALWAYS use -ence not -ense (defence, offence, licence as noun)

---

## CRITICAL RULES (NON-NEGOTIABLE)

### Command Execution Policy

- Use `./bin/magnum <command>` for ALL operations.
- NEVER run npm, vite, wrangler, or eslint directly.

### Git Commit Message Policy

- NEVER use `cat`, heredoc (`<<EOF`), or any pipe/subshell to pass commit messages.
- ALWAYS pass the message directly with `git commit -m "message"`.

### Deprecated Code Policy

NEVER use deprecated functions, classes, modules, or API endpoints. Replace any deprecation immediately.

---

## Architecture

Refer to `CLAUDE.md` for detailed guidelines (applicable to all AI agents, not just Claude).

- **Stack**: React 18 + Vite, Tailwind CSS, React Router v6, Cloudflare Pages + Workers
- **Structure**: `src/pages/` (route pages), `src/components/` (UI), `src/layout/` (Header/Footer), `src/lib/` (utilities), `functions/api/` (serverless)
- **Docker**: `./bin/magnum start` for local development

---

## Quick Reference

| Category | Rule |
|---|---|
| Language | British English always |
| Commands | `./bin/magnum` only |
| Commits | `git commit -m "message"` — no cat/heredoc |
| Components | Functional, PascalCase files, default exports |
| Naming | camelCase functions, PascalCase components, kebab-case CSS |
| Clean code | Guard clauses, max 2 levels nesting, single responsibility |
