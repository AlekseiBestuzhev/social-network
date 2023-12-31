import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import picture from '@/assets/animate-images/messages.gif';
import pictureWebp from '@/assets/animate-images/messages.webp';
import { withAuthRedirect } from '@/common/hoc/withAuthRedirect.tsx';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { SectionInfo } from '@/components/SectionInfo/SectionInfo';
import { CurrentDialog } from '@/features/messages/components/CurrentDialog/CurrentDialog.tsx';
import { DialogList } from '@/features/messages/components/DialogList/DialogList.tsx';
import { setCurrentDialog } from '@/features/messages/messages-reducer.ts';
import cls from '@/pages/Messages/Messages.module.scss';

export const Messages = withAuthRedirect(() => {
  const dispatch = useAppDispatch();
  const { userID } = useParams();

  useEffect(() => {
    dispatch(setCurrentDialog(userID || ''));
  }, [userID]);

  return (
    <div className={cls.page}>
      <div className={cls.leftColumn}>
        <h2 className={cls.title}>Dialogs</h2>
        <DialogList />
      </div>
      {userID ? (
        <CurrentDialog userID={userID} />
      ) : (
        <SectionInfo text="Choose the dialog..." picture={picture} pictureWebp={pictureWebp} size="16rem" />
      )}
    </div>
  );
});
