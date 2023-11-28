import {handleResultCodeError} from "@/common/utils/handleResultCodeError.ts";
import {handleServerError} from "@/common/utils/handleServerError.ts";
import {setAppError} from "@/features/service/service-reducer.ts";
import {setPhotos} from "@/features/auth/auth-reducer.ts";
import {followAPI, profileAPI} from "@/api/api.ts";
import {AppRootStateType} from "@/app/store.ts";
import {AppDispatchType} from "@/app/hooks.ts";
import {
    setStatus,
    setUserProfile,
    followOnProfile,
    unfollowOnProfile,
    setFollowingInProgressOnProfile
} from "@/features/profile/profile-reducer.ts";

export const setProfileTC = (id: number) =>
    async (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
        try {
            const response = await profileAPI.setProfile(id);
            dispatch(setUserProfile(response));
            dispatch(getUserStatusTC(id));
            if (getState().auth.id !== id) {
                dispatch(getFollowingOnProfileTC(id));
            }
        } catch (error) {
            const message = handleServerError(error)
            dispatch(setAppError(message))
        }
    }

export const getFollowingOnProfileTC = (id: number) => async (dispatch: AppDispatchType) => {
    dispatch(setFollowingInProgressOnProfile(true));
    const result = await followAPI.getFollowingStatus(id);
    result
        ? dispatch(followOnProfile())
        : dispatch(unfollowOnProfile());
    dispatch(setFollowingInProgressOnProfile(false));
}

export const switchFollowingOnProfileTC = (id: number, followed: boolean) => async (dispatch: AppDispatchType) => {
    dispatch(setFollowingInProgressOnProfile(true));
    const result = await followAPI.switchFollow(id, followed)
    if (result === 0) {
        followed
            ? dispatch(unfollowOnProfile())
            : dispatch(followOnProfile());
    }
    dispatch(setFollowingInProgressOnProfile(false));
}

export const getUserStatusTC = (id: number) => async (dispatch: AppDispatchType) => {
    const result = await profileAPI.getUserStatus(id);
    dispatch(setStatus(result));
}

export const updateMyStatusTC = (status: string) => async (dispatch: AppDispatchType) => {
    const result = await profileAPI.updateMyStatus(status)
    if (result === 0) {
        dispatch(setStatus(status));
    }
}

export const updateMyPhotoTC = (data: FormData) => async (dispatch: AppDispatchType) => {
    try {
        const result = await profileAPI.updateMyPhoto(data)
        if (result.resultCode === 0) {
            dispatch(setPhotos(result.data.photos));
        } else {
            const message = handleResultCodeError(result)
            dispatch(setAppError(message))
        }
    } catch (error) {
        const message = handleServerError(error)
        dispatch(setAppError(message))
    }
}