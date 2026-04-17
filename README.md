# Portfolio site

Personal portfolio built with [Next.js](https://nextjs.org) (App Router), TypeScript, and Tailwind CSS. Content is localized with [next-intl](https://next-intl-docs.vercel.app/); home data is loaded via [TanStack Query](https://tanstack.com/query). The work section uses [GSAP](https://greensock.com/gsap/) ScrollTrigger for pinned, scroll-driven project slides.

## Requirements

- Node.js 20+ (recommended)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Environment (optional for local API features such as the contact form):

   ```bash
   cp .env.example .env
   ```

   Adjust `NEXT_PUBLIC_BASE_API_URL` if your backend runs elsewhere.

## Scripts

| Command                      | Description                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------- |
| `npm run dev`                | Start the development server ([http://localhost:3000](http://localhost:3000)) |
| `npm run build`              | Production build                                                              |
| `npm run start`              | Run the production server                                                     |
| `npm run lint`               | ESLint                                                                        |
| `npm run seed:portfolio-api` | Seed portfolio data to the API (see `scripts/`)                               |

## Stack (high level)

- **Framework:** Next.js 16, React 19
- **Styling:** Tailwind CSS 4
- **i18n:** next-intl
- **Data / forms:** TanStack Query, Formik, Yup
- **Motion:** GSAP (projects section)
- **Timeline UI:** react-vertical-timeline-component

## Deploy

Deploy like any Next.js app (e.g. [Vercel](https://vercel.com) or your host of choice). Set production environment variables to match your API URL and any other secrets your build expects.
