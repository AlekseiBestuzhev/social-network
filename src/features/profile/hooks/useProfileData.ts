import {
   followingInProgressSelector
} from "@/features/profile/selectors/followingInProgressSelector/followingInProgressSelector.ts";
import {followedSelector} from "@/features/profile/selectors/followedSelector/followedSelector.ts";
import {profileSelector} from "@/features/profile/selectors/profileSelector/profileSelector.ts";
import {statusSelector} from "@/features/profile/selectors/statusSelector/statusSelector.ts";
import {authUserIDSelector} from "@/features/auth/selectors/authUserIDSelector";
import {useAppSelector} from "@/app/hooks.ts";

export const useProfileData = (userID: string | undefined) => {
   const authUser = useAppSelector(authUserIDSelector);
   const currentUser = Number(userID || authUser);
   const status = useAppSelector(statusSelector);
   const profile = useAppSelector(profileSelector);
   const followed = useAppSelector(followedSelector);
   const followingInProgress = useAppSelector(followingInProgressSelector);

   return {currentUser, status, profile, followed, followingInProgress};
}