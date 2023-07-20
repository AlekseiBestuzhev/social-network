import { setAuthInProgress, setUserAuthData, setUserAuthPhoto } from '@/redux/auth/auth-reducer';
import { AppDispatch, AppThunk } from '@/redux/redux-store';
import { authAPI, profileAPI } from '@/api/api';

export const authThunkCreator = (): AppThunk => async (dispatch: AppDispatch) => {
	const response = await authAPI.authMe();
	if (response.resultCode === 0) {
		const { id, login, email } = response.data;
		dispatch(setUserAuthData(id, email, login));
		const profile = await profileAPI.setProfile(id);
		dispatch(setUserAuthPhoto(profile.photos.large));
	}
	dispatch(setAuthInProgress(false));
}