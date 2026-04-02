# Product Brief: AvaMath

## Executive Summary

AvaMath is a personal daily math practice tracker built for Ava, a Grade 5 student. It provides a structured way for her to log daily practice sessions, upload photos of completed work, and reflect on what she learned. Her teacher can review submissions through a dedicated dashboard, and Ava can track her own progress over time.

The app solves an accountability gap between home practice and classroom expectations, helps Ava build consistent study habits, and gives her parent visibility into her math engagement. It's a focused, single-user tool designed to be deployed quickly on self-hosted infrastructure and used daily throughout the school year.

## The Problem

Ava needs to practice math daily outside the classroom, but there's no structured system connecting her home practice to her teacher's expectations. The teacher lacks visibility into what Ava is working on, and Ava has no easy way to demonstrate effort. Without a tracking system, practice is inconsistent, accountability falls through the cracks, and progress is hard to measure.

Currently, completed work might be shown on paper or mentioned in passing - there's no persistent record, no photo evidence, and no way for Ava to see how far she's come.

**Why now:** Ava is in Grade 5 with a curriculum covering fractions, decimals, word problems, and geometry. Building strong foundations now matters.

## The Solution

A lightweight Next.js web app where Ava:

1. **Logs daily practice** - selects the math concept, describes what she worked on, and writes a reflection
2. **Uploads photo evidence** - snaps a photo of completed work for teacher review
3. **Tracks her history** - sees past entries and her practice streak over time

Her teacher gets a **separate dashboard view** to review Ava's submissions and uploaded work photos without needing to manage accounts or complex workflows.

## What Makes This Different

This isn't an ed-tech platform. It's a personal tool built by a parent for one student. That constraint is the advantage:

- No multi-tenant complexity, no onboarding flows, no pricing
- Optimized for exactly one student's workflow
- Self-hosted on family infrastructure - no third-party data concerns
- Can be iterated on in real-time based on Ava's actual usage

## Who This Serves

**Primary user: Ava (Grade 5 student)**
- Needs a simple, fast way to log daily math practice
- Should be able to see her own progress and feel motivated
- Must be easy enough that she'll actually use it every day

**Secondary user: Ava's teacher**
- Needs to review submitted work and photo evidence
- Wants a quick dashboard view, not another app to manage
- Low friction - no login complexity

**Tertiary user: Parent (Jarad)**
- Wants visibility into Ava's practice consistency
- Maintains the infrastructure and iterates on features

## Success Criteria

- Ava logs practice daily (or near-daily) for at least 4 weeks
- Teacher can easily review submissions through the dashboard
- App is deployed and running reliably on self-hosted infra within the week
- Photo uploads work smoothly (MinIO/S3 storage)
- Ava can view her past entries and see her progress

## Scope

### In Scope (v1)
- Daily progress logging form (concept, description, reflection)
- Photo upload of completed work
- Grade 5 math concept guide (fractions, decimals, word problems, volume/geometry)
- Teacher review dashboard
- Progress history view for Ava
- Self-hosted Docker deployment (Next.js + PostgreSQL + MinIO)

### Out of Scope
- Multi-student support / user accounts
- Gamification (badges, points, leaderboards)
- Auto-grading or AI assessment of math work
- Authentication (may add basic auth later, not blocking v1)
- Mobile app (web-only, mobile-responsive)

### Future Considerations
- Basic auth if needed for security
- Streak tracking and simple motivational UI
- Teacher feedback/comments on submissions
- Expanded curriculum beyond Grade 5

## Constraints & Assumptions

**Constraints:**
- Must be self-hosted on existing Docker infrastructure
- Current tech stack (Next.js 14, PostgreSQL, MinIO, TailwindCSS) is locked in
- Ship within days, not weeks
- Minimal complexity - no heavy frameworks or new services

**Assumptions:**
- Ava has access to a device with a camera (phone/tablet) for photo uploads
- Teacher will check submissions regularly if given a simple dashboard
- PostgreSQL and MinIO can run on existing infra without issues
- One user means no need for auth in v1

## Timeline

**Target: Deployed and usable this week (by 2026-04-06)**

Key milestones:
- Teacher dashboard view implemented
- Progress history view for Ava
- Docker deployment tested and running
- Ava starts using it daily

## Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Ava finds logging tedious and stops | Low-Medium | Keep the form dead simple, show progress to motivate |
| Deployment issues with Docker/MinIO | Low | Stack is proven, standard Docker Compose setup |
| Scope creep before shipping | Low | Brief is clear on what's out of scope |

---

*Author: Jarad*
*Date: 2026-04-02*
*Project Level: 1 (Small, 1-10 stories)*
