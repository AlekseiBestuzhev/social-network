import { AppRootStateType } from "@/app/store.ts";
import {AppStatus} from "@/common/const";

export const appStatusSelector = (state: AppRootStateType): AppStatus => state.service.appStatus;