import { relations } from "drizzle-orm";
import { index, pgEnum, pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `upcoach_${name}`);

// Video status enum
export const videoStatusEnum = pgEnum("video_status", [
  "uploading",
  "ready",
  "error",
]);

// Comment type for JSONB
export type DrizzleComment = {
  userId: string;
  userProfilePictureUrl?: string;
  userFullName?: string;
  comment: string;
  createdAt: string;
  startTime?: number;
};

// Videos table
export const videos = createTable(
  "video",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    title: d.text().notNull(),
    description: d.text(),
    muxAssetId: d.text(),
    muxPlaybackId: d.text(),
    muxUploadId: d.text().notNull(),
    uploaderId: d.text().notNull(),
    blurDataUrl: d.text(),
    status: videoStatusEnum("status").notNull(),
    duration: d.integer(),
    aspectRatio: d.text(),
  }),
  (t) => [
    index("by_uploader").on(t.uploaderId),
    index("by_mux_upload_id").on(t.muxUploadId),
    index("by_status").on(t.status),
  ],
);

// User reviews table
export const userReviews = createTable(
  "user_review",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    userId: d.text().notNull(),
    videoId: d
      .integer()
      .notNull()
      .references(() => videos.id),
    organisationId: d.text().notNull(),
    comments: d.jsonb().$type<DrizzleComment[]>(),
  }),
  (t) => [
    index("by_organisation").on(t.organisationId),
    index("by_user").on(t.userId),
    index("by_video").on(t.videoId),
  ],
);

export const userReviewsRelations = relations(userReviews, ({ one }) => ({
  video: one(videos, {
    fields: [userReviews.videoId],
    references: [videos.id],
  }),
}));
