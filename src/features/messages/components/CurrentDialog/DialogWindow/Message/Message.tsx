import { memo } from 'react';

import classNames from 'classnames';

import { Avatar } from '@/components/Avatar/Avatar.tsx';
import cls from '@/features/messages/components/CurrentDialog/DialogWindow/Message/Message.module.scss';
import { MessageType } from '@/features/messages/messages-reducer';

type MessageProps = MessageType & {
  iSender: boolean;
  chat: boolean;
};

export const Message = memo(({ message, iSender, time, chat, photo, userName }: MessageProps) => {
  const classes = classNames(cls.wrapper, { [cls.iSender]: iSender });

  return (
    <div className={classes}>
      {chat && <Avatar photo={photo} size="3.2rem" />}
      {chat && <p className={cls.name}>{userName}</p>}
      <div className={cls.message}>{message}</div>
      <p className={cls.time}>{time}</p>
    </div>
  );
});
