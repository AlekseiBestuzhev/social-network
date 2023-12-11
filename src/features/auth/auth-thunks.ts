import { authAPI, profileAPI } from '@/api/api.ts';
import { noticeStatus } from '@/common/const';
import { AppDispatchType } from '@/common/hooks/useAppDispatch.ts';
import { handleServerError } from '@/common/utils/handleServerError.ts';
import {
  setUserAuthData,
  setUserAuthName,
  setUserAuthPhoto,
  userLoggedOut,
} from '@/features/auth/auth-reducer.ts';
import { LoginFormType } from '@/features/auth/components/LoginForm/LoginForm.tsx';
import { setAppInit, setNotification } from '@/features/service/service-reducer.ts';

export const authThunkCreator = () => async (dispatch: AppDispatchType) => {
  try {
    const response = await authAPI.authMe();

    if (response.resultCode === 0) {
      const { id, login, email } = response.data;

      dispatch(setUserAuthData(id, email, login));
      const profile = await profileAPI.setProfile(id);

      dispatch(setUserAuthPhoto(profile.photos.large));
      dispatch(setUserAuthName(profile.fullName));
    } else {
      const message = handleServerError(response);

      dispatch(setNotification(noticeStatus.error, message));
    }
  } catch (error) {
    const message = handleServerError(error);

    dispatch(setNotification(noticeStatus.error, message));
  }
  dispatch(setAppInit());
};

export const login = (data: LoginFormType) => async (dispatch: AppDispatchType) => {
  try {
    const response = await authAPI.login(data);

    console.log(response);
    if (response.resultCode === 0) {
      dispatch(authThunkCreator());
    } else {
      const message = handleServerError(response);

      dispatch(setNotification(noticeStatus.error, message));
    }
  } catch (error) {
    const message = handleServerError(error);

    dispatch(setNotification(noticeStatus.error, message));
  }
};

export const logout = () => async (dispatch: AppDispatchType) => {
  try {
    const response = await authAPI.logout();

    if (response.resultCode === 0) {
      dispatch(userLoggedOut());
    } else {
      const message = handleServerError(response);

      dispatch(setNotification(noticeStatus.error, message));
    }
  } catch (error) {
    const message = handleServerError(error);

    dispatch(setNotification(noticeStatus.error, message));
  }
};
