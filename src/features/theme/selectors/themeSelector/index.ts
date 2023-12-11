import { AppRootStateType } from '@/app/store.ts';
import { ThemeVariantType } from '@/features/theme/theme-reducer.ts';

export const themeSelector = (state: AppRootStateType): ThemeVariantType => state.theme.current;
