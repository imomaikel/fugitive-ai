CREATE TYPE "public"."danger_level" AS ENUM('low', 'medium', 'high', 'extreme');--> statement-breakpoint
CREATE TYPE "public"."fugitive_status" AS ENUM('wanted', 'identified', 'located', 'under surveillance', 'apprehended', 'no longer wanted', 'suspected', 'in hiding', 'international warrant', 'pending verification');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TABLE "fugitive" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"fullName" varchar(255) NOT NULL,
	"gender" "gender" NOT NULL,
	"dangerLevel" "danger_level" NOT NULL,
	"birthDate" timestamp with time zone,
	"identifyNumber" varchar(255),
	"nationality" varchar(255),
	"appearance" text,
	"notes" text,
	"addedByUserId" varchar(255),
	"addedByUserName" varchar(255) NOT NULL,
	"status" "fugitive_status" NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "fugitive" ADD CONSTRAINT "fugitive_addedByUserId_user_id_fk" FOREIGN KEY ("addedByUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;