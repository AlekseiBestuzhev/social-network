import { MessagesDataType } from "@/features/messages/messages-reducer.ts";
import { AppRootStateType } from "@/app/store.ts";

export const messagesDataSelector = (state: AppRootStateType): MessagesDataType => state.messagesPage.messagesData;