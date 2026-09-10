import type {
  GenericMutationCtx,
  GenericQueryCtx,
} from "convex/server";
import type { DataModel } from "./dataModel";

export type QueryCtx = GenericQueryCtx<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;

export declare const query: any;
export declare const mutation: any;
export declare const internalQuery: any;
export declare const internalMutation: any;
export declare const action: any;
export declare const internalAction: any;
