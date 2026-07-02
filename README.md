# AI Car Advisor

A full-stack proof-of-concept application that recommends cars to users based on budget and preference inputs. Built with a typed React frontend and an Express API backend, with server-side scoring logic driving the recommendations.

![Sedan sample](./assets/sedan-sample.jpg)

## Table of Contents

- [AI Car Advisor](#ai-car-advisor)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running locally](#running-locally)
  - [Environment Variables](#environment-variables)
  - [API](#api)
    - [`POST /api/recommendations`](#post-apirecommendations)
  - [Scripts](#scripts)
  - [Scope \& Limitations](#scope--limitations)
  - [Roadmap](#roadmap)
    - [Build notes (AI-assisted development)](#build-notes-ai-assisted-development)

## Overview

AI Car Advisor takes a user's budget and stated preferences, sends them to a backend scoring service, and returns ranked car recommendations rendered as responsive cards on the frontend. It was built as a fast, polished proof-of-concept — the focus is on usability, input validation, and a clean typed boundary between client and server, not on production data or infrastructure.

## Tech Stack

**Frontend**
- React + TypeScript
- Vite (dev server / build tooling)
- Tailwind CSS (utility-first styling)
- Axios (HTTP client)

**Backend**
- Node.js + Express + TypeScript
- JSON-based recommendation dataset
- Server-side scoring logic for matching cars to user input

**Rationale:** a lightweight, fully typed stack was chosen to keep the client/server contract explicit and to maximize iteration speed for a focused demo, without the overhead of a heavier state management library or a production data layer.

## Project Structure

```
ai-car-advisor/
├── client/                # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/    # UI components (forms, recommendation cards)
│   │   ├── types/         # Shared TypeScript types
│   │   └── App.tsx
│   └── vite.config.ts
├── server/                # Express + TypeScript backend
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── data/          # JSON recommendation dataset
│   │   └── services/      # Scoring / recommendation logic
│   └── tsconfig.json
└── README.md
```

> Adjust the tree above to match your actual folder layout if it differs.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# clone the repo
git clone <repo-url>
cd ai-car-advisor

# install backend deps
cd server && npm install

# install frontend deps
cd ../client && npm install
```

### Running locally

```bash
# start the backend (from /server)
npm run dev

# start the frontend (from /client)
npm run dev
```

By default the frontend expects the API to be reachable at the URL set in `VITE_API_BASE_URL` (see below).

## Environment Variables

**server/.env**
```
PORT=5000
```

**client/.env**
```
VITE_API_BASE_URL=http://localhost:5000
```

## API

### `POST /api/recommendations`

Returns ranked car recommendations based on submitted budget and preferences.

**Request body**
```json
{
  "budget": 25000,
  "preferences": {
    "bodyType": "sedan",
    "fuelType": "petrol",
    "priority": "fuel-efficiency"
  }
}
```

**Response**
```json
{
  "recommendations": [
    {
      "id": "car_001",
      "make": "Toyota",
      "model": "Corolla",
      "price": 23500,
      "score": 92,
      "matchReasons": ["within budget", "fuel-efficient", "sedan body type"]
    }
  ]
}
```

> Update endpoint names, payload shape, and examples to match the actual implementation.

## Scripts

| Location | Command | Description |
|----------|---------|-------------|
| `/server` | `npm run dev` | Start API in watch mode |
| `/server` | `npm run build` | Compile TypeScript to `dist/` |
| `/client` | `npm run dev` | Start Vite dev server |
| `/client` | `npm run build` | Production build |

## Scope & Limitations

This is a demo-scoped build. Deliberately out of scope:

- No authentication or persisted user accounts
- No production car dataset or external car API integration
- No advanced state management library or offline support
- No production image asset pipeline
- No deployment automation or CI configuration

## Roadmap

- [ ] Persistent backend data store and user profile flow
- [ ] Real image assets served from a proper `public/` folder per recommendation
- [ ] More advanced scoring, filtering, and comparison logic
- [ ] Mobile-first onboarding flow
- [ ] Dockerized deployment with automated build scripts

---

### Build notes (AI-assisted development)

AI tooling was used to draft this README, help shape feature/validation logic, and suggest UI refinements for the recommendation cards. All source edits, build verification, and validation-state correctness were done and confirmed manually.