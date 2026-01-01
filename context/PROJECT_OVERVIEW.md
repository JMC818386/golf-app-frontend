# Golf App Frontend (React + Vite) — Clover Feature Port

## Goal
Port UI + flows from Clover React Native app into this React-Vite web frontend:
- Home: scorecard upload entry
- Stats: last round + time scale + donuts + bar chart + stepper
- Schedule: calendar + event list + event detail
- Messages: placeholder

## Non-negotiables (match Clover look)
- Global gradient background: rgb(48,63,49) → rgb(37,47,42) → rgb(23,28,30)
- Brand orange: #e18837, dark orange: #804c11
- Cards: rgba(48,63,49,0.3) with subtle borders
- Typography: Inter

## Routing
React Router v6:
- /home
- /stats
- /schedule
- /messages
- /events/:id (route-based detail page; no modal by default)

## Tech choices
- React Router v6
- TanStack Query optional (recommended)
- No heavy UI framework required; plain CSS + tokens.css
- react-icons for icon parity
- Calendar: react-calendar (lightweight, stylable)
