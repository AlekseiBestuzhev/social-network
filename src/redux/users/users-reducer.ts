import { ActionsTypes } from "../action-creators-types";

export type UserPhotosType = {
	small: string | null,
	large: string | null
}

export type UserType = {
	name: string,
	id: number,
	uniqueUrlName: string | null,
	photos: UserPhotosType,
	status: string,
	followed: boolean
}

export type UsersPageType = {
	users: UserType[],
	pageSize: number,
	totalUsersCount: number,
	currentPage: number,
	isFetching: boolean,
	followingInProgress: number[]
}

const initialState: UsersPageType = {
	users: [],
	pageSize: 20,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: []
}

export const UsersReducer = (state: UsersPageType = initialState, action: ActionsTypes): UsersPageType => {
	switch (action.type) {
		case 'FOLLOW':
			return {
				...state,
				users: state.users.map(user => user.id === action.payload.userID ? { ...user, followed: true } : user)
			};
		case 'UNFOLLOW':
			return {
				...state,
				users: state.users.map(user => user.id === action.payload.userID ? { ...user, followed: false } : user)
			}
		case 'SET-USERS':
			return {
				...state,
				users: action.payload.newUsers
			}
		case 'SET-TOTAL-USERS-COUNT':
			return {
				...state,
				totalUsersCount: action.payload.newTotalCount
			}
		case 'SET-CURRENT-PAGE':
			return {
				...state,
				currentPage: action.payload.currentPage
			}
		case 'SWITCH-FETCHING':
			return {
				...state,
				isFetching: action.payload.isFetching
			}
		case 'SET-FOLLOWING-IN-PROGRESS': {
			return {
				...state,
				followingInProgress: action.payload.inProgress
					? [...state.followingInProgress, action.payload.userID]
					: state.followingInProgress.filter(el => el !== action.payload.userID)
			}
		}
		default:
			return state;
	}
}

export const follow = (userID: number) => {
	return {
		type: 'FOLLOW',
		payload: {
			userID
		}
	} as const
}

export const unfollow = (userID: number) => {
	return {
		type: 'UNFOLLOW',
		payload: {
			userID
		}
	} as const
}

export const setUsers = (newUsers: UserType[]) => {
	return {
		type: 'SET-USERS',
		payload: {
			newUsers
		}
	} as const
}

export const setCurrentPage = (currentPage: number) => {
	return {
		type: 'SET-CURRENT-PAGE',
		payload: {
			currentPage
		}
	} as const
}

export const setTotalUsersCount = (newTotalCount: number) => {
	return {
		type: 'SET-TOTAL-USERS-COUNT',
		payload: {
			newTotalCount
		}
	} as const
}

export const setFetching = (isFetching: boolean) => {
	return {
		type: 'SWITCH-FETCHING',
		payload: {
			isFetching
		}
	} as const
}

export const setFollowingInProgress = (userID: number, inProgress: boolean) => {
	return {
		type: 'SET-FOLLOWING-IN-PROGRESS',
		payload: {
			userID,
			inProgress
		}
	} as const
}