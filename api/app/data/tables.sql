
DROP TABLE IF EXISTS "role";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "exploration";
DROP TABLE IF EXISTS "comment";
DROP TABLE IF EXISTS "participate";

CREATE TABLE IF NOT EXISTS "role" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "avatar_url" TEXT,
    "bio" TEXT,
    "city" TEXT,
    "zipcode" TEXT,
    "role_id" INT REFERENCES "role"("id") ON DELETE CASCADE DEFAULT 1,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "exploration" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "author_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE DEFAULT 1,
    "geog" GEOGRAPHY(POINT, 4326),
    "date" TIMESTAMPTZ NOT NULL,
    "max_participants" INT,
    "is_published" BOOLEAN NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "comment" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "author_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE DEFAULT 1,
    "exploration_id" INT NOT NULL REFERENCES "exploration"("id"),
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "participate" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "exploration_id" INT NOT NULL REFERENCES "exploration"("id") ON DELETE CASCADE,
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

