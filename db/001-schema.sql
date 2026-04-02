-- Ava-cadabra schema — runs once on first Postgres boot via docker-entrypoint-initdb.d

CREATE TABLE IF NOT EXISTS progress_entries (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  concept TEXT NOT NULL,
  description TEXT NOT NULL,
  explanation TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

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

CREATE INDEX IF NOT EXISTS idx_progress_date ON progress_entries (date);
CREATE INDEX IF NOT EXISTS idx_agenda_date ON teaching_agenda (date);
