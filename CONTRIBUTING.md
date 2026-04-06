# Contributing to Tomb in My Heart

Thank you for wanting to help with this project.

## Before you start

Open an issue to discuss your idea before writing code. This keeps effort from going to waste and ensures changes fit the spirit of the project.

## Setup

```bash
git clone https://github.com/yabingqi/tomb-in-my-heart.git
cd tomb-in-my-heart
npm install
npm run dev
```

## What makes a good contribution

- **New flowers or drinks** — add entries to `src/data/flowers.js` or `src/data/wines.js`
- **Translations** — the text is all in English; internationalization is welcome
- **Accessibility fixes** — screen reader support, keyboard navigation, focus management
- **Atmosphere** — subtle visual or sound improvements that feel right for the space
- **Bug fixes** — always welcome

## What to avoid

- Features that add accounts, login, or send data anywhere
- UI libraries or design system components that break the hand-crafted feel
- Changes that make the app feel less like a memorial and more like a product

## Pull requests

- Keep PRs small and focused
- Describe what you changed and why
- The build must pass: `npm run build`
