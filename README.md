# 🍕 Pizza Restaurant

A pizza ordering web app built with React. Customers browse the menu, build a cart, and place an order, all in a fast single-page experience.

**Live demo:** [pizza-restaurant-zeta.vercel.app](https://pizza-restaurant-zeta.vercel.app)

<!-- Add a screenshot or GIF here: ![App screenshot](./public/screenshot.png) -->

## Features

- Browse the pizza menu
- Add, remove, and update items in the cart
- Place an order with customer details
- Track an order by its ID
- Responsive layout built with Tailwind CSS

<!-- Edit this list so it matches exactly what your app does. -->

## Tech Stack

| Area | Tools |
| --- | --- |
| UI | React 18 |
| Routing | React Router 6 |
| State management | Redux Toolkit, React Redux |
| Styling | Tailwind CSS 4 |
| Build tool | Vite |
| Code quality | ESLint, Prettier (with the Tailwind plugin) |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/hamzaatef722/pizza-restaurant.git
cd pizza-restaurant

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
pizza-restaurant/
├── public/          Static assets
├── src/             Application source code
├── index.html       App entry HTML
├── vite.config.js   Vite configuration
├── vercel.json      Vercel deployment config
└── package.json
```

## Deployment

The project is deployed on [Vercel](https://vercel.com). Every push to `main` triggers a new deployment, and `vercel.json` handles client-side routing so deep links work on refresh.

## What I Learned

- Structuring global state (cart and user) with Redux Toolkit slices
- Routing with React Router, including data loading and form actions
- Styling a full app with Tailwind CSS 4 and the Vite plugin
- Shipping a React app to production on Vercel

## Author

**Hamza Atef**
GitHub: [@hamzaatef722](https://github.com/hamzaatef722)
