import { AppRootStateType } from "@/app/store.ts";

export const statusSelector = (state: AppRootStateType): string => state.profilePage.status;