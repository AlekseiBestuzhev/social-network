import {AppRootStateType} from "@/app/store.ts";

export const authUserNameSelector = (state: AppRootStateType): string | null => state.auth.fullName;