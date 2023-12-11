import { CSSProperties, memo, FC } from 'react';

import defaultAvatarDark from '@/assets/images/avatar/default-avatar-dark.svg';
import defaultAvatar from '@/assets/images/avatar/default-avatar.svg';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { themeSelector } from '@/features/theme/selectors/themeSelector';

type PropsType = {
  photo: string | null;
  onClick?: () => void;
  border?: boolean;
  size?: string;
  turnOffCursorPointer?: boolean;
};

export const Avatar: FC<PropsType> = memo(({ photo, onClick, border, size, turnOffCursorPointer }) => {
  const currentTheme = useAppSelector(themeSelector);

  const photoHandler = photo || (currentTheme === 'light' ? defaultAvatar : defaultAvatarDark);

  const styleHandler: CSSProperties = {
    width: size || '5rem',
    height: size || '5rem',
    borderRadius: '100%',
    objectFit: 'cover',
    border: border ? '0.3rem solid var(--colors-bg-extra)' : 'none',
    cursor: turnOffCursorPointer ? 'auto' : 'pointer',
  };

  const onClickHandler = () => {
    if (photo && onClick) {
      onClick();
    }
  };

  return <img src={photoHandler} style={styleHandler} onClick={onClickHandler} alt="Default avatar" />;
});
