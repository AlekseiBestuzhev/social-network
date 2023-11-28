import { AppRootStateType } from "@/app/store.ts";

export const appErrorSelector = (state: AppRootStateType): string | null => state.service.error;