import { followAPI, profileAPI } from "@/api/api";
import { AppDispatch, AppThunk } from "@/redux/redux-store";
import {
	setStatus,
	setUserProfile,
	followOnProfile,
	unfollowOnProfile,
	setFollowingInProgressOnProfile
} from "@/redux/profile/profile-reducer";

export const setUserProfileThunkCreator = (id: number): AppThunk => async (dispatch: AppDispatch) => {
	const response = await profileAPI.setProfile(id);
	dispatch(setUserProfile(response));
}

export const getFollowingOnProfileThunkCreator = (id: number): AppThunk => async (dispatch: AppDispatch) => {
	dispatch(setFollowingInProgressOnProfile(true));
	const result = await followAPI.getFollowingStatus(id);
	result
		? dispatch(followOnProfile())
		: dispatch(unfollowOnProfile());
	dispatch(setFollowingInProgressOnProfile(false));
}

export const switchFollowingOnProfileThunkCreator = (id: number, followed: boolean): AppThunk => async (dispatch: AppDispatch) => {
	dispatch(setFollowingInProgressOnProfile(true));
	const result = await followAPI.swichFollow(id, followed)
	if (result === 0) {
		followed
			? dispatch(unfollowOnProfile())
			: dispatch(followOnProfile());
	}
	dispatch(setFollowingInProgressOnProfile(false));
}

export const getUserStatusThunkCreator = (id: number): AppThunk => async (dispatch: AppDispatch) => {
	const result = await profileAPI.getUserStatus(id);
	dispatch(setStatus(result));
}

export const updateMyStatusThunkCreator = (status: string): AppThunk => async (dispatch: AppDispatch) => {
	const result = await profileAPI.updateMyStatus(status)
	if (result === 0) {
		dispatch(setStatus(status));
	}
}