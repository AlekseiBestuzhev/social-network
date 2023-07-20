import { followAPI, profileAPI } from "@/api/api.ts";
import {
	setStatus,
	setUserProfile,
	followOnProfile,
	unfollowOnProfile,
	setFollowingInProgressOnProfile
} from "@/features/profile/profile-reducer.ts";
import {AppDispatchType} from "@/app/hooks.ts";

export const setUserProfileThunkCreator = (id: number) => async (dispatch: AppDispatchType) => {
	const response = await profileAPI.setProfile(id);
	dispatch(setUserProfile(response));
}

export const getFollowingOnProfileThunkCreator = (id: number) => async (dispatch: AppDispatchType) => {
	dispatch(setFollowingInProgressOnProfile(true));
	const result = await followAPI.getFollowingStatus(id);
	result
		? dispatch(followOnProfile())
		: dispatch(unfollowOnProfile());
	dispatch(setFollowingInProgressOnProfile(false));
}

export const switchFollowingOnProfileThunkCreator = (id: number, followed: boolean) => async (dispatch: AppDispatchType) => {
	dispatch(setFollowingInProgressOnProfile(true));
	const result = await followAPI.swichFollow(id, followed)
	if (result === 0) {
		followed
			? dispatch(unfollowOnProfile())
			: dispatch(followOnProfile());
	}
	dispatch(setFollowingInProgressOnProfile(false));
}

export const getUserStatusThunkCreator = (id: number) => async (dispatch: AppDispatchType) => {
	const result = await profileAPI.getUserStatus(id);
	dispatch(setStatus(result));
}

export const updateMyStatusThunkCreator = (status: string) => async (dispatch: AppDispatchType) => {
	const result = await profileAPI.updateMyStatus(status)
	if (result === 0) {
		dispatch(setStatus(status));
	}
}