import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { currentPageSelector } from '@/features/users/selectors/currentPageSelector';
import { followingInProgressUserListSelector } from '@/features/users/selectors/followingInProgressUserListSelector';
import { pageSizeSelector } from '@/features/users/selectors/pageSizeSelector';
import { totalUsersCountSelector } from '@/features/users/selectors/totalUsersCountSelector';
import { usersSelector } from '@/features/users/selectors/usersSelector';

export const useUsersData = () => {
  const followList = useAppSelector(followingInProgressUserListSelector);
  const totalUsersCount = useAppSelector(totalUsersCountSelector);
  const currentPage = useAppSelector(currentPageSelector);
  const pageSize = useAppSelector(pageSizeSelector);
  const users = useAppSelector(usersSelector);

  return {
    followList,
    totalUsersCount,
    currentPage,
    pageSize,
    users,
  };
};
