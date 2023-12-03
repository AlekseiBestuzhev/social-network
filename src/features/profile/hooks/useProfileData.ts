import {followingInProgressSelector} from "@/features/profile/selectors/followingInProgressSelector";
import {authUserIDSelector} from "@/features/auth/selectors/authUserIDSelector";
import {followedSelector} from "@/features/profile/selectors/followedSelector";
import {profileSelector} from "@/features/profile/selectors/profileSelector";
import {statusSelector} from "@/features/profile/selectors/statusSelector";
import {useAppSelector} from "@/common/hooks/useAppDispatch.ts";

export const useProfileData = (userID: string | undefined) => {

   const authUser = useAppSelector(authUserIDSelector);
   const currentUser = Number(userID || authUser);
   const status = useAppSelector(statusSelector);
   const profile = useAppSelector(profileSelector);
   const followed = useAppSelector(followedSelector);
   const followingInProgress = useAppSelector(followingInProgressSelector);

   return {currentUser, status, profile, followed, followingInProgress};
}