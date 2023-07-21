import { switchTheme, ThemeReducer, ThemeType, ThemeVariantType } from '@/features/theme/theme-reducer.ts';

test('should switch the theme correctly', () => {
	const initialState: ThemeType = {
		current: 'light'
	};
	const newTheme: ThemeVariantType = 'dark';
	const action = switchTheme(newTheme);
	const newState = ThemeReducer(initialState, action);

	expect(newState.current).toEqual(newTheme);
});

test('should return the initial state for unknown action types', () => {
	const initialState: ThemeType = {
		current: 'light'
	};
	const unknownAction = { type: 'UNKNOWN_ACTION' };
	//@ts-ignore next line
	const newState = ThemeReducer(initialState, unknownAction);

	expect(newState).toEqual(initialState);
});
