ALTER TABLE "stock" ALTER COLUMN "symbol" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "stock" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "stock" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "stock" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "stock" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "stockPrice" ALTER COLUMN "current_price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "stockPrice" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "stockPrice" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "stockPrice" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "stockPrice" ALTER COLUMN "updated_at" SET NOT NULL;