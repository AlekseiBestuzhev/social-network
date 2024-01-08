import { memo } from 'react';

import { RiSendPlaneFill, RiAlignRight } from 'react-icons/ri';

import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { AddItemForm, AddItemFormData } from '@/components/AddItemForm/AddItemForm.tsx';
import { authUserAvatarSelector } from '@/features/auth/selectors/authUserAvatarSelector';
import { authUserIDSelector } from '@/features/auth/selectors/authUserIDSelector';
import { authUserNameSelector } from '@/features/auth/selectors/authUserNameSelector';
import cls from '@/features/messages/components/CurrentDialog/CurrentDialog.module.scss';
import { DialogWindow } from '@/features/messages/components/CurrentDialog/DialogWindow/DialogWindow.tsx';
import { addMessageAC, AddMessageData } from '@/features/messages/messages-reducer.ts';
import { dialogsDataSelector } from '@/features/messages/selectors/dialogsDataSelector';

export type CurrentDialogProps = {
  userID: string;
  socket: WebSocket | null;
};

export const CurrentDialog = memo(({ userID, socket }: CurrentDialogProps) => {
  const authUserName = useAppSelector(authUserNameSelector);
  const authUserID = useAppSelector(authUserIDSelector)?.toString() || '';
  const photo = useAppSelector(authUserAvatarSelector);

  const dialogsData = useAppSelector(dialogsDataSelector);
  const user = dialogsData.find(el => el.id === userID);
  const currentUserName = user?.name || '';

  const dispatch = useAppDispatch();

  const onSubmit = ({ message }: AddItemFormData) => {
    if (userID === 'dev_chat' && socket instanceof WebSocket) {
      socket.send(message);
    } else if (authUserID && authUserName) {
      const messageData: AddMessageData = {
        message,
        userId: authUserID.toString(),
        userName: authUserName,
        photo,
        toUser: userID,
      };

      dispatch(addMessageAC(messageData));
    }
  };

  return (
    <div className={cls.wrapper}>
      <div className={cls.header}>
        <h4 className={cls.name}>{currentUserName}</h4>
        <RiAlignRight className={cls.menuIcon} onClick={() => alert('There will be a drop-down list')} />
      </div>
      <DialogWindow userID={userID} authUserId={authUserID} />
      <div className={cls.formWrapper}>
        <AddItemForm placeholder="Enter a message..." onSubmit={onSubmit}>
          Send <RiSendPlaneFill />
        </AddItemForm>
      </div>
    </div>
  );
});
