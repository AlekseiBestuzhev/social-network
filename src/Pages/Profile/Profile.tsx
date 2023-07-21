import {PostsBlock} from "@/features/profile/components/PostsBlock/PostsBlock.tsx";
import {Controls} from "@/features/profile/components/Controls/Controls.tsx";
import {useProfileData} from "@/features/profile/hooks/useProfileData.ts";
import {Person} from "@/features/profile/components/Person/Person.tsx";
import {setProfileTC} from "@/features/profile/profile-thunks.ts";
import {withAuthRedirect} from "@/app/hoc/withAuthRedirect.tsx";
import {useAppDispatch} from "@/app/hooks.ts";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

export const Profile = withAuthRedirect(() => {

   const dispatch = useAppDispatch();
   const {userID} = useParams();

   const {currentUser, status, profile, followed, followingInProgress} = useProfileData(userID);

   useEffect(() => {
      dispatch(setProfileTC(currentUser));
   }, [currentUser])

   if (!profile) return null;

   return (
      <>
         <Person profile={profile} isMe={!userID} status={status}>
            <Controls
               isMe={!userID}
               userID={profile.userId}
               followed={followed}
               followingInProgress={followingInProgress}
            />
         </Person>
         <PostsBlock userName={profile.fullName} isMe={!userID}/>
      </>
   )
})