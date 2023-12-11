import { AppRootStateType } from '@/app/store.ts';
import { UserType } from '@/features/users/users-reducer.ts';

export const usersSelector = (state: AppRootStateType): UserType[] => state.usersPage.users;
