import { ThemeVariantType } from '@/features/theme/theme-reducer.ts';

export const getSystemTheme = (): ThemeVariantType => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
