import cls from '@/components/Pages/Profile/PostsBlock/Posts/Post/Post.module.scss';
import { removeLike, setLike } from '@/redux/profile/profile-reducer';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { RiHeart3Line } from 'react-icons/ri';
import { RiHeart3Fill } from 'react-icons/ri';
import { connect } from 'react-redux';
import { FC } from 'react';

export type PostType = {
	id: string,
	text: string,
	likes: number,
	myLike: boolean,
	time: string,
	date: string,
	userID: string,
	name: string,
	photo: string | null
}

const Post: FC<PostType & MDTPtype> = ({
	id,
	text,
	likes,
	myLike,
	time,
	date,
	userID,
	name,
	photo,
	setLike,
	removeLike }) => {

	const likeHandler = () => {
		if (myLike) removeLike(id);
		else setLike(id);
	}

	return (
		<div className={cls.post}>
			<Avatar size='5rem' photo={photo} />
			<div className={cls.sender}>
				<div className={cls.info}>
					<p className={cls.name}>{name}</p>
					<p className={cls.date}>
						<span>{time}</span>
						<span>{date}</span>
					</p>
				</div>
				<p className={cls.text}>{text}</p>
				<div className={cls.likes}>
					<span className={cls.likesCount}>{likes}</span>
					{
						myLike
							? <RiHeart3Fill onClick={likeHandler} />
							: <RiHeart3Line onClick={likeHandler} />
					}
				</div>
			</div>
		</div>
	);
}

type MDTPtype = {
	setLike: (postID: string) => void,
	removeLike: (postID: string) => void
}

export const PostContainer = connect(null, { setLike, removeLike } as MDTPtype)(Post);