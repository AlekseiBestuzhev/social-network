import { AppRootStateType } from '@/app/store.ts';

export const noticeMessageSelector = (state: AppRootStateType): string | null => state.service.message;
