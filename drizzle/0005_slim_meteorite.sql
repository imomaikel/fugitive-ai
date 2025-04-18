ALTER TYPE "public"."fugitive_status" ADD VALUE 'incarcerated';--> statement-breakpoint
ALTER TYPE "public"."fugitive_status" ADD VALUE 'executed';--> statement-breakpoint
CREATE TABLE "location_history" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"latitude" double precision,
	"longitude" double precision,
	"place" text,
	"context" text,
	"fugitiveId" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "location_history" ADD CONSTRAINT "location_history_fugitiveId_fugitive_id_fk" FOREIGN KEY ("fugitiveId") REFERENCES "public"."fugitive"("id") ON DELETE cascade ON UPDATE no action;