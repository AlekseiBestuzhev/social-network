import {setUserAuthData, setUserAuthName, setUserAuthPhoto} from '@/features/auth/auth-reducer.ts';
import { authAPI, profileAPI } from '@/api/api.ts';
import {AppDispatchType} from "@/app/hooks.ts";
import {setAppInit} from "@/features/service/service-reducer.ts";

export const authThunkCreator = () => async (dispatch: AppDispatchType) => {
	const response = await authAPI.authMe();
	if (response.resultCode === 0) {
		const { id, login, email } = response.data;
		dispatch(setUserAuthData(id, email, login));
		const profile = await profileAPI.setProfile(id);
		dispatch(setUserAuthPhoto(profile.photos.large));
		dispatch(setUserAuthName(profile.fullName));
	}
	dispatch(setAppInit());
}