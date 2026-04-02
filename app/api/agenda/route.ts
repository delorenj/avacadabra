import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Schema is created by db/001-schema.sql on first Postgres boot.
// Curriculum is seeded by db/002-seed-curriculum.sql.
// This ensureTable is a safety net for dev environments where the
// init scripts may not have run (e.g. connecting to an existing DB).
async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS teaching_agenda (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL UNIQUE,
      concept TEXT NOT NULL,
      title TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      standard TEXT NOT NULL DEFAULT '',
      day_number INT,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function GET(req: NextRequest) {
  try {
    await ensureTable();

    const url = new URL(req.url);
    const fromParam = url.searchParams.get("from");
    let startMonday: Date;
    if (fromParam) {
      startMonday = new Date(fromParam);
    } else {
      const now = new Date();
      const dow = now.getDay();
      startMonday = new Date(now);
      startMonday.setDate(now.getDate() - dow + (dow === 0 ? -6 : 1));
    }
    startMonday.setHours(0, 0, 0, 0);

    const endDate = new Date(startMonday);
    endDate.setDate(endDate.getDate() + 34);

    const { rows } = await pool.query(
      "SELECT id, date, concept, title, notes, standard, day_number, updated_at FROM teaching_agenda WHERE date >= $1 AND date <= $2 ORDER BY date",
      [startMonday.toISOString().substring(0, 10), endDate.toISOString().substring(0, 10)]
    );

    const weekThemes = [
      { week: 1, title: "Fractions as Numbers & Operations", standard: "5.NF", color: "sky" },
      { week: 2, title: "Fraction Multiplication & Division", standard: "5.NF.B", color: "indigo" },
      { week: 3, title: "Decimals & Place Value", standard: "5.NBT", color: "teal" },
      { week: 4, title: "Geometry, Volume & Word Problems", standard: "5.MD, 5.G", color: "purple" },
    ];

    return NextResponse.json({ agenda: rows, weekThemes });
  } catch (err: any) {
    console.error(err);
    return new NextResponse("Failed to fetch agenda", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await ensureTable();
    const body = await req.json();
    const { date, concept, title, notes } = body;

    if (!date) {
      return new NextResponse("date is required", { status: 400 });
    }

    const { rows } = await pool.query(
      `INSERT INTO teaching_agenda (date, concept, title, notes, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (date) DO UPDATE SET
         concept = COALESCE($2, teaching_agenda.concept),
         title = COALESCE($3, teaching_agenda.title),
         notes = COALESCE($4, teaching_agenda.notes),
         updated_at = NOW()
       RETURNING id, date, concept, title, notes, standard, day_number, updated_at`,
      [date, concept || "fractions", title || "", notes || ""]
    );

    return NextResponse.json({ item: rows[0] });
  } catch (err: any) {
    console.error(err);
    return new NextResponse("Failed to update agenda", { status: 500 });
  }
}
