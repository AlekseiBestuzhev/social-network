import { AppRootStateType } from "@/app/store.ts";

export const followingInProgressSelector = (state: AppRootStateType): boolean => state.profile.followingInProgress;