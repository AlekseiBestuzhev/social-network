import { PostsBlock } from "@/components/Pages/Profile/PostsBlock/PostsBlock";
import { Controls } from "@/components/Pages/Profile/Controls/Controls";
import { Person } from "@/components/Pages/Profile/Person/Person";
import { UserProfileType } from '@/features/profile/profile-reducer.ts';
import { FC, memo } from 'react';

export type ProfilePropsType = {
	profile: UserProfileType,
	isMe: boolean,
	switchFollowingOnProfileThunkCreator: (id: number, followed: boolean) => void,
	toProfileSettings: () => void,
	followingInProgress: boolean,
	followed: boolean,
	status: string
}

export const Profile: FC<ProfilePropsType> = memo(({
	switchFollowingOnProfileThunkCreator,
	followingInProgress,
	toProfileSettings,
	followed,
	profile,
	status,
	isMe }) => {

	return (
		<>
			<Person profile={profile} isMe={isMe} status={status}>
				<Controls
					isMe={isMe}
					userID={profile.userId}
					toProfileSettings={toProfileSettings}
					followed={followed}
					followingInProgress={followingInProgress}
					switchFollowingOnProfileThunkCreator={switchFollowingOnProfileThunkCreator}
				/>
			</Person>
			<PostsBlock userName={profile.fullName} isMe={isMe} />
		</>
	)
})