import { AppRootStateType } from "@/app/store.ts";

export const followingInProgressUserListSelector = (state: AppRootStateType): number[] => state.usersPage.followingInProgress;