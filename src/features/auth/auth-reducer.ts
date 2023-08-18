import {UserPhotosType} from "@/features/users/users-reducer.ts";

// _____ types

export type AuthActionsType =
   | ReturnType<typeof setUserAuthPhoto>
   | ReturnType<typeof setUserAuthData>
   | ReturnType<typeof setUserAuthName>
   | ReturnType<typeof userLoggedOut>

export type AuthUserDataType = {
   id: number | null,
   login: string | null,
   email: string | null,
   isAuth: boolean,
   photos: UserPhotosType
}

type InitStateType = AuthUserDataType & {
   fullName: string | null
}

export type AuthUserType = {
   data: AuthUserDataType,
   messages: [],
   fieldsErrors: [],
   resultCode: 0
}

// _____ reducer

const initState: InitStateType = {
   id: null,
   login: null,
   email: null,
   isAuth: false,
   photos: {
      small: null,
      large: null
   },
   fullName: null
}

export const AuthReducer = (state: InitStateType = initState, action: AuthActionsType): InitStateType => {
   switch (action.type) {
      case 'SET-USER-AUTH-DATA':
         return {
            ...state,
            ...action.payload,
            isAuth: true
         }
      case 'SET-USER-AUTH-PHOTO':
         return {
            ...state,
            photos: {
               ...state.photos,
               large: action.payload.photo
            }
         }
      case 'SET-USER-AUTH-NAME' :
         return {
            ...state,
            fullName: action.payload.name
         }
      case 'USER-LOGGED-OUT':
         return initState
      default:
         return state
   }
}

//_____ actions

export const setUserAuthData = (id: number, email: string, login: string) => ({
   type: 'SET-USER-AUTH-DATA',
   payload: {
      id,
      email,
      login
   }
} as const);

export const setUserAuthPhoto = (photo: string) => ({
   type: 'SET-USER-AUTH-PHOTO',
   payload: {
      photo
   }
} as const);

export const setUserAuthName = (name: string) => ({
   type: 'SET-USER-AUTH-NAME',
   payload: {
      name
   }
} as const);

export const userLoggedOut = () => ({
   type: 'USER-LOGGED-OUT'
} as const);