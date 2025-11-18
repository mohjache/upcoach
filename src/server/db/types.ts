import type { InferSelectModel } from "drizzle-orm";
import type { userReviews, videos } from "~/server/db/schema";

export type DrizzleUserReviewSelect = InferSelectModel<typeof userReviews>;
export type DrizzleVideoSelect = InferSelectModel<typeof videos>;

export type DrizzleUserReviewWithVideoSelect = DrizzleUserReviewSelect & {
  video: DrizzleVideoSelect;
};
