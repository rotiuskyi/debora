CREATE TABLE "account_boards"(
    "id" bigserial NOT NULL,
    "account" VARCHAR(255) NOT NULL,
    "board" BIGINT NOT NULL
);
ALTER TABLE
    "account_boards" ADD PRIMARY KEY("id");
CREATE TABLE "accounts"(
    "id" VARCHAR(255) NOT NULL,
    "user_email" VARCHAR(255) NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "issuer" VARCHAR(255) NOT NULL,
    "picture" TEXT NOT NULL
);
ALTER TABLE
    "accounts" ADD PRIMARY KEY("id");
ALTER TABLE
    "accounts" ADD CONSTRAINT "accounts_user_email_unique" UNIQUE("user_email");
COMMENT
ON COLUMN
    "accounts"."id" IS 'id_token subject given by the identity provider';
CREATE TABLE "devices"(
    "id" bigserial NOT NULL,
    "title" TEXT NOT NULL,
    "board" BIGINT NOT NULL
);
ALTER TABLE
    "devices" ADD PRIMARY KEY("id");
CREATE INDEX "devices_board_index" ON
    "devices"("board");
CREATE TABLE "boards"(
    "id" bigserial NOT NULL,
    "title" TEXT NOT NULL
);
ALTER TABLE
    "boards" ADD PRIMARY KEY("id");
ALTER TABLE
    "account_boards" ADD CONSTRAINT "account_boards_account_foreign" FOREIGN KEY("account") REFERENCES "accounts"("id");
ALTER TABLE
    "devices" ADD CONSTRAINT "devices_board_foreign" FOREIGN KEY("board") REFERENCES "boards"("id");
ALTER TABLE
    "account_boards" ADD CONSTRAINT "account_boards_board_foreign" FOREIGN KEY("board") REFERENCES "boards"("id");
