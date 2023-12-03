import {authUserAvatarSelector} from "@/features/auth/selectors/authUserAvatarSelector";
import {authUserNameSelector} from "@/features/auth/selectors/authUserNameSelector";
import {authUserIDSelector} from "@/features/auth/selectors/authUserIDSelector";
import {useAppSelector} from "@/common/hooks/useAppDispatch.ts";

export const useAuth = () => {

   const authUserAvatar = useAppSelector(authUserAvatarSelector);
   const authUserName = useAppSelector(authUserNameSelector);
   const authUserID = useAppSelector(authUserIDSelector);

   return {authUserID, authUserName, authUserAvatar};
}