import {setUserAuthData, setUserAuthName, setUserAuthPhoto, userLoggedOut} from '@/features/auth/auth-reducer.ts';
import {LoginFormType} from "@/features/auth/components/LoginForm/LoginForm.tsx";
import {setAppInit} from "@/features/service/service-reducer.ts";
import {authAPI, profileAPI} from '@/api/api.ts';
import {AppDispatchType} from "@/common/hooks/useAppDispatch.ts";

export const authThunkCreator = () => async (dispatch: AppDispatchType) => {
   const response = await authAPI.authMe();
   if (response.resultCode === 0) {
      const {id, login, email} = response.data;
      dispatch(setUserAuthData(id, email, login));
      const profile = await profileAPI.setProfile(id);
      dispatch(setUserAuthPhoto(profile.photos.large));
      dispatch(setUserAuthName(profile.fullName));
   }
   dispatch(setAppInit());
}

export const login = (data: LoginFormType) => async (dispatch: AppDispatchType) => {
   const response = await authAPI.login(data);
   if (response.resultCode === 0) {
      dispatch(authThunkCreator());
   }
}

export const logout = () => async (dispatch: AppDispatchType) => {
   const response = await authAPI.logout();
   if (response.resultCode === 0) {
      dispatch(userLoggedOut());
   }
}