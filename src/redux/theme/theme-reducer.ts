export type ThemeVariantType = 'light' | 'dark';

export type ThemeType = {
	current: ThemeVariantType
};

type ThemeActionType = ReturnType<typeof switchTheme>;

const initialState: ThemeType = {
	current: 'light'
}

export const ThemeReducer = (state: ThemeType = initialState, action: ThemeActionType): ThemeType => {
	switch (action.type) {
		case 'SWITCH-THEME':
			return { ...state, current: action.payload.newTheme };
		default:
			return state;
	}
}

export const switchTheme = (newTheme: ThemeVariantType) => {
	return {
		type: 'SWITCH-THEME',
		payload: {
			newTheme
		}
	} as const;
}