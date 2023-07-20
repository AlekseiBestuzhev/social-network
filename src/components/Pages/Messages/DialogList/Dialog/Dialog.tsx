import cls from '@/components/Pages/Messages/DialogList/Dialog/Dialog.module.scss';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { NavLink } from 'react-router-dom';
import React, { FC } from 'react';

export type DialogType = {
	id: string,
	name: string,
	avatar: string | null
}

type DialogPropsType = DialogType & {
	lastMessage: string,
	lastDate: string
}

export const Dialog: FC<DialogPropsType> = ({ id, name, avatar, lastMessage, lastDate }) => {

	// const lastMessageHandled = (() => {
	// 	if (lastMessage.length > 15) {
	// 		return `${lastMessage.slice(0, 18)}...`;
	// 	}
	// 	else return lastMessage;
	// })();

	return (
		<li className={cls.dialog}>
			<NavLink
				to={`/messages/${id}`}
				activeClassName={cls.activeLink}
				className={cls.link}
			>
				<Avatar photo={avatar} size='3.5rem' />
				<div className={cls.textBlock}>
					<div className={cls.topLine}>
						<p className={cls.name}>{name}</p>
						<p className={cls.date}>{lastDate.slice(0, -5)}</p>
					</div>
					<p className={cls.lastMessage}>{lastMessage}</p>
				</div>
			</NavLink>
		</li>
	)
}