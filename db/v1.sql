CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL,
    "username" VARCHAR(50) NOT NULL UNIQUE,
    "email" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "messages" (
    "id" SERIAL,
    "text" TEXT,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "files" (
    "id" SERIAL,
    "filename" VARCHAR(255) NOT NULL,
    "mimetype" VARCHAR(100) NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "size" BIGINT,
    "created_at" TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "message_files" (
    "id" SERIAL,
    "message_id" INTEGER NOT NULL,
    "file_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE CASCADE,
    FOREIGN KEY ("file_id") REFERENCES "files" ("id") ON DELETE CASCADE,
    UNIQUE ("message_id", "file_id")
);