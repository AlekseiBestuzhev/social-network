import {AppStatusTypes} from "@/features/service/service-reducer.ts";
import { AppRootStateType } from "@/app/store.ts";

export const appStatusSelector = (state: AppRootStateType): AppStatusTypes => state.service.appStatus;