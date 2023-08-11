import cls from '@/components/Layout/Sidebar/Sidebar.module.scss';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { RiNewspaperLine } from 'react-icons/ri';
import { RiSettings3Line } from 'react-icons/ri';
import { RiMusic2Line } from 'react-icons/ri';
import { RiUser3Line } from 'react-icons/ri';
import { RiTeamLine } from 'react-icons/ri';
import {NavLink, useMatch} from 'react-router-dom';
import classNames from "classnames";
import {LinkProps} from "@/features/messages/components/DialogList/Dialog/Dialog.tsx";

export const Sidebar = () => {

	const match = useMatch('/profile/:userID');

	const linkStyles = ({isActive}: LinkProps) => classNames(cls.link, {
		[cls.activeLink]: isActive
	});

	const linkProfileStyles = ({isActive}: LinkProps) => classNames(cls.link, {
		[cls.activeLink]: isActive && !match?.params.userID
	});

	return (
		<aside className={cls.sidebar}>
			<nav>
				<ul>
					<li>
						<NavLink
							className={linkProfileStyles}
							to={'/profile'}>
							<RiUser3Line size={'1.125rem'} /> Profile
						</NavLink>
					</li>
					<li>
						<NavLink
							className={linkStyles}
							to={'/messages'}>
							<RiQuestionAnswerLine size={'1.125rem'} />Messages
						</NavLink>
					</li>
					<li>
						<NavLink
							className={linkStyles}
							to={'/users'}>
							<RiTeamLine size={'1.125rem'} />Users
						</NavLink>
					</li>
					<li>
						<NavLink
							className={linkStyles}
							to={'/news'}>
							<RiNewspaperLine size={'1.125rem'} />News
						</NavLink>
					</li>
					<li>
						<NavLink
							className={linkStyles}
							to={'/music'}>
							<RiMusic2Line size={'1.125rem'} />Music
						</NavLink>
					</li>
					<li>
						<NavLink
							className={linkStyles}
							to={'/settings'}>
							<RiSettings3Line size={'1.125rem'} />Settings
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	)
}