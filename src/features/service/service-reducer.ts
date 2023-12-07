import {appStatus, AppStatus, NoticeStatus, noticeStatus} from "@/common/const";

export type ServiceActionsType =
   | ReturnType<typeof setNotification>
   | ReturnType<typeof setAppStatus>
   | ReturnType<typeof setAppInit>

export type ServiceType = {
   isAppInit: boolean,
   appStatus: AppStatus,
   noticeStatus: NoticeStatus,
   message: string | null
}

const initialState: ServiceType = {
   isAppInit: false,
   appStatus: appStatus.idle,
   noticeStatus: noticeStatus.null,
   message: null
}

export const ServiceReducer = (state: ServiceType = initialState, action: ServiceActionsType): ServiceType => {
   switch (action.type) {
      case 'SET-APP-INIT': {
         return {
            ...state,
            isAppInit: true
         };
      }
      case 'SET-APP-STATUS': {
         return {
            ...state,
            appStatus: action.payload.status
         };
      }
      case 'SET-NOTIFICATION': {
         return {
            ...state,
            ...action.payload
         };
      }
      default:
         return state;
   }
}

//_____actions

export const setAppInit = () => ({
   type: 'SET-APP-INIT',
} as const);

export const setAppStatus = (status: AppStatus) => ({
   type: 'SET-APP-STATUS',
   payload: {
      status
   }
} as const);

export const setNotification = (noticeStatus: NoticeStatus, message: string | null) => ({
   type: 'SET-NOTIFICATION',
   payload: {
      noticeStatus,
      message
   }
} as const);