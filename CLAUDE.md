# Priority Scorer - One Hour Challenge

## Quick Start (For Judges)

```bash
cd ui
npm install
npm run dev
```

Then open http://localhost:5173

## What This App Does

A priority scoring tool that ranks items by Impact, Urgency, and Effort using a weighted formula.

**Scoring Formula:** `Impact×5 + Urgency×3.5 + (11-Effort)×1.5`

**Features:**
- Add items with name and 3 sliders (Impact, Urgency, Effort)
- Auto-sort by calculated priority score
- Top item shows reasoning with percentage breakdown
- Delete items
- localStorage persistence (survives refresh)
- Glassmorphism dark mode UI
- Fully responsive (mobile/tablet/desktop)

## Project Structure

```
ui/
├── src/
│   ├── App.tsx              # Main app with state management
│   ├── components/
│   │   ├── ItemForm.tsx     # Add item form with sliders
│   │   ├── ItemCard.tsx     # Display ranked items
│   │   └── ui/              # shadcn components
│   ├── lib/
│   │   └── priority.ts      # Scoring logic & reasoning
│   └── types/
│       └── item.ts          # TypeScript interfaces
```

## Tech Stack

- React 19 + Vite 7
- TypeScript
- Tailwind CSS 4
- shadcn/ui components

## Deploy to GitHub Pages

```bash
cd ui
npm run build:gh
```

Then push the `dist/` folder to the `gh-pages` branch, or use GitHub Actions.

**Note:** Update the repo name in `vite.config.ts` if different from `one_hour_challenge`.
