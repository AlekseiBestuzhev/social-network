export type AppStatusTypes = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ServiceActionsType =
   | ReturnType<typeof setAppInit>
   | ReturnType<typeof setAppError>
   | ReturnType<typeof setAppStatus>

export type ServiceType = {
   isAppInit: boolean,
   appStatus: AppStatusTypes,
   error: boolean
}

const initialState: ServiceType = {
   isAppInit: false,
   appStatus: 'loading',
   error: false
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
      case 'SET-APP-ERROR': {
         return {
            ...state,
            error: action.payload.error
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

export const setAppStatus = (status: AppStatusTypes) => ({
   type: 'SET-APP-STATUS',
   payload: {
      status
   }
} as const);

export const setAppError = (error: boolean) => ({
   type: 'SET-APP-ERROR',
   payload: {
      error
   }
} as const);
