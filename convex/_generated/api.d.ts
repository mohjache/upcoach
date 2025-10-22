/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as http from "../http.js";
import type * as organisationMemberships from "../organisationMemberships.js";
import type * as organisations from "../organisations.js";
import type * as uploadedvideomutations from "../uploadedvideomutations.js";
import type * as uploadedvideos from "../uploadedvideos.js";
import type * as userReview from "../userReview.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  http: typeof http;
  organisationMemberships: typeof organisationMemberships;
  organisations: typeof organisations;
  uploadedvideomutations: typeof uploadedvideomutations;
  uploadedvideos: typeof uploadedvideos;
  userReview: typeof userReview;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
