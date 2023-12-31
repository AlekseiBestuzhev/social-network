import { useEffect, useRef } from 'react';

import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { getSystemTheme } from '@/common/utils/getSystemTheme.ts';
import { dependsOnSystemSelector } from '@/features/theme/selectors/dependsOnSystemSelector';
import { themeSelector } from '@/features/theme/selectors/themeSelector';
import { switchTheme } from '@/features/theme/theme-reducer.ts';

export const useTheme = () => {
  const systemMode = useAppSelector(dependsOnSystemSelector);
  const stateTheme = useAppSelector(themeSelector);
  const dispatch = useAppDispatch();

  const matcherRef = useRef<MediaQueryList | null>(null);
  // I use refs to void creation a lot of listener during active systemMode and changing systemTheme

  const handleSystemThemeChange = () => {
    if (systemMode) {
      dispatch(switchTheme(getSystemTheme()));
    }
  };

  const listenerRemover = () => {
    if (matcherRef.current) {
      matcherRef.current.removeEventListener('change', handleSystemThemeChange);
      matcherRef.current = null;
    }
  };

  useEffect(() => {
    if (systemMode) {
      if (!matcherRef.current) {
        matcherRef.current = window.matchMedia('(prefers-color-scheme: dark)');
        matcherRef.current.addEventListener('change', handleSystemThemeChange);
      }
      handleSystemThemeChange();
    } else {
      listenerRemover();
    }

    return () => {
      listenerRemover();
    };
  }, [systemMode]);

  return stateTheme;
};
