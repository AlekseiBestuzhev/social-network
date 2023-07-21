import { PostType } from '@/features/profile/components/PostsBlock/Posts/Post/Post.tsx';
import { ActionsTypes } from '@/app/action-creators-types.ts';
import { UserPhotosType } from '@/features/users/users-reducer.ts';
import badman from '@/assets/images/localUsers/bad-man.jpg';
import john from '@/assets/images/localUsers/john-doe.jpg';
import { v1 } from 'uuid';

//_____ types

export type UserProfileType = {
	aboutMe: string,
	contacts: {
		facebook: string,
		website: string,
		vk: string,
		twitter: string,
		instagram: string,
		youtube: string,
		github: string,
		mainLink: string
	},
	lookingForAJob: boolean,
	lookingForAJobDescription: string,
	fullName: string,
	userId: number,
	photos: UserPhotosType
};

export type ProfilePageType = {
	profile: UserProfileType | null,
	postsData: PostType[],
	newPostText: string,
	followingInProgress: boolean,
	followed: boolean,
	status: string
}

const initialState: ProfilePageType = {
	profile: null,
	postsData: [
		{
			id: v1(),
			text: "Programming is the art of turning ideas into reality through the language of code. It's a process where we create structures, logic, and functionality that embody our creative abilities and impact the world around us.",
			likes: 89,
			myLike: false,
			time: '22:56',
			date: '16 Jun 2023',
			userID: 'local_john-doe',
			name: 'John Doe',
			photo: john
		},
		{
			id: v1(),
			text: 'Where is the detonator?',
			likes: 10798,
			myLike: true,
			time: '13:34',
			date: '14 Jun 2023',
			userID: 'local_the-badman',
			name: 'The Badman',
			photo: badman
		},
		{
			id: v1(),
			text: 'Hello. It\'s the first post on this wall',
			likes: 5,
			myLike: false,
			time: '11:07',
			date: '14 Jun 2023',
			userID: 'local_just-user',
			name: 'justUser',
			photo: ''
		}
	],
	newPostText: '',
	followingInProgress: false,
	followed: false,
	status: ''
}

export const ProfileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
	switch (action.type) {
		case 'UPDATE-POST-TEXT':
			return {
				...state,
				newPostText: action.payload.changedPostText
			}
		case 'ADD-POST':
			const newPost: PostType = {
				id: v1(),
				text: state.newPostText,
				likes: 0,
				myLike: false,
				time: action.payload.time,
				date: action.payload.date,
				userID: action.payload.userID,
				name: action.payload.name,
				photo: action.payload.photo
			}
			return {
				...state,
				newPostText: '',
				postsData: [newPost, ...state.postsData]
			}
		case 'SET-USER-PROFILE':
			return {
				...state,
				profile: action.payload.profile
			}
		case 'SET-LIKE':
			return {
				...state,
				postsData: state.postsData.map(el => el.id === action.payload.postID
					? { ...el, likes: el.likes + 1, myLike: true }
					: el)
			}
		case 'REMOVE-LIKE':
			return {
				...state,
				postsData: state.postsData.map(el => el.id === action.payload.postID
					? { ...el, likes: el.likes - 1, myLike: false }
					: el)
			}
		case 'UNFOLLOW-ON-PROFILE':
			return {
				...state,
				followed: false
			}
		case 'FOLLOW-ON-PROFILE':
			return {
				...state,
				followed: true
			}
		case 'SET-FOLLOWING-IN-PROGRESS-ON-PROFILE':
			return {
				...state,
				followingInProgress: action.payload.inProgress
			}
		case 'SET-STATUS':
			return {
				...state,
				status: action.payload.status
			}
		default:
			return state;
	}
}

export const updatePostTexAC = (changedPostText: string) => {
	return {
		type: 'UPDATE-POST-TEXT',
		payload: {
			changedPostText
		}
	} as const;
}

export const addPostAC = (userID: string, name: string, photo: string | null) => {
	const formatter = new Intl.DateTimeFormat("ru", {
		hour: "numeric",
		minute: "numeric"
	});
	const time = `${formatter.format(new Date())}`
	const dateFormatter = new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
	const date = `${dateFormatter.format(new Date())}`;
	return {
		type: 'ADD-POST',
		payload: {
			time,
			date,
			userID,
			name,
			photo
		}
	} as const;
}

export const setUserProfile = (profile: UserProfileType) => {
	return {
		type: 'SET-USER-PROFILE',
		payload: {
			profile
		}
	} as const;
}

export const setLike = (postID: string) => {
	return {
		type: 'SET-LIKE',
		payload: {
			postID
		}
	} as const;
}

export const removeLike = (postID: string) => {
	return {
		type: 'REMOVE-LIKE',
		payload: {
			postID
		}
	} as const;
}

export const followOnProfile = () => {
	return {
		type: 'FOLLOW-ON-PROFILE'
	} as const
}

export const unfollowOnProfile = () => {
	return {
		type: 'UNFOLLOW-ON-PROFILE'
	} as const
}

export const setFollowingInProgressOnProfile = (inProgress: boolean) => {
	return {
		type: 'SET-FOLLOWING-IN-PROGRESS-ON-PROFILE',
		payload: {
			inProgress
		}
	} as const
}

export const setStatus = (status: string) => {
	return {
		type: 'SET-STATUS',
		payload: {
			status
		}
	} as const
}