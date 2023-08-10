import {ThemeVariantType} from "@/features/theme/theme-reducer.ts";
import {AppRootStateType} from "@/app/store.ts";

export const themeSelector = (state: AppRootStateType): ThemeVariantType => state.theme.current;