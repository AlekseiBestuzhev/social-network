import cls from '@/components/Pages/Users/User/User.module.scss';
import { Button } from '@/components/common/Button/Button';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { UserType } from '@/features/users/users-reducer';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';

type UserItemListType = UserType & {
	setFollowingThunkCreator: (id: number, followed: boolean) => void,
	followingInProgress: number[]
}

export const User: FC<UserItemListType> = (
	{
		id,
		photos,
		name,
		uniqueUrlName,
		followed,
		status,
		followingInProgress,
		setFollowingThunkCreator
	}
) => {

	const followHandler = (id: number, followed: boolean) => async () => {
		setFollowingThunkCreator(id, followed)
	}

	const followBtnText = followed ? 'unfollow' : 'follow';
	const buttonStyles = followBtnText === 'follow' ? 'Green' : 'Default';

	return (
		<li className={cls.body}>
			<div className={cls.imgBtn}>
				<NavLink to={`/profile/${id}`}>
					<Avatar photo={photos.large} />
				</NavLink>
				<Button
					isDisabled={followingInProgress.some(elemID => elemID === id)}
					mainColor={buttonStyles}
					size='small'
					onClick={followHandler(id, followed)}
				>
					{followBtnText}
				</Button>
			</div>
			<div className={cls.info}>
				<div className={cls.nameStatus}>
					<NavLink to={`/profile/${id}`}>
						<h3 className={cls.name} >{name}</h3>
					</NavLink>
					{status && <p className={cls.status}>"{status}"</p>}
				</div >
				<div className={cls.location}>
					<p className={cls.city}>City</p>
					<p className={cls.country}>Country</p>
				</div>
			</div>
		</li>
	);
}