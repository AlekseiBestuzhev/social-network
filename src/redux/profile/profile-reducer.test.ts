import {
	ProfilePageType,
	ProfileReducer,
	updatePostTexAC,
	addPostAC,
	setUserProfile,
	setLike,
	removeLike,
	setStatus
} from "@/redux/profile/profile-reducer";

let initialState: ProfilePageType;

beforeEach(() => {
	initialState = {
		profile: null,
		postsData: [
			{
				id: '111',
				text: "It's my second post.",
				likes: 6,
				myLike: false,
				time: '22:56',
				date: '16.06.2023',
				userID: 'local_john-doe',
				name: 'John Doe',
				photo: 'john'
			},
			{
				id: '222',
				text: "It's my first post.",
				likes: 9,
				myLike: true,
				time: '13:34',
				date: '14.06.2023',
				userID: 'local_the-badman',
				name: 'The Badman',
				photo: 'badman'
			}
		],
		newPostText: 'fff',
		followingInProgress: false,
		followed: false,
		status: ''
	};
});

test('new post should be added to start', () => {
	const action = addPostAC('userID', 'name', 'photo');
	const newState = ProfileReducer(initialState, action);

	expect(newState.postsData.length).toBe(3);
	expect(newState.postsData[0].text).toBe(initialState.newPostText);
	expect(newState.newPostText).toBe('');
});

test('new post text should be updated', () => {
	const action = updatePostTexAC('Post text');
	const newState = ProfileReducer(initialState, action);

	expect(newState.newPostText).toBe(action.payload.changedPostText);
});

test('user profile should be set', () => {
	const profile = {
		aboutMe: 'About me',
		contacts: {
			facebook: 'facebook.com',
			website: 'website.com',
			vk: 'vk.com',
			twitter: 'twitter.com',
			instagram: 'instagram.com',
			youtube: 'youtube.com',
			github: 'github.com',
			mainLink: 'mainlink.com'
		},
		lookingForAJob: true,
		lookingForAJobDescription: 'Looking for a job',
		fullName: 'John Doe',
		userId: 123,
		photos: {
			small: 'small.jpg',
			large: 'large.jpg'
		}
	};

	const action = setUserProfile(profile);
	const newState = ProfileReducer(initialState, action);

	expect(newState.profile).toEqual(profile);
});

test('post like should be setted', () => {
	const action = setLike('111');
	const newState = ProfileReducer(initialState, action);

	expect(initialState.postsData[0].likes).toBe(6);
	expect(initialState.postsData[1].likes).toBe(9);
	expect(initialState.postsData[0].myLike).toBe(false);
	expect(initialState.postsData[1].myLike).toBe(true);
	expect(newState.postsData[0].likes).toBe(7);
	expect(newState.postsData[1].likes).toBe(9);
	expect(newState.postsData[0].myLike).toBe(true);
	expect(newState.postsData[1].myLike).toBe(true);
});

test('post like should be removed', () => {
	const action = removeLike('222');
	const newState = ProfileReducer(initialState, action);

	expect(initialState.postsData[0].likes).toBe(6);
	expect(initialState.postsData[1].likes).toBe(9);
	expect(initialState.postsData[0].myLike).toBe(false);
	expect(initialState.postsData[1].myLike).toBe(true);
	expect(newState.postsData[0].likes).toBe(6);
	expect(newState.postsData[1].likes).toBe(8);
	expect(newState.postsData[0].myLike).toBe(false);
	expect(newState.postsData[1].myLike).toBe(false);
});

test('status should be updted', () => {
	const action = setStatus('Status');
	const newState = ProfileReducer(initialState, action);

	expect(initialState.status).toBe('');
	expect(newState.status).toBe('Status');
});