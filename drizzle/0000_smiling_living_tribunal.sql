CREATE TABLE "account" (
	"userId" varchar(255) NOT NULL,
	"session_state" varchar(255),
	"token_type" varchar(255),
	"scope" varchar(255),
	"expires_at" integer,
	"refresh_token" text,
	"access_token" text,
	"id_token" text,
	"type" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"image" varchar(255),
	"emailVerified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"email" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "t_user_id_idx" ON "session" USING btree ("userId");