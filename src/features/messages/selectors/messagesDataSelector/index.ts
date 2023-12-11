import { AppRootStateType } from '@/app/store.ts';
import { MessagesDataType } from '@/features/messages/messages-reducer.ts';

export const messagesDataSelector = (state: AppRootStateType): MessagesDataType =>
  state.messagesPage.messagesData;
