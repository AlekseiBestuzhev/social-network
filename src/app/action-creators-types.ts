import {addMessageAC, setCurrentDialog, updateMessageTextAC} from "@/features/messages/messages-reducer.ts";
import {ServiceActionsType} from "@/features/service/service-reducer.ts";
import {AuthActionsType} from "@/features/auth/auth-reducer.ts";
import {
   addPostAC,
   setFollowingInProgressOnProfile,
   unfollowOnProfile,
   updatePostTexAC,
   followOnProfile,
   setUserProfile,
   removeLike,
   setStatus,
   setLike
} from "@/features/profile/profile-reducer.ts";
import {
   setFollowingInProgress,
   setTotalUsersCount,
   setCurrentPage,
   setFetching,
   setUsers,
   unfollow,
   follow
} from "@/features/users/users-reducer.ts";

export type ActionsTypes =
   | ReturnType<typeof setFollowingInProgressOnProfile>
   | ReturnType<typeof setFollowingInProgress>
   | ReturnType<typeof updateMessageTextAC>
   | ReturnType<typeof setTotalUsersCount>
   | ReturnType<typeof unfollowOnProfile>
   | ReturnType<typeof setCurrentDialog>
   | ReturnType<typeof followOnProfile>
   | ReturnType<typeof updatePostTexAC>
   | ReturnType<typeof setCurrentPage>
   | ReturnType<typeof setUserProfile>
   | ReturnType<typeof addMessageAC>
   | ReturnType<typeof setFetching>
   | ReturnType<typeof removeLike>
   | ReturnType<typeof addPostAC>
   | ReturnType<typeof setStatus>
   | ReturnType<typeof setUsers>
   | ReturnType<typeof unfollow>
   | ReturnType<typeof setLike>
   | ReturnType<typeof follow>
   | ServiceActionsType
   | AuthActionsType
