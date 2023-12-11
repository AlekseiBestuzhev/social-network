import { AppRootStateType } from '@/app/store.ts';

export const totalUsersCountSelector = (state: AppRootStateType): number => state.usersPage.totalUsersCount;
