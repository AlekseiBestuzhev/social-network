import { AppDispatch, AppThunk } from '@/app/store.ts';
import { followAPI, usersAPI } from '@/api/api';
import {
	follow,
	setUsers,
	unfollow,
	setFetching,
	setTotalUsersCount,
	setFollowingInProgress
} from '@/redux/users/users-reducer';

export const getUsersThunkCreator = (currentPage: number, pageSize: number): AppThunk => async (dispatch: AppDispatch) => {
	dispatch(setFetching(true));
	const data = await usersAPI.getUsers(currentPage, pageSize);
	dispatch(setUsers(data.items));
	dispatch(setTotalUsersCount(data.totalCount));
	dispatch(setFetching(false));
}

export const setFollowingThunkCreator = (id: number, followed: boolean): AppThunk => async (dispatch: AppDispatch) => {
	dispatch(setFollowingInProgress(id, true));
	const result = await followAPI.swichFollow(id, followed)
	if (result === 0) {
		followed
			? dispatch(unfollow(id))
			: dispatch(follow(id));
	}
	dispatch(setFollowingInProgress(id, false));
}