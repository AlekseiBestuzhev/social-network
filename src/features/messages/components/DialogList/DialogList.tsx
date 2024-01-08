import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { Dialog } from '@/features/messages/components/DialogList/Dialog/Dialog.tsx';
import cls from '@/features/messages/components/DialogList/DialogList.module.scss';
import { dialogsDataSelector } from '@/features/messages/selectors/dialogsDataSelector';
import { messagesDataSelector } from '@/features/messages/selectors/messagesDataSelector';

export const DialogList = () => {
  const dialogsData = useAppSelector(dialogsDataSelector);
  const messagesData = useAppSelector(messagesDataSelector);

  const dialogsList = dialogsData.length ? (
    dialogsData.map(el => {
      const lm = messagesData[el.id][messagesData[el.id].length - 1];
      const lastText = lm?.message || '';
      const lastDate = lm?.date || '';

      return (
        <Dialog
          key={el.id}
          id={el.id}
          name={el.name}
          photo={el.photo}
          lastMessage={lastText}
          lastDate={lastDate}
        />
      );
    })
  ) : (
    <span className={cls.emptyList}>Nobody needs you...</span>
  );

  return <ul className={cls.dialogItems}>{dialogsList}</ul>;
};
