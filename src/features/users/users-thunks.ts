import { followAPI, usersAPI } from '@/api/api.ts';
import { AppDispatchType } from '@/common/hooks/useAppDispatch.ts';
import { setAppStatus } from '@/features/service/service-reducer.ts';
import {
  follow,
  setUsers,
  unfollow,
  setTotalUsersCount,
  setFollowingInProgress,
} from '@/features/users/users-reducer.ts';

export const getUsersThunkCreator =
  (currentPage: number, pageSize: number) => async (dispatch: AppDispatchType) => {
    dispatch(setAppStatus('loading'));
    const data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setAppStatus('succeeded'));
  };

export const setFollowingThunkCreator =
  (id: number, followed: boolean) => async (dispatch: AppDispatchType) => {
    dispatch(setFollowingInProgress(id, true));
    const result = await followAPI.switchFollow(id, followed);

    if (result === 0) {
      followed ? dispatch(unfollow(id)) : dispatch(follow(id));
    }
    dispatch(setFollowingInProgress(id, false));
  };
