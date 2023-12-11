import { AppRootStateType } from '@/app/store.ts';
import { NoticeStatus } from '@/common/const';

export const noticeStatusSelector = (state: AppRootStateType): NoticeStatus => state.service.noticeStatus;
