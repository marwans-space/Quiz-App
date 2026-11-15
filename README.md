# Quizly

Quizly is a modern, responsive quiz app built with React and Vite. Choose from a set of topics, answer timed questions, and review the answer key when you finish.

## Features

- Topic-based quizzes with image cards
- Five-minute countdown timer
- Progress indicator and keyboard-friendly answer selection
- Previous-question navigation with answers preserved
- Score summary and answer review
- Responsive layout for mobile and desktop

## Tech stack

- React 19
- React Router
- Vite
- Tailwind CSS utility classes

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
├── components/       # Quiz screens and shared context
├── data/             # Quiz questions
├── App.jsx           # Application shell and routes
└── index.css         # Tailwind imports and base styles
public/               # Quiz artwork
```

## License

This project is maintained by [Marwan Nasser](https://github.com/marwans-space).
