import { memo, useEffect, useRef } from 'react';

import picture from '@/assets/animate-images/dialog.gif';
import pictureWebp from '@/assets/animate-images/dialog.webp';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { SectionInfo } from '@/components/SectionInfo/SectionInfo';
import cls from '@/features/messages/components/CurrentDialog/DialogWindow/DialogWindow.module.scss';
import { Message } from '@/features/messages/components/CurrentDialog/DialogWindow/Message/Message.tsx';
import { messagesDataSelector } from '@/features/messages/selectors/messagesDataSelector';
import { CurrentDialogProps } from '@/features/messages/components/CurrentDialog/CurrentDialog.tsx';
import classNames from 'classnames';

export type DialogWindowProps = {
  authUserId: string;
} & Omit<CurrentDialogProps, 'socket'>;

export const DialogWindow = memo(({ authUserId, userID }: DialogWindowProps) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const messagesData = useAppSelector(messagesDataSelector)[userID];

  const isChat = userID === 'dev_chat';

  const classes = classNames(cls.dialogMessages, isChat && cls.chat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesData]);

  return (
    <div className={classes}>
      {messagesData.length ? (
        messagesData.map(({ id, ...rest }) => {
          const iSender = rest.userId === 'authUser' || rest.userId === authUserId;
          return <Message key={id} id={id} {...rest} iSender={iSender} chat={isChat} />;
        })
      ) : (
        <SectionInfo
          text="Write a message to start chatting..."
          picture={picture}
          pictureWebp={pictureWebp}
        />
      )}
      <div ref={messagesEndRef} className={cls.scrollAnchor} />
    </div>
  );
});
