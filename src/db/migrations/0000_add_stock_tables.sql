CREATE TABLE IF NOT EXISTS "stock" (
	"id" serial PRIMARY KEY NOT NULL,
	"symbol" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stockPrice" (
	"id" serial PRIMARY KEY NOT NULL,
	"stock_id" bigint NOT NULL,
	"current_price" numeric,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stockPrice" ADD CONSTRAINT "stockPrice_stock_id_stock_id_fk" FOREIGN KEY ("stock_id") REFERENCES "stock"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
