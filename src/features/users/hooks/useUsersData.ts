import {followingInProgressUserListSelector} from "@/features/users/selectors/followingInProgressUserListSelector";
import {totalUsersCountSelector} from "@/features/users/selectors/totalUsersCountSelector";
import {currentPageSelector} from "@/features/users/selectors/currentPageSelector";
import {pageSizeSelector} from "@/features/users/selectors/pageSizeSelector";
import {usersSelector} from "@/features/users/selectors/usersSelector";
import {useAppSelector} from "@/app/hooks.ts";

export const useUsersData = () => {

   const followList = useAppSelector(followingInProgressUserListSelector);
   const totalUsersCount = useAppSelector(totalUsersCountSelector);
   const currentPage = useAppSelector(currentPageSelector);
   const pageSize = useAppSelector(pageSizeSelector);
   const users = useAppSelector(usersSelector);

   return {followList, totalUsersCount, currentPage, pageSize, users};
}