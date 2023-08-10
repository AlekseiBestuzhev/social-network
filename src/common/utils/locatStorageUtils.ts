import {ThemeVariantType} from "@/features/theme/theme-reducer.ts";

export const loadThemeFromLS = (): ThemeVariantType | undefined => {
   try {
      const lastAppliedTheme = localStorage.getItem('theme');
      if (!lastAppliedTheme) {
         return undefined;
      }
      return lastAppliedTheme as ThemeVariantType;
   } catch (err) {
      return undefined;
   }
};

export const saveThemeToLS = (theme: ThemeVariantType) => {
   try {
      localStorage.setItem('theme', theme);
   } catch (err) {
      console.log(err)
   }
};