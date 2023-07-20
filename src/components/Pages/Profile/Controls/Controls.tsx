import cls from '@/components/Pages/Profile/Controls/Controls.module.scss'
import { ProfilePropsType } from '@/components/Pages/Profile/Profile';
import { Button } from '@/components/common/Button/Button';
import { RiUserUnfollowLine } from "react-icons/ri";
import { RiUserAddLine } from "react-icons/ri";
import { RiChat3Line } from "react-icons/ri";
import { FC, memo } from 'react';

type ControlsPropsType = Omit<ProfilePropsType, 'profile' | 'status'> & {
	userID: number
}

export const Controls: FC<ControlsPropsType> = memo(({
	switchFollowingOnProfileThunkCreator,
	followingInProgress,
	followed,
	toProfileSettings,
	userID,
	isMe }) => {

	const followHandler = (id: number, followed: boolean) => async () => {
		switchFollowingOnProfileThunkCreator(id, followed)
	}

	const followTextHandler = followed ? 'Unfollow' : 'Follow';
	const followIconHandler = followed ? <RiUserUnfollowLine size={'1rem'} /> : <RiUserAddLine size={'1rem'} />;
	const buttonStyles = !followed ? 'Green' : 'Default';

	return (
		<div className={cls.wrapper}>
			{
				isMe
					? <Button
						onClick={toProfileSettings}
						mainColor='White'
						size='large'
					>Edit profile</Button>
					: <>
						<Button
							onClick={() => alert('Chat will work later')}
							mainColor='White'
							size='large'
						>Message <RiChat3Line size={'1rem'} /></Button>
						<Button
							isDisabled={followingInProgress}
							mainColor={buttonStyles}
							onClick={followHandler(userID, followed)}
							size='large'
						>{followTextHandler}{followIconHandler}</Button>
					</>
			}
		</div>
	);
})