import { describe, expect, test } from 'vitest';
import {
	setUserAuthPhoto,
	setUserAuthData,
	AuthReducer,
	setUserAuthName,
	setPhotos,
	userLoggedOut
} from "./auth-reducer.ts";

const initialState = {
	id: null,
	login: null,
	email: null,
	isAuth: false,
	photos: {
		small: null,
		large: null
	},
	fullName: null
};

describe('AuthReducer', () => {

	test('SET-USER-AUTH-DATA action should set user authentication data', () => {
		const action = setUserAuthData(1, 'test@mail.com', 'testlogin');
		const newState = AuthReducer(initialState, action);

		expect(newState.id).toBe(1);
		expect(newState.email).toBe('test@mail.com');
		expect(newState.login).toBe('testlogin');
		expect(newState.isAuth).toBe(true);
	});

	test('SET-USER-AUTH-PHOTO action should set user authentication photo', () => {
		const action = setUserAuthPhoto('testphoto');
		const newState = AuthReducer(initialState, action);

		expect(newState.photos.large).toBe('testphoto');
	});

	test('SET-USER-AUTH-NAME action should set user authentication name', () => {
		const action = setUserAuthName('testname');
		const newState = AuthReducer(initialState, action);

		expect(newState.fullName).toBe('testname');
	});

	test('SET-USER-AUTH-DATA action should handle null values for id, login, email, small, and large photo', () => {
		const action = setUserAuthData(1, 'test@mail.com', 'testlogin');
		const newState = AuthReducer(initialState, action);

		expect(newState.id).toBe(1);
		expect(newState.login).toBe('testlogin');
		expect(newState.email).toBe('test@mail.com');
		expect(newState.photos.small).toBeNull();
		expect(newState.photos.large).toBeNull();
	});

	test('SET-USER-AUTH-DATA action should handle empty string values for login, email, name, small, and large photo', () => {
		const action = setUserAuthData(0, '', '');
		const newState = AuthReducer(initialState, action);

		expect(newState.login).toBe('');
		expect(newState.email).toBe('');
		expect(newState.fullName).toBeNull();
		expect(newState.photos.small).toBeNull();
		expect(newState.photos.large).toBeNull();
	});

	test('SET-USER-AUTH-DATA action should handle boolean values for id, login, email, name, small, and large photo', () => {
		const action = setUserAuthData(1, 'test@mail.com', 'testlogin');
		const newState = AuthReducer(initialState, action);

		expect(newState.id).toBe(1);
		expect(newState.login).toBe('testlogin');
		expect(newState.email).toBe('test@mail.com');
		expect(newState.fullName).toBeNull();
		expect(newState.photos.small).toBeNull();
		expect(newState.photos.large).toBeNull();
	});

	test('SET-PHOTOS action should set photos', () => {
		const action = setPhotos({ small: 'smallphoto', large: 'largephoto' });
		const newState = AuthReducer(initialState, action);

		expect(newState.photos.small).toBe('smallphoto');
		expect(newState.photos.large).toBe('largephoto');
	});

	test('USER-LOGGED-OUT action should reset state to initial state', () => {
		const action = userLoggedOut();
		const newState = AuthReducer(initialState, action);

		expect(newState).toEqual(initialState);
	});

});
