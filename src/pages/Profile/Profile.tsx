import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { withAuthRedirect } from '@/common/hoc/withAuthRedirect.tsx';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { Loading } from '@/components/Loading/Loading.tsx';
import { Controls } from '@/features/profile/components/Controls/Controls.tsx';
import { Person } from '@/features/profile/components/Person/Person.tsx';
import { PostsBlock } from '@/features/profile/components/PostsBlock/PostsBlock.tsx';
import { useProfileData } from '@/features/profile/hooks/useProfileData.ts';
import { setProfileTC } from '@/features/profile/profile-thunks.ts';

export const Profile = withAuthRedirect(() => {
  const dispatch = useAppDispatch();

  const { userID } = useParams();

  const { currentUser, status, profile, followed, followingInProgress, loading } = useProfileData(userID);

  useEffect(() => {
    void dispatch(setProfileTC(currentUser));
  }, [currentUser]);

  if (!profile) return null;

  return loading ? (
    <Loading />
  ) : (
    <>
      <Person profile={profile} isMe={!userID} status={status}>
        <Controls
          isMe={!userID}
          userID={profile.userId}
          followed={followed}
          followingInProgress={followingInProgress}
        />
      </Person>
      <PostsBlock user={userID ? `${profile.fullName}'s ` : 'My '} />
    </>
  );
});
