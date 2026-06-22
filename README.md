# JCET Frontend

Public website for **Jawaharlal College of Engineering and Technology (JCET)** — built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion and TanStack Query.

Runs on **port 3000** and consumes the `jcet-backend` API on **port 3001**.

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
cd jcet-frontend
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL etc.
npm run dev                  # http://localhost:3000
```

> Start the **backend first** (`jcet-backend` on :3001) so data-driven sections
> (departments, news, placements, testimonials) load. Without it, those sections
> show graceful empty/error states.

### Environment variables

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_SITE_URL="https://jawaharlalcolleges.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="918592884777"
NEXT_PUBLIC_APPLY_URL="https://admissions.nehrucolleges.com/application-form"
NEXT_PUBLIC_GA_ID=""
```

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
/portal/*                      Student portal scaffold (auth to be wired)
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

- **Auth & portal:** the `/portal/*` pages are scaffolded; wire NextAuth (or the
  backend credentials endpoint) to enable certificate requests and notifications.
- **File uploads:** the admission form collects documents client-side; connect
  Cloudinary/Uploadthing to persist them and pass `documents` URLs to the API.
- **Hero video:** the hero uses a priority `next/image`; swap in a `<video>` when
  campus footage is available.
