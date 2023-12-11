import { FC, memo } from 'react';

import classNames from 'classnames';

import cls from '@/features/messages/components/CurrentDialog/DialogWindow/Message/Message.module.scss';
import { MessageType } from '@/features/messages/messages-reducer';

type MessagePropsType = MessageType & {
  iSender: boolean;
};

export const Message: FC<MessagePropsType> = memo(({ text, iSender, time }) => {
  const classes = classNames(cls.wrapper, { [cls.iSender]: iSender });

  return (
    <div className={classes}>
      <div className={cls.message}>{text}</div>
      <p className={cls.time}>{time}</p>
    </div>
  );
});
