import { AppRootStateType } from "@/app/store.ts";
import {UserProfileType} from "@/features/profile/profile-reducer.ts";

export const profileSelector = (state: AppRootStateType): UserProfileType | null => state.profile.profile;