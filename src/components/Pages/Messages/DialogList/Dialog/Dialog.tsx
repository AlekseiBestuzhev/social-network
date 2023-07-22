import cls from '@/components/Pages/Messages/DialogList/Dialog/Dialog.module.scss';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';
import {DialogType} from "@/features/messages/messages-reducer.ts";
import classNames from "classnames";

type DialogPropsType = DialogType & Record<'lastMessage' | 'lastDate', string>;

export type LinkProps = {
	isActive: boolean;
	isPending: boolean;
}

export const Dialog: FC<DialogPropsType> = ({ id, name, avatar, lastMessage, lastDate }) => {

	const linkStyles = ({isActive}: LinkProps) => classNames(cls.link, {
		[cls.activeLink]: isActive
	});

	return (
		<li className={cls.dialog}>
			<NavLink
				to={`/messages/${id}`}
				className={linkStyles}
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