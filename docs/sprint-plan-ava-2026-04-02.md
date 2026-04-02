# Sprint Plan: AvaMath

**Date:** 2026-04-02
**Project Level:** 1
**Total Stories:** 5
**Total Points:** 16
**Planned Sprints:** 1 (3-day sprint)
**Target Completion:** 2026-04-06

---

## Executive Summary

Single sprint to take AvaMath from working MVP (daily log form + photo upload) to a complete v1 with teacher dashboard, student progress history, navigation, and deployment. All 5 stories fit comfortably in a 3-day sprint for a single developer.

**Key Metrics:**
- Total Stories: 5
- Total Points: 16
- Sprint Capacity: ~18 points (1 dev × 3 days × 6 hrs/day = 18 hrs ÷ ~1 hr/point for senior dev)
- Buffer: ~11% (2 points headroom)

---

## Story Inventory

### STORY-001: Navigation & Layout

**Priority:** Must Have
**Points:** 2

**User Story:**
As a user (Ava or teacher),
I want navigation links in the header,
So that I can easily switch between logging practice, viewing history, and the teacher dashboard.

**Acceptance Criteria:**
- [ ] Header in `layout.tsx` shows three nav links: "Log Practice" (/), "My Progress" (/history), "Teacher View" (/teacher)
- [ ] Active page link is visually highlighted
- [ ] Nav is responsive on mobile (stacks or collapses gracefully)
- [ ] Links work and route correctly

**Technical Notes:**
- Edit `app/layout.tsx` to add nav links
- Use TailwindCSS for styling and active state
- Use `usePathname()` from `next/navigation` for active link detection (requires a small client component for the nav)

**Dependencies:** None (foundation for other stories)

---

### STORY-002: Progress Stats API

**Priority:** Must Have
**Points:** 3

**User Story:**
As the history page,
I want a stats endpoint and enhanced filtering,
So that I can display streak counts, concept breakdowns, and filtered results.

**Acceptance Criteria:**
- [ ] `GET /api/progress?concept=fractions` returns only entries matching that concept
- [ ] `GET /api/progress?limit=50` overrides default 30-entry limit
- [ ] `GET /api/progress/stats` returns JSON: `{ total_entries, current_streak, by_concept }`
- [ ] Streak counts consecutive calendar days (backwards from today) with at least one entry
- [ ] `by_concept` returns `{ "fractions": 5, "decimals": 3, ... }` counts

**Technical Notes:**
- Add query param parsing to existing `GET` handler in `app/api/progress/route.ts`
- Create `app/api/progress/stats/route.ts` with streak SQL:
  ```sql
  SELECT DISTINCT date FROM progress_entries ORDER BY date DESC
  ```
  Then count consecutive days in application code
- Concept counts: `SELECT concept, COUNT(*) FROM progress_entries GROUP BY concept`

**Dependencies:** None

---

### STORY-003: Teacher Dashboard Page

**Priority:** Must Have
**Points:** 5

**User Story:**
As Ava's teacher,
I want a dashboard showing all submitted work with photos,
So that I can review Ava's daily practice without any extra tooling.

**Acceptance Criteria:**
- [ ] `/teacher` page displays all entries in reverse chronological order
- [ ] Each entry shows: date, concept (as badge/tag), description, reflection
- [ ] Photo thumbnails are shown when image_url exists, clickable to expand/view full size
- [ ] Concept filter dropdown at top filters displayed entries
- [ ] Page works as a server component (no client-side data fetching for initial load)
- [ ] Responsive layout works on desktop and tablet

**Technical Notes:**
- Create `app/teacher/page.tsx` as a server component
- Fetch directly from database (or internal API call) for server-side rendering
- Use TailwindCSS for card layout
- Concept filter can be a client component that filters already-loaded data (no need for server round-trip given small data volume)

**Dependencies:** STORY-001 (nav links to reach this page)

---

### STORY-004: Progress History Page

**Priority:** Must Have
**Points:** 4

**User Story:**
As Ava,
I want to see my past entries and practice streak,
So that I feel motivated to keep practicing daily.

