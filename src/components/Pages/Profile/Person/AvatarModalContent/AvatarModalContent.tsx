import cls from '@/components/Pages/Profile/Person/AvatarModalContent/AvatarModalContent.module.scss';
import { RiHeart3Line } from 'react-icons/ri';
import { RiHeart3Fill } from 'react-icons/ri';
import { RiLock2Line } from 'react-icons/ri';
import { FC, useState } from "react";

type PropsType = {
	photo: string,
	name: string
}

export const AvatarModalContent: FC<PropsType> = ({ photo, name }) => {

	const [like, setLike] = useState(false);

	return (
		<div className={cls.avatarModal}>
			<img src={photo} alt='Avatar' />
			<aside className={cls.content}>
				<h4 className={cls.name}><span>{name}</span>'s avatar</h4>
				<p className={cls.date}><span>09:22</span> 04 Jan 2023</p>
				<div className={cls.likes}>
					<span>Likes:</span> {like ? 1 : 0}
					{
						like
							? <RiHeart3Fill onClick={() => setLike(false)} />
							: <RiHeart3Line onClick={() => setLike(true)} />
					}
				</div>
				<div className={cls.lock}>
					<RiLock2Line />
					<p>User locked comments...</p>
				</div>
			</aside>
		</div>
	);
}