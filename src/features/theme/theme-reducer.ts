// _____ types

import {loadThemeFromLS} from "@/common/utils/locatStorageUtils.ts";
import {getSystemTheme} from "@/common/utils/getSystemTheme.ts";

export type ThemeVariantType = 'light' | 'dark';

export type ThemeType = {
   current: ThemeVariantType,
   dependsOnSystem: boolean
};

export type ThemeActionType =
   | ReturnType<typeof switchDependencyOnSystem>
   | ReturnType<typeof switchTheme>

// _____ reducer

const initialState: ThemeType = {
   current: loadThemeFromLS() || getSystemTheme(),
   dependsOnSystem: !loadThemeFromLS()
} // theme exist in LS only when user choose a certain theme

export const ThemeReducer = (state: ThemeType = initialState, action: ThemeActionType): ThemeType => {
   switch (action.type) {
      case 'SWITCH-THEME':
         return {...state, current: action.payload.newTheme};
      case 'SWITCH-DEPENDENCY-ON-SYSTEM':
         return {...state, dependsOnSystem: action.payload.depends}
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

export const switchDependencyOnSystem = (depends: boolean) => ({
   type: 'SWITCH-DEPENDENCY-ON-SYSTEM',
   payload: {
      depends
   }
} as const);