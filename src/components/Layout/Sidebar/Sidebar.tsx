import classNames from 'classnames';
import {
  RiQuestionAnswerLine,
  RiNewspaperLine,
  RiSettings3Line,
  RiMusic2Line,
  RiUser3Line,
  RiTeamLine,
} from 'react-icons/ri';
import { NavLink, useMatch } from 'react-router-dom';

import { routes } from '@/common/const';
import cls from '@/components/Layout/Sidebar/Sidebar.module.scss';
import { LinkProps } from '@/features/messages/components/DialogList/Dialog/Dialog.tsx';

export const Sidebar = () => {
  const match = useMatch(`${routes.profile}/:userID`);

  const linkStyles = ({ isActive }: LinkProps) => classNames(cls.link, { [cls.activeLink]: isActive });

  const linkProfileStyles = ({ isActive }: LinkProps) =>
    classNames(cls.link, { [cls.activeLink]: isActive && !match?.params.userID });

  return (
    <aside className={cls.sidebar}>
      <nav>
        <ul>
          <li>
            <NavLink className={linkProfileStyles} to={routes.profile}>
              <RiUser3Line size="1.125rem" /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink className={linkStyles} to={routes.messages}>
              <RiQuestionAnswerLine size="1.125rem" />
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink className={linkStyles} to={routes.users}>
              <RiTeamLine size="1.125rem" />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink className={linkStyles} to={routes.news}>
              <RiNewspaperLine size="1.125rem" />
              News
            </NavLink>
          </li>
          <li>
            <NavLink className={linkStyles} to={routes.music}>
              <RiMusic2Line size="1.125rem" />
              Music
            </NavLink>
          </li>
          <li>
            <NavLink className={linkStyles} to={routes.settings}>
              <RiSettings3Line size="1.125rem" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
