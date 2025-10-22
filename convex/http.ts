/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

export type WorkOsUserData = {
  id: string;
  email: string;
  first_name: string | undefined;
  last_name: string | undefined;
  profile_picture_url: string | undefined;
  organisation_id: string | undefined;
  created_at: string;
  updated_at: string;
  email_verified: boolean | undefined;
  external_id: string | null;
  last_sign_in_at: string | undefined;
  locale: string | undefined;
  metadata: object | undefined;
};

const handleMuxWebhook = httpAction(async (ctx, request) => {
  const body = await request.text();
  const event = JSON.parse(body);

  console.log("mux webhook", event);

  if (event.type === "video.asset.ready") {
    const asset = event.data;
    await ctx.runMutation(api.uploadedvideomutations.updateVideoStatus, {
      muxUploadId: asset.upload_id,
      status: "ready",
      muxAssetId: asset.asset_id,
      muxPlaybackId: asset.playback_ids?.[0]?.id ?? "",
      duration: asset.duration,
      aspectRatio: asset.aspect_ratio,
    });
  } else if (event.type === "video.asset.errored") {
    const asset = event.data;
    await ctx.runMutation(api.uploadedvideomutations.updateVideoStatus, {
      muxUploadId: asset.upload_id,
      status: "error",
    });
  }

  return new Response("OK", { status: 200 });
});

const handleWorkOsWebhook = httpAction(async (ctx, request) => {
  try {
    const body = await request.text();
    const event = JSON.parse(body);

    //add type on event.data that maps to the schema

    // Verify webhook signature here if needed
    // const signature = request.headers.get("workos-signature");

    switch (event.event) {
      // for user events cast event.data to WorkOsUserData and pass to the mutation

      case "user.created":
        // only pass
        const userDataCreated = parseWorkOsUserData(
          event.data as WorkOsUserData,
        );
        await ctx.runMutation(api.users.handleUserCreated, {
          user: userDataCreated,
        });
        break;

      case "user.updated":
        const userDataUpdated = parseWorkOsUserData(
          event.data as WorkOsUserData,
        );
        await ctx.runMutation(api.users.handleUserUpdated, {
          user: userDataUpdated,
        });
        break;

      case "user.deleted":
        await ctx.runMutation(api.users.handleUserDeleted, {
          userId: event.data.id,
        });
        break;
      case "organization.created":
        await ctx.runMutation(api.organisations.handleorganisationCreated, {
          organisation: event.data,
        });
        break;

      case "organization.updated":
        await ctx.runMutation(api.organisations.handleorganisationUpdated, {
          organisation: event.data,
        });
        break;

      case "organization.deleted":
        await ctx.runMutation(api.organisations.handleorganisationDeleted, {
          organisationId: event.data.id,
        });
        break;

      case "organization_membership.created":
        await ctx.runMutation(
          api.organisationMemberships.handleMembershipCreated,
          {
            membership: event.data,
          },
        );
        break;

      case "organization_membership.updated":
        await ctx.runMutation(
          api.organisationMemberships.handleMembershipUpdated,
          {
            membership: event.data,
          },
        );
        break;

      case "organization_membership.deleted":
        await ctx.runMutation(
          api.organisationMemberships.handleMembershipDeleted,
          {
            membershipId: event.data.id,
          },
        );
        break;
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Error processing webhook", { status: 500 });
  }
});

const parseWorkOsUserData = (data: WorkOsUserData) => {
  return {
    id: data.id,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    profile_picture_url: data.profile_picture_url,
    organisation_id: data.organisation_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    email_verified: data.email_verified,
    external_id: data.external_id,
    last_sign_in_at: data.last_sign_in_at,
    locale: data.locale,
    metadata: data.metadata,
  };
};

const http = httpRouter();

http.route({
  path: "/mux-webhook",
  method: "POST",
  handler: handleMuxWebhook,
});

http.route({
  path: "/workos-webhook",
  method: "POST",
  handler: handleWorkOsWebhook,
});

export default http;
