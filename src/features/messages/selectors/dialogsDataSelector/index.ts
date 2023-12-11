import { AppRootStateType } from '@/app/store.ts';
import { DialogType } from '@/features/messages/messages-reducer.ts';

export const dialogsDataSelector = (state: AppRootStateType): DialogType[] => state.messagesPage.dialogsData;
