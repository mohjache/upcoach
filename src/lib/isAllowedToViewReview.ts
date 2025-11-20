import type { DrizzleUserReviewWithVideoSelect } from "~/server/db/types";
import { organisationRoleTypes } from "~/types/roleTypes";

export async function isAllowedToViewReview({
  data,
  userId,
  orgId,
  orgPermissions,
}: {
  data: DrizzleUserReviewWithVideoSelect;
  userId: string | null;
  orgId: string | null | undefined;
  orgPermissions: string[] | null | undefined;
}) {
  switch (true) {
    case data.userId !== userId &&
      orgPermissions?.includes(organisationRoleTypes.member):
      return false;
    case data.organisationId !== orgId &&
      orgPermissions?.includes(organisationRoleTypes.coach):
      return false;
    case orgPermissions?.includes(organisationRoleTypes.admin):
      return false;
    default:
      return true;
  }
}
