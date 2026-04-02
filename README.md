# AvaMath Full‑Stack App

This repository contains a simple, teacher‑aligned home math tracker built with **Next.js**, **TailwindCSS**, **PostgreSQL**, and **MinIO/S3**. It is designed to help students like Ava practice foundational Grade 5 math concepts, log daily progress with reflections, and optionally upload photos of work as evidence for teachers.

## Features

* **Daily Progress Form** – Record the date, selected math concept, description of the activity, a written explanation, and an optional photo upload. Data is persisted to a PostgreSQL database.
* **Concept Rotation** – The home page lists high‑level Grade 5 priorities (fractions, fraction multiplication, decimals & place value, word problems, volume/geometry) to guide daily practice.
* **Photo Uploads** – Uploaded images are stored in a MinIO or S3 bucket. The app generates a public URL for each photo that is stored alongside the progress entry.
* **API Endpoints** – REST‑like endpoints under `/api/progress` allow listing the latest entries and creating new ones.
* **Docker Compose** – Easily spin up the application along with a Postgres database and integrate with an existing Traefik reverse proxy network. Environment variables drive database and object storage configuration.

## Quick Start

1. **Clone the repository** and copy the example environment file:

   ```bash
   cp .env.example .env
   ```

   Update the values in `.env` with your database credentials and MinIO/S3 settings. The default `DATABASE_URL` expects a local Postgres service defined in `docker-compose.yml`.

2. **Build and run with Docker Compose**. Ensure you have an external Docker network named `proxy` for Traefik and supply valid `MINIO_*` variables that point to your existing MinIO stack:

   ```bash
   docker-compose up -d
   ```

   The app will be available on port **3000** locally and, if Traefik is configured, on the domain specified by the `ava.delo.sh` router rule.

3. **Use the App**. Navigate to `http://localhost:3000` to record a progress entry. Fill out the form, attach a photo if desired, and submit. The most recent 30 entries can be fetched via a `GET` request to `/api/progress`.

## Project Structure

```
avamath/
├── app/                  # Next.js App Router (pages, layout, api routes)
│   ├── api/
│   │   └── progress/     # Handles GET/POST for progress entries and file uploads
│   ├── page.tsx          # Home page with form and concept list
│   ├── layout.tsx        # Global layout and metadata
│   └── globals.css       # TailwindCSS setup
├── lib/
│   ├── db.ts             # Helper for PostgreSQL pool
│   └── minio.ts          # Helper for MinIO client
├── Dockerfile            # Container build instructions
├── docker-compose.yml    # Compose file for app + Postgres + Traefik integration
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
├── .env.example          # Sample environment variables
└── README.md             # This file
```

## Extending the App

This starter is intentionally minimal. It can be extended in several directions:

* **Display Past Entries** – Add a component to list past progress entries on the home page or a separate dashboard.
* **Authentication** – Integrate authentication (e.g. NextAuth.js) so multiple students/parents can log in and see only their own records.
* **Teacher Dashboard** – Create an admin route where teachers can review submissions, leave feedback, or track trends.
* **Custom Design** – Replace default Tailwind styling with [ShadCN UI](https://ui.shadcn.com/). Components from ShadCN can be added in the `components/` folder and imported into the pages to provide a polished feel.

## License

This project is provided as‑is under the MIT license. See the `LICENSE` file for details.