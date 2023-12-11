import { AppRootStateType } from '@/app/store.ts';

export const authUserIDSelector = (state: AppRootStateType): number | null => state.auth.id;
