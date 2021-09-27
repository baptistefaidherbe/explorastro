
DROP TABLE IF EXISTS "participate";
DROP TABLE IF EXISTS "comment";
DROP TABLE IF EXISTS "exploration";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "role";



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
    "geog" TEXT[],
    "date" TIMESTAMPTZ,
    "max_participants" INT,
    "is_published" BOOLEAN,
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


ALTER TABLE "user" ADD COLUMN token_temp text DEFAULT 0; 
ALTER TABLE "exploration" ADD COLUMN departement text; 

ALTER TABLE "comment"
DROP CONSTRAINT comment_exploration_id_fkey,
ADD CONSTRAINT comment_exploration_id_fkey
   FOREIGN KEY (exploration_id)
   REFERENCES exploration(id)
   ON DELETE CASCADE default 1;

   ALTER TABLE "exploration"
   ALTER COLUMN is_published SET NOT NULL DEFAULT false;