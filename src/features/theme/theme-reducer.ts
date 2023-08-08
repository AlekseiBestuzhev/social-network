// _____ types

import {loadThemeFromLS} from "@/common/utils/locatStorageUtils.ts";

export type ThemeVariantType = 'light' | 'dark';

export type ThemeType = {
   current: ThemeVariantType
};

export type ThemeActionType = ReturnType<typeof switchTheme>;

// _____ reducer

const initialState: ThemeType = {
   current: loadThemeFromLS() as ThemeVariantType || 'light'
}

export const ThemeReducer = (state: ThemeType = initialState, action: ThemeActionType): ThemeType => {
   switch (action.type) {
      case 'SWITCH-THEME':
         return {...state, current: action.payload.newTheme};
      default:
         return state;
   }
}

// _____ actions

export const switchTheme = (newTheme: ThemeVariantType) => ({
   type: 'SWITCH-THEME',
   payload: {
      newTheme
   }
} as const);