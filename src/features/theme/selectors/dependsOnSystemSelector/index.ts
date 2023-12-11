import { AppRootStateType } from '@/app/store.ts';

export const dependsOnSystemSelector = (state: AppRootStateType): boolean => state.theme.dependsOnSystem;
