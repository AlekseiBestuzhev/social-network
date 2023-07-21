import { AppRootStateType } from "@/app/store.ts";

export const authUserSelector = (state: AppRootStateType): number | null => state.auth.id;