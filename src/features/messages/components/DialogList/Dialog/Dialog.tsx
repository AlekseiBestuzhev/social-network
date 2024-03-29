import { FC, memo } from 'react';

import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { routes } from '@/common/const';
import { Avatar } from '@/components/Avatar/Avatar';
import cls from '@/features/messages/components/DialogList/Dialog/Dialog.module.scss';
import { DialogType } from '@/features/messages/messages-reducer.ts';

type DialogPropsType = DialogType & Record<'lastMessage' | 'lastDate', string>;

export type LinkProps = {
  isActive: boolean;
  isPending: boolean;
};

export const Dialog: FC<DialogPropsType> = memo(({ id, name, photo, lastMessage, lastDate }) => {
  const linkStyles = ({ isActive }: LinkProps) => classNames(cls.link, { [cls.activeLink]: isActive });

  return (
    <li className={cls.dialog}>
      <NavLink to={`${routes.messages}/${id}`} className={linkStyles}>
        <Avatar photo={photo} size="3.5rem" />
        <div className={cls.textBlock}>
          <div className={cls.topLine}>
            <p className={cls.name}>{name}</p>
            <p className={cls.date}>{lastDate.slice(0, -5)}</p>
          </div>
          <p className={cls.lastMessage}>{lastMessage}</p>
        </div>
      </NavLink>
    </li>
  );
});
