# JCET Site

Public website for **Jawaharlal College of Engineering and Technology (JCET)** — a single full-stack Next.js 14 (App Router) app with TypeScript, Tailwind CSS, Framer Motion, TanStack Query, Prisma and NextAuth.

Runs on **port 3000**. The API lives in the same app as Next.js route handlers under `/api` (see `src/app/api/`) — there is no separate backend service or port.

---

## Tech stack

| Concern        | Choice                              |
| -------------- | ----------------------------------- |
| Framework      | Next.js 14 (App Router)             |
| Language       | TypeScript (strict)                 |
| Styling        | Tailwind CSS + custom design system |
| UI primitives  | Radix UI + hand-built components     |
| Animations     | Framer Motion                       |
| Data fetching  | TanStack Query v5 + Axios           |
| API            | Next.js route handlers (`src/app/api/`) |
| Database       | PostgreSQL (NeonDB) via Prisma      |
| Auth           | NextAuth v5 (credentials)           |
| Forms          | React Hook Form + Zod               |
| State          | Zustand (UI state)                  |
| Icons          | Lucide React                        |
| Toasts         | Sonner                              |
| Carousel       | Embla                               |

---

## Design system

Defined in `tailwind.config.ts`:

| Token       | Value     | Use                       |
| ----------- | --------- | ------------------------- |
| `primary`   | `#0B1F4E` | Deep navy (brand)         |
| `secondary` | `#00C9B1` | Electric teal (accent)    |
| `accent`    | `#F5A623` | Warm gold (CTAs)          |
| `surface`   | `#F8FAFC` | Off-white background      |
| `muted`     | `#64748B` | Secondary text            |

Fonts via `next/font`: **Outfit** (display) + **Inter** (body).

---

## Setup

```bash
npm install
cp .env.example .env.local   # set DATABASE_URL, AUTH_SECRET etc.
npm run db:generate
npm run dev                  # http://localhost:3000
```

Data-driven sections (departments, news, placements, testimonials) are served
by this app's own `/api` routes, backed by Prisma + PostgreSQL — no other
service needs to be running.

### Environment variables

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
AUTH_SECRET="replace-with-a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="https://jawaharlalcolleges.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="918592884777"
NEXT_PUBLIC_APPLY_URL="https://admissions.nehrucolleges.com/application-form"
NEXT_PUBLIC_GA_ID=""
```

See `.env.example` for the full list, including the optional
`NEXT_PUBLIC_API_URL` override (leave unset to use this app's own same-origin
`/api` routes).

---

## Navigation model (two-tier header + mega-menu)

The header has **two stacked bars**, both generated from
`src/constants/navigation.ts`:

- **Top bar** (`topNav`) — slim utility header: Pay Fees, Study in India,
  Media ▾ (Gallery, News, Upcoming Events, Circulars, Blogs), NIRF, R&D Centre,
  Feedback, plus external links (Anti-Ragging PDF, Careers, iCampuz login).
- **Main bar** (`mainNav`) — logo + mega-menu (About, Departments, Academics,
  Admissions, Student Support, IQAC) + "Apply Now".

Both fold into the mobile drawer. The rule, derived from the live JCET site:

- Links under the **college domain** (`jawaharlalcolleges.com/*.php`) are built
  as **real internal pages**.
- **External** links — the online admissions portal, National Digital Library,
  NGI TBI, IEDC, IEEE SB, Google feedback form and PDF manuals — open in a new
  tab (`target="_blank"`).

Internal informational pages (About, Academics, Admissions, Student Support,
IQAC) are data-driven from `src/constants/contentPages.ts` and rendered by the
reusable `<ContentPage>` template via section `[slug]` routes. This makes every
non-redirect menu link resolve to a styled, real page.

---

## Routes

```
/                              Homepage (12 sections)
/about                         About JCET
/about/[slug]                  ngi, management, directors, principal,
                               vice-principal, approvals, infrastructure,
                               disclosure, awards
/departments                   All departments (live)
/departments/[slug]            Single department (live: HOD, faculty, programmes)
/academics                     Academics landing
/academics/programmes          Programmes (live, filterable)
/academics/[slug]              controller-of-examinations, committee,
                               grievance-redressal-cell, downloads, ngi-smart
/admissions                    Admissions overview
/admissions/apply              Multi-step admission enquiry form
/admissions/scholarship        Scholarships (live)
/admissions/[slug]             procedure, centers, pay-fees, campus-tour
/student-support               Student support landing
/student-support/[slug]        certificate, central-library, e-learning, iot-lab,
                               noble-training, physical-education, ncc, nss
/iqac                          IQAC
/iqac/nba                      NBA accreditation
/placements                    Placements (live stats + records)
/news, /news/[slug]            News & events (live, infinite scroll)
/gallery                       Gallery (live, filterable)
/contact                       Contact + feedback form + map
/portal/*                      Student portal (NextAuth-protected)
```

---

## Homepage sections

Hero **image carousel** + **announcement marquee** · Stats bar (animated
counters) · About · Departments grid · Why JCET · Admissions strip · Placements
(recruiter marquee) · Testimonials carousel · News · FAQ — all with loading
skeletons and empty/error states.

### Customizing the hero & marquee

Edit **`src/constants/hero.ts`** — no component changes needed:

- `heroSlides` — each slide's image, eyebrow, headline (wrap words in
  `*asterisks*` to highlight them gold), subtitle and up to two CTAs.
- `marqueeItems` + `marqueeLabel` — the scrolling announcement ticker (each item
  can link internally or externally).

### Logo

The college logo lives at `public/logo.png` and is used in the header (and on a
white chip in the footer). Replace that file to swap the brand.

---

## SEO & accessibility

- `generateMetadata` / per-page metadata, Open Graph + Twitter cards
- `CollegeOrUniversity` JSON-LD on the homepage
- `sitemap.ts` + `robots.ts`
- `next/image` everywhere, `next/font` (no FOUT)
- Semantic HTML, skip-to-content link, visible focus rings, `prefers-reduced-motion`
- Keyboard-navigable mega-menu and mobile drawer

---

## Scripts

| Script             | Action                  |
| ------------------ | ----------------------- |
| `npm run dev`      | Dev server on :3000     |
| `npm run build`    | Production build        |
| `npm run start`    | Serve production build  |
| `npm run lint`     | ESLint                  |
| `npm run typecheck`| `tsc --noEmit`          |

---

## Notes / next steps

- **Auth & portal:** NextAuth credentials login (`/api/auth`) is wired up; the
  `/portal/*` pages still need certificate-request and notification features
  built on top of it.
- **File uploads:** the admission form collects documents client-side; connect
  Cloudinary/Uploadthing to persist them and pass `documents` URLs to the API.
- **Hero video:** the hero uses a priority `next/image`; swap in a `<video>` when
  campus footage is available.
