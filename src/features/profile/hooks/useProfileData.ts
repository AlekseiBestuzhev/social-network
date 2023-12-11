import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { authUserIDSelector } from '@/features/auth/selectors/authUserIDSelector';
import { followedSelector } from '@/features/profile/selectors/followedSelector';
import { followingInProgressSelector } from '@/features/profile/selectors/followingInProgressSelector';
import { profileSelector } from '@/features/profile/selectors/profileSelector';
import { statusSelector } from '@/features/profile/selectors/statusSelector';
import { appStatusSelector } from '@/features/service/selectors/appStatusSelector';

export const useProfileData = (userID: string | undefined) => {
  const authUser = useAppSelector(authUserIDSelector);
  const currentUser = Number(userID || authUser);
  const status = useAppSelector(statusSelector);
  const profile = useAppSelector(profileSelector);
  const followed = useAppSelector(followedSelector);
  const followingInProgress = useAppSelector(followingInProgressSelector);
  const appStatus = useAppSelector(appStatusSelector);
  const loading = appStatus === 'loading';

  return {
    currentUser,
    status,
    profile,
    followed,
    followingInProgress,
    loading,
  };
};
