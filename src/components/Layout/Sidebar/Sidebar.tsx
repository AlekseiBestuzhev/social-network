import cls from '@/components/Layout/Sidebar/Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { RiNewspaperLine } from 'react-icons/ri';
import { RiSettings3Line } from 'react-icons/ri';
import { RiMusic2Line } from 'react-icons/ri';
import { RiUser3Line } from 'react-icons/ri';
import { RiTeamLine } from 'react-icons/ri';
//import classNames from 'classnames';

export const Sidebar = () => {

	//const userID = useParams();

	// const isActive = classNames('', {
	// 	[cls.activeLink]: !userID,
	// });

	return (
		<aside className={cls.sidebar}>
			<nav>
				<ul>
					<li>
						<NavLink

							className={cls.link}
							to={'/profile'}
						>
							<RiUser3Line size={'1.125rem'} /> Profile
						</NavLink>
					</li>
					<li>
						<NavLink

							className={cls.link}
							to={'/messages'}
						>
							<RiQuestionAnswerLine size={'1.125rem'} />Messages
						</NavLink>
					</li>
					<li>
						<NavLink

							className={cls.link}
							to={'/users'}
						>
							<RiTeamLine size={'1.125rem'} />Users
						</NavLink>
					</li>
					<li>
						<NavLink

							className={cls.link}
							to={'/news'}
						>
							<RiNewspaperLine size={'1.125rem'} />News
						</NavLink>
					</li>
					<li>
						<NavLink

							className={cls.link}
							to={'/music'}
						>
							<RiMusic2Line size={'1.125rem'} />Music
						</NavLink>
					</li>
					<li>
						<NavLink

							className={cls.link}
							to={'/settings'}
						>
							<RiSettings3Line size={'1.125rem'} />Settings
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	)
}