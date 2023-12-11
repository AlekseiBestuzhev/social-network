import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { authUserAvatarSelector } from '@/features/auth/selectors/authUserAvatarSelector';
import { authUserIDSelector } from '@/features/auth/selectors/authUserIDSelector';
import { authUserNameSelector } from '@/features/auth/selectors/authUserNameSelector';

export const useAuth = () => {
  const authUserAvatar = useAppSelector(authUserAvatarSelector);
  const authUserName = useAppSelector(authUserNameSelector);
  const authUserID = useAppSelector(authUserIDSelector);

  return {
    authUserID,
    authUserName,
    authUserAvatar,
  };
};
