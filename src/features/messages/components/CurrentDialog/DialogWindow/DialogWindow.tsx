import { FC, memo, useEffect, useRef } from 'react';

import picture from '@/assets/animate-images/dialog.gif';
import pictureWebp from '@/assets/animate-images/dialog.webp';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { SectionInfo } from '@/components/SectionInfo/SectionInfo';
import cls from '@/features/messages/components/CurrentDialog/DialogWindow/DialogWindow.module.scss';
import { Message } from '@/features/messages/components/CurrentDialog/DialogWindow/Message/Message.tsx';
import { messagesDataSelector } from '@/features/messages/selectors/messagesDataSelector';

type DialogWindowPropsType = {
  userID: string;
};

export const DialogWindow: FC<DialogWindowPropsType> = memo(({ userID }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const messagesData = useAppSelector(messagesDataSelector)[userID];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesData]);

  const dialogMessagesList = messagesData.length ? (
    messagesData.map(el => (
      <Message
        key={el.id}
        id={el.id}
        text={el.text}
        userID={el.userID}
        userName={el.userName}
        avatar={el.avatar}
        time={el.time}
        date={el.date}
        iSender={userID !== el.userID}
      />
    ))
  ) : (
    <SectionInfo text="Write a message to start chatting..." picture={picture} pictureWebp={pictureWebp} />
  );

  return (
    <div className={cls.dialogMessages}>
      {dialogMessagesList}
      <div ref={messagesEndRef} />
    </div>
  );
});
