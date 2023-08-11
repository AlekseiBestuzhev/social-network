import {DialogType} from "@/features/messages/messages-reducer.ts";
import { AppRootStateType } from "@/app/store.ts";

export const dialogsDataSelector = (state: AppRootStateType): DialogType[] => state.messagesPage.dialogsData;