import {ThemeVariantType} from "@/features/theme/theme-reducer.ts";

export const loadThemeFromLS = () => {
   try {
      const lastAppliedTheme = localStorage.getItem('lastAppliedTheme');
      if (!lastAppliedTheme) {
         return undefined;
      }
      return lastAppliedTheme;
   } catch (err) {
      return undefined;
   }
};

export const saveThemeToLS = (theme: ThemeVariantType) => {
   try {
      localStorage.setItem('lastAppliedTheme', theme);
   } catch (err) {
      console.log(err)
   }
};