**Acceptance Criteria:**
- [ ] `/history` page shows current streak prominently at top ("X days in a row!")
- [ ] Concept breakdown displayed (simple counts or bars per concept)
- [ ] Past entries listed as a timeline, newest first
- [ ] Each entry shows date, concept, description (reflection collapsed/truncated)
- [ ] Page loads quickly via server component + stats API
- [ ] Looks encouraging and kid-friendly (not clinical)

**Technical Notes:**
- Create `app/history/page.tsx`
- Fetch from `/api/progress/stats` for streak + concept counts
- Fetch from `/api/progress` for entry list
- Keep UI simple but warm - use color for concept badges, large streak number
- Server component for initial data, minimal client interactivity

**Dependencies:** STORY-002 (stats API), STORY-001 (nav)

---

### STORY-005: Deployment & Smoke Test

**Priority:** Must Have
**Points:** 2

**User Story:**
As Jarad,
I want the app deployed and running at ava.delo.sh,
So that Ava and her teacher can start using it.

**Acceptance Criteria:**
- [ ] `docker-compose up -d` builds and starts successfully
- [ ] App is accessible at `ava.delo.sh` via Traefik
- [ ] Form submission creates an entry in PostgreSQL
- [ ] Photo upload stores file in MinIO and displays on teacher dashboard
- [ ] `/history` and `/teacher` pages load with correct data
- [ ] App survives a container restart (data persists)

**Technical Notes:**
- MinIO is external (already running) - ensure env vars in `.env` point to existing instance
- Verify `proxy` Docker network exists and Traefik is routing
- May need to create `.env` file with all required vars if it doesn't exist
- Test full flow: submit entry with photo → verify on teacher dashboard → verify on history page

**Dependencies:** STORY-001, 002, 003, 004 (all features complete before deploy)

---

## Sprint Allocation

### Sprint 1 (2026-04-03 → 2026-04-06) — 16/18 points

**Goal:** Deliver complete AvaMath v1 with teacher dashboard, student progress history, and production deployment.

| Day | Stories | Points | Focus |
|-----|---------|--------|-------|
| Day 1 (Apr 3) | STORY-001, STORY-002 | 5 | Foundation: nav + stats API |
| Day 2 (Apr 4) | STORY-003, STORY-004 | 9 | Features: teacher dashboard + history page (parallel) |
| Day 3 (Apr 5-6) | STORY-005 | 2 | Deploy + smoke test + fix any issues |

**Implementation Order:**
```
STORY-001 (nav) ──→ STORY-003 (teacher dashboard)
                 ╲
STORY-002 (API) ──→ STORY-004 (history page)
                                               ──→ STORY-005 (deploy)
```

---

## Requirements Coverage

| Tech Spec Requirement | Story | Points |
|----------------------|-------|--------|
| Navigation & Layout | STORY-001 | 2 |
| API Enhancement (filter + stats) | STORY-002 | 3 |
| Teacher Dashboard | STORY-003 | 5 |
| Progress History | STORY-004 | 4 |
| Deployment & Smoke Test | STORY-005 | 2 |

All 5 requirements covered. No gaps.

---

## Risks and Mitigation

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| MinIO not reachable from Docker network | Low | Test connectivity before building features. Use `docker network inspect proxy` to verify. |
| Streak SQL logic edge cases | Low | Keep it simple: consecutive days backwards from today. Manual verification in smoke test. |
| Photo URLs not resolving in browser | Medium | MinIO URLs may need to go through Traefik or use a presigned URL pattern. Test early in Day 2. |

---

## Definition of Done

For a story to be considered complete:
- [ ] Code implemented and committed
- [ ] Acceptance criteria validated manually
- [ ] No TypeScript errors (`npm run build` passes)
- [ ] Deployed and working at `ava.delo.sh`

---

## Next Steps

**Immediate:** Begin Sprint 1

Run `/bmad:dev-story` for STORY-001 to start implementation, or implement stories directly.

Recommended order: STORY-001 → STORY-002 → STORY-003 & STORY-004 → STORY-005

---

*Created using BMAD Method v6 - Phase 4 (Implementation Planning)*
