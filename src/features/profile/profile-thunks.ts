import { followAPI, profileAPI } from '@/api/api.ts';
import { AppRootStateType } from '@/app/store.ts';
import { noticeStatus } from '@/common/const';
import { AppDispatchType } from '@/common/hooks/useAppDispatch.ts';
import { handleResultCodeError } from '@/common/utils/handleResultCodeError.ts';
import { handleServerError } from '@/common/utils/handleServerError.ts';
import { setPhotos } from '@/features/auth/auth-reducer.ts';
import { UpdateExtraInfo } from '@/features/profile/components/EditExtraInfoForm/EditExtraInfoForm.tsx';
import {
  setStatus,
  setUserProfile,
  followOnProfile,
  unfollowOnProfile,
  setFollowingInProgressOnProfile,
  setUpdatedProfile,
} from '@/features/profile/profile-reducer.ts';
import { setAppStatus, setNotification } from '@/features/service/service-reducer.ts';

export const setProfileTC =
  (id: number) => async (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
    try {
      const response = await profileAPI.setProfile(id);

      dispatch(setUserProfile(response));
      dispatch(getUserStatusTC(id));
      if (getState().auth.id !== id) {
        dispatch(getFollowingOnProfileTC(id));
      }
    } catch (error) {
      const message = handleServerError(error);

      dispatch(setNotification(noticeStatus.error, message));
    }
  };

export const getFollowingOnProfileTC = (id: number) => async (dispatch: AppDispatchType) => {
  dispatch(setFollowingInProgressOnProfile(true));
  try {
    const result = await followAPI.getFollowingStatus(id);

    result ? dispatch(followOnProfile()) : dispatch(unfollowOnProfile());
  } catch (error) {
    const message = handleServerError(error);

    dispatch(setNotification(noticeStatus.error, message));
  }
  dispatch(setFollowingInProgressOnProfile(false));
};

export const switchFollowingOnProfileTC =
  (id: number, followed: boolean) => async (dispatch: AppDispatchType) => {
    dispatch(setFollowingInProgressOnProfile(true));
    try {
      const result = await followAPI.switchFollow(id, followed);

      if (result.resultCode === 0) {
        followed ? dispatch(unfollowOnProfile()) : dispatch(followOnProfile());
      } else {
        const message = handleServerError(result);

        dispatch(setNotification(noticeStatus.error, message));
      }
    } catch (error) {
      const message = handleServerError(error);

      dispatch(setNotification(noticeStatus.error, message));
    }
    dispatch(setFollowingInProgressOnProfile(false));
  };

export const getUserStatusTC = (id: number) => async (dispatch: AppDispatchType) => {
  try {
    const result = await profileAPI.getUserStatus(id);

    dispatch(setStatus(result));
  } catch (error) {
    const message = handleServerError(error);

    dispatch(setNotification(noticeStatus.error, message));
  }
};

export const updateMyStatusTC =
  (status: string, onClose: () => void) => async (dispatch: AppDispatchType) => {
    try {
      const result = await profileAPI.updateMyStatus(status);

      if (result.resultCode === 0) {
        dispatch(setStatus(status));
        onClose();
      } else {
        const message = handleResultCodeError(result);

        dispatch(setNotification(noticeStatus.error, message));
      }
    } catch (error) {
      const message = handleServerError(error);

      dispatch(setNotification(noticeStatus.error, message));
    }
  };

export const updateMyPhotoTC = (data: FormData) => async (dispatch: AppDispatchType) => {
  try {
    const result = await profileAPI.updateMyPhoto(data);

    if (result.resultCode === 0) {
      dispatch(setPhotos(result.data.photos));
      dispatch(setNotification(noticeStatus.success, 'Avatar updated successfully'));
    } else {
      const message = handleResultCodeError(result);

      dispatch(setNotification(noticeStatus.error, message));
    }
  } catch (error) {
    const message = handleServerError(error);

    dispatch(setNotification(noticeStatus.error, message));
  }
};

export const updateMyProfileTC = (data: UpdateExtraInfo) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatus('loading'));
    const result = await profileAPI.updateMyExtraInfo(data);

    if (result.resultCode === 0) {
      dispatch(setUpdatedProfile(data));
      dispatch(setNotification(noticeStatus.success, 'Profile updated successfully'));
      dispatch(setAppStatus('succeeded'));
    } else {
      const message = handleResultCodeError(result);

      dispatch(setNotification(noticeStatus.error, message));
      dispatch(setAppStatus('failed'));
    }
  } catch (error) {
    const message = handleServerError(error);

    dispatch(setNotification(noticeStatus.error, message));
    dispatch(setAppStatus('failed'));
  }
};
