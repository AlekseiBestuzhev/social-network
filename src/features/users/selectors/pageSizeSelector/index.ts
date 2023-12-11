import { AppRootStateType } from '@/app/store.ts';

export const pageSizeSelector = (state: AppRootStateType): number => state.usersPage.pageSize;
