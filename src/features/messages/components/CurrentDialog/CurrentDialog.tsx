import { FC, memo } from 'react';

import { RiSendPlaneFill, RiAlignRight } from 'react-icons/ri';

import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import cls from '@/features/messages/components/CurrentDialog/CurrentDialog.module.scss';
import { DialogWindow } from '@/features/messages/components/CurrentDialog/DialogWindow/DialogWindow.tsx';
import { dialogsDataSelector } from '@/features/messages/selectors/dialogsDataSelector';
import { AddItemForm } from '@/components/AddItemForm/AddItemForm.tsx';

type PropsType = {
  userID: string;
};

export const CurrentDialog: FC<PropsType> = memo(({ userID }) => {
  const dialogsData = useAppSelector(dialogsDataSelector);

  const currentUserName = (() => {
    const user = dialogsData.find(el => el.id === userID);

    return user?.name || '';
  })();

  return (
    <div className={cls.wrapper}>
      <div className={cls.header}>
        <h4 className={cls.name}>{currentUserName}</h4>
        <RiAlignRight className={cls.menuIcon} onClick={() => alert('There will be a drop-down list')} />
      </div>
      <DialogWindow userID={userID} />
      <div className={cls.formWrapper}>
        <AddItemForm placeholder="Enter a message..." onSubmit={() => {}}>
          Send <RiSendPlaneFill />
        </AddItemForm>
      </div>
    </div>
  );
});
