import { AppRootStateType } from "@/app/store.ts";

export const currentPageSelector = (state: AppRootStateType): number => state.usersPage.currentPage;