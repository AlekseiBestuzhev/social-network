import {AppRootStateType} from "@/app/store.ts";

export const authUserAvatarSelector = (state: AppRootStateType): string | null => state.auth.photos.large