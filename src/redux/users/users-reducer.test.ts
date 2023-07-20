import {
	follow,
	unfollow,
	setUsers,
	UserType,
	UsersReducer,
	UsersPageType,
	setCurrentPage,
	setTotalUsersCount
} from './users-reducer';

const startState: UsersPageType = {
	users: [
		{ id: 1, photos: { small: null, large: null }, name: 'Dmitry', followed: false, status: 'Status', uniqueUrlName: null },
		{ id: 2, photos: { small: null, large: null }, name: 'Semen', followed: true, status: 'Status', uniqueUrlName: null },
		{ id: 3, photos: { small: null, large: null }, name: 'Peter', followed: false, status: 'Status', uniqueUrlName: null }
	],
	pageSize: 5,
	totalUsersCount: 50,
	currentPage: 1,
	isFetching: false,
	followingInProgress: []
}

test('follow user with ID: 1', () => {

	const endState = UsersReducer(startState, follow(1))

	expect(endState.users[0].followed).toBe(true);
	expect(startState.users[0].followed).toBe(false);
	expect(startState.users[1].followed).toBe(endState.users[1].followed);
});

test('unfollow user with ID: 2', () => {

	const endState = UsersReducer(startState, unfollow(2))

	expect(endState.users[1].followed).toBe(false);
	expect(startState.users[1].followed).toBe(true);
	expect(startState.users[0].followed).toBe(endState.users[0].followed);
});

test('add users to the page', () => {

	const newUsers: UserType[] = [
		{ id: 4, photos: { small: null, large: null }, name: 'Max', followed: false, status: 'Status', uniqueUrlName: null },
		{ id: 5, photos: { small: null, large: null }, name: 'Sergey', followed: false, status: 'Status', uniqueUrlName: null },
		{ id: 6, photos: { small: null, large: null }, name: 'Victor', followed: false, status: 'Status', uniqueUrlName: null }
	]

	const endState = UsersReducer(startState, setUsers(newUsers))

	expect(endState.users).toEqual(newUsers)
});

test('change current page', () => {

	const endState = UsersReducer(startState, setCurrentPage(5));

	expect(startState.currentPage).toBe(1);
	expect(endState.currentPage).toBe(5);
});

test('set new total amount of users', () => {

	const endState = UsersReducer(startState, setTotalUsersCount(70));

	expect(startState.totalUsersCount).toBe(50);
	expect(endState.totalUsersCount).toBe(70);
});