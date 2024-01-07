import { FC, memo } from 'react';

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

type PropsType = {
  userID: string;
};

export const CurrentDialog: FC<PropsType> = memo(({ userID }) => {
  const authUserName = useAppSelector(authUserNameSelector);
  const authUserID = useAppSelector(authUserIDSelector);
  const avatar = useAppSelector(authUserAvatarSelector);

  const dialogsData = useAppSelector(dialogsDataSelector);
  const user = dialogsData.find(el => el.id === userID);
  const currentUserName = user?.name || '';

  const dispatch = useAppDispatch();

  const onSubmit = ({ message }: AddItemFormData) => {
    if (userID === 'dev_chat') {
      alert(message);
    } else if (typeof authUserID === 'number' && authUserName) {
      const messageData: AddMessageData = {
        message,
        userID: authUserID.toString(),
        userName: authUserName,
        avatar,
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
      <DialogWindow userID={userID} />
      <div className={cls.formWrapper}>
        <AddItemForm placeholder="Enter a message..." onSubmit={onSubmit}>
          Send <RiSendPlaneFill />
        </AddItemForm>
      </div>
    </div>
  );
});
