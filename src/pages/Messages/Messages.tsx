import { useParams } from 'react-router-dom';

import picture from '@/assets/animate-images/messages.gif';
import pictureWebp from '@/assets/animate-images/messages.webp';
import { withAuthRedirect } from '@/common/hoc/withAuthRedirect.tsx';
import { SectionInfo } from '@/components/SectionInfo/SectionInfo';
import { CurrentDialog } from '@/features/messages/components/CurrentDialog/CurrentDialog.tsx';
import { DialogList } from '@/features/messages/components/DialogList/DialogList.tsx';
import cls from '@/pages/Messages/Messages.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { setDevChatMessages } from '@/features/messages/messages-reducer.ts';

export const Messages = withAuthRedirect(() => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const dispatch = useAppDispatch();

  const { userID } = useParams();

  useEffect(() => {
    if (!socket) {
      const socket = new WebSocket(`wss://social-network.samuraijs.com/handlers/ChatHandler.ashx`);
      setSocket(socket);
    }

    return () => {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    };
  }, []);

  if (socket instanceof WebSocket) {
    socket.onmessage = (e: MessageEvent<string>) => {
      const messages = JSON.parse(e.data);
      dispatch(setDevChatMessages(messages));
    };
  }

  return (
    <div className={cls.page}>
      <div className={cls.leftColumn}>
        <h2 className={cls.title}>Dialogs</h2>
        <DialogList />
      </div>
      {userID ? (
        <CurrentDialog userID={userID} socket={socket} />
      ) : (
        <SectionInfo text="Choose the dialog..." picture={picture} pictureWebp={pictureWebp} size="16rem" />
      )}
    </div>
  );
});
