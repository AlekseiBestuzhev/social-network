import {UserPhotosType} from "@/features/users/users-reducer.ts";
import {setUpdatedProfile} from "@/features/profile/profile-reducer.ts";

// _____ types

export type AuthActionsType =
    | ReturnType<typeof setUpdatedProfile>
    | ReturnType<typeof setUserAuthPhoto>
    | ReturnType<typeof setUserAuthData>
    | ReturnType<typeof setUserAuthName>
    | ReturnType<typeof userLoggedOut>
    | ReturnType<typeof setPhotos>

export type AuthUserDataType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
    photos: UserPhotosType
}

export type InitStateType = AuthUserDataType & {
    fullName: string | null
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
        case 'SET-PHOTOS':
            return {
                ...state,
                photos: action.payload.photos
            }
        case 'USER-LOGGED-OUT':
            return initState
        case 'SET-UPDATED-PROFILE':
            return {
                ...state,
                fullName: action.payload.data.fullName
            }
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


export const setPhotos = (photos: {small: string, large: string}) => ({
    type: 'SET-PHOTOS',
    payload: {
        photos
    }
} as const);