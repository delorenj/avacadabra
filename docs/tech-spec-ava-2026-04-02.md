# Tech Spec: AvaMath

## Problem & Solution

**Problem:** Ava (Grade 5) practices math daily but has no structured way to log progress, share evidence with her teacher, or see how far she's come. The teacher has no visibility into home practice.

**Solution:** A lightweight Next.js web app for daily practice logging with photo uploads, a teacher review dashboard, and a student progress history view. Self-hosted via Docker Compose.

## Current State

The app has a working foundation:
- **Daily progress form** (`app/page.tsx`) - date, concept selector, description, reflection, photo upload
- **API** (`app/api/progress/route.ts`) - GET (list 30 recent) and POST (create entry with optional MinIO upload)
- **Database** - PostgreSQL with auto-created `progress_entries` table (id, date, concept, description, explanation, image_url, created_at)
- **Storage** - MinIO for photo uploads, generates direct URLs
- **Infra** - Dockerfile, docker-compose.yml with Traefik labels (`ava.delo.sh`), PostgreSQL 15

**What's missing:** Teacher dashboard, progress history view, navigation between views, deployment hasn't been spun up yet.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** TailwindCSS 3
- **Database:** PostgreSQL 15 (Docker volume)
- **Object Storage:** MinIO (external, existing infra)
- **Deployment:** Docker Compose + Traefik reverse proxy
- **Host:** `ava.delo.sh`

## Requirements

1. **Teacher Dashboard** - A `/teacher` page that displays all submissions in reverse chronological order with expandable photo previews, filterable by concept. Read-only view, no auth required.

2. **Progress History** - A `/history` page for Ava showing her past entries as a timeline/list, with a simple streak counter (consecutive days with entries) and concept breakdown.

3. **Navigation** - Add nav links to the header: "Log Practice" (home), "My Progress" (history), "Teacher View" (teacher dashboard).

4. **Deployment** - Get docker-compose up and running. MinIO is external (already running on infra), so the compose file needs env vars pointing to the existing MinIO instance, not a new container.

5. **API Enhancement** - Extend GET `/api/progress` to support `?concept=` filter and `?limit=` parameter. Add a GET `/api/progress/stats` endpoint returning entry count by concept and current streak.

### Out of Scope
- Authentication / login
- Multi-student support
- Gamification (badges, points)
- Auto-grading / AI assessment
- Mobile app

## Architecture Overview

```
Browser (Ava / Teacher)
    │
    ├── /            → Daily progress form (existing)
    ├── /history     → Progress history + streak
    └── /teacher     → Teacher review dashboard
           │
      Next.js App Router (ava.delo.sh)
           │
    ┌──────┴──────┐
    │             │
 PostgreSQL    MinIO
 (progress     (photo
  entries)     uploads)
```

Single Next.js app, two new pages, one new API endpoint. No new services.

## Data Model

Existing table is sufficient:

```sql
progress_entries (
  id            SERIAL PRIMARY KEY,
  date          DATE NOT NULL,
  concept       TEXT NOT NULL,
  description   TEXT NOT NULL,
  explanation   TEXT NOT NULL,
  image_url     TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
)
```

No schema changes needed. The stats endpoint computes streak and concept counts via SQL queries against existing data.

## API Design

```
GET  /api/progress              → List entries (existing, enhanced)
     ?concept=fractions          → Filter by concept
     ?limit=50                   → Override default 30

POST /api/progress              → Create entry (existing, unchanged)

GET  /api/progress/stats        → New endpoint
     Response: {
       total_entries: number,
       current_streak: number,
       by_concept: { [concept]: number }
     }
```

## Stories

1. **Navigation & Layout** - Add nav links to header in `layout.tsx`. Links: Home (/), My Progress (/history), Teacher View (/teacher). Simple horizontal nav, mobile-responsive.

2. **Progress Stats API** - Create `app/api/progress/stats/route.ts`. Query for total count, count by concept, and calculate current streak (consecutive calendar days with at least one entry, counting backwards from today). Also add `concept` and `limit` query params to the existing GET endpoint.

3. **Teacher Dashboard Page** - Create `app/teacher/page.tsx`. Server component that fetches entries from the API. Display as a card list: date, concept badge, description, reflection, and clickable image thumbnail that expands. Add concept filter dropdown at the top.

4. **Progress History Page** - Create `app/history/page.tsx`. Show Ava's entries as a timeline. Display current streak prominently at the top ("X days in a row!"). Show concept breakdown as simple bars or counts. List past entries below.

5. **Deployment & Smoke Test** - Verify docker-compose.yml works end-to-end. Ensure MinIO env vars point to existing instance. Build, deploy, test form submission + photo upload + both new pages.

### Implementation Order
1 → 2 → 3 & 4 (parallel) → 5

## Acceptance Criteria

- [ ] Header shows nav links on all pages, active page highlighted
- [ ] `/teacher` displays all entries with photo thumbnails, concept filter works
- [ ] `/history` shows entry timeline with streak counter and concept breakdown
- [ ] `GET /api/progress?concept=fractions` returns filtered results
- [ ] `GET /api/progress/stats` returns correct streak and concept counts
- [ ] Docker Compose builds and runs successfully
- [ ] Form submission creates entry visible on both `/teacher` and `/history`
- [ ] Photo uploads display correctly on teacher dashboard
- [ ] App is accessible at `ava.delo.sh` via Traefik

## Non-Functional Requirements

**Performance:** Pages should load in under 2 seconds. Use Next.js server components for teacher and history pages to avoid client-side data fetching overhead.

**Security:** No auth in v1. App is on a private domain behind Traefik. MinIO URLs are direct links - acceptable for a single-user personal tool.

**Responsive:** Must work well on mobile (Ava may use a tablet). TailwindCSS responsive utilities are sufficient.

## Dependencies

- Existing MinIO instance on Jarad's infra
- Traefik reverse proxy with `proxy` Docker network
- DNS for `ava.delo.sh` pointing to the host

## Risks

| Risk | Mitigation |
|------|-----------|
| MinIO connectivity from Docker | Ensure MinIO endpoint is reachable from the `proxy` network. Use internal hostname if on same host. |
| Streak calculation edge cases | Keep it simple: count consecutive days backwards from today. Off-by-one is fine for a personal tool. |

## Timeline

**Target: Deployed by 2026-04-06**

- Day 1: Stories 1-2 (nav + stats API)
- Day 2: Stories 3-4 (teacher dashboard + history page)
- Day 3: Story 5 (deployment + smoke test)

---

*Author: Jarad*
*Date: 2026-04-02*
*Stories: 5*
*Project Level: 1*
