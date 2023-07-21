import { AppRootStateType } from "@/app/store.ts";

export const isAppInitSelector = (state: AppRootStateType): boolean => state.service.isAppInit;