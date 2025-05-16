CREATE TABLE "prediction_log" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"fugitiveId" varchar(255) NOT NULL,
	"userId" varchar(255),
	"city" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"reasoning" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "prediction_log" ADD CONSTRAINT "prediction_log_fugitiveId_fugitive_id_fk" FOREIGN KEY ("fugitiveId") REFERENCES "public"."fugitive"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prediction_log" ADD CONSTRAINT "prediction_log_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;