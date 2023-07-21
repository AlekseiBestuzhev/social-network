import { AppRootStateType } from "@/app/store.ts";

export const followedSelector = (state: AppRootStateType): boolean => state.profile.followed;