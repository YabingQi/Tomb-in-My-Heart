# Tomb in My Heart

A digital memorial space for virtual characters — the ones who lived only in story, and who you carry with you still.

> *"I once fell in love with two virtual characters, and they both died in their world. I wanted to visit their tomb."*
> — Original creator

---

## What is this?

Some characters from games, anime, novels, and films leave a mark that doesn't go away when the story ends. This app gives you a place to go.

You can:

- **Build a tomb** for any character, from any universe
- **Leave flowers** — each with its own meaning
- **Pour a drink** and share a moment with them
- **Write letters** — keep them, or burn them
- **Sit with them** in silence for a while

All data stays on your device. Nothing is sent anywhere.

---

## Try it

**[Open Tomb in My Heart →](https://yabingqi.github.io/Tomb-in-My-Heart/)**

Or run it locally (see below).

---

## Run locally

```bash
git clone https://github.com/yabingqi/tomb-in-my-heart.git
cd tomb-in-my-heart
npm install
npm run dev
```

Then open `http://localhost:5173/Tomb-in-My-Heart/`.

---

## Deploy your own copy

```bash
npm run deploy
```

This builds and pushes to the `gh-pages` branch. Make sure GitHub Pages is enabled in your repo settings, pointing to `gh-pages`.

---

## Tech stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/) with `localStorage` persistence
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Router](https://reactrouter.com/) (hash-based, for GitHub Pages)
- Fonts: [IM Fell English](https://fonts.google.com/specimen/IM+Fell+English), [Crimson Text](https://fonts.google.com/specimen/Crimson+Text)

---

## Contributing

Contributions are welcome. If you have an idea — a new flower, a ritual, a language translation, an accessibility fix — please open an issue first to discuss it.

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

MIT — see [LICENSE](LICENSE).
