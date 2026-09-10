# Agent Instructions

This document tells any AI model how to behave in this repository and where to find the resources it needs before writing code.

## Expo has changed

This project uses Expo. Expo APIs and conventions change frequently between major versions, so before writing any code, read the exact versioned docs that match the Expo version pinned in `package.json`:

https://docs.expo.dev/versions/v57.0.0/

Do not rely on prior knowledge of Expo — verify against these versioned docs first.

## Skills

Project-specific skills live under `docs/skills/`, so that any AI model can discover and use them. Skills will be referenced here individually as they are added.

- [`docs/skills/a11y.md`](docs/skills/a11y.md) — accessibility standards to follow when implementing UI components.
- [`docs/skills/component-conventions.md`](docs/skills/component-conventions.md) — folder/file structure and naming conventions to follow when creating any component (global or feature-scoped).
- [`docs/skills/testing.md`](docs/skills/testing.md) — tooling and library-specific behavior to follow when writing a component's tests.
- [`docs/skills/i18n.md`](docs/skills/i18n.md) — namespace structure and conventions to follow when adding or consuming translated strings. **All user-facing text must go through i18n — literal strings in the app are not allowed.**
- [`docs/skills/database.md`](docs/skills/database.md) — SQLite/Drizzle conventions to follow when defining tables, generating migrations, or querying local persistence.